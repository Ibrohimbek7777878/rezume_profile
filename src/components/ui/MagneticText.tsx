import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticCharProps {
  char: string;
  mousePos: { x: number; y: number };
}

const MagneticChar: React.FC<MagneticCharProps> = ({ char, mousePos }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 240, mass: 0.4 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    if (!spanRef.current) return;
    const rect = spanRef.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    const dx = charCenterX - mousePos.x;
    const dy = charCenterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 95; // Repulsion radius

    if (distance < radius && distance > 0) {
      const force = (1 - distance / radius) * 45;
      const angle = Math.atan2(dy, dx);
      x.set(Math.cos(angle) * force);
      y.set(Math.sin(angle) * force);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mousePos, x, y]);

  if (char === ' ') {
    return <span className="inline-block w-4 md:w-6">&nbsp;</span>;
  }

  return (
    <motion.span
      ref={spanRef}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block transition-colors duration-200 hover:text-cyan-300 will-change-transform"
    >
      {char}
    </motion.span>
  );
};

interface MagneticTextProps {
  text: string;
  className?: string;
}

export const MagneticText: React.FC<MagneticTextProps> = ({ text, className = '' }) => {
  const [mousePos, setMousePos] = React.useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = text.split(' ');

  return (
    <h2
      ref={containerRef}
      className={`font-heading font-extrabold tracking-tight select-none flex flex-wrap gap-x-2.5 sm:gap-x-4 md:gap-x-6 ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <MagneticChar key={charIndex} char={char} mousePos={mousePos} />
          ))}
        </span>
      ))}
    </h2>
  );
};
