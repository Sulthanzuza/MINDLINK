import React, { useState, useEffect, useRef, RefObject } from 'react';


interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useInView = (options: UseInViewOptions = {}): { ref: RefObject<HTMLDivElement>; isInView: boolean } => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
       
        if (entry.isIntersecting) {
          setIsInView(true);
       
          if (options.triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]); 

  return { ref, isInView };
};



const Timeline: React.FC = () => {

  const { ref, isInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="w-full py-20 bg-slate-50 overflow-x-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
     
          <div className="absolute top-0 left-4 lg:left-1/2 h-full w-0.5 lg:-translate-x-1/2">
            <div
              className={`h-full w-full bg-gradient-to-b from-transparent via-green-500 to-transparent transition-transform duration-1000 ease-out ${
                isInView ? 'scale-y-100' : 'scale-y-0'
              }`}
              style={{ transformOrigin: 'top' }}
            />
           
            <div className={`absolute top-1/2 -translate-y-1/2 -left-1.5 h-4 w-4 rounded-full bg-green-600 ring-8 ring-slate-50 transition-all duration-500 delay-500 ${
              isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`} />
          </div>

      
          <div className="w-full lg:w-1/2 lg:pr-8 pl-10 lg:pl-0">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A group of students studying and collaborating together"
              className={`w-full h-auto max-h-[480px] object-cover rounded-xl shadow-2xl transition-all duration-1000 ease-out ${
                isInView
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 -translate-x-10 scale-95'
              }`}
            />
          </div>

        
          <div className="w-full lg:w-1/2 lg:pl-8 pl-10">
         
            <div className="overflow-hidden">
                <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider text-green-600 transition-transform duration-700 ease-out delay-200 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                  Your Journey Starts Here
                </p>
            </div>
          
            <div className="overflow-hidden mt-2 mb-6">
                <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 transition-transform duration-700 ease-out delay-300 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                  Explore Your Destination
                </h2>
            </div>
          
            <div className="overflow-hidden">
              <p className={`text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed transition-opacity duration-700 ease-out delay-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              Let our expert advisors guide you in discovering the best countries and universities tailored to your goals. We take the time to understand your academic profile, financial plans, and career ambitions ensuring a perfect fit and a seamless path to your study abroad dream.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
