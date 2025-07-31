import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// --- MODIFIED: Interface changed from Country to City ---
interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  flag: string;
  universities: number;
}

// --- MODIFIED: Data array now contains 13 cities with accurate coordinates ---
const cities: City[] = [
  // India
  { name: 'Mumbai', country: 'India', lat: 19.07, lon: 72.87, flag: '🇮🇳', universities: 15 },
  { name: 'Chennai', country: 'India', lat: 13.08, lon: 80.27, flag: '🇮🇳', universities: 18 },
  { name: 'Bangalore', country: 'India', lat: 12.97, lon: 77.59, flag: '🇮🇳', universities: 25 },
  // Canada
  { name: 'Toronto', country: 'Canada', lat: 43.65, lon: -79.38, flag: '🇨🇦', universities: 65 },
  { name: 'Vancouver', country: 'Canada', lat: 49.28, lon: -123.12, flag: '🇨🇦', universities: 40 },
  // USA
  { name: 'New York', country: 'USA', lat: 40.71, lon: -74.00, flag: '🇺🇸', universities: 120 },
  { name: 'San Francisco', country: 'USA', lat: 37.77, lon: -122.41, flag: '🇺🇸', universities: 55 },
  // UK
  { name: 'London', country: 'UK', lat: 51.50, lon: -0.12, flag: '🇬🇧', universities: 85 },
  { name: 'Manchester', country: 'UK', lat: 53.48, lon: -2.24, flag: '🇬🇧', universities: 30 },
  // Australia
  { name: 'Melbourne', country: 'Australia', lat: -37.81, lon: 144.96, flag: '🇦🇺', universities: 45 },
  { name: 'Sydney', country: 'Australia', lat: -33.86, lon: 151.20, flag: '🇦🇺', universities: 50 },
  // Europe
  { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.40, flag: '🇩🇪', universities: 75 },
  { name: 'Dublin', country: 'Ireland', lat: 53.34, lon: -6.26, flag: '🇮🇪', universities: 25 },
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
  const animationRef = useRef<number>();
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);

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
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 4;
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

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.3,
      })
    );
    scene.add(clouds);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(ambientLight, directionalLight);

    const pinMeshes: THREE.Mesh[] = [];

    // --- MODIFIED: Loop now iterates over cities ---
    cities.forEach((city) => {
      const position = latLonToVector3(city.lat, city.lon, 1);

      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffd700 })
      );
      pin.position.copy(position);
      // --- MODIFIED: Store the full city object in userData ---
      pin.userData = { city }; 
      globe.add(pin);
      pinMeshes.push(pin);

      const ringGeometry = new THREE.RingGeometry(0.025, 0.035, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globe.add(ring);
      pin.userData.ring = ring;
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let lastHovered: City | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const hoveredPin = intersects[0].object;
        const cityData = hoveredPin.userData.city as City;
        if (lastHovered?.name !== cityData.name) {
          setHoveredCity(cityData);
          lastHovered = cityData;
        }
      } else {
        if (lastHovered !== null) {
          setHoveredCity(null);
          lastHovered = null;
        }
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
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
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
      
      {/* --- MODIFIED: Tooltip now displays city information --- */}
      {hoveredCity && (
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded-lg p-4 min-w-[220px] shadow-lg border border-gray-200/50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{hoveredCity.flag}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{hoveredCity.name}</h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{hoveredCity.country}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            {hoveredCity.universities}+ Partner Universities
          </p>
          <button className="mt-3 text-sm text-green-600 hover:text-green-800 font-semibold">
            Explore Programs →
          </button>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-xs text-gray-500 tracking-wider bg-black/20 text-white py-1 px-2 rounded">
        Drag to rotate
      </div>
    </div>
  );
};

export default InteractiveGlobe;