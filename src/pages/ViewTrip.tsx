import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { getTrip, Trip } from '@/lib/supabase'
import { toast } from '@/components/ui/sonner'
import { MapPin, Calendar, Users, DollarSign, Clock, Star, ArrowLeft } from 'lucide-react'

const ViewTrip = () => {
  const { tripId } = useParams<{ tripId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }

    if (!tripId) {
      navigate('/dashboard')
      return
    }

    const fetchTrip = async () => {
      const { data, error } = await getTrip(tripId)
      if (error || !data) {
        toast.error('Trip not found')
        navigate('/dashboard')
      } else {
        setTrip(data)
      }
      setLoading(false)
    }

    fetchTrip()
  }, [user, tripId, navigate])

  const getBudgetEmoji = (budget: string) => {
    switch (budget) {
      case 'affordable': return '👛'
      case 'moderate': return '💵'
      case 'luxury': return '💰'
      default: return '💰'
    }
  }

  const getCompanionEmoji = (companion: string) => {
    switch (companion) {
      case 'solo': return '🏄'
      case 'couple': return '💞'
      case 'friends': return '🍻'
      case 'family': return '🏡'
      default: return '👥'
    }
  }

  const getCountryFlag = (destination: string) => {
    // Simple country detection - in a real app, you'd use a proper API
    const countryFlags: { [key: string]: string } = {
      'usa': '🇺🇸',
      'japan': '🇯🇵',
      'france': '🇫🇷',
      'italy': '🇮🇹',
      'spain': '🇪🇸',
      'uk': '🇬🇧',
      'germany': '🇩🇪',
      'australia': '🇦🇺',
      'canada': '🇨🇦',
      'brazil': '🇧🇷',
    }
    
    const dest = destination.toLowerCase()
    for (const [country, flag] of Object.entries(countryFlags)) {
      if (dest.includes(country)) return flag
    }
    return '🌍'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1F1F1F] mb-4">Trip not found</h1>
          <Link to="/dashboard">
            <Button className="bg-cta-gradient text-white">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Mock data for demonstration - in a real app, this would come from the AI response
  const mockHotels = [
    {
      id: 1,
      name: "Grand Mountain Resort",
      address: "123 Mountain View Dr, Gatlinburg, TN",
      price: "$180/night",
      rating: 4.5,
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Cozy Cabin Retreat",
      address: "456 Forest Trail, Pigeon Forge, TN",
      price: "$120/night",
      rating: 4.2,
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "Luxury Lodge & Spa",
      address: "789 Summit Rd, Gatlinburg, TN",
      price: "$250/night",
      rating: 4.8,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]

  const mockItinerary = [
    {
      day: 1,
      activities: [
        {
          time: "9:00 AM",
          title: "Cataract Falls",
          description: "Beautiful waterfall hike with scenic views",
          duration: "2 hours",
          price: "Free",
          image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          time: "2:00 PM",
          title: "Dollywood Theme Park",
          description: "Famous theme park with thrilling rides and shows",
          duration: "6 hours",
          price: "$89",
          image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]
    },
    {
      day: 2,
      activities: [
        {
          time: "8:00 AM",
          title: "Great Smoky Mountains National Park",
          description: "Explore the most visited national park in the US",
          duration: "4 hours",
          price: "Free",
          image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          time: "1:00 PM",
          title: "Gatlinburg SkyBridge",
          description: "Longest pedestrian suspension bridge in North America",
          duration: "2 hours",
          price: "$28",
          image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          time: "4:00 PM",
          title: "Moonshine Tasting",
          description: "Sample local moonshine at Sugarlands Distilling",
          duration: "1 hour",
          price: "$15",
          image: "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-[#1F1F1F] font-sora cursor-pointer" data-cursor="pointer">
              TripFiti
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/create-trip">
                <Button variant="outline" className="cursor-pointer" data-cursor="pointer">
                  Create Trip
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-cta-gradient text-white border-none hover:scale-105 transition-transform duration-200 cursor-pointer" data-cursor="pointer">
                  My Trips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6 animate-fade-in">
            <Link to="/dashboard" className="inline-flex items-center space-x-2 text-[#FF6B6B] hover:underline cursor-pointer" data-cursor="pointer">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="relative mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="h-64 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-3xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={trip.destination}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center justify-center space-x-3">
                    <span>{trip.destination}</span>
                    <span className="text-5xl">{getCountryFlag(trip.destination)}</span>
                  </h1>
                  <div className="flex items-center justify-center space-x-6 text-lg">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Calendar className="h-4 w-4 mr-2" />
                      {trip.duration} days
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <span className="mr-2">{getBudgetEmoji(trip.budget)}</span>
                      {trip.budget}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <span className="mr-2">{getCompanionEmoji(trip.companion)}</span>
                      {trip.companion}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Recommendations */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8 flex items-center space-x-3">
              <span>🏨</span>
              <span>Hotel Recommendations</span>
            </h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {mockHotels.map((hotel) => (
                <Card key={hotel.id} className="min-w-[300px] bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#1F1F1F]">{hotel.name}</CardTitle>
                    <p className="text-sm text-gray-600">{hotel.address}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-[#FF6B6B]">{hotel.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Places to Visit */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8 flex items-center space-x-3">
              <span>📍</span>
              <span>Places to Visit</span>
            </h2>
            
            <div className="space-y-12">
              {mockItinerary.map((dayPlan) => (
                <div key={dayPlan.day}>
                  <h3 className="text-2xl font-bold text-[#1F1F1F] mb-6 flex items-center space-x-3">
                    <span className="bg-cta-gradient text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      {dayPlan.day}
                    </span>
                    <span>Day {dayPlan.day}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dayPlan.activities.map((activity, index) => (
                      <Card key={index} className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-[#1F1F1F]">{activity.title}</CardTitle>
                            <Badge variant="outline" className="text-[#FF6B6B] border-[#FF6B6B]">
                              {activity.time}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{activity.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{activity.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-green-500" />
                              <span className="font-semibold text-green-600">{activity.price}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-gray-600 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>Created by Vedant & AI ✨</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTrip