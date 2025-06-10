import React, { useState, useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { MapPin } from 'lucide-react'

interface Place {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

interface GooglePlacesAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search for a destination...",
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState<Place[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Mock Google Places API data for demonstration
  const mockPlaces: Place[] = [
    {
      place_id: '1',
      description: 'Paris, France',
      structured_formatting: {
        main_text: 'Paris',
        secondary_text: 'France'
      }
    },
    {
      place_id: '2',
      description: 'Tokyo, Japan',
      structured_formatting: {
        main_text: 'Tokyo',
        secondary_text: 'Japan'
      }
    },
    {
      place_id: '3',
      description: 'New York, NY, USA',
      structured_formatting: {
        main_text: 'New York',
        secondary_text: 'NY, USA'
      }
    },
    {
      place_id: '4',
      description: 'London, UK',
      structured_formatting: {
        main_text: 'London',
        secondary_text: 'UK'
      }
    },
    {
      place_id: '5',
      description: 'Rome, Italy',
      structured_formatting: {
        main_text: 'Rome',
        secondary_text: 'Italy'
      }
    },
    {
      place_id: '6',
      description: 'Barcelona, Spain',
      structured_formatting: {
        main_text: 'Barcelona',
        secondary_text: 'Spain'
      }
    },
    {
      place_id: '7',
      description: 'Amsterdam, Netherlands',
      structured_formatting: {
        main_text: 'Amsterdam',
        secondary_text: 'Netherlands'
      }
    },
    {
      place_id: '8',
      description: 'Dubai, UAE',
      structured_formatting: {
        main_text: 'Dubai',
        secondary_text: 'UAE'
      }
    },
    {
      place_id: '9',
      description: 'Bali, Indonesia',
      structured_formatting: {
        main_text: 'Bali',
        secondary_text: 'Indonesia'
      }
    },
    {
      place_id: '10',
      description: 'Sydney, Australia',
      structured_formatting: {
        main_text: 'Sydney',
        secondary_text: 'Australia'
      }
    },
    {
      place_id: '11',
      description: 'Smoky Mountains, Tennessee, USA',
      structured_formatting: {
        main_text: 'Smoky Mountains',
        secondary_text: 'Tennessee, USA'
      }
    },
    {
      place_id: '12',
      description: 'Santorini, Greece',
      structured_formatting: {
        main_text: 'Santorini',
        secondary_text: 'Greece'
      }
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue)
    
    if (inputValue.length > 0) {
      setLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        const filtered = mockPlaces.filter(place =>
          place.description.toLowerCase().includes(inputValue.toLowerCase()) ||
          place.structured_formatting.main_text.toLowerCase().includes(inputValue.toLowerCase())
        )
        setSuggestions(filtered)
        setShowDropdown(filtered.length > 0)
        setLoading(false)
      }, 300)
    } else {
      setSuggestions([])
      setShowDropdown(false)
      setLoading(false)
    }
  }

  const selectPlace = (place: Place) => {
    onChange(place.description)
    setShowDropdown(false)
    setSuggestions([])
  }

  const handleFocus = () => {
    if (value && suggestions.length > 0) {
      setShowDropdown(true)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          className={`min-h-[60px] text-lg resize-none pr-12 border-2 border-gray-200 focus:border-[#FF6B6B] transition-colors duration-200 cursor-pointer ${className}`}
          data-cursor="pointer"
        />
        <MapPin className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
        {loading && (
          <div className="absolute right-12 top-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF6B6B]"></div>
          </div>
        )}
      </div>
      
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-10">
          {suggestions.map((place) => (
            <div
              key={place.place_id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
              onClick={() => selectPlace(place)}
              data-cursor="pointer"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-[#1F1F1F]">
                    {place.structured_formatting.main_text}
                  </div>
                  <div className="text-sm text-gray-500">
                    {place.structured_formatting.secondary_text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GooglePlacesAutocomplete