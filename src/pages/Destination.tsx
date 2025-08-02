import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { destinations } from '../data/destinations';

interface CountryStats {
  universities: string;
  students: string;
  cities: string;
}

interface Destination {
  id: string;
  name: string;
  image: string;
  hoverText: string;
  link: string;
}

interface HoveredCardData {
  image: string;
  name: string;
  hoverText: string;
  stats: CountryStats;
}

interface DestinationCardProps {
  destination: Destination;
  index: number;
  onHover: (data: HoveredCardData | null) => void;
  isMobile: boolean;
}

const getCountryStats = (id: string): CountryStats => {
  const statsMap: Record<string, CountryStats> = {
    australia: { universities: "43+", students: "450K+", cities: "8+" },
    canada: { universities: "100+", students: "350K+", cities: "20+" },
    germany: { universities: "400+", students: "380K+", cities: "25+" },
    uk: { universities: "165+", students: "500K+", cities: "15+" },
    ireland: { universities: "35+", students: "35K+", cities: "5+" },
    france: { universities: "300+", students: "340K+", cities: "30+" },
    usa: { universities: "4000+", students: "1M+", cities: "50+" },
    japan: { universities: "780+", students: "250K+", cities: "30+" },
    china: { universities: "3000+", students: "500K+", cities: "50+" },
    netherlands: { universities: "50+", students: "115K+", cities: "10+" },
    newzealand: { universities: "8", students: "50K+", cities: "5+" },
    chennai: { universities: "30+", students: "600K+", cities: "1" },
    bangalore: { universities: "40+", students: "700K+", cities: "1" },
    mumbai: { universities: "35+", students: "650K+", cities: "1" }
  };
  return statsMap[id] || { universities: "N/A", students: "N/A", cities: "N/A" };
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, index, onHover, isMobile }) => {
  const { name, image, hoverText, link, id } = destination;
  const stats = getCountryStats(id);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (): void => {
    if (!isMobile) {
      setIsHovered(true);
      onHover({ image, name, hoverText, stats });
    }
  };

  const handleMouseLeave = (): void => {
    if (!isMobile) {
      setIsHovered(false);
      onHover(null);
    }
  };

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    
    if (isMobile) {
      // On mobile, clicking toggles the overlay
      setIsClicked(true);
      onHover({ image, name, hoverText, stats });
      setTimeout(() => setIsClicked(false), 600);
    } else {
      // On desktop, clicking navigates
      window.open(link, '_blank');
    }
  };

  const handleTouchStart = (): void => {
    if (isMobile) {
      setIsHovered(true);
    }
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
      onTouchStart={handleTouchStart}
    >
      <motion.div
        className="block w-full aspect-[4/3] sm:aspect-[3/2] rounded-3xl overflow-hidden cursor-pointer"
        animate={{
          opacity: isHovered && !isMobile ? 0 : 1,
          scale: isHovered && !isMobile ? 0.95 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <motion.div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl">
          <motion.div className="absolute inset-0">
            <img
              src={image}
              alt={`Scenic view of ${name}`}
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found";
              }}
            />
          </motion.div>

          <motion.div className="absolute inset-0 bg-gradient-to-br from-[#023437]/60 via-transparent to-[#023437]/80" />

          <div className="relative h-full flex flex-col justify-end px-4 py-6 sm:px-6 sm:py-8 text-white z-10">
            <motion.div className="relative mb-2 sm:mb-4">
              <motion.h6
                className="font-black tracking-wider uppercase text-xs sm:text-sm md:text-base lg:text-lg"
                style={{
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                {name}
              </motion.h6>
              {/* Mobile tap indicator */}
              {isMobile && (
                <motion.p
                  className="text-xs text-white/70 mt-1 sm:hidden"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to explore
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<HoveredCardData | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close overlay when clicking outside on mobile
  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget && isMobile) {
      setHoveredCard(null);
    }
  };

  // Handle escape key to close overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHoveredCard(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden relative">
      
      {/* Enhanced Mobile-Friendly Hover Overlay */}
      <AnimatePresence>
        {hoveredCard && (
          <motion.div
            className={`fixed inset-0 z-40 ${isMobile ? 'pointer-events-auto' : 'pointer-events-none'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleOverlayClick}
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

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#023437]/80 via-black/60 to-[#023437]/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            {/* Mobile Close Button */}
            {isMobile && (
              <motion.button
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setHoveredCard(null)}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            )}

            {/* Scrollable Content Container */}
            <motion.div
              className={`absolute inset-0 flex flex-col items-center justify-start text-white z-50 ${
                isMobile ? 'overflow-y-auto pt-16 pb-8' : 'justify-center'
              } p-3 sm:p-4 md:p-6 lg:p-8`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center w-full max-w-6xl">
                <motion.h2
                  className="font-black uppercase mb-3 sm:mb-4 md:mb-6 tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                  style={{
                    textShadow: "0 0 40px rgba(74, 222, 128, 0.8)",
                  }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {hoveredCard.name}
                </motion.h2>

                <motion.p
                  className="text-white/90 leading-relaxed mb-4 sm:mb-6 md:mb-8 mx-auto text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {hoveredCard.hoverText}
                </motion.p>

                {/* Stats Grid - Always 3 columns, responsive sizing */}
                <motion.div
                  className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto mb-8"
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
                      <div className="text-green-400 font-black mb-1 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        {value}
                      </div>
                      <div className="uppercase tracking-wide text-white/80 text-xs sm:text-sm md:text-base whitespace-nowrap">
                        {key}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile Action Buttons */}
                {isMobile && (
  <motion.div
    className="w-full flex justify-center mt-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <motion.button
      className="w-6 h-6 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-xs border border-white/30 flex items-center justify-center"
      whileTap={{ scale: 0.95 }}
      onClick={() => setHoveredCard(null)}
    >
      ×
    </motion.button>
  </motion.div>
)}



        
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#023437] via-gray-400 to-[#023437] overflow-hidden px-4"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
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

        <motion.div
          className="relative z-20 text-center cursor-pointer w-full max-w-5xl"
          whileHover={{ scale: isMobile ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.h1
            className="font-black tracking-tighter mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, #ffffff, #4ade80)",
                "linear-gradient(45deg, #4ade80, #ffffff)",
                "linear-gradient(45deg, #ffffff, #4ade80)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            DESTINATIONS
          </motion.h1>

          <motion.div
            className="h-1 sm:h-2 bg-gradient-to-r from-green-400 to-transparent mx-auto rounded-full mb-4 sm:mb-6 md:mb-8 w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.p
            className="text-white/80 mx-auto text-sm sm:text-base md:text-lg lg:text-xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl px-4"
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

      {/* Cards Section */}
      <motion.div 
        className="relative -mt-16 sm:-mt-20 z-30 bg-gray-100 rounded-t-3xl"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 mx-auto">
          <motion.header 
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-800 mb-3 sm:mb-4 md:mb-6 cursor-pointer"
              whileHover={{
                scale: isMobile ? 1 : 1.02,
                textShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              Your Journey Awaits
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {isMobile ? 'Tap on each destination to explore detailed insights and statistics.' : 'Hover over each destination to experience an immersive preview with detailed insights and statistics.'}
            </motion.p>
          </motion.header>

          <main>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              {destinations.map((dest, index) => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  index={index}
                  onHover={setHoveredCard}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
