import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface HolographicPanelProps {
  position: [number, number, number];
  color: string;
}

function HolographicGlassPanel({ position, color }: HolographicPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);
    const dist = state.camera.position.distanceTo(worldPos);

    // Dynamic Depth-of-Field glow effect
    const focusSharpness = Math.max(0.15, 1 - Math.abs(dist - 14) / 16);
    if (glowRef.current) {
      (glowRef.current.material as THREE.LineBasicMaterial).opacity = 0.2 + focusSharpness * 0.7;
    }
  });

  return (
    <group position={position}>
      {/* 3D Glass Hologram Panel */}
      <mesh ref={meshRef}>
        <boxGeometry args={[8.5, 5.4, 0.2]} />
        <meshPhysicalMaterial
          color="#070b16"
          roughness={0.1}
          metalness={0.2}
          transmission={0.92}
          thickness={1.5}
          ior={1.45}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Luminous Neon Edge Frame */}
      <lineSegments ref={glowRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(8.5, 5.4, 0.2)]} />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Futuristic Corner Beacon Anchors */}
      {[
        [-4.2, 2.6, 0.12],
        [4.2, 2.6, 0.12],
        [-4.2, -2.6, 0.12],
        [4.2, -2.6, 0.12],
      ].map((pt, i) => (
        <mesh key={i} position={pt as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

export function ExperienceTunnel() {
  const groupRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Mesh>(null);

  const tunnelLine = useMemo(() => {
    const pts = [
      new THREE.Vector3(-6.5, 4, 10),
      new THREE.Vector3(-6.5, -1, 0),
      new THREE.Vector3(-6.5, -6, -10),
      new THREE.Vector3(-6.5, -12, -22),
    ];
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame((state, delta) => {
    const progress = useStore.getState().scrollProgress;
    // Map experience section progress (around 0.22 to 0.46)
    const expProgress = THREE.MathUtils.clamp((progress - 0.22) / 0.24, 0, 1);

    if (sparkRef.current && tunnelLine) {
      const pt = tunnelLine.getPointAt(expProgress);
      sparkRef.current.position.copy(pt);
    }

    if (groupRef.current) {
      const isMobile = state.viewport.aspect < 1.0;
      const targetScale = isMobile ? 0.65 : 1.0;
      groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));
    }
  });

  return (
    <group ref={groupRef} position={[0, -26, 0]}>
      {/* 3D Holographic Frames at Depth Stations */}
      <HolographicGlassPanel position={[-2.2, 1.2, 4]} color="#38bdf8" />
      <HolographicGlassPanel position={[2.6, -1.8, -6]} color="#8b5cf6" />
      <HolographicGlassPanel position={[-2.0, -4.5, -16]} color="#10b981" />

      {/* Vertical Luminous Energy Line */}
      <primitive
        object={
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(tunnelLine.getPoints(50)),
            new THREE.LineBasicMaterial({
              color: '#38bdf8',
              transparent: true,
              opacity: 0.45,
            })
          )
        }
      />

      {/* Luminous Leading Spark */}
      <mesh ref={sparkRef}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#38bdf8" intensity={6} distance={8} />
      </mesh>
    </group>
  );
}
