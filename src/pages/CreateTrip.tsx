import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Info, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { createTrip, updateUserCredits } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import GooglePlacesAutocomplete from '@/components/GooglePlacesAutocomplete';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

const CreateTrip = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState([7]);
  const [budget, setBudget] = useState('');
  const [companions, setCompanions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  const generateMockAIResponse = (tripData: any) => {
    // Mock AI response - in a real app, this would call OpenAI API
    return {
      destination: tripData.destination,
      duration: tripData.duration,
      budget: tripData.budget,
      companion: tripData.companion,
      hotels: [
        {
          name: "Grand Mountain Resort",
          address: "123 Mountain View Dr",
          price: "$180/night",
          rating: 4.5,
          image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
        }
      ],
      itinerary: [
        {
          day: 1,
          activities: [
            {
              time: "9:00 AM",
              title: "Scenic Overlook",
              description: "Beautiful mountain views",
              duration: "2 hours",
              price: "Free"
            }
          ]
        }
      ],
      totalCost: "$1,247",
      generatedAt: new Date().toISOString()
    };
  };

  const handleGenerateTrip = async () => {
    if (!user || !profile) {
      toast.error('Please sign in to generate a trip');
      navigate('/auth');
      return;
    }

    if (!destination || !budget || !companions) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (profile.credits <= 0) {
      toast.error('You need at least 1 credit to generate a trip. Please add credits to continue.');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Generate mock AI response
      const aiResponse = generateMockAIResponse({
        destination,
        duration: days[0],
        budget,
        companion: companions
      });

      // Create trip in database
      const { data: trip, error: tripError } = await createTrip({
        user_id: user.id,
        destination,
        duration: days[0],
        budget,
        companion: companions,
        ai_response: aiResponse
      });

      if (tripError) {
        throw new Error(tripError.message);
      }

      // Deduct credit
      const { error: creditError } = await updateUserCredits(user.id, profile.credits - 1);
      if (creditError) {
        throw new Error('Failed to update credits');
      }

      // Refresh profile to update credits
      await refreshProfile();

      toast.success('Trip generated successfully!');
      navigate(`/view-trip/${trip.id}`);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = destination && budget && companions;

  if (!user) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B]"></div>
      </div>
    );
  }

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
                <span>💰</span>
                <span>Credits: {profile?.credits || 0}</span>
              </div>
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  className="bg-cta-gradient text-white border-none hover:scale-105 transition-transform duration-200 cursor-pointer"
                  data-cursor="pointer"
                >
                  My Trips
                </Button>
              </Link>
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
                
                <GooglePlacesAutocomplete
                  value={destination}
                  onChange={setDestination}
                  placeholder="Search for a destination..."
                />
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
                {profile && profile.credits <= 0 && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 font-medium">
                      You need at least 1 credit to generate a trip. 
                      <Link to="/dashboard\" className="ml-2 text-red-700 underline hover:no-underline">
                        Add credits here
                      </Link>
                    </p>
                  </div>
                )}
                
                <Button
                  onClick={handleGenerateTrip}
                  disabled={!isFormValid || isGenerating || (profile && profile.credits <= 0)}
                  className={`px-12 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 cursor-pointer ${
                    isFormValid && profile && profile.credits > 0
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