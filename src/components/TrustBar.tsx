
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TrustBar = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const testimonials = [
    { 
      text: "Just used TripFiti for my Tokyo trip. The AI literally planned everything perfectly - from hidden ramen spots to the best temples. Saved me weeks of research!", 
      author: "@nomad_jess",
      verified: true,
      avatar: "J"
    },
    { 
      text: "This is insane. TripFiti planned my 2-week Europe trip in 5 minutes. Hotels, restaurants, activities - everything was spot on. Best $29 I've ever spent.", 
      author: "@travel_mike",
      verified: true,
      avatar: "M"
    },
    { 
      text: "Finally, an AI that actually gets travel. My Bali itinerary was so good, locals asked where I found these places. TripFiti is pure magic ✨", 
      author: "@wanderlust_sara",
      verified: false,
      avatar: "S"
    }
  ];

  const stats = [
    { number: "25,000+", label: "trips generated" },
    { number: "15+ hours", label: "saved per trip" },
    { number: "98%", label: "satisfaction rate" }
  ];

  return (
    <section ref={ref} className="py-20 px-6 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Trust Header */}
        <div className="text-center mb-16">
          <p className="text-xl text-gray-600 font-medium">
            Trusted by thousands of travelers 🌍
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
                {/* Twitter-like header */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-[#1F1F1F] mr-2">{testimonial.author}</span>
                      {testimonial.verified && (
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm">@{testimonial.author.slice(1)}</span>
                  </div>
                  {/* Twitter icon */}
                  <svg className="w-5 h-5 text-[#1DA1F2] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>

                {/* Tweet content */}
                <p className="text-[#1F1F1F] leading-relaxed mb-4 text-[15px]">
                  {testimonial.text}
                </p>

                {/* Tweet interactions */}
                <div className="flex items-center text-gray-400 text-sm space-x-6">
                  <div className="flex items-center space-x-1 hover:text-gray-600 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-green-500 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{Math.floor(Math.random() * 30) + 5}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{Math.floor(Math.random() * 100) + 20}</span>
                  </div>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/5 to-[#FFD93D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              <div className="text-center p-8 bg-gradient-to-br from-[#FF6B6B]/10 via-white to-[#FFD93D]/10 rounded-2xl border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-[#1F1F1F] mb-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium capitalize">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
