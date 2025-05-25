
import React from 'react';

const TrustBar = () => {
  const testimonials = [
    { text: "Felt like a human travel agent", author: "@nomad_jess" },
    { text: "Saved me 15 hours of planning", author: "@travel_mike" },
    { text: "My best trip planning experience", author: "@wanderlust_sara" }
  ];

  const stats = [
    "10,000+ trips generated",
    "Users save 10+ hours per trip",
    "95% satisfaction rate"
  ];

  return (
    <section className="py-16 px-6 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Trust Header */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 font-medium">
            Trusted by thousands of travelers 🌍
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.author[1].toUpperCase()}
                </div>
                <div>
                  <p className="text-[#1F1F1F] font-medium mb-1">"{testimonial.text}"</p>
                  <p className="text-gray-500 text-sm">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FFD93D]/10 rounded-xl border border-[#FF6B6B]/20"
            >
              <p className="text-lg font-bold text-[#1F1F1F]">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
