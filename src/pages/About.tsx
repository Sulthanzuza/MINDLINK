import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';


const Logo = '/logo.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};


const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">

      <motion.section 
        className="relative h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#023437] via-gray-400 to-[#023437] overflow-hidden"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        
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
            backgroundSize: '400px 400px, 600px 600px, 60px 60px, 60px 60px'
          }}
        />
    
      
        <motion.div 
          className="relative z-20 text-center cursor-pointer px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-8"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, #ffffff, #4ade80)",
                "linear-gradient(45deg, #4ade80, #ffffff)",
                "linear-gradient(45deg, #ffffff, #4ade80)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            ABOUT
          </motion.h1>
          
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-8"
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
         Discover your future through personalized support and exciting international academic pathways.
          </motion.p>
        </motion.div>
    
      
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

    
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
        
          <motion.div 
            className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={Logo}
              alt="Globe and graduation cap" 
              className="w-full h-full object-contain p-8 sm:p-12 bg-gray-100"
            />
          </motion.div>

         
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Gateway to <span className="text-green-600">Global Education</span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-700">
           As one of Kerala’s premier study abroad consultancies, Mindlink guides Indian students toward achieving their global academic dreams. Our experienced counsellors offer personalized support to help each student find their ideal academic and career direction.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
             Mindlink provides expert guidance on top universities in the USA, UK, Canada, Australia, and Europe, with personalized study plans with customised to your goals, budget, and aspirations.
            </p>
          </motion.div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
      
          <motion.div
            className="lg:order-1"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Guidance from <span className="text-green-600">Experienced Experts</span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-700">
            With over 15 years of experience, our expert counsellors help students find the right academic path. Backed by strong university partnerships and deep industry insight, we match each student with the most suitable institution.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
             At Mindlink, we make overseas education accessible because your success is our success.
            </p>
          </motion.div>

         
          <motion.div 
            className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Edabroad Expert Team collaborating" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/023437/ffffff?text=Our+Expert+Team"; }}
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
