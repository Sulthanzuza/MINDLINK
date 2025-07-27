import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Country {
  name: string;
  lat: number;
  lon: number;
  flag: string;
  universities: number;
}

const countries: Country[] = [
  { name: 'United States', lat: 38, lon: -97, flag: '🇺🇸', universities: 120 },
  { name: 'United Kingdom', lat: 55, lon: -3, flag: '🇬🇧', universities: 85 },
  { name: 'Canada', lat: 56, lon: -106, flag: '🇨🇦', universities: 65 },
  { name: 'Australia', lat: -25, lon: 133, flag: '🇦🇺', universities: 45 },
  { name: 'Germany', lat: 51, lon: 10, flag: '🇩🇪', universities: 75 },
  { name: 'India', lat: 20.5937, lon: 78.9629, flag: '🇮🇳', universities: 200 },
];

const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

const InteractiveGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<THREE.Mesh>();
  const cloudsRef = useRef<THREE.Mesh>();
  const animationRef = useRef<number>();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 3;
    controls.enablePan = false;

    const textureLoader = new THREE.TextureLoader();
    const dayTexture = textureLoader.load('/earth_day.jpg'); 
    const cloudTexture = textureLoader.load('/earth_clouds.jpg');

    const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    map: dayTexture,
    emissive: new THREE.Color(0x222222),
    emissiveIntensity: 0.6,
  })
);

    scene.add(globe);
    globeRef.current = globe;

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.3,
      })
    );
    scene.add(clouds);
    cloudsRef.current = clouds;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(ambientLight, directionalLight);

    const pinMeshes: THREE.Mesh[] = [];

    countries.forEach((country) => {
      const position = latLonToVector3(country.lat, country.lon, 1.01);

      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffd700 })
      );
      pin.position.copy(position);
      pin.userData = { country: country.name, universities: country.universities };
      globe.add(pin);
      pinMeshes.push(pin);

      const ringGeometry = new THREE.RingGeometry(0.03, 0.05, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      ring.userData = { animate: true };
      globe.add(ring);

      pin.userData.ring = ring;
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const hoveredPin = intersects[0].object;
        setHoveredCountry(hoveredPin.userData.country);
      } else {
        setHoveredCountry(null);
      }
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      globe.rotation.y += 0.0005;
      clouds.rotation.y += 0.0006;

      pinMeshes.forEach(pin => {
        const ring = pin.userData.ring as THREE.Mesh;
        if (ring?.scale) {
          const scale = Math.sin(Date.now() * 0.003) * 0.1 + 1;
          ring.scale.set(scale, scale, scale);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      controls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-96 lg:h-[500px]">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {hoveredCountry && (
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded-lg p-4 min-w-[200px] shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {countries.find((c) => c.name === hoveredCountry)?.flag}
            </span>
            <h3 className="font-bold text-gray-900">{hoveredCountry}</h3>
          </div>
          <p className="text-sm text-gray-600">
            {countries.find((c) => c.name === hoveredCountry)?.universities} Partner Universities
          </p>
          <button className="mt-2 text-sm text-green-600 hover:text-green-800 font-medium">
            Explore Programs →
          </button>
        </div>
      )}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 tracking-wider">
        Drag to rotate
      </div>
    </div>
  );
};

export default InteractiveGlobe;
