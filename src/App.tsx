import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/About';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Destination from './pages/Destination'
import ContactPage from './pages/Contact';
const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/about-us" element={<AboutPage />} />
        <Route path="/destination" element={<Destination />} />
          <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
