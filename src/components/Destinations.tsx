// src/components/StudyAbroadSection.tsx

import React, { useState, useEffect, useRef } from 'react';
// Import the data from your new file
import { destinations } from '../data/destinations';

const ITEMS_VISIBLE = 5; // Define how many items to show at once

// --- Component ---
const StudyAbroadSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Create a doubled list for the seamless loop effect
  const extendedDestinations = [...destinations, ...destinations];

  // This effect handles the automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // This function handles the "infinite" loop reset
  const handleTransitionEnd = () => {
    if (currentIndex >= destinations.length) {
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'none';
        setCurrentIndex(0);
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
          }
        }, 50);
      }
    }
  };

  return (
    <section className="py-10 px-4 bg-gray-50 text-center w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
        Popular Study Abroad <span className='text-green-600'>Destinations</span>
      </h2>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
        Our expert advisors help you explore the best countries and universities
        based on your goals.
      </p>

      {/* The viewport for the slider */}
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div
          ref={sliderRef}
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * (100 / ITEMS_VISIBLE)}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedDestinations.map((destination, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: `${100 / ITEMS_VISIBLE}%` }}>
              <div className="px-2">
                <a
                  href={destination.link}
                  className="group relative block overflow-hidden shadow-lg hover:shadow-xl
                             transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-96 object-cover block"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 text-white text-left
                               bg-gradient-to-t from-black/60 to-transparent
                               min-h-[100px] flex flex-col justify-end"
                  >
                    <h3 className="text-xl font-semibold mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm opacity-0 max-h-0 overflow-hidden
                                  transition-all duration-500 ease-in-out
                                  group-hover:opacity-100 group-hover:max-h-[200px] group-hover:mt-2">
                      {destination.hoverText}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyAbroadSection;