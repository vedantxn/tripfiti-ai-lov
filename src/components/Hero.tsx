
'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  { place: 'Bali', emoji: '🌴' },
  { place: 'Dubai', emoji: '🐫' },
  { place: 'Mexico', emoji: '🌮' },
  { place: 'Paris', emoji: '🗼' },
  { place: 'Tokyo', emoji: '🍜' },
  { place: 'Iceland', emoji: '❄️' },
  { place: 'Maldives', emoji: '🏖️' },
  { place: 'Amsterdam', emoji: '🚲' },
  { place: 'Morocco', emoji: '🏜️' },
  { place: 'Thailand', emoji: '🐘' },
  { place: 'Greece', emoji: '🏛️' },
  { place: 'New York', emoji: '🗽' },
];

const Hero = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-hero-gradient pt-20 pb-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* YC Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
            <span className="text-sm font-medium text-[#1F1F1F] mr-2">Backed by</span>
            <div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
              Y
            </div>
          </div>
        </div>

        {/* Main Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F1F1F] leading-tight mb-6 animate-fade-in">
            Your next trip to{' '}
            <span className="relative inline-block">
              <span 
                key={currentDestination}
                className="animate-fade-in text-[#FF6B6B]"
              >
                {destinations[currentDestination].place}
                {destinations[currentDestination].emoji}
              </span>
            </span>
            <br />
            already planned.
          </h1>
          
          <p className="text-xl sm:text-2xl text-[#1F1F1F] font-medium mb-12 animate-slide-in-right">
            AI handles the hassle. You just pack.
          </p>

          {/* CTA Button */}
          <Link to={'/create-trip'}>
            <button className="inline-flex items-center px-8 py-4 bg-cta-gradient text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:animate-glow hover:animate-bounce-subtle mb-16">
              {isAuthenticated ? 'Create a trip' : 'Plan your first trip'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Product Mockup */}
        <div className="flex justify-center mb-16 animate-float">
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full border border-white/20">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#1F1F1F]">Your Bali Adventure</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    5 Days
                  </span>
                </div>

                {/* Sample Itinerary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-[#1F1F1F] mb-2">Day 1: Arrival</h4>
                    <p className="text-gray-600 text-sm">🏨 Four Seasons Resort Bali</p>
                    <p className="text-gray-600 text-sm">🍽️ Dinner at Bebek Bengil</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-[#1F1F1F] mb-2">Day 2: Explore</h4>
                    <p className="text-gray-600 text-sm">🏛️ Tanah Lot Temple</p>
                    <p className="text-gray-600 text-sm">🌾 Jatiluwih Rice Terraces</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-[#1F1F1F] mb-2">Day 3: Beach</h4>
                    <p className="text-gray-600 text-sm">🏖️ Seminyak Beach</p>
                    <p className="text-gray-600 text-sm">🥥 Beach Club Hopping</p>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Estimated Budget:</span>
                  <span className="font-bold text-[#FF6B6B]">$1,247 per person</span>
                </div>
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-cta-gradient rounded-2xl blur-xl opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
