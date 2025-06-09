import React, { useEffect, useState } from 'react';

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer, input, textarea, select, [data-cursor="pointer"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .cursor-pointer, input, textarea, select, [data-cursor="pointer"]')) {
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
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[10000] w-2 h-2 rounded-full transition-all duration-150 ease-out ${
          isHovering 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-150' 
            : 'bg-yellow-400'
        } ${
          isClicking ? 'scale-75' : ''
        }`}
        style={{
          left: position.x - 4,
          top: position.y - 4,
          transform: `translate(0, 0) scale(${isClicking ? 0.75 : isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Outer ring for hover state */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 transition-all duration-200 ease-out"
          style={{
            left: position.x - 16,
            top: position.y - 16,
            borderColor: isHovering ? '#f97316' : '#facc15', // orange-500 : yellow-400
            opacity: 0.6,
          }}
        />
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9998] w-12 h-12 rounded-full border animate-ping"
          style={{
            left: position.x - 24,
            top: position.y - 24,
            borderColor: isHovering ? '#dc2626' : '#eab308', // red-600 : yellow-500
            borderWidth: '2px',
          }}
        />
      )}
    </>
  );
};

export default AnimatedCursor;