
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { destinations } from '../data/destinations'; 


const getClonedDestinations = () => {
  if (!destinations || destinations.length === 0) return [];
  const itemsToClone = 5; 
  const firstClones = destinations.slice(0, itemsToClone);
  const lastClones = destinations.slice(-itemsToClone);
  return [...lastClones, ...destinations, ...firstClones];
};

const StudyAbroadSection: React.FC = () => {
  const [itemsVisible, setItemsVisible] = useState(5);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const clonedDestinations = useMemo(getClonedDestinations, []);
  const initialIndex = 5; 
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);


  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setItemsVisible(1);
    else if (width < 1024) setItemsVisible(3);
    else setItemsVisible(5);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);


  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(initialIndex + slideIndex);
  };

  const startSlider = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        nextSlide();
      }
    }, 3000);
  }, [nextSlide]);

  useEffect(() => {
    startSlider();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startSlider]);


  const handleTransitionEnd = () => {
    if (currentIndex >= destinations.length + initialIndex) {
      setTransitionEnabled(false);
      setCurrentIndex(initialIndex + (currentIndex % destinations.length));
    } else if (currentIndex < initialIndex) {
      setTransitionEnabled(false);
      setCurrentIndex(destinations.length + currentIndex);
    }
  };

  useEffect(() => {
   
    if (!transitionEnabled) {
      const timer = setTimeout(() => setTransitionEnabled(true), 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);


  const slideWidth = 100 / itemsVisible;
  const transformValue = `translateX(-${currentIndex * slideWidth}%)`;


  const activeDotIndex = (currentIndex - initialIndex + destinations.length) % destinations.length;

  return (
    <section className="w-full py-10 px-4 text-center bg-gray-50">
      <h2 className="text-4xl font-bold text-black md:text-5xl mb-4">
        Popular Study Abroad <span className="text-green-600">Destinations</span>
      </h2>
      <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-700">
    Discover top countries and universities tailored to your goals with expert guidance every step of the way.
      </p>

      <div
        className="relative mx-auto max-w-7xl"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >

        <button onClick={prevSlide} aria-label="Previous Slide" className="absolute top-1/2 z-20 p-2 -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer -left-4 md:-left-8 hover:bg-green-600 hover:text-white transition-colors">
          &#8592;
        </button>
        <button onClick={nextSlide} aria-label="Next Slide" className="absolute top-1/2 z-20 p-2 -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer -right-4 md:-right-8 hover:bg-green-600 hover:text-white transition-colors">
          &#8594;
        </button>

        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex"
            style={{
              transform: transformValue,
              transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedDestinations.map((destination, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${slideWidth}%` }}
              >
                <div className="px-2">
                  <div  className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                    <img src={destination.image} alt={destination.name} className="w-full h-96 object-cover" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end min-h-[100px] p-4 text-left text-white bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                      <p className="text-sm opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2">
                        {destination.hoverText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {destinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeDotIndex === idx ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyAbroadSection;