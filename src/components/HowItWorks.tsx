
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Trip Details',
    description: 'Pick destination, dates, and style.',
    icon: '✈️',
    mockup: {
      type: 'trip-form',
      data: {
        destination: 'Tokyo, Japan',
        dates: 'Dec 15-22, 2024',
        travelers: '2 Adults',
        budget: '$2,500',
        style: 'Adventure & Culture'
      }
    }
  },
  {
    number: '02',
    title: 'AI Builds Your Trip',
    description: 'Instant itinerary with hotels, activities, and routes.',
    icon: '🤖',
    mockup: {
      type: 'ai-processing',
      data: {
        status: 'Generating your perfect trip...',
        progress: 87,
        tasks: [
          { task: 'Finding best hotels', status: 'completed' },
          { task: 'Curating activities', status: 'completed' },
          { task: 'Optimizing routes', status: 'in-progress' },
          { task: 'Adding local gems', status: 'pending' }
        ]
      }
    }
  },
  {
    number: '03',
    title: 'Customize or Book',
    description: 'Tweak your plan and go.',
    icon: '🎯',
    mockup: {
      type: 'final-trip',
      data: {
        title: 'Your Tokyo Adventure',
        days: 7,
        hotels: 2,
        activities: 15,
        restaurants: 12,
        totalCost: '$2,340',
        savings: '$160 saved'
      }
    }
  }
];

const TripFormMockup = ({ data }: { data: any }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-xs border border-gray-200/50 shadow-lg">
    <div className="text-center mb-3">
      <div className="text-sm font-bold text-[#1F1F1F] mb-1">Plan Your Trip ✨</div>
    </div>
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Destination</span>
          <span className="text-[10px] font-semibold text-[#1F1F1F]">{data.destination}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div className="h-full w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-full"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        <div className="bg-[#FF6B6B]/10 rounded p-2">
          <div className="text-gray-500">Dates</div>
          <div className="font-medium text-[#1F1F1F]">{data.dates}</div>
        </div>
        <div className="bg-[#FFD93D]/10 rounded p-2">
          <div className="text-gray-500">Travelers</div>
          <div className="font-medium text-[#1F1F1F]">{data.travelers}</div>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-gray-500">Budget</span>
          <span className="font-bold text-green-600">{data.budget}</span>
        </div>
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-gray-500">Style</span>
          <span className="font-medium text-[#FF6B6B]">{data.style}</span>
        </div>
      </div>
      
      <button className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white text-[10px] font-semibold py-2 rounded-lg">
        Generate Trip
      </button>
    </div>
  </div>
);

const AIProcessingMockup = ({ data }: { data: any }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-xs border border-gray-200/50 shadow-lg">
    <div className="text-center mb-3">
      <div className="text-sm font-bold text-[#1F1F1F] mb-1">AI Trip Builder 🤖</div>
      <div className="text-[10px] text-gray-600">{data.status}</div>
    </div>
    
    <div className="mb-3">
      <div className="flex items-center justify-between text-[9px] mb-1">
        <span className="text-gray-500">Progress</span>
        <span className="font-bold text-[#FF6B6B]">{data.progress}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-full transition-all duration-300"
          style={{ width: `${data.progress}%` }}
        ></div>
      </div>
    </div>
    
    <div className="space-y-1.5">
      {data.tasks.map((task: any, idx: number) => (
        <div key={idx} className="flex items-center justify-between text-[9px]">
          <span className="text-gray-600">{task.task}</span>
          <div className="flex items-center space-x-1">
            {task.status === 'completed' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            {task.status === 'in-progress' && <div className="w-2 h-2 bg-[#FFD93D] rounded-full animate-pulse"></div>}
            {task.status === 'pending' && <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-3 text-center">
      <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFD93D]/10 rounded-full px-2 py-1">
        <div className="w-1 h-1 bg-[#FF6B6B] rounded-full animate-ping"></div>
        <span className="text-[8px] text-gray-600">Processing...</span>
      </div>
    </div>
  </div>
);

const FinalTripMockup = ({ data }: { data: any }) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-xs border border-gray-200/50 shadow-lg">
    <div className="text-center mb-3">
      <div className="text-sm font-bold text-[#1F1F1F] mb-1">{data.title} 🗾</div>
      <div className="text-[10px] text-green-600 font-semibold">{data.savings}</div>
    </div>
    
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="bg-[#FF6B6B]/10 rounded-lg p-2 text-center">
        <div className="text-lg font-bold text-[#FF6B6B]">{data.days}</div>
        <div className="text-[8px] text-gray-600">Days</div>
      </div>
      <div className="bg-[#FFD93D]/10 rounded-lg p-2 text-center">
        <div className="text-lg font-bold text-[#FFD93D]">{data.hotels}</div>
        <div className="text-[8px] text-gray-600">Hotels</div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-2 mb-3 text-[9px]">
      <div className="flex items-center justify-between">
        <span className="text-gray-500">🎯 Activities</span>
        <span className="font-semibold text-[#1F1F1F]">{data.activities}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-500">🍜 Restaurants</span>
        <span className="font-semibold text-[#1F1F1F]">{data.restaurants}</span>
      </div>
    </div>
    
    <div className="border-t border-gray-200 pt-2 mt-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-gray-500">Total Cost</span>
        <span className="font-bold text-green-600">{data.totalCost}</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-1 mt-3">
      <button className="bg-gray-100 text-gray-700 text-[9px] font-medium py-1.5 rounded">
        Customize
      </button>
      <button className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white text-[9px] font-semibold py-1.5 rounded">
        Book Trip
      </button>
    </div>
  </div>
);

const renderMockup = (mockup: any) => {
  switch (mockup.type) {
    case 'trip-form':
      return <TripFormMockup data={mockup.data} />;
    case 'ai-processing':
      return <AIProcessingMockup data={mockup.data} />;
    case 'final-trip':
      return <FinalTripMockup data={mockup.data} />;
    default:
      return null;
  }
};

const HowItWorks = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} id="how-it-works" className="py-24 px-6 sm:px-8 bg-gradient-to-br from-white to-[#F8F8F8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F1F1F] mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From idea to itinerary in just three simple steps – let AI handle the complexity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border border-gray-100/50 relative overflow-hidden h-full flex flex-col">
                {/* Enhanced glow effect on hover */}
                <div className="absolute inset-0 bg-cta-gradient rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/5 via-transparent to-[#FFD93D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Step Number and Icon */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <div className="w-20 h-20 mx-auto bg-cta-gradient rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      <div className="absolute -top-2 -right-2 text-3xl animate-bounce-subtle group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center mb-8 flex-grow">
                    <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4 group-hover:bg-gradient-to-r group-hover:from-[#FF6B6B] group-hover:to-[#FFD93D] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* UI Mockup */}
                  <div className="mt-auto transform group-hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      {/* Mockup container with enhanced styling */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FFD93D]/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          {renderMockup(step.mockup)}
                        </div>
                      </div>
                      
                      {/* Floating elements for visual appeal */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-[#FFD93D] to-[#FF6B6B] rounded-full opacity-0 group-hover:opacity-70 transition-all duration-700"></div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Enhanced border glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-[#FF6B6B]/20 via-transparent to-[#FFD93D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] transform -translate-x-4 z-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Final CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 mb-6">
            <span className="text-sm text-gray-600">Ready to start your adventure?</span>
            <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-full animate-pulse"></div>
          </div>
          
          <button className="inline-flex items-center px-10 py-5 bg-cta-gradient text-white font-semibold text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:animate-glow group">
            Start Planning Now
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
