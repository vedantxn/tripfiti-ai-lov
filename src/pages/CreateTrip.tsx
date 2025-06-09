import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Info, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mock Google Places API data
const mockPlaces = [
  { id: 1, name: 'Paris, France', description: 'City of Light' },
  { id: 2, name: 'Tokyo, Japan', description: 'Modern metropolis' },
  { id: 3, name: 'New York, USA', description: 'The Big Apple' },
  { id: 4, name: 'London, UK', description: 'Historic capital' },
  { id: 5, name: 'Rome, Italy', description: 'Eternal City' },
  { id: 6, name: 'Barcelona, Spain', description: 'Mediterranean gem' },
  { id: 7, name: 'Amsterdam, Netherlands', description: 'Canal city' },
  { id: 8, name: 'Dubai, UAE', description: 'Desert oasis' },
  { id: 9, name: 'Bali, Indonesia', description: 'Tropical paradise' },
  { id: 10, name: 'Sydney, Australia', description: 'Harbor city' },
];

const budgetOptions = [
  {
    id: 'affordable',
    emoji: '👛',
    title: 'Affordable',
    description: 'Budget-friendly options with hostels, local food, and public transport.'
  },
  {
    id: 'moderate',
    emoji: '💵',
    title: 'Moderate',
    description: 'Mid-range hotels, mix of local and tourist restaurants, some guided tours.'
  },
  {
    id: 'luxury',
    emoji: '💰',
    title: 'Luxury',
    description: 'Premium hotels, fine dining, private tours, and exclusive experiences.'
  }
];

const travelCompanions = [
  { id: 'solo', emoji: '🏄', title: 'Solo' },
  { id: 'couple', emoji: '💞', title: 'Couple' },
  { id: 'friends', emoji: '🍻', title: 'Friends' },
  { id: 'family', emoji: '🏡', title: 'Family' }
];

const getDayEmoji = (days: number) => {
  if (days <= 3) return '⚡';
  if (days <= 7) return '🌟';
  if (days <= 14) return '🚀';
  return '🌍';
};

const getSliderColor = (days: number) => {
  if (days <= 3) return 'from-green-400 to-green-600';
  if (days <= 7) return 'from-blue-400 to-blue-600';
  if (days <= 14) return 'from-purple-400 to-purple-600';
  return 'from-red-400 to-red-600';
};

const CreateTrip = () => {
  const [destination, setDestination] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState(mockPlaces);
  const [days, setDays] = useState([7]);
  const [budget, setBudget] = useState('');
  const [companions, setCompanions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    const filtered = mockPlaces.filter(place =>
      place.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlaces(filtered);
    setShowDropdown(value.length > 0 && filtered.length > 0);
  };

  const selectPlace = (place: typeof mockPlaces[0]) => {
    setDestination(place.name);
    setShowDropdown(false);
  };

  const handleGenerateTrip = () => {
    if (!destination || !budget || !companions) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      alert('Trip generated successfully!');
    }, 3000);
  };

  const isFormValid = destination && budget && companions;

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#1F1F1F] font-sora cursor-pointer" data-cursor="pointer">
              TripFiti
            </Link>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
<<<<<<< HEAD
                <span className="font-semibold hover:text-[#1F1F1F] cursor-pointer hover:scale-105 transition-transform duration-200" data-cursor="pointer">Credits</span>
=======
                <span>💰</span>
                <span>Credits: 3</span>
