import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';

interface ScrambleTitleProps {
  text: string;
  className?: string;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________0101';

export const ScrambleTitle: React.FC<ScrambleTitleProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const preloaderPhase = useStore((state) => state.preloaderPhase);

  const prevTextRef = useRef(text);

  // 1. Initial 3D rotateX(-90deg -> 0) entrance with 0.03 stagger, and auto-scramble on text change
  useEffect(() => {
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      triggerScramble();
      return;
    }

    setDisplayText(text);
    if (preloaderPhase === 'finished' || preloaderPhase === 'exploding') {
      const letters = containerRef.current?.querySelectorAll('.stagger-letter');
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          {
            rotateX: -90,
            y: 40,
            opacity: 0,
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }
    }
  }, [text, preloaderPhase]);

  // 2. Hover Scramble Animation (cycling through random glyphs)
  const triggerScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    const originalChars = text.split('');
    let iteration = 0;
    const totalIterations = originalChars.length * 3;

    const interval = setInterval(() => {
      const scrambled = originalChars
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) {
            return originalChars[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);
      iteration++;

      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScrambling.current = false;
      }
    }, 28);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={triggerScramble}
      className={`inline-flex flex-wrap cursor-pointer select-none ${className}`}
      style={{ perspective: '800px' }}
    >
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden py-1"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span
            className="stagger-letter inline-block font-mono tracking-tight text-cyan-400 font-bold transition-colors duration-200 hover:text-white"
            style={{
              transformOrigin: '50% 50% -20px',
              display: char === ' ' ? 'inline' : 'inline-block',
              minWidth: char === ' ' ? '0.4em' : 'auto',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </div>
  );
};
