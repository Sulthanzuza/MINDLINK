import React, { useEffect, useRef, useState, FC, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import { Phone, ArrowRight, Sparkles, User, Mail, MessageSquare, Loader, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import * as THREE from 'three';


const qualificationOptions = ["Plus Two", "Bachelor's Degree", "Master's Degree", "Other"];
const districtOptions = ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"];


const AnimatedItem: FC<{ children: ReactNode; inView: boolean; delay?: string }> = ({ children, inView, delay = '0ms' }) => (
  <div
    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: delay }}
  >
    {children}
  </div>
);

const ContactPage: FC = () => {
  const { ref: viewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });


  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!canvasRef.current || canvasRef.current.childElementCount > 0) return;
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
      positions[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0x4ea674, size: 0.015, transparent: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 5;
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += (mouseX - particles.rotation.y) * 0.001;
      particles.rotation.x += (mouseY - particles.rotation.x) * 0.001;
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      if (!canvasRef.current) return;
      const { clientWidth: width, clientHeight: height } = canvasRef.current;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvasRef.current && renderer.domElement) {
        try { canvasRef.current.removeChild(renderer.domElement); } catch (e) { }
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);


  const [formData, setFormData] = useState({
    name: '', email: '', qualification: '', district: '', programme: '', message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!formData.qualification) newErrors.qualification = 'Please select your qualification.';
    if (!formData.district) newErrors.district = 'Please select your district.';
    if (!formData.programme.trim()) newErrors.programme = 'Programme of interest is required.';
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

  return (
    <section ref={viewRef} id="contact" className="min-h-screen py-20 sm:py-24 bg-[#023437] text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-30"><div ref={canvasRef} className="w-full h-full" /></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-[#4ea674] to-transparent opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-white to-transparent opacity-5 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedItem inView={inView}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#4ea674]" />
              <p className="font-semibold text-sm text-[#4ea674] uppercase tracking-wider">Get in Touch</p>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">Ready to Start Your Journey?</h2>
          </AnimatedItem>
          <AnimatedItem inView={inView} delay="200ms">
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
             Have questions or ready to take the first step? Fill out the form below, and our team will reach out shortly.
            </p>
          </AnimatedItem>
        </div>

        <div className="grid lg:grid-cols-2 gap-y-12 gap-x-16 items-start">
          <AnimatedItem inView={inView} delay="400ms">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Book a <span className="text-[#4ea674]">Free Consultation</span></h3>
              <p className="text-gray-300 text-base sm:text-lg">
               Let’s talk about your future. Our first consultation is completely free—with no obligations.
              </p>
              <div className="space-y-4 text-base sm:text-lg">
                <a href="tel:+91 80 897 17 075" className="flex items-center gap-4 hover:text-[#4ea674] transition-colors group">
                  <Phone className="w-6 h-6 text-[#4ea674] group-hover:scale-110 transition-transform" />
                  <span>+91 80 897 17 075</span>
                </a>
                <a href="tel:+919539859689" className="flex items-center gap-4 hover:text-[#4ea674] transition-colors group">
                  <Phone className="w-6 h-6 text-[#4ea674] group-hover:scale-110 transition-transform" />
                  <span>+91 95 398 59 689</span>
                </a>
                <a href="mailto:info@mindlinkglobal.in" className="flex items-center gap-4 hover:text-[#4ea674] transition-colors group">
                  <Mail className="w-6 h-6 text-[#4ea674] group-hover:scale-110 transition-transform" />
                  <span>info@mindlinkglobal.in</span>
                </a>
              </div>
              <div className="pt-6 border-t border-white border-opacity-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-8">
                  <div className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">99%</div>
                    <div className="text-xs sm:text-sm text-[#4ea674] uppercase tracking-widest">Success Rate</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">10+</div>
                    <div className="text-xs sm:text-sm text-[#4ea674] uppercase tracking-widest">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem inView={inView} delay="600ms">
            <div className="bg-white bg-opacity-[.03] p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-white border-opacity-10">
              {status === 'success' ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <Lottie
                    src="https://lottie.host/83a41c2c-859a-464a-a823-6a9712165757/jONB4n5uAR.json"
                    loop={false}
                    className="w-32 h-32"
                  />
                  <h3 className="text-2xl font-bold mb-2 mt-4">Thank You!</h3>
                  <p className="text-gray-300 max-w-xs">Your message has been sent. We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative group">
                      <User className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 ring-red-500/50' : 'border-white/20 focus:ring-[#4ea674]'}`} required />
                      {errors.name && <p className="text-red-400 text-sm mt-1 ml-2">{errors.name}</p>}
                    </div>
                    <div className="relative group">
                      <Mail className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 ring-red-500/50' : 'border-white/20 focus:ring-[#4ea674]'}`} required />
                      {errors.email && <p className="text-red-400 text-sm mt-1 ml-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="relative group">
                    <GraduationCap className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                    <select name="qualification" value={formData.qualification} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all appearance-none ${formData.qualification ? 'text-white' : 'text-gray-400'} ${errors.qualification ? 'border-red-500 ring-red-500/50' : 'border-white/20 focus:ring-[#4ea674]'}`} required>
                      <option value="" disabled>Select Qualification...</option>
                      {qualificationOptions.map(opt => <option key={opt} value={opt} className="bg-[#023437]">{opt}</option>)}
                    </select>
                    {errors.qualification && <p className="text-red-400 text-sm mt-1 ml-2">{errors.qualification}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative group">
                      <MapPin className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <select name="district" value={formData.district} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all appearance-none ${formData.district ? 'text-white' : 'text-gray-400'} ${errors.district ? 'border-red-500 ring-red-500/50' : 'border-white/20 focus:ring-[#4ea674]'}`} required>
                        <option value="" disabled>Select District...</option>
                        {districtOptions.map(opt => <option key={opt} value={opt} className="bg-[#023437]">{opt}</option>)}
                      </select>
                      {errors.district && <p className="text-red-400 text-sm mt-1 ml-2">{errors.district}</p>}
                    </div>


                    <div className="relative group">
                      <BookOpen className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                      <input type="text" name="programme" placeholder="Prefered Course" value={formData.programme} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.programme ? 'border-red-500 ring-red-500/50' : 'border-white/20 focus:ring-[#4ea674]'}`} required />
                      {errors.programme && <p className="text-red-400 text-sm mt-1 ml-2">{errors.programme}</p>}
                    </div>
                  </div>

                  <div className="relative group">
                    <MessageSquare className="absolute top-5 left-4 w-5 h-5 text-gray-400 group-focus-within:text-[#4ea674] transition-colors" />
                    <textarea name="message" placeholder="Your Message" rows={4} value={formData.message} onChange={handleChange} className={`w-full bg-[#023437] bg-opacity-40 border rounded-lg pt-4 pb-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${errors.message ? 'border-red-500 ring-red-500/50' : 'border-white/20 focus:ring-[#4ea674]'}`} required></textarea>
                    {errors.message && <p className="text-red-400 text-sm mt-1 ml-2">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="w-full bg-[#4ea674] text-[#023437] px-8 py-3.5 rounded-full font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                    {status === 'loading' ? <><Loader className="w-6 h-6 animate-spin" /> Sending...</> : <>Send Message <ArrowRight className="w-6 h-6" /></>}
                  </button>
                </form>
              )}
            </div>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;