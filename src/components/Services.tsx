import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Award, Clock, BadgeCheck, GraduationCap } from 'lucide-react';

// --- The Main Component ---
const WhyUsSection: React.FC = () => {
  // A single observer for the entire section for efficiency
  const { ref, inView } = useInView({
    threshold: 0.15, // Trigger when 15% of the section is visible
    triggerOnce: true, // Animation runs only once
  });

  // Data for the feature list
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

  return (
    <section ref={ref} id="why-us" className="py-20 sm:py-24 bg-gray-50 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <p className="text-green-600 mb-3 font-semibold tracking-wide uppercase text-sm">
              WHY CHOOSE US?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Dream to Study Abroad, <br />
              <span className="bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">Made Simple</span>
            </h2>
          </div>
          <p className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            Flying to study abroad is a dream for many. At Mindlink, we have helped hundreds of students from Kochi select the best university, course, and country.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex items-center flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20">
          
          {/* Content - Left Side (Feature List) */}
          <div className="flex-1">
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-4 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{ transitionDelay: `${200 + index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`mt-8 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${200 + features.length * 150}ms` }}
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

          {/* Image - Right Side */}
          <div className={`flex-1 transition-all duration-1000 ease-out delay-500 ${inView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-95'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-green-200/50 transition-shadow duration-500 group">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Student celebrating university admission"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/600x800/e2e8f0/4a5568?text=Student"; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Main App component to render the section
const App = () => {
  return <WhyUsSection />;
};

export default App;
