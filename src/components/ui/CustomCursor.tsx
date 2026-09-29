import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for 44px trailing ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Touchscreen detection: completely disabled on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for custom cursor targets with data-cursor attribute or links/buttons
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor], a, button');

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setCursorLabel(customText);
        } else if (interactiveEl.tagName === 'A') {
          setCursorLabel('Ko‘rish');
        } else if (interactiveEl.tagName === 'BUTTON') {
          setCursorLabel('Ochish');
        } else {
          setCursorLabel(null);
        }
      } else {
        setCursorLabel(null);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const isHovered = Boolean(cursorLabel);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* 1. Precise 12px Dot with mix-blend-mode: difference */}
      <motion.div
        className="fixed top-0 left-0 w-[12px] h-[12px] -ml-[6px] -mt-[6px] rounded-full bg-white mix-blend-difference pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 0 : isPressed ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Trailing 44px Ring with Spring Dynamics & Interactive Expand */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none transition-colors duration-200 ${
          isHovered
            ? 'bg-cyan-400 text-navy-950 font-bold text-[11px] tracking-wider uppercase border-none shadow-[0_0_25px_rgba(56,189,248,0.5)]'
            : 'border-[1.5px] border-cyan-400/80 mix-blend-difference'
        }`}
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isHovered ? 90 : 44,
          height: isHovered ? 90 : 44,
          marginLeft: isHovered ? -45 : -22,
          marginTop: isHovered ? -45 : -22,
          scale: isPressed ? (isHovered ? 0.9 : 0.75) : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
        }}
      >
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="select-none flex items-center justify-center gap-1 px-1"
          >
            <span>{cursorLabel}</span>
            {Boolean(cursorLabel && (cursorLabel.includes('Ko‘rish') || cursorLabel.includes("Ko'rish"))) && (
              <motion.span
                animate={{
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: 'easeInOut',
                }}
                className="text-xs font-black inline-block"
              >
                ↗
              </motion.span>
            )}
          </motion.div>
        )}

        {/* Pulse Ring Wave on Click */}
        {isPressed && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-cyan-400 pointer-events-none"
          />
        )}
      </motion.div>
    </div>
  );
};
