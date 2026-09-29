import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  liquidDistortionVertexShader,
  liquidDistortionFragmentShader,
} from '../../shaders/liquidDistortionShader';

interface ProjectPlaneProps {
  position: [number, number, number];
  colorA: string;
  colorB: string;
  colorC: string;
}

const SingleProjectPlane: React.FC<ProjectPlaneProps> = ({
  position,
  colorA,
  colorB,
  colorC,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const isHovered = useRef(false);
  const mouseCoords = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorC: { value: new THREE.Color(colorC) },
    }),
    [colorA, colorB, colorC]
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

    const targetHover = isHovered.current ? 1.0 : 0.0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.damp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      6.0,
      delta
    );

    materialRef.current.uniforms.uMouse.value.lerp(mouseCoords.current, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => {
        isHovered.current = true;
      }}
      onPointerOut={() => {
        isHovered.current = false;
      }}
      onPointerMove={(e) => {
        if (e.uv) {
          mouseCoords.current.set(e.uv.x, e.uv.y);
        }
      }}
    >
      <planeGeometry args={[6.5, 4.2, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={liquidDistortionVertexShader}
        fragmentShader={liquidDistortionFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const Projects3DPlanes: React.FC = () => {
  return (
    <group position={[-3.5, -58, -1]}>
      {/* Background ambient decorative plane with liquid ripple shader */}
      <SingleProjectPlane
        position={[0, 0, 0]}
        colorA="#070b16"
        colorB="#38bdf8"
        colorC="#8b5cf6"
      />
      <SingleProjectPlane
        position={[-7.5, 1.5, -3.5]}
        colorA="#0f172a"
        colorB="#10b981"
        colorC="#38bdf8"
      />
    </group>
  );
};
