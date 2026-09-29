import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function PostProcessingEffects() {
  const theme = useStore((state) => state.theme);
  const aberrationOffset = useRef(new THREE.Vector2(0.001, 0.001));

  useFrame((_, delta) => {
    const velocity = useStore.getState().scrollVelocity;
    // Scale ChromaticAberration offset dynamically with scroll velocity
    const baseOffset = 0.0008;
    const targetOffset = baseOffset + Math.min(velocity * 0.0015, 0.008);

    aberrationOffset.current.x = THREE.MathUtils.damp(aberrationOffset.current.x, targetOffset, 8, delta);
    aberrationOffset.current.y = THREE.MathUtils.damp(aberrationOffset.current.y, targetOffset * 0.7, 8, delta);
  });

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        luminanceThreshold={theme === 'dark' ? 0.45 : 0.65}
        luminanceSmoothing={0.8}
        intensity={theme === 'dark' ? 0.32 : 0.15}
        mipmapBlur
        radius={0.5}
      />
      <ChromaticAberration
        offset={aberrationOffset.current}
        radialModulation={true}
        modulationOffset={0.3}
      />
      <Noise premultiply opacity={0.03} />
      <Vignette eskil={false} offset={0.3} darkness={0.9} />
    </EffectComposer>
  );
}
