import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowDown, Play } from 'lucide-react';
import InteractiveGlobe from './InteractiveGlobe';


const App = () => {
 
  return (
      <Hero />
  );
};

const Hero = () => {
 
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  
  const useCountUp = (target, duration = 2000) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        if (inView) {
            let frame = 0;
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
               
                const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));
                setCount(currentCount);

                if (frame === totalFrames) {
                    clearInterval(counter);
                    setCount(target);
                }
            }, frameRate);
            return () => clearInterval(counter);
        }
    }, [inView, target, duration, totalFrames]);
    
    return count;
  };

  const animatedStudents = useCountUp(5000);
  const animatedCountries = useCountUp(15);
  const animatedUniversities = useCountUp(200);

  const scrollToNext = () => {
  
    const nextSection = document.getElementById('hero')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-[#023437] via-gray-50 to-[#023437] relative overflow-hidden flex items-center"
    >
   
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-green-600 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
       
          <div className="space-y-8 text-center lg:text-left">
            <div className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-[#023437] mb-6 hero-title-glow">
                Design Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600">Future.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
           Turn your dreams into reality with expert, personalized guidance for studying at the world’s leading universities.</p>  </div>

            <div className={`transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} flex flex-col sm:flex-row gap-4 justify-center lg:justify-start`}>
              <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
               Get Consultation
              </button>
              <button
                onClick={scrollToNext}
                className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                View Destinations
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>


            <div className={`transition-all duration-700 ease-out delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} grid grid-cols-3 gap-4 sm:gap-8 pt-8`}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600">
                  {animatedStudents}{animatedStudents === 5000 ? '+' : ''}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 tracking-wider">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600">
                  {animatedCountries}{animatedCountries === 15 ? '+' : ''}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 tracking-wider">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600">
                  {animatedUniversities}{animatedUniversities === 200 ? '+' : ''}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 tracking-wider">Partner Universities</div>
              </div>
            </div>
          </div>


          <div className={`transition-all duration-1000 ease-out delay-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <InteractiveGlobe />
          </div>
        </div>
      </div>


      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${inView ? 'opacity-0' : 'opacity-100 animate-bounce'}`}>
        <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-green-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};


const style = document.createElement('style');
style.textContent = `
  .hero-title-glow {
    text-shadow: 0 0 8px rgba(78, 166, 116, 0.3), 0 0 20px rgba(78, 166, 116, 0.2);
  }
`;
document.head.append(style);

const customHeroStyle = document.createElement('style');
customHeroStyle.textContent = `
  @media (min-width:780px) and (max-width:1020px) {
    #hero {
      padding-top: 6rem;
    }
  }
`;
document.head.append(customHeroStyle);

export default App;
