import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function useLenisGsap() {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollState = useStore((state) => state.setScrollState);

  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;

    // 2. Synchronize Lenis scroll event with GSAP ScrollTrigger
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      
      // Calculate global scroll progress [0..1] and velocity
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, e.scroll / maxScroll)) : 0;
      const velocity = Math.abs(e.velocity || 0);

      setScrollState(progress, velocity);
    });

    // 3. Connect GSAP ticker with Lenis requestAnimationFrame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // 4. Disable GSAP lag smoothing for zero-latency frame-perfect sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
    };
  }, [setScrollState]);

  return lenisRef;
}
