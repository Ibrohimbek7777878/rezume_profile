import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function MonogramPreloader3D() {
  const groupRef = useRef<THREE.Group>(null);
  const emblemRef = useRef<THREE.Group>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const shockwaveMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const preloaderPhase = useStore((state) => state.preloaderPhase);

  // 1. High-Resolution Executive Brand Monogram Canvas Texture (1024x1024)
  const brandTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Obsidian Dark Titanium Background
      const bgGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 512);
      bgGrad.addColorStop(0, '#0d1527');
      bgGrad.addColorStop(0.7, '#070b16');
      bgGrad.addColorStop(1, '#03050a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Outer Luxury Squircle Hairline Border
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(80, 80, 864, 864, 160);
      ctx.stroke();

      // Inner Subtle Glow Frame
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(110, 110, 804, 804, 140);
      ctx.stroke();

      // Ambient Central Blue Glow
      const centerGlow = ctx.createRadialGradient(512, 512, 10, 512, 512, 380);
      centerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
      centerGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, 1024, 1024);

      // Micro Top Brand Tagline
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 24px monospace';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '8px';
      ctx.fillText('PORTFOLIO & ARCHITECTURE', 512, 210);

      // Large Clean Brand Letters "IS"
      const textGrad = ctx.createLinearGradient(300, 300, 700, 700);
      textGrad.addColorStop(0, '#ffffff');
      textGrad.addColorStop(0.5, '#e2e8f0');
      textGrad.addColorStop(1, '#38bdf8');
      ctx.fillStyle = textGrad;

      ctx.font = '900 420px "Manrope", "Inter", -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '-10px';
      ctx.fillText('IS', 512, 512);

      // Micro Bottom Executive Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 28px "Manrope", system-ui, sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('IBROHIM SULTONOV', 512, 790);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 20px monospace';
      ctx.letterSpacing = '4px';
      ctx.fillText('FULL STACK DEVELOPER • 2026', 512, 835);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    tex.generateMipmaps = true;
    return tex;
  }, []);

  // 2. 3D Rounded Plaque Shape
  const plaqueGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 5.2;
    const r = 0.9;
    const x = -size / 2;
    const y = -size / 2;

    shape.moveTo(x + r, y);
    shape.lineTo(x + size - r, y);
    shape.quadraticCurveTo(x + size, y, x + size, y + r);
    shape.lineTo(x + size, y + size - r);
    shape.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
    shape.lineTo(x + r, y + size);
    shape.quadraticCurveTo(x, y + size, x, y + size - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.08,
      bevelSegments: 4,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // 3. 2,000 Subtle Vortex Particles
  const particleCount = 2000;
  const { particleGeometry, particleInitialData } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialData: { radius: number; angle: number; speed: number; y: number }[] = [];

    const cyan = new THREE.Color('#38bdf8');
    const violet = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 16;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      const y = (Math.random() - 0.5) * 8;

      initialData.push({ radius, angle, speed, y });

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const mixVal = Math.random();
      const col = cyan.clone().lerp(violet, mixVal);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { particleGeometry: geo, particleInitialData: initialData };
  }, []);

  useFrame((state, delta) => {
    if (!emblemRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle, prestigious slow rotation
    emblemRef.current.rotation.y = Math.sin(time * 0.6) * 0.22;
    emblemRef.current.rotation.x = Math.sin(time * 0.4) * 0.12;
    emblemRef.current.position.y = Math.sin(time * 1.5) * 0.15;

    // Spiral particles gently drawn inward
    const pos = particleGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const data = particleInitialData[i];
      data.angle += delta * data.speed * 0.6;
      data.radius -= delta * 1.5;

      if (data.radius < 2.2) {
        data.radius = 16 + Math.random() * 6;
      }

      pos[i * 3] = Math.cos(data.angle) * data.radius;
      pos[i * 3 + 1] = data.y + Math.sin(data.angle * 2) * 0.3;
      pos[i * 3 + 2] = Math.sin(data.angle) * data.radius;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Implosion & Shockwave transition
    if (preloaderPhase === 'imploding' && emblemRef.current) {
      emblemRef.current.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 1 - Math.exp(-12 * delta));
    }

    if (preloaderPhase === 'exploding' && shockwaveRef.current && shockwaveMatRef.current) {
      shockwaveRef.current.visible = true;
      const currentScale = shockwaveRef.current.scale.x;
      const targetScale = currentScale + delta * 85;
      shockwaveRef.current.scale.set(targetScale, targetScale, targetScale);
      shockwaveMatRef.current.opacity = Math.max(0, 1 - targetScale / 60);

      if (targetScale > 60) {
        useStore.getState().setPreloaderPhase('finished');
      }
    }
  });

  if (preloaderPhase === 'finished') return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Luxury Executive Brand Plaque */}
      <group ref={emblemRef} position={[0, 0, 0]}>
        {/* Metallic Base Plaque */}
        <mesh geometry={plaqueGeometry} position={[0, 0, -0.2]}>
          <meshStandardMaterial
            color="#080e1d"
            metalness={0.92}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Front Brand Texture Face */}
        <mesh position={[0, 0, 0.18]}>
          <planeGeometry args={[5.0, 5.0]} />
          <meshBasicMaterial map={brandTexture} toneMapped={false} />
        </mesh>

        {/* Specular Front Glass Sheen */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[5.0, 5.0]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.28}
            roughness={0.06}
            metalness={0.15}
            transmission={0.65}
            ior={1.52}
          />
        </mesh>
      </group>

      {/* Inward Swirling 2,000 Subtle Particles */}
      <points geometry={particleGeometry}>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Shockwave Explosion Ring */}
      <mesh ref={shockwaveRef} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 1.2, 64]} />
        <meshBasicMaterial
          ref={shockwaveMatRef}
          color="#38bdf8"
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
