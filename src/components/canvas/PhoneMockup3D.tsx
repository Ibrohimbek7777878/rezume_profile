import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const PhoneMockup3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const badgeRef = useRef<THREE.Group>(null);
  const screenMeshRef = useRef<THREE.Mesh>(null);

  // Generate dynamic offscreen CanvasTexture representing Bittada Usta Android app
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 1. Dark Modern Background with gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      bgGrad.addColorStop(0, '#090e1a');
      bgGrad.addColorStop(1, '#050811');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 1024);

      // Ambient radial glow behind header
      const glow = ctx.createRadialGradient(256, 120, 10, 256, 120, 260);
      glow.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 512, 380);

      // 2. Status Bar
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 22px system-ui, sans-serif';
      ctx.fillText('09:41', 40, 55);
      ctx.fillText('5G  100%', 380, 55);

      // Dynamic Island pill
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(196, 32, 120, 36, 18);
      ctx.fill();

      // 3. App Header
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 16px monospace';
      ctx.fillText('GOOGLE PLAY • OFFICIAL APP', 40, 120);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 36px system-ui, sans-serif';
      ctx.fillText('Bittada Usta', 40, 168);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '400 18px system-ui, sans-serif';
      ctx.fillText('Mebel ustalari professional platformasi', 40, 202);

      // 4. Metric Status Card (Payme / Click / Orders)
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 230, 432, 150, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 16px system-ui, sans-serif';
      ctx.fillText('OYLIK HISOBOT VA TO‘LOVLAR', 65, 270);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 34px monospace';
      ctx.fillText('48,500,000 UZS', 65, 315);

      ctx.fillStyle = '#10b981';
      ctx.font = '600 16px system-ui, sans-serif';
      ctx.fillText('↑ +28.4% online to‘lovlar (Payme / Click)', 65, 350);

      // 5. Active Master List Items
      const items = [
        { title: 'Oshxona mebellari yasash', status: 'Faol jarayonda', price: '14,200,000 UZS', color: '#38bdf8' },
        { title: 'Yotoqxona garnituri buyurtmasi', status: 'Yakunlandi', price: '9,800,000 UZS', color: '#10b981' },
        { title: 'Ofis mebellari (ERP sinxron)', status: 'Yangi so‘rov', price: '24,500,000 UZS', color: '#8b5cf6' },
      ];

      items.forEach((item, index) => {
        const y = 410 + index * 125;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(40, y, 432, 105, 16);
        ctx.fill();
        ctx.stroke();

        // Icon dot
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(70, y + 52, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 20px system-ui, sans-serif';
        ctx.fillText(item.title, 98, y + 44);

        ctx.fillStyle = item.color;
        ctx.font = '600 15px system-ui, sans-serif';
        ctx.fillText(item.status, 98, y + 74);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '700 18px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(item.price, 445, y + 60);
        ctx.textAlign = 'left';
      });

      // 6. Bottom Navigation Bar
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(40, 890, 432, 70, 35);
      ctx.fill();

      // Glowing active nav icon
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('● Usta', 120, 933);
      ctx.fillStyle = '#64748b';
      ctx.fillText('ERP', 220, 933);
      ctx.fillText('Sotuv', 310, 933);
      ctx.fillText('Profil', 400, 933);
      ctx.textAlign = 'left';

      // Home indicator bar
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(186, 990, 140, 5, 2.5);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    tex.generateMipmaps = true;
    return tex;
  }, []);

  // Procedural Rounded Extruded Phone Chassis Shape
  const phoneGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 4.0;
    const height = 8.2;
    const radius = 0.55;
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    const extrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Google Play 3D Floating Badge Mesh
  const badgeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Pill Background
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 140, 70);
      ctx.fill();
      ctx.stroke();

      // Play Store triangle icon
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.moveTo(60, 45);
      ctx.lineTo(105, 80);
      ctx.lineTo(60, 115);
      ctx.closePath();
      ctx.fill();

      // Text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 20px system-ui, sans-serif';
      ctx.fillText('CHIQARILGAN ILOVA', 130, 62);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 32px system-ui, sans-serif';
      ctx.fillText('Google Play Market', 130, 105);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!phoneRef.current) return;

    const scrollProgress = useStore.getState().scrollProgress;
    const { pointer } = state;

    // Projects section window in overall page scroll: around 0.50 to 0.72
    // Scrubbed 360-degree Y-rotation
    const normalizedProgress = THREE.MathUtils.clamp((scrollProgress - 0.48) / 0.22, 0, 1);
    const targetYRotation = normalizedProgress * Math.PI * 2 - 0.25;

    // Smooth damping
    phoneRef.current.rotation.y = THREE.MathUtils.damp(
      phoneRef.current.rotation.y,
      targetYRotation + pointer.x * 0.35,
      4.5,
      delta
    );

    // Subtle pitch tilt with cursor Y
    phoneRef.current.rotation.x = THREE.MathUtils.damp(
      phoneRef.current.rotation.x,
      -pointer.y * 0.25,
      4.5,
      delta
    );

    // Gentle floating levitation
    const time = state.clock.getElapsedTime();
    phoneRef.current.position.y = Math.sin(time * 1.8) * 0.25;

    // Responsive positioning and scaling for mobile portrait vs desktop
    if (groupRef.current) {
      const isMobile = state.viewport.aspect < 1.0;
      const targetX = isMobile ? 0 : 4.5;
      const targetZ = isMobile ? 0 : 2;
      const targetScale = isMobile ? 0.65 : 1.0;
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
      const currScale = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(THREE.MathUtils.damp(currScale, targetScale, 4, delta));
    }

    // Orbiting / hovering Google Play badge
    if (badgeRef.current) {
      const isMobile = state.viewport.aspect < 1.0;
      badgeRef.current.position.y = Math.sin(time * 2.2 + 1.0) * 0.35 + (isMobile ? 3.6 : 2.8);
      badgeRef.current.position.x = (isMobile ? 0 : 3.6) + Math.cos(time * 1.4) * 0.25;
      badgeRef.current.rotation.y = -Math.sin(time * 1.2) * 0.15;
    }
  });

  return (
    // Centered at Projects 3D section coordinates (y = -58, z = 0)
    <group ref={groupRef} position={[4.5, -58, 2]}>
      {/* 3D Phone Model */}
      <group ref={phoneRef}>
        {/* Metallic Titanium Chassis */}
        <mesh geometry={phoneGeometry} position={[0, 0, -0.2]}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.92}
            roughness={0.18}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* OLED Screen Plane with Bittada Usta UI Texture */}
        <mesh ref={screenMeshRef} position={[0, 0, 0.2]}>
          <planeGeometry args={[3.85, 7.95]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Glass Front Cover with Specular Reflections */}
        <mesh position={[0, 0, 0.22]}>
          <planeGeometry args={[3.85, 7.95]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.35}
            roughness={0.05}
            metalness={0.1}
            transmission={0.6}
            ior={1.52}
          />
        </mesh>

        {/* Camera Lens on Back */}
        <mesh position={[1.2, 3.0, -0.32]}>
          <cylinderGeometry args={[0.35, 0.35, 0.12, 32]} />
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Floating 3D Google Play Badge */}
      <group ref={badgeRef} position={[3.6, 2.8, 1.2]}>
        <mesh>
          <planeGeometry args={[3.2, 1.0]} />
          <meshBasicMaterial map={badgeTexture} transparent toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
};
