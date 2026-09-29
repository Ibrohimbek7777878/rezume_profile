import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { SlotCounter } from './SlotCounter';
import gsap from 'gsap';

export const PreloaderOverlay: React.FC = () => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const preloaderPhase = useStore((state) => state.preloaderPhase);
  const setPreloaderPhase = useStore((state) => state.setPreloaderPhase);
  const setIsLoaded = useStore((state) => state.setIsLoaded);

  useEffect(() => {
    // Animate smoothly from 0 to 100%
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: 100,
      duration: 1.4,
      ease: 'power1.inOut',
      onUpdate: () => {
        setDisplayProgress(Math.floor(obj.val));
      },
      onComplete: () => {
        // 1. Trigger 3D Monogram Implosion
        setPreloaderPhase('imploding');

        // 2. Shockwave Burst & Clip-path Reveal
        setTimeout(() => {
          setPreloaderPhase('exploding');

          if (containerRef.current) {
            gsap.to(containerRef.current, {
              clipPath: 'circle(0% at 50% 50%)',
              duration: 0.9,
              ease: 'power4.inOut',
              onComplete: () => {
                setIsLoaded(true);
                setPreloaderPhase('finished');
              },
            });
          } else {
            setIsLoaded(true);
            setPreloaderPhase('finished');
          }
        }, 400);
      },
    });

    return () => {
      tween.kill();
    };
  }, [setIsLoaded, setPreloaderPhase]);

  if (preloaderPhase === 'finished') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between items-center py-16 px-8 bg-transparent"
      style={{
        clipPath: 'circle(150% at 50% 50%)',
      }}
    >
      {/* Top Subtle Label */}
      <div className="text-xs uppercase tracking-[0.3em] font-mono text-cyan-400/80 animate-pulse">
        Initializing 3D World
      </div>

      {/* Center is transparent so the 3D Canvas's 3D extruded monogram and 2000 spiral particles are visible */}
      <div className="flex-1" />

      {/* Bottom Slot Machine Percentage Counter */}
      <div className="flex flex-col items-center gap-3">
        <SlotCounter value={displayProgress} padLength={3} suffix="%" />
        <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400">
          Ibrohim Sultonov — Experience
        </span>
      </div>
    </div>
  );
};
