
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1F1F1F] text-white py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-sora">TripFiti</h3>
            <p className="text-gray-300 leading-relaxed">
              Your personal AI travel agent. Plan trips effortlessly with intelligent recommendations and personalized itineraries.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Contact', 'Privacy'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <span className="text-sm font-medium">
                    {social === 'Twitter' ? '𝕏' : social === 'Instagram' ? 'IG' : 'In'}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TripFiti. All rights reserved. Built with ❤️ for travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
