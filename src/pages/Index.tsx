
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F5] font-sora">
      <Navbar />
      <Hero />
      <BenefitsSection />
      <HowItWorks />
      <TrustBar />
      <Footer />
    </div>
  );
};

export default Index;