>>>>>>> 822e839ec8f73a1ec1212e16c2f6c8e68961cf9d
              </div>
              <Button 
                variant="outline" 
                className="bg-cta-gradient text-white border-none hover:scale-105 transition-transform duration-200 cursor-pointer"
                data-cursor="pointer"
              >
                My Trips
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F1F1F] mb-6">
              Tell us your travel preferences🌎
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="space-y-12">
              {/* Destination */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <h3 className="text-2xl font-bold text-[#1F1F1F]">What is destination of choice?</h3>
                </div>
                
                <div className="relative" ref={dropdownRef}>
                  <div className="relative">
                    <Textarea
                      ref={textareaRef}
                      placeholder="Search for a destination..."
                      value={destination}
                      onChange={(e) => handleDestinationChange(e.target.value)}
                      onFocus={() => destination && setShowDropdown(true)}
                      className="min-h-[60px] text-lg resize-none pr-12 border-2 border-gray-200 focus:border-[#FF6B6B] transition-colors duration-200 cursor-pointer"
                      data-cursor="pointer"
                    />
                    <MapPin className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
                  </div>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-10">
                      {filteredPlaces.map((place) => (
                        <div
                          key={place.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                          onClick={() => selectPlace(place)}
                          data-cursor="pointer"
                        >
                          <div className="font-semibold text-[#1F1F1F]">{place.name}</div>
                          <div className="text-sm text-gray-500">{place.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Days */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📆</span>
                  <h3 className="text-2xl font-bold text-[#1F1F1F]">How many days are you planning your trip?</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-600">Duration</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getDayEmoji(days[0])}</span>
                      <span className="text-2xl font-bold text-[#1F1F1F]">
                        {days[0] === 20 ? '20+' : days[0]} {days[0] === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative" data-cursor="pointer">
                    <Slider
                      value={days}
                      onValueChange={setDays}
                      max={20}
                      min={1}
                      step={1}
                      className="w-full cursor-pointer"
                      data-cursor="pointer"
                    />
<<<<<<< HEAD
                    <style>{`
=======
                    <style jsx>{`
>>>>>>> 822e839ec8f73a1ec1212e16c2f6c8e68961cf9d
                      .slider-track {
                        background: linear-gradient(to right, ${getSliderColor(days[0])});
                      }
                    `}</style>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 day</span>
                    <span>20+ days</span>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🤑</span>
                  <h3 className="text-2xl font-bold text-[#1F1F1F]">What is your budget?</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger data-cursor="pointer">
                        <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" data-cursor="pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-2 text-sm">
                          <div><strong>Affordable:</strong> Budget-friendly options with hostels, local food, and public transport.</div>
                          <div><strong>Moderate:</strong> Mid-range hotels, mix of local and tourist restaurants, some guided tours.</div>
                          <div><strong>Luxury:</strong> Premium hotels, fine dining, private tours, and exclusive experiences.</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {budgetOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        budget === option.id
                          ? 'border-[#FF6B6B] bg-gradient-to-br from-[#FF6B6B]/10 to-[#FFD93D]/10 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => setBudget(option.id)}
                      data-cursor="pointer"
                    >
                      <div className="text-center space-y-3">
                        <div className="text-4xl">{option.emoji}</div>
                        <div className="font-bold text-lg text-[#1F1F1F]">{option.title}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Companions */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧑‍🤝‍🧑</span>
                  <h3 className="text-2xl font-bold text-[#1F1F1F]">Who are you going with?</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {travelCompanions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        companions === option.id
                          ? 'border-[#FF6B6B] bg-gradient-to-br from-[#FF6B6B]/10 to-[#FFD93D]/10 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => setCompanions(option.id)}
                      data-cursor="pointer"
                    >
                      <div className="text-center space-y-3">
                        <div className="text-4xl">{option.emoji}</div>
                        <div className="font-bold text-lg text-[#1F1F1F]">{option.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center pt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <Button
                  onClick={handleGenerateTrip}
                  disabled={!isFormValid || isGenerating}
                  className={`px-12 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 cursor-pointer ${
                    isFormValid
                      ? 'bg-cta-gradient text-white hover:scale-105 hover:shadow-2xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  data-cursor="pointer"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Generating Your Trip...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <span>Generate Trip</span>
                      <span className="text-2xl">✨</span>
                    </div>
                  )}
                </Button>
                
                {!isFormValid && (
                  <p className="mt-4 text-sm text-gray-500">
                    Please fill in all fields to generate your trip
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;