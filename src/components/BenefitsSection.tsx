
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const benefits = [
  {
    emoji: '🤖',
    title: 'AI Itineraries Built For You',
    description: 'Get a daily, time-optimized travel plan instantly.'
  },
  {
    emoji: '🏨',
    title: 'Smart Hotel Recommendations',
    description: 'Personalized stays based on your budget and style.'
  },
  {
    emoji: '🧠',
    title: 'Plan Smarter, Travel Better',
    description: 'Discover curated restaurants, cafes, and museums.'
  },
  {
    emoji: '⏰',
    title: 'Save 10+ Hours of Research',
    description: 'Skip the 20-tab research rabbit hole.'
  }
];

const BenefitsSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 px-6 sm:px-8 bg-gradient-to-br from-[#FAFAFA] to-[#F8F8F8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1F1F] mb-4">
            Why TripFiti?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of travel planning with AI that understands your style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-gray-100 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-cta-gradient rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 animate-bounce-subtle">
                  {benefit.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#1F1F1F] mb-3 group-hover:text-[#FF6B6B] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
