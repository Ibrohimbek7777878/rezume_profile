import { useStore } from '../store/useStore';

export function useScrollProgress() {
  const progress = useStore((state) => state.scrollProgress);
  const velocity = useStore((state) => state.scrollVelocity);

  return {
    progress,
    velocity,
  };
}
