import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const Education3DScene: React.FC = () => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const lightShaftRef = useRef<THREE.Mesh>(null);
  const emblemGroupRef = useRef<THREE.Group>(null);
  const innerCrystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Soft atmospheric particles floating within the light shaft
  const { particleGeo, particleCount } = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { particleGeo: geo, particleCount: count };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const scrollProgress = useStore.getState().scrollProgress;

    // Responsive positioning and scale for mobile portrait
    if (rootGroupRef.current) {
      const isMobile = state.viewport.aspect < 1.0;
      const targetX = isMobile ? 0 : 2.5;
      const targetScale = isMobile ? 0.7 : 1.0;
      rootGroupRef.current.position.x = THREE.MathUtils.damp(rootGroupRef.current.position.x, targetX, 4, delta);
      const currScale = rootGroupRef.current.scale.x;
      rootGroupRef.current.scale.setScalar(THREE.MathUtils.damp(currScale, targetScale, 4, delta));
    }

    // 1. Slow, organic drifting of volumetric light shaft
    if (lightShaftRef.current) {
      lightShaftRef.current.position.x = Math.sin(time * 0.6) * 0.75 + 1.5;
      lightShaftRef.current.rotation.z = Math.sin(time * 0.4) * 0.08 - 0.15;
    }

    // 2. Education 3D Icon settling to a stop:
    // When scroll approaches education section (around 0.72 - 0.88):
    if (emblemGroupRef.current) {
      const eduProgress = THREE.MathUtils.clamp((scrollProgress - 0.70) / 0.15, 0, 1);
      // High spin speed before entering, settling down smoothly into stationary orientation as eduProgress reaches 1
      const spinSpeed = Math.max(0, 1 - eduProgress * 1.2);
      const targetRotationY = eduProgress * Math.PI * 4 + 0.45;

      emblemGroupRef.current.rotation.y = THREE.MathUtils.damp(
        emblemGroupRef.current.rotation.y,
        targetRotationY + (spinSpeed > 0 ? time * 2.5 * spinSpeed : 0),
        5.0,
        delta
      );

      // Subtle breathing float
      emblemGroupRef.current.position.y = Math.sin(time * 1.6) * 0.18;
    }

    if (innerCrystalRef.current) {
      innerCrystalRef.current.rotation.x = time * 0.8;
      innerCrystalRef.current.rotation.z = time * 0.6;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 1.2) * 0.1;
      ringRef.current.rotation.y = -time * 0.9;
    }

    // 3. Gentle upward draft of dust motes in light
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += delta * 0.4;
        if (pos[i * 3 + 1] > 7) {
          pos[i * 3 + 1] = -7;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    // Positioned at Education section coordinates (y = -74, lookAt = [0, -74, 0])
    <group ref={rootGroupRef} position={[2.5, -74, 0]}>
      {/* Volumetric Soft Light Shaft (Diagonal glowing cylinder) */}
      <mesh
        ref={lightShaftRef}
        position={[1.5, 2.5, -2]}
        rotation={[0.2, 0, -0.15]}
      >
        <cylinderGeometry args={[1.2, 5.5, 18, 32, 1, true]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.065}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating Photons / Dust motes */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.09}
          color="#e6edf7"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3D Rotating Emblem Icon that settles to a stop */}
      <group ref={emblemGroupRef} position={[0, 0, 1.5]}>
        {/* Outer Faceted Diamond / Octahedron Frame */}
        <mesh>
          <octahedronGeometry args={[1.8, 0]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            metalness={0.2}
            roughness={0.1}
            transmission={0.85}
            ior={1.6}
            transparent
            opacity={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Cage */}
        <mesh>
          <octahedronGeometry args={[1.82, 0]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Inner Glowing Crystal Core */}
        <mesh ref={innerCrystalRef}>
          <dodecahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={2.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Surrounding Orbital Gyro Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.5, 0.04, 16, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
};
