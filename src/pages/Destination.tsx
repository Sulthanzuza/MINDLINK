import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { destinations } from '../data/destinations';

// Generate stats dynamically based on country
const getCountryStats = (id) => {
  const statsMap = {
    australia: { universities: "43+", students: "450K+", cities: "8+" },
    canada: { universities: "100+", students: "350K+", cities: "20+" },
    germany: { universities: "400+", students: "380K+", cities: "25+" },
    uk: { universities: "165+", students: "500K+", cities: "15+" },
    ireland: { universities: "35+", students: "35K+", cities: "5+" },
    france: { universities: "300+", students: "340K+", cities: "30+" },
    usa: { universities: "4000+", students: "1M+", cities: "50+" }
  };
  return statsMap[id] || { universities: "N/A", students: "N/A", cities: "N/A" };
};

// Interactive Destination Card with Background Image Hover
const DestinationCard = ({ destination, index, onHover }) => {
  const { name, image, hoverText, link, id } = destination;
  const stats = getCountryStats(id);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover({ image, name, hoverText, stats });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group w-full max-w-md sm:max-w-[22rem] mx-auto"
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.a
        href={link}
        className="block w-full aspect-[4/3] sm:aspect-[3/2] rounded-3xl overflow-hidden cursor-pointer"
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        {/* Card Container */}
        <motion.div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <motion.div className="absolute inset-0">
            <img
              src={image}
              alt={`Scenic view of ${name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found";
              }}
            />
          </motion.div>

          {/* Overlay */}
          <motion.div className="absolute inset-0 bg-gradient-to-br from-[#023437]/60 via-transparent to-[#023437]/80" />

          {/* Main Content */}
          <div className="relative h-full flex flex-col justify-end px-4 py-6 sm:px-6 sm:py-8 text-white z-10">
            {/* Country Name */}
            <motion.div className="relative mb-2 sm:mb-4">
              <motion.h6
                className="font-black tracking-wider uppercase relative z-10"
                style={{
                  fontSize: "clamp(.75rem, 2vw, 1.5rem)",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                {name}
              </motion.h6>
            </motion.div>
          </div>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};


// Main App Component
function App() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden relative">
     
<AnimatePresence>
  {hoveredCard && (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
    
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={hoveredCard.image}
          alt={`Background view of ${hoveredCard.name}`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#023437]/80 via-black/60 to-[#023437]/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 p-4 sm:p-6 md:p-8 overflow-y-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center w-full max-w-6xl">
        
          <motion.h2
            className="font-black uppercase mb-4 sm:mb-6 tracking-wider"
            style={{
              fontSize: "clamp(2rem, 8vw, 6rem)",
              textShadow: "0 0 40px rgba(74, 222, 128, 0.8)",
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {hoveredCard.name}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-white/90 leading-relaxed mb-6 sm:mb-8 md:mb-12 mx-auto"
            // CHANGE: Refined clamp() for better readability
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.25rem)", maxWidth: "48rem" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {hoveredCard.hoverText}
          </motion.p>

     
        <motion.div
  className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12 w-full max-w-4xl mx-auto"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  {Object.entries(hoveredCard.stats).map(([key, value], i) => (
    <motion.div
      key={key}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + i * 0.1 }}
    >
      <div
        className="text-green-400 font-black mb-1"
        style={{
          fontSize: "clamp(1.25rem, 3.5vw, 2rem)", // Smaller min size
          lineHeight: "1.2",
        }}
      >
        {value}
      </div>
      <div
        className="uppercase tracking-wide text-white/80"
        style={{
          fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", // Smaller text overall
          lineHeight: "1.2",
        }}
      >
        {key}
      </div>
    </motion.div>
  ))}
</motion.div>

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Interactive Hero Section */}
      <motion.section
  className="relative min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#023437] via-gray-400 to-[#023437] overflow-hidden px-4"
  style={{ scale: heroScale, opacity: heroOpacity }}
>
  {/* Dynamic Background Grid */}
  <motion.div
    className="absolute inset-0 opacity-20"
    animate={{
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    }}
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
      animate={{
        backgroundImage: [
          "linear-gradient(45deg, #ffffff, #4ade80)",
          "linear-gradient(45deg, #4ade80, #ffffff)",
          "linear-gradient(45deg, #ffffff, #4ade80)",
        ],
      }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      DESTINATIONS
    </motion.h1>

    <motion.div
      className="h-2 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-6 md:mb-8"
      style={{ width: 'clamp(5rem, 12vw, 8rem)' }}
      animate={{
        scaleX: [1, 1.5, 1],
        opacity: [0.7, 1, 0.7],
      }}
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

      {/* Main Content */}
      <motion.div 
        className="relative -mt-16 sm:-mt-20 z-30 bg-gray-100 rounded-t-3xl"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl py-16 sm:py-24 px-4 sm:px-6 mx-auto">
          {/* Interactive Section Header */}
          <motion.header 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-800 mb-4 sm:mb-6 cursor-pointer"
              whileHover={{
                scale: 1.02,
                textShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              Your Journey Awaits
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Hover over each destination to experience an immersive preview with detailed insights and statistics.
            </motion.p>
          </motion.header>

          {/* Interactive Cards Grid */}
          <main>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {destinations.map((dest, index) => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  index={index}
                  onHover={setHoveredCard}
                />
              ))}
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}

export default App;