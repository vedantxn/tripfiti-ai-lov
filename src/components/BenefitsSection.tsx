
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const benefits = [
  {
    emoji: '🤖',
    title: 'AI Itineraries Built For You',
    description: 'Get a daily, time-optimized travel plan instantly.',
    mockup: {
      type: 'itinerary',
      data: {
        day: 'Day 2',
        location: 'Tokyo, Japan',
        activities: [
          { time: '9:00 AM', activity: 'Senso-ji Temple', duration: '2h' },
          { time: '11:30 AM', activity: 'Asakusa Food Tour', duration: '3h' },
          { time: '3:00 PM', activity: 'Tokyo Skytree', duration: '2h' }
        ]
      }
    }
  },
  {
    emoji: '🏨',
    title: 'Smart Hotel Recommendations',
    description: 'Personalized stays based on your budget and style.',
    mockup: {
      type: 'hotel',
      data: {
        name: 'The Tokyo Station Hotel',
        rating: 4.8,
        price: '$280/night',
        features: ['Central Location', 'Luxury Spa', 'Michelin Restaurant']
      }
    }
  },
  {
    emoji: '🧠',
    title: 'Plan Smarter, Travel Better',
    description: 'Discover curated restaurants, cafes, and museums.',
    mockup: {
      type: 'recommendations',
      data: {
        restaurants: [
          { name: 'Jiro Dreams', type: 'Sushi', rating: '★★★' },
          { name: 'Ramen Yashichi', type: 'Ramen', rating: '★★★' }
        ],
        cafes: [
          { name: 'Blue Bottle Coffee', type: 'Specialty Coffee' }
        ]
      }
    }
  },
  {
    emoji: '⏰',
    title: 'Save 10+ Hours of Research',
    description: 'Skip the 20-tab research rabbit hole.',
    mockup: {
      type: 'time-comparison',
      data: {
        traditional: '15+ hours',
        tripfiti: '5 minutes',
        saved: '14h 55m'
      }
    }
  }
];

const ItineraryMockup = ({ data }: { data: any }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs border border-gray-200/50">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-[#1F1F1F]">{data.day}</span>
      <span className="text-gray-500 text-[10px]">{data.location}</span>
    </div>
    <div className="space-y-1.5">
      {data.activities.map((activity: any, idx: number) => (
        <div key={idx} className="flex items-center justify-between bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFD93D]/10 rounded px-2 py-1">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-[#FF6B6B] rounded-full"></div>
            <span className="font-medium text-[10px]">{activity.time}</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-medium text-[#1F1F1F]">{activity.activity}</div>
            <div className="text-[9px] text-gray-500">{activity.duration}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HotelMockup = ({ data }: { data: any }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs border border-gray-200/50">
    <div className="mb-2">
      <div className="font-semibold text-[#1F1F1F] text-[11px] mb-1">{data.name}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-[#FFD93D] text-[10px]">★</span>
          <span className="font-medium text-[10px]">{data.rating}</span>
        </div>
        <span className="font-bold text-[#FF6B6B] text-[10px]">{data.price}</span>
      </div>
    </div>
    <div className="space-y-1">
      {data.features.map((feature: string, idx: number) => (
        <div key={idx} className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-[#FFD93D] rounded-full"></div>
          <span className="text-[9px] text-gray-600">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const RecommendationsMockup = ({ data }: { data: any }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs border border-gray-200/50">
    <div className="space-y-2">
      <div>
        <div className="text-[10px] font-semibold text-[#1F1F1F] mb-1">🍽️ Restaurants</div>
        {data.restaurants.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between bg-[#FF6B6B]/5 rounded px-2 py-1 mb-1">
            <span className="text-[9px] font-medium">{item.name}</span>
            <span className="text-[8px] text-[#FFD93D]">{item.rating}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="text-[10px] font-semibold text-[#1F1F1F] mb-1">☕ Cafes</div>
        {data.cafes.map((item: any, idx: number) => (
          <div key={idx} className="bg-[#FFD93D]/5 rounded px-2 py-1">
            <span className="text-[9px] font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TimeComparisonMockup = ({ data }: { data: any }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs border border-gray-200/50">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">Traditional Planning</span>
        <span className="text-[10px] font-bold text-red-500">{data.traditional}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">With TripFiti</span>
        <span className="text-[10px] font-bold text-green-500">{data.tripfiti}</span>
      </div>
      <div className="border-t border-gray-200 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#1F1F1F]">Time Saved</span>
          <span className="text-[10px] font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] bg-clip-text text-transparent">{data.saved}</span>
        </div>
      </div>
    </div>
  </div>
);

const renderMockup = (mockup: any) => {
  switch (mockup.type) {
    case 'itinerary':
      return <ItineraryMockup data={mockup.data} />;
    case 'hotel':
      return <HotelMockup data={mockup.data} />;
    case 'recommendations':
      return <RecommendationsMockup data={mockup.data} />;
    case 'time-comparison':
      return <TimeComparisonMockup data={mockup.data} />;
    default:
      return null;
  }
};

const BenefitsSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 sm:px-8 bg-gradient-to-br from-[#FAFAFA] to-[#F8F8F8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F1F1F] mb-6">
            Why TripFiti?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of travel planning with AI that understands your style and creates personalized adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border border-gray-100/50 relative overflow-hidden">
                {/* Enhanced glow effect on hover */}
                <div className="absolute inset-0 bg-cta-gradient rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/5 via-transparent to-[#FFD93D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="text-5xl mb-4 animate-bounce-subtle group-hover:scale-110 transition-transform duration-300">
                        {benefit.emoji}
                      </div>
                      <h3 className="text-2xl font-bold text-[#1F1F1F] mb-3 group-hover:bg-gradient-to-r group-hover:from-[#FF6B6B] group-hover:to-[#FFD93D] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* UI Mockup */}
                  <div className="mt-8 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      {/* Mockup container with enhanced styling */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FFD93D]/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          {renderMockup(benefit.mockup)}
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
            </div>
          ))}
        </div>

        {/* Call to action at the bottom */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50">
            <span className="text-sm text-gray-600">Ready to experience the magic?</span>
            <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
