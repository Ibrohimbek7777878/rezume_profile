import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  cursorText?: string;
  variant?: 'primary' | 'secondary' | 'none';
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  cursorText = 'Bosing',
  variant = 'primary',
}) => {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // 1. Magnetic Pull Interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    setPosition({ x: dx * 0.32, y: dy * 0.32 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // 2. Click Ripple Generation
  const handleClick = (e: React.MouseEvent) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    }

    if (onClick) onClick();
  };

  const baseStyles =
    variant === 'none'
      ? 'relative overflow-hidden transition-transform duration-200 ease-out select-none block w-full'
      : 'relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide overflow-hidden transition-transform duration-200 ease-out select-none';

  const variantStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-navy-950 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)]'
      : variant === 'secondary'
      ? 'bg-navy-900/80 border border-slate-700/80 text-white hover:border-cyan-400/80 hover:text-cyan-400 backdrop-blur-md shadow-lg'
      : '';

  const content = (
    <>
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Ripple Circles */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/25 pointer-events-none animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        data-cursor={cursorText}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={style}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      data-cursor={cursorText}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {content}
    </button>
  );
};
