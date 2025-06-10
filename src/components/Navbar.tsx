import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#1F1F1F] font-sora cursor-pointer" data-cursor="pointer">
            TripFiti
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'How It Works', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#1F1F1F] font-medium relative group transition-colors duration-200 hover:text-[#FF6B6B] cursor-pointer"
                data-cursor="pointer"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                {profile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>💰</span>
                    <span>Credits: {profile.credits}</span>
                  </div>
                )}
                <Link to="/dashboard">
                  <Button className="px-6 py-2.5 bg-cta-gradient text-white border-none hover:scale-105 transition-all duration-300 cursor-pointer" data-cursor="pointer">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="cursor-pointer"
                  data-cursor="pointer"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[#1F1F1F] font-medium transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:scale-105 hover:animate-glow cursor-pointer" data-cursor="pointer">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-[#1F1F1F] cursor-pointer" data-cursor="pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;