import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { PostProcessingEffects } from './PostProcessingEffects';
import { MonogramPreloader3D } from './MonogramPreloader3D';
import { HeroParticleName } from './HeroParticleName';
import { EnergyCore } from './EnergyCore';
import { DataGlobe } from './DataGlobe';
import { ExperienceTunnel } from './ExperienceTunnel';
import { SkillsOrbitSystem } from './SkillsOrbitSystem';
import { PhoneMockup3D } from './PhoneMockup3D';
import { Projects3DPlanes } from './Projects3DPlanes';
import { Education3DScene } from './Education3DScene';
import { ContactOrb3D } from './ContactOrb3D';
import { useStore } from '../../store/useStore';

export const ExperienceCanvas: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const bgColor = theme === 'dark' ? '#050811' : '#f1f5f9';

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 16],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Dynamic Background and Atmospheric Fog (Dark/Light Mode adaptive) */}
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 30, 200]} />

        {/* Executive Controlled Multi-Color Lighting */}
        <ambientLight intensity={theme === 'dark' ? 0.35 : 0.8} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} color="#e2e8f0" />
        <pointLight position={[-15, -10, -5]} intensity={1.8} color="#6366f1" />
        <pointLight position={[15, 10, -5]} intensity={2.0} color="#0284c7" />

        <Suspense fallback={null}>
          {/* 1. Camera Rig following CatmullRomCurve3 path */}
          <CameraRig />

          {/* 2. Hero Scene: Energy Core + 40,000 Particle Name */}
          <EnergyCore />
          <HeroParticleName />

          {/* 3. About Scene: 3,000 Particle Data Globe with Network Arcs and Travelling Pulses */}
          <DataGlobe />

          {/* 4. Experience Scene: 3D Depth Glass Tunnel with DOF Focus and Spark */}
          <ExperienceTunnel />

          {/* 5. Skills Scene: Multi-Inclination 3D Orbiting System with Category Filtering */}
          <SkillsOrbitSystem />

          {/* 6. Projects Scene: 3D Smartphone (Bittada Usta) & WebGL Liquid Distortion Planes */}
          <PhoneMockup3D />
          <Projects3DPlanes />

          {/* 7. Education Scene: Volumetric Light Shaft & Settling 3D Emblem */}
          <Education3DScene />

          {/* 8. Contact Scene: 2,500 Converging Particles + Breathing Reactive Energy Orb */}
          <ContactOrb3D />

          {/* 9. Initial 3D Monogram Preloader */}
          <MonogramPreloader3D />

          {/* 10. Unified PostProcessing Stack */}
          <PostProcessingEffects />
        </Suspense>
      </Canvas>
    </div>
  );
};
