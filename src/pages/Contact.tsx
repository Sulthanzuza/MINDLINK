import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Phone, ArrowRight, Sparkles, User, Mail, MessageSquare, Loader, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Reusable Animated Component for Staggered Effect ---
const AnimatedItem: React.FC<{ children: React.ReactNode; inView: boolean; delay?: string }> = ({ children, inView, delay = '0ms' }) => (
  <div
    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: delay }}
  >
    {children}
  </div>
);

const ContactPage: React.FC = () => {
  // Attached ref to the correct section below
  const { ref: contactSectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { scrollYProgress } = useScroll();

  // Hero animations
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // --- 3D Background Effect ---
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0x4ea674, size: 0.015, transparent: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0002;
      particles.rotation.x += 0.0001;
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- Form State Management ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  // The main fix: Wrapping the component in a single root <div>
  return (
    <div className="bg-[#023437] text-white overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#023437] via-gray-400 to-[#023437] overflow-hidden px-4"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Dynamic Background Grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(74, 222, 128, 0.2) 0%, transparent 50%),
              linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%)
            `,
            backgroundSize: '400px 400px, 600px 600px, 60px 60px, 60px 60px',
          }}
        />

        {/* Interactive Title */}
        <motion.div
          className="relative z-20 text-center cursor-pointer w-full max-w-5xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.h1
            className="font-black tracking-tighter mb-6 md:mb-8"
            animate={{ backgroundImage: ["linear-gradient(45deg, #ffffff, #4ade80)", "linear-gradient(45deg, #4ade80, #ffffff)", "linear-gradient(45deg, #ffffff, #4ade80)"] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            CONTACT
          </motion.h1>
          <motion.div
            className="h-2 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-6 md:mb-8"
            style={{ width: 'clamp(5rem, 12vw, 8rem)' }}
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.p
            className="text-white/80 mx-auto"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', maxWidth: '700px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover your next academic adventure with immersive, interactive exploration.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* --- 2. CONTACT SECTION --- */}
      <section ref={contactSectionRef} id="contact" className="py-20 sm:py-32 relative flex items-center">
        {/* Background elements are positioned relative to this section */}
        <div className="absolute inset-0 opacity-30"><div ref={canvasRef} className="w-full h-full" /></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-[#4ea674] to-transparent opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-white to-transparent opacity-5 blur-3xl"></div>

        <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <AnimatedItem inView={inView}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#4ea674]" />
                <p className="font-semibold text-[#4ea674] uppercase tracking-wider">Get in Touch</p>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">Ready to Start Your Journey?</h2>
            </AnimatedItem>
            <AnimatedItem inView={inView} delay="200ms">
              <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Have a question or ready to begin? Fill out the form below, and our team will contact you shortly.
              </p>
            </AnimatedItem>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedItem inView={inView} delay="400ms">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white">Book a <span className="text-[#4ea674]">Free Consultation</span></h3>
                <p className="text-gray-300 text-lg">
                  Let's discuss your future. Our initial consultation is always free and without obligation.
                </p>
                <div className="space-y-4 text-lg">
                  <div className="flex items-center gap-4 hover:text-[#4ea674] transition-colors"><Phone className="w-6 h-6 text-[#4ea674]" /><a href="tel:+15551234567">+1 (555) 123-4567</a></div>
                  <div className="flex items-center gap-4 hover:text-[#4ea674] transition-colors"><Mail className="w-6 h-6 text-[#4ea674]" /><a href="mailto:hello@university.com">hello@university.com</a></div>
                </div>
                <div className="pt-8 border-t border-white border-opacity-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center"><div className="text-4xl font-bold text-white mb-2">99%</div><div className="text-sm text-[#4ea674] uppercase">Success Rate</div></div>
                    <div className="text-center"><div className="text-4xl font-bold text-white mb-2">10+</div><div className="text-sm text-[#4ea674] uppercase">Years Experience</div></div>
                  </div>
                </div>
              </div>
            </AnimatedItem>

            <AnimatedItem inView={inView} delay="600ms">
              <div className="bg-white bg-opacity-[.03] p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-white border-opacity-10">
                {status === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-16 h-16 text-[#4ea674] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-300">Your message has been sent successfully. We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="relative group">
                      <User className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 ring-red-500' : 'border-white/20 focus:ring-[#4ea674]'}`} />
                      {errors.name && <p className="text-red-400 text-sm mt-1 ml-2">{errors.name}</p>}
                    </div>
                    <div className="relative group">
                      <Mail className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 ring-red-500' : 'border-white/20 focus:ring-[#4ea674]'}`} />
                      {errors.email && <p className="text-red-400 text-sm mt-1 ml-2">{errors.email}</p>}
                    </div>
                    <div className="relative group">
                      {/* Minor alignment tweak for textarea icon */}
                      <MessageSquare className="absolute top-4 left-4 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${errors.message ? 'border-red-500 ring-red-500' : 'border-white/20 focus:ring-[#4ea674]'}`}></textarea>
                      {errors.message && <p className="text-red-400 text-sm mt-1 ml-2">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={status === 'loading'} className="w-full bg-[#4ea674] text-[#023437] px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                      {status === 'loading' ? <><Loader className="w-6 h-6 animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="w-6 h-6" /></>}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedItem>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;