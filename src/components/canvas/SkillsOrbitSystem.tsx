import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore, TechCategory } from '../../store/useStore';

interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  radius: number;
  speed: number;
  tilt: number;
  initialAngle: number;
  desc: string;
}

const TECH_LIST: TechItem[] = [
  { id: 'node', name: 'Node.js', category: 'BACKEND', radius: 4.8, speed: 0.35, tilt: 0.25, initialAngle: 0.2, desc: 'High-throughput async event-driven runtime & microservices' },
  { id: 'python', name: 'Python', category: 'BACKEND', radius: 5.6, speed: -0.28, tilt: -0.35, initialAngle: 1.5, desc: 'Clean architecture, scripting, data handling & AI logic' },
  { id: 'django', name: 'Django', category: 'BACKEND', radius: 6.4, speed: 0.22, tilt: 0.45, initialAngle: 2.8, desc: 'Robust enterprise ORM, authentication, and REST APIs' },
  { id: 'postgres', name: 'PostgreSQL', category: 'BACKEND', radius: 7.2, speed: -0.18, tilt: -0.2, initialAngle: 4.1, desc: 'ACID relational modeling, indexing & performant queries' },
  { id: 'react', name: 'React', category: 'FRONTEND', radius: 4.4, speed: -0.4, tilt: 0.55, initialAngle: 0.8, desc: 'Component lifecycle, hooks, state machines & virtual DOM' },
  { id: 'nextjs', name: 'Next.js', category: 'FRONTEND', radius: 5.4, speed: 0.32, tilt: -0.4, initialAngle: 2.2, desc: 'SSR, SSG, Edge routing, server actions & SEO mastery' },
  { id: 'javascript', name: 'JavaScript', category: 'FRONTEND', radius: 6.2, speed: -0.26, tilt: 0.15, initialAngle: 3.5, desc: 'Modern ES6+, closures, event loop & DOM optimization' },
  { id: 'htmlcss', name: 'HTML5 & CSS3', category: 'FRONTEND', radius: 7.0, speed: 0.2, tilt: -0.3, initialAngle: 5.0, desc: 'Semantic layouts, Flexbox/Grid, canvas & responsive design' },
  { id: 'android', name: 'Android (Play Store)', category: 'MOBILE', radius: 5.0, speed: -0.34, tilt: 0.65, initialAngle: 1.1, desc: 'Native app release, Google Play deployment & mobile UX' },
  { id: 'telegram', name: 'Telegram Bot API', category: 'OTHER', radius: 5.8, speed: 0.28, tilt: -0.55, initialAngle: 2.6, desc: 'Webhook bots, inline keyboards & automated payment flows' },
  { id: 'git', name: 'Git / GitHub', category: 'OTHER', radius: 6.6, speed: -0.21, tilt: 0.38, initialAngle: 4.4, desc: 'Branching models, CI/CD pipelines & code collaboration' },
];

function OrbitingChip({ item }: { item: TechItem }) {
  const meshRef = useRef<THREE.Group>(null);
  const angleRef = useRef(item.initialAngle);
  const currentRadius = useRef(item.radius);
  const repulsionOffset = useRef(new THREE.Vector3(0, 0, 0));

  const activeCategory = useStore((state) => state.activeCategory);
  const selectedChip = useStore((state) => state.selectedChip);
  const setSelectedChip = useStore((state) => state.setSelectedChip);

  const isMatched = activeCategory === 'ALL' || activeCategory === item.category;
  const isSelected = selectedChip === item.id;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Orbital velocity update
    angleRef.current += item.speed * delta;

    // 2. Category Filter Radius adjustment
    const targetR = isMatched ? item.radius * 0.9 : item.radius * 1.5;
    currentRadius.current = THREE.MathUtils.damp(currentRadius.current, targetR, 4, delta);

    // Compute base orbital coordinates
    const r = currentRadius.current;
    const x = Math.cos(angleRef.current) * r;
    const z = Math.sin(angleRef.current) * r;
    const y = Math.sin(angleRef.current * 2) * item.tilt * 2.5;

    // 3. Mouse proximity repulsion
    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);

    const mouse3D = new THREE.Vector3(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2 - 42,
      0
    );

    const dist = worldPos.distanceTo(mouse3D);
    if (dist < 3.2) {
      const pushDir = worldPos.clone().sub(mouse3D).normalize();
      repulsionOffset.current.lerp(pushDir.multiplyScalar(2.0), 0.12);
    } else {
      repulsionOffset.current.lerp(new THREE.Vector3(0, 0, 0), 0.08); // Spring back
    }

    meshRef.current.position.set(
      x + repulsionOffset.current.x,
      y + repulsionOffset.current.y,
      z + repulsionOffset.current.z
    );

    // Always face camera
    meshRef.current.lookAt(state.camera.position);
  });

  return (
    <group ref={meshRef}>
      {/* 3D Glass Pill Mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          setSelectedChip(isSelected ? null : item.id);
        }}
        scale={isSelected ? [1.4, 1.4, 1.4] : [1, 1, 1]}
      >
        <boxGeometry args={[2.2, 0.85, 0.15]} />
        <meshPhysicalMaterial
          color={isSelected ? '#38bdf8' : isMatched ? '#1e293b' : '#070b16'}
          emissive={isSelected ? '#38bdf8' : isMatched ? '#0ea5e9' : '#000000'}
          emissiveIntensity={isSelected ? 1.5 : isMatched ? 0.4 : 0.0}
          roughness={0.2}
          transmission={0.8}
          thickness={0.8}
          transparent
          opacity={isMatched ? 0.9 : 0.18}
        />
      </mesh>

      {/* Label and expandable description on click */}
      <Html
        transform
        distanceFactor={8}
        position={[0, 0, 0.12]}
        className="pointer-events-auto select-none"
      >
        <div
          onClick={() => setSelectedChip(isSelected ? null : item.id)}
          className={`cursor-pointer px-3 py-1.5 rounded-lg border text-center transition-all duration-300 ${
            isSelected
              ? 'bg-cyan-500 text-navy-950 border-white shadow-[0_0_25px_#38bdf8]'
              : isMatched
              ? 'bg-navy-950/70 border-cyan-400/40 text-cyan-300 hover:border-cyan-400'
              : 'bg-navy-950/20 border-slate-700/20 text-slate-500'
          }`}
        >
          <span className="font-mono font-bold text-xs whitespace-nowrap block">
            {item.name}
          </span>
          {isSelected && (
            <span className="block text-[9px] font-sans mt-1 text-slate-900 font-semibold max-w-[180px] leading-tight">
              {item.desc}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

export function SkillsOrbitSystem() {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (groupRef.current) {
      const isMobile = state.viewport.aspect < 1.0;
      const targetScale = isMobile ? 0.62 : 1.0;
      groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));
    }
  });

  return (
    <group ref={groupRef} position={[0, -42, 0]}>
      {/* Central Pulsing Energy Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#8b5cf6"
          emissiveIntensity={2.5}
          roughness={0.2}
          metalness={0.8}
        />
        <pointLight color="#38bdf8" intensity={8} distance={16} />
      </mesh>

      {/* Orbit Rings Guide Lines */}
      {[4.8, 5.8, 6.8].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2 + i * 0.2, 0, 0]}>
          <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
          <meshBasicMaterial
            color="#334155"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* 3D Orbiting Chips */}
      {TECH_LIST.map((item) => (
        <OrbitingChip key={item.id} item={item} />
      ))}
    </group>
  );
}
