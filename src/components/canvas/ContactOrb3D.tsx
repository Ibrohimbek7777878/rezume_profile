import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const ContactOrb3D: React.FC = () => {
  const orbGroupRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const glowSphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const burstParticlesRef = useRef<THREE.Points>(null);

  // 1. Converging 2,500 Site Particles
  const { particleCount, originalPositions, targetPositions, currentPositions, colors } = useMemo(() => {
    const count = 2500;
    const orig = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const curr = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#38bdf8');
    const violet = new THREE.Color('#8b5cf6');
    const white = new THREE.Color('#e6edf7');

    for (let i = 0; i < count; i++) {
      // Dispersed galaxy coordinates
      orig[i * 3] = (Math.random() - 0.5) * 45;
      orig[i * 3 + 1] = (Math.random() - 0.5) * 45;
      orig[i * 3 + 2] = (Math.random() - 0.5) * 35;

      // Sphere surface coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 0.4;

      target[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      target[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      target[i * 3 + 2] = r * Math.cos(phi);

      curr[i * 3] = orig[i * 3];
      curr[i * 3 + 1] = orig[i * 3 + 1];
      curr[i * 3 + 2] = orig[i * 3 + 2];

      const mixRatio = Math.random();
      const c = mixRatio < 0.5 ? cyan.clone().lerp(violet, mixRatio * 2) : violet.clone().lerp(white, (mixRatio - 0.5) * 2);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return {
      particleCount: count,
      originalPositions: orig,
      targetPositions: target,
      currentPositions: curr,
      colors: col,
    };
  }, []);

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [currentPositions, colors]);

  // 2. Confetti Burst Particles on Button Click
  const burstCountMax = 600;
  const burstData = useMemo(() => {
    const pos = new Float32Array(burstCountMax * 3);
    const vel = new Float32Array(burstCountMax * 3);
    const col = new Float32Array(burstCountMax * 3);
    const cyan = new THREE.Color('#38bdf8');
    const violet = new THREE.Color('#a855f7');

    for (let i = 0; i < burstCountMax; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const speed = 6 + Math.random() * 12;

      vel[i * 3] = dir.x * speed;
      vel[i * 3 + 1] = dir.y * speed;
      vel[i * 3 + 2] = dir.z * speed;

      const c = Math.random() > 0.5 ? cyan : violet;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    return { geo, pos, vel, life: 0 };
  }, []);

  // Trigger burst listener
  const lastBurstRef = useRef(0);
  useEffect(() => {
    const unsub = useStore.subscribe((state) => {
      if (state.burstCount > lastBurstRef.current) {
        lastBurstRef.current = state.burstCount;
        burstData.life = 1.0;
        // Reset positions to 0
        const p = burstData.geo.attributes.position.array as Float32Array;
        for (let i = 0; i < burstCountMax; i++) {
          p[i * 3] = 0;
          p[i * 3 + 1] = 0;
          p[i * 3 + 2] = 0;
        }
        burstData.geo.attributes.position.needsUpdate = true;
      }
    });
    return unsub;
  }, [burstData]);

  // Color & Position Lerp Vectors
  const targetOrbPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetColor = useRef(new THREE.Color('#38bdf8'));
  const currentColor = useRef(new THREE.Color('#38bdf8'));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const { scrollProgress, hoveredContactBtn } = useStore.getState();

    // Contact section scroll range: 0.82 to 1.0
    const contactFactor = THREE.MathUtils.clamp((scrollProgress - 0.82) / 0.14, 0, 1);
    // Footer fade out when reaching bottom: 0.97 to 1.0
    const footerFade = 1.0 - THREE.MathUtils.clamp((scrollProgress - 0.97) / 0.03, 0, 0.7);

    // 1. Interactive Button Hover Response
    if (hoveredContactBtn === 'telegram') {
      targetOrbPos.current.set(-2.2, 0.6, 1.2);
      targetColor.current.set('#0088cc');
    } else if (hoveredContactBtn === 'github') {
      targetOrbPos.current.set(2.2, 0.6, 1.2);
      targetColor.current.set('#a855f7');
    } else if (hoveredContactBtn === 'linkedin') {
      targetOrbPos.current.set(-1.8, -0.6, 1.0);
      targetColor.current.set('#0a66c2');
    } else if (hoveredContactBtn === 'phone') {
      targetOrbPos.current.set(1.8, -0.6, 1.0);
      targetColor.current.set('#10b981');
    } else {
      targetOrbPos.current.set(0, 0, 0);
      targetColor.current.set('#38bdf8');
    }

    currentColor.current.lerp(targetColor.current, delta * 5.0);

    if (orbGroupRef.current) {
      const isMobile = state.viewport.aspect < 1.0;
      const targetScale = isMobile ? 0.65 : 1.0;
      orbGroupRef.current.scale.setScalar(THREE.MathUtils.damp(orbGroupRef.current.scale.x, targetScale, 4, delta));
      orbGroupRef.current.position.lerp(targetOrbPos.current, delta * 4.5);
      orbGroupRef.current.rotation.y = time * 0.45;
      orbGroupRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    }

    // 2. Breathing Orb Animation
    const breath = 1.0 + Math.sin(time * 2.2) * 0.12 * contactFactor;
    if (coreSphereRef.current) {
      coreSphereRef.current.scale.setScalar(breath * footerFade);
      const mat = coreSphereRef.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(currentColor.current);
      mat.emissive.copy(currentColor.current);
      mat.emissiveIntensity = 2.4 * breath;
      mat.opacity = footerFade * contactFactor;
    }

    if (glowSphereRef.current) {
      glowSphereRef.current.scale.setScalar((breath + 0.35) * footerFade);
      const mat = glowSphereRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(currentColor.current);
      mat.opacity = 0.18 * breath * footerFade * contactFactor;
    }

    // 3. Converge 2,500 particles from space into orb
    if (particlesRef.current) {
      const p = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const lerpSpeed = Math.min(1.0, delta * 3.5);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Interpolate between outer dispersed space and tight sphere surface
        const tx = THREE.MathUtils.lerp(originalPositions[i3], targetPositions[i3], contactFactor);
        const ty = THREE.MathUtils.lerp(originalPositions[i3 + 1], targetPositions[i3 + 1], contactFactor);
        const tz = THREE.MathUtils.lerp(originalPositions[i3 + 2], targetPositions[i3 + 2], contactFactor);

        p[i3] += (tx - p[i3]) * lerpSpeed;
        p[i3 + 1] += (ty - p[i3 + 1]) * lerpSpeed;
        p[i3 + 2] += (tz - p[i3 + 2]) * lerpSpeed;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 4. Confetti Burst Particle Physics
    if (burstData.life > 0.01) {
      burstData.life -= delta * 0.75;
      const bp = burstData.geo.attributes.position.array as Float32Array;
      for (let i = 0; i < burstCountMax; i++) {
        const i3 = i * 3;
        bp[i3] += burstData.vel[i3] * delta;
        bp[i3 + 1] += burstData.vel[i3 + 1] * delta;
        bp[i3 + 2] += burstData.vel[i3 + 2] * delta;
      }
      burstData.geo.attributes.position.needsUpdate = true;

      if (burstParticlesRef.current) {
        const mat = burstParticlesRef.current.material as THREE.PointsMaterial;
        mat.opacity = burstData.life;
      }
    }
  });

  return (
    // Positioned at Contact coordinates (y = -90, LookAt = [0, -90, 0])
    <group position={[0, -90, 0]}>
      {/* 2,500 Converging Particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Confetti Explosion Points */}
      <points ref={burstParticlesRef} geometry={burstData.geo}>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Central Breathing Energy Orb */}
      <group ref={orbGroupRef}>
        {/* Core Solid Radiant Sphere */}
        <mesh ref={coreSphereRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Ethereal Outer Corona Glow Sphere */}
        <mesh ref={glowSphereRef}>
          <sphereGeometry args={[1.9, 32, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Dynamic Gyro Rings */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[3.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
};
