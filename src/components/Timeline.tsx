import React, { useState, useEffect, useRef, RefObject } from 'react';

// --- Custom Hook Definition ---
// This hook encapsulates the IntersectionObserver logic.
interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

const useInView = (options: UseInViewOptions = {}): { ref: RefObject<HTMLDivElement>; isInView: boolean } => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
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
  }, [options.threshold, options.rootMargin]); // Effect dependencies

  return { ref, isInView };
};


// --- The Timeline Component ---
const Timeline: React.FC = () => {
  // Use the local custom hook for cleaner animation triggering
  const { ref, isInView } = useInView({
    threshold: 0.3, // Trigger when 30% of the element is visible
    rootMargin: '0px 0px -50px 0px',
  });

  return (
    <section className="w-full py-24 lg:py-32 bg-slate-50 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Decorative Timeline Line & Node */}
          <div className="absolute left-0 lg:left-1/2 h-full w-0.5 -translate-x-1/2">
            <div
              className={`h-full w-full bg-gradient-to-b from-transparent via-green-500 to-transparent transition-transform duration-1000 ease-out ${
                isInView ? 'scale-y-100' : 'scale-y-0'
              }`}
              style={{ transformOrigin: 'top' }}
            />
            {/* Timeline Node */}
            <div className={`absolute top-1/2 -translate-y-1/2 -left-1.5 h-4 w-4 rounded-full bg-green-600 ring-8 ring-slate-50 transition-transform duration-500 delay-500 ${
                isInView ? 'scale-100' : 'scale-0'
            }`} />
          </div>

          {/* Left – Image */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <img
              src="/students.png"
              alt="Students exploring destinations"
              className={`w-full h-auto max-h-[450px] object-cover rounded-xl shadow-2xl transition-all duration-1000 ease-out ${
                isInView
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 -translate-x-10 scale-95'
              }`}
            />
          </div>

          {/* Right – Content */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            {/* Eyebrow Text */}
            <div className="overflow-hidden">
                 <p className={`text-sm font-semibold uppercase tracking-wider text-green-600 transition-transform duration-700 ease-out delay-200 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                    Your Journey Starts Here
                 </p>
            </div>
            {/* Heading */}
            <div className="overflow-hidden mt-2 mb-6">
                 <h2 className={`text-4xl lg:text-5xl font-bold text-slate-900 transition-transform duration-700 ease-out delay-300 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                    Explore Your Destination
                 </h2>
            </div>
            {/* Paragraph */}
             <div className="overflow-hidden">
                <p className={`text-lg text-slate-600 leading-relaxed transition-transform duration-700 ease-out delay-500 ${isInView ? 'translate-y-0' : 'translate-y-full'}`}>
                    Our expert advisors help you explore the best countries and universities
                    based on your goals. We ensure the perfect match by understanding your
                    academic background, financial plans, and career aspirations—making your
                    dream of studying abroad a smooth reality.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;