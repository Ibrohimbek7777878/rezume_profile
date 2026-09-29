import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { energyCoreVertexShader, energyCoreFragmentShader } from '../../shaders/energyCoreShader';

export function EnergyCore() {
  const outerGroupRef = useRef<THREE.Group>(null);
  const outerMatRef = useRef<THREE.ShaderMaterial>(null);
  const innerMatRef = useRef<THREE.ShaderMaterial>(null);

  const targetRotation = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDisplacement: { value: 0.35 },
    uColorCyan: { value: new THREE.Color('#0284c7') },
    uColorViolet: { value: new THREE.Color('#6366f1') },
  }), []);

  const innerUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDisplacement: { value: 0.18 },
    uColorCyan: { value: new THREE.Color('#6366f1') },
    uColorViolet: { value: new THREE.Color('#0284c7') },
  }), []);

  useFrame((state, delta) => {
    if (!outerGroupRef.current) return;

    uniforms.uTime.value += delta;
    innerUniforms.uTime.value += delta * 1.5;

    // Soft mouse lean/tilt with lerp
    targetRotation.current.x = THREE.MathUtils.damp(targetRotation.current.x, state.pointer.y * 0.45, 4, delta);
    targetRotation.current.y = THREE.MathUtils.damp(targetRotation.current.y, state.pointer.x * 0.45, 4, delta);

    outerGroupRef.current.rotation.x = targetRotation.current.x;
    outerGroupRef.current.rotation.y = targetRotation.current.y;
    outerGroupRef.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={outerGroupRef} position={[0, 0.5, -9]}>
      {/* 1. Outer Breathing Energy Sphere */}
      <mesh>
        <sphereGeometry args={[3.6, 64, 64]} />
        <shaderMaterial
          ref={outerMatRef}
          vertexShader={energyCoreVertexShader}
          fragmentShader={energyCoreFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Inner Nested Luminous Core */}
      <mesh scale={[0.48, 0.48, 0.48]}>
        <sphereGeometry args={[2.8, 48, 48]} />
        <shaderMaterial
          ref={innerMatRef}
          vertexShader={energyCoreVertexShader}
          fragmentShader={energyCoreFragmentShader}
          uniforms={innerUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
