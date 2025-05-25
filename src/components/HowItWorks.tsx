
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Trip Details',
    description: 'Pick destination, dates, and style.',
    icon: '✈️'
  },
  {
    number: '02',
    title: 'AI Builds Your Trip',
    description: 'Instant itinerary with hotels, activities, and routes.',
    icon: '🤖'
  },
  {
    number: '03',
    title: 'Customize or Book',
    description: 'Tweak your plan and go.',
    icon: '🎯'
  }
];

const HowItWorks = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} id="how-it-works" className="py-20 px-6 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1F1F] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From idea to itinerary in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center group ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-cta-gradient rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <div className="absolute -top-2 -right-2 text-3xl animate-bounce-subtle">
                  {step.icon}
                </div>
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-4 group-hover:text-[#FF6B6B] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] transform translate-x-10"></div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-cta-gradient text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:animate-glow">
            Start Planning Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
