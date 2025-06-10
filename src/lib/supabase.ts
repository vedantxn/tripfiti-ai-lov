import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface UserProfile {
  id: string
  email: string
  credits: number
  used_codes: string[]
  created_at: string
  updated_at: string
}

export interface Trip {
  id: string
  user_id: string
  destination: string
  duration: number
  budget: string
  companion: string
  ai_response: any
  created_at: string
  updated_at: string
}

// Auth functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Profile functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

export const updateUserCredits = async (userId: string, credits: number) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ credits })
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const usePromoCode = async (userId: string, code: string) => {
  const profile = await getUserProfile(userId)
  if (!profile) return { error: 'Profile not found' }
  
  if (profile.used_codes.includes(code)) {
    return { error: 'Code already used' }
  }
  
  let creditsToAdd = 0
  if (code === 'ZUCKERBURGER') {
    creditsToAdd = 5
  } else {
    return { error: 'Invalid code' }
  }
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ 
      credits: profile.credits + creditsToAdd,
      used_codes: [...profile.used_codes, code]
    })
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Trip functions
export const createTrip = async (tripData: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('trips')
    .insert(tripData)
    .select()
    .single()
  
  return { data, error }
}

export const getUserTrips = async (userId: string) => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getTrip = async (tripId: string) => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single()
  
  return { data, error }
}