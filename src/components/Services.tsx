import React, { useState, useEffect, useRef } from 'react';
// Added some new icons for the feature list
import { ArrowRight, Award, Clock, BadgeCheck, GraduationCap } from 'lucide-react';

const App = () => {
  return <WhyEdabroad />;
};

// I've renamed the component to better reflect the new content.
const WhyEdabroad: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Data for the feature list, taken from your content
  const features = [
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: 'Years of Experience',
      description: 'We have years of experience helping students achieve their study abroad dreams.',
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: 'Always On Time',
      description: 'We ensure all processes are completed on time, so you never miss a deadline.',
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-green-600" />,
      title: '5000+ Visas Processed',
      description: 'We have successfully processed visas for over 5000 students.',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-green-600" />,
      title: 'Best In Class',
      description: 'Gain admission to the best universities with our expert guidance.',
    },
  ];

  // This useEffect handles the animation logic, no changes needed here.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  useEffect(() => {
    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          contentObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (contentRef.current) contentObserver.observe(contentRef.current);
    return () => {
      if (contentRef.current) contentObserver.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section id="why-us" className="min-h-screen py-16 sm:py-20 bg-gray-50 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <p className={`text-green-600 mb-3 font-semibold tracking-wide uppercase text-sm transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            WHY MINDLINK?
          </p>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Your Dream to Study Abroad, <br />
            <span className="bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">Made Simple</span>
          </h2>
          <p className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Flying to study abroad is a dream for many, offering an incomparable experience and valuable recognition. At Mindlink, we have helped hundreds of students from Kochi select the best university, course, and country.
          </p>
        </div>

        {/* Main Content Area */}
        <div
          ref={contentRef}
          className="flex items-center flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20"
        >
          {/* Content - Left Side (Feature List) */}
          <div className="flex-1">
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
               <div
                  className={`mt-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${300 + features.length * 100}ms` }}
                >
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold group text-sm sm:text-base"
                  >
                    Get Started Today
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
            </div>
          </div>

          {/* Image - Right Side (Unchanged) */}
          <div className={`flex-1 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-95'}`}>
            <div className="relative rounded-2xl overflow-hidden hover:shadow-green-200 transition-shadow duration-500 group">
              <img
                src="/girl.webp"
                alt="Student celebrating university admission with Edabroad's help"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "/girl-png.webp"; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;