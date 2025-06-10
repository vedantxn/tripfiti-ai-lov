import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { getUserTrips, usePromoCode, Trip } from '@/lib/supabase'
import { toast } from '@/components/ui/sonner'
import { Calendar, MapPin, Users, DollarSign, Plus, Gift } from 'lucide-react'

const Dashboard = () => {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }

    const fetchTrips = async () => {
      const { data, error } = await getUserTrips(user.id)
      if (error) {
        toast.error('Failed to load trips')
      } else {
        setTrips(data || [])
      }
      setLoading(false)
    }

    fetchTrips()
  }, [user, navigate])

  const handlePromoCode = async () => {
    if (!user || !promoCode.trim()) return

    setPromoLoading(true)
    try {
      const { error } = await usePromoCode(user.id, promoCode.trim().toUpperCase())
      if (error) {
        toast.error(error)
      } else {
        toast.success('Promo code applied successfully!')
        setPromoCode('')
        await refreshProfile()
      }
    } catch (error) {
      toast.error('Failed to apply promo code')
    } finally {
      setPromoLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

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
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>💰</span>
                <span>Credits: {profile?.credits || 0}</span>
              </div>
              <Link to="/create-trip">
                <Button className="bg-cta-gradient text-white border-none hover:scale-105 transition-transform duration-200 cursor-pointer" data-cursor="pointer">
                  Create Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1F1F1F] mb-4">
              Welcome back! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Manage your trips and account settings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Trips</CardTitle>
                <MapPin className="h-4 w-4 text-[#FF6B6B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1F1F1F]">{trips.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Available Credits</CardTitle>
                <DollarSign className="h-4 w-4 text-[#FFD93D]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1F1F1F]">{profile?.credits || 0}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Account Status</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Active</div>
              </CardContent>
            </Card>
          </div>

          {/* Promo Code Section */}
          <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-[#FF6B6B]" />
                <span>Add Credits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Enter promo code (e.g., ZUCKERBURGER)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border-2 border-gray-200 focus:border-[#FF6B6B] transition-colors duration-200"
                  data-cursor="pointer"
                />
                <Button
                  onClick={handlePromoCode}
                  disabled={promoLoading || !promoCode.trim()}
                  className="bg-cta-gradient text-white hover:scale-105 transition-transform duration-200 cursor-pointer"
                  data-cursor="pointer"
                >
                  {promoLoading ? 'Applying...' : 'Apply Code'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Use code <strong>ZUCKERBURGER</strong> to get 5 free credits!
              </p>
            </CardContent>
          </Card>

          {/* Trips Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#1F1F1F]">Your Trips</h2>
              <Link to="/create-trip">
                <Button className="bg-cta-gradient text-white hover:scale-105 transition-transform duration-200 cursor-pointer" data-cursor="pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Trip
                </Button>
              </Link>
            </div>

            {trips.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">✈️</div>
                  <h3 className="text-xl font-semibold text-[#1F1F1F] mb-2">No trips yet</h3>
                  <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
                  <Link to="/create-trip">
                    <Button className="bg-cta-gradient text-white hover:scale-105 transition-transform duration-200 cursor-pointer" data-cursor="pointer">
                      Create Your First Trip
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <Link key={trip.id} to={`/view-trip/${trip.id}`} className="cursor-pointer" data-cursor="pointer">
                    <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-[#1F1F1F] flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-[#FF6B6B]" />
                          <span>{trip.destination}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{trip.duration} days</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>{getBudgetEmoji(trip.budget)}</span>
                              <span className="capitalize">{trip.budget}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <span>{getCompanionEmoji(trip.companion)}</span>
                            <span className="capitalize">{trip.companion}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Created {new Date(trip.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard