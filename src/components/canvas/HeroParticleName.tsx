import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import { particleTextVertexShader, particleTextFragmentShader } from '../../shaders/particleTextShader';

export function HeroParticleName() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const preloaderPhase = useStore((state) => state.preloaderPhase);

  // 1. Offscreen canvas generation to sample "IBROHIM SULTONOV"
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 16000 : 40000;

  const { geometry, uniforms } = useMemo(() => {
    // Generate text targets on 2D offscreen canvas
    const offscreen = document.createElement('canvas');
    const width = 1200;
    const height = 300;
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d')!;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 88px "Manrope", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IBROHIM SULTONOV', width / 2, height / 2);

    const imgData = ctx.getImageData(0, 0, width, height);
    const validPixels: { x: number; y: number }[] = [];

    // Collect white pixel coordinates
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const index = (y * width + x) * 4;
        if (imgData.data[index] > 140) {
          validPixels.push({
            x: (x - width / 2) * 0.024,
            y: -(y - height / 2) * 0.024,
          });
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    const initialPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const randomAttributes = new Float32Array(particleCount * 3);

    const pixelTotal = validPixels.length;

    for (let i = 0; i < particleCount; i++) {
      // Disordered initial 3D cloud
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 8 + Math.random() * 18;

      initialPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      initialPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Target text position (cycle through valid text pixels with micro-jitter)
      if (pixelTotal > 0) {
        const p = validPixels[i % pixelTotal];
        targetPositions[i * 3] = p.x + (Math.random() - 0.5) * 0.04;
        targetPositions[i * 3 + 1] = p.y + 0.5 + (Math.random() - 0.5) * 0.04; // shifted slightly upwards
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }

      // Random delay, size factor, and color frequency
      randomAttributes[i * 3] = Math.random();        // delay
      randomAttributes[i * 3 + 1] = 0.5 + Math.random(); // size scale
      randomAttributes[i * 3 + 2] = Math.random();        // color wave
    }

    geo.setAttribute('position', new THREE.BufferAttribute(initialPositions, 3));
    geo.setAttribute('aTarget', new THREE.BufferAttribute(targetPositions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randomAttributes, 3));

    const shaderUniforms = {
      uTime: { value: 0 },
      uTheme: { value: 0 },
      uProgress: { value: 0 },
      uExplode: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uMouseRadius: { value: 2.8 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };

    return { geometry: geo, uniforms: shaderUniforms };
  }, [particleCount]);

  // 2. Assembly trigger after preloader explosion (1.8s power4.out)
  useEffect(() => {
    if (preloaderPhase === 'finished' || preloaderPhase === 'exploding') {
      gsap.to(uniforms.uProgress, {
        value: 1.0,
        duration: 1.8,
        ease: 'power4.out',
        delay: 0.1,
      });
    }
  }, [preloaderPhase, uniforms]);

  // 3. Frame loop for time, mouse tracking, scroll explosion and theme damping
  useFrame((state, delta) => {
    if (!materialRef.current) return;

    uniforms.uTime.value += delta;

    // Track theme state: 0 for dark, 1 for light
    const currentTheme = useStore.getState().theme;
    const targetThemeVal = currentTheme === 'light' ? 1.0 : 0.0;
    uniforms.uTheme.value = THREE.MathUtils.damp(uniforms.uTheme.value, targetThemeVal, 5.0, delta);

    // Track mouse in normalized viewport space converted to world space
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    uniforms.uMouse.value.set(x, y, 0);

    // Scroll explosion uniform: 0 at top, explodes outwards as user scrolls into About section
    const scrollProgress = useStore.getState().scrollProgress;
    // Explodes between 0.0 and 0.14
    const explodeVal = THREE.MathUtils.clamp(scrollProgress / 0.14, 0, 1);
    uniforms.uExplode.value = explodeVal;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 0, 0]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleTextVertexShader}
        fragmentShader={particleTextFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
