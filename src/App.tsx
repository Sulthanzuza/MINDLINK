import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/About';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Destination from './pages/Destination'
import ContactPage from './pages/Contact';
import WhatsAppFloat from './components/WhatsappFloat';
import ScrollToTop from './components/ScrollToTop';
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/about-us" element={<AboutPage />} />
        <Route path="/destination" element={<Destination />} />
          <Route path="/contact" element={<ContactPage />} />
      </Routes>
       <WhatsAppFloat 
        phoneNumber="1234567890" 
        message="Hi! I found your website and I'm interested in your services." 
      />
      <Footer/>
    </Router>
  );
};

export default App;
