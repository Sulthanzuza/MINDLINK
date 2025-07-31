import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import Destinations from '../components/Destinations';
import Services from '../components/Services';
import LocationMap from '../components/LocationMap';
import CTA from '../components/Contact';
import Footer from '../components/Footer';
import CurvedLoop from '../components/CurvedLoop';

function Home() {
  return (
    <div className="overflow-x-hidden">
     
      <Hero />
      <Timeline />
      <CurvedLoop marqueeText=" MINDLINK GLOBAL ✦ " />
      <Destinations />
      <Services />
      <CTA />
       {/* <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <LocationMap />
      </div> */}
    
    </div>
  );
}

export default Home;