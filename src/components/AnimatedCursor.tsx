
import React, { useEffect, useState } from 'react';

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updatePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }];
        return newTrail.slice(-8); // Keep last 8 trail points
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            background: `linear-gradient(135deg, #FF6B6B, #FFD93D)`,
            opacity: (index + 1) / trail.length * 0.3,
            transform: `scale(${(index + 1) / trail.length})`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[10000] transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: position.x - 16,
          top: position.y - 16,
        }}
      >
        {/* Outer ring */}
        <div className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
          isHovering 
            ? 'border-[#FF6B6B] bg-[#FF6B6B]/20 animate-pulse' 
            : 'border-[#FFD93D] bg-[#FFD93D]/10'
        }`}>
          {/* Inner elements */}
          <div className="relative w-full h-full flex items-center justify-center">
            {isHovering ? (
              // Location pin for hover state
              <div className="text-[#FF6B6B] animate-bounce">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            ) : (
              // Airplane for normal state
              <div className={`text-[#FFD93D] transition-transform duration-300 ${
                isClicking ? 'rotate-45 scale-75' : 'rotate-12'
              }`}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isHovering 
            ? 'bg-gradient-to-r from-[#FF6B6B]/30 to-[#FFD93D]/30 blur-md scale-150' 
            : 'bg-gradient-to-r from-[#FFD93D]/20 to-[#FF6B6B]/20 blur-sm'
        }`} />
      </div>

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9998] w-16 h-16 rounded-full border-2 border-[#FF6B6B] animate-ping"
          style={{
            left: position.x - 32,
            top: position.y - 32,
          }}
        />
      )}
    </>
  );
};

export default AnimatedCursor;
