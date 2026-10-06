import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export function CameraRig() {
  // 7 Control points for 7 sections: Hero, About, Experience, Skills, Projects, Education, Contact
  const { positionCurve, targetCurve } = useMemo(() => {
    const positionPoints = [
      new THREE.Vector3(0, 0, 16),      // 1. Hero
      new THREE.Vector3(5, -12, 14),    // 2. About
      new THREE.Vector3(-8, -26, 18),   // 3. Experience
      new THREE.Vector3(10, -42, 13),   // 4. Skills
      new THREE.Vector3(0, -58, 20),    // 5. Projects
      new THREE.Vector3(-6, -74, 15),   // 6. Education
      new THREE.Vector3(0, -90, 11),    // 7. Contact
    ];

    const targetPoints = [
      new THREE.Vector3(0, 0, 0),       // 1. Hero LookAt
      new THREE.Vector3(0, -12, 0),     // 2. About LookAt
      new THREE.Vector3(0, -26, 0),     // 3. Experience LookAt
      new THREE.Vector3(0, -42, 0),     // 4. Skills LookAt
      new THREE.Vector3(0, -58, 0),     // 5. Projects LookAt
      new THREE.Vector3(0, -74, 0),     // 6. Education LookAt
      new THREE.Vector3(0, -90, 0),     // 7. Contact LookAt
    ];

    return {
      positionCurve: new THREE.CatmullRomCurve3(positionPoints, false, 'centripetal'),
      targetCurve: new THREE.CatmullRomCurve3(targetPoints, false, 'centripetal'),
    };
  }, []);

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const tempPos = useRef(new THREE.Vector3());
  const tempTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const progress = useStore.getState().scrollProgress;
    const clampedProgress = THREE.MathUtils.clamp(progress, 0, 1);

    // 1. Sample desired camera position along CatmullRomCurve3
    positionCurve.getPointAt(clampedProgress, tempPos.current);

    // Adapt position for mobile viewport aspect ratio
    const aspect = state.viewport.aspect;
    if (aspect < 1.0) {
      // Narrow portrait screen: pull camera closer to center and adjust distance
      tempPos.current.x *= Math.max(0.3, aspect * 0.8);
      tempPos.current.z *= Math.min(1.35, 1.0 + (1.0 - aspect) * 0.3);
    }

    // 2. Smoothly damp camera position with frame-rate independent lerp
    const lerpFactor = 1 - Math.exp(-5.5 * delta);
    state.camera.position.lerp(tempPos.current, lerpFactor);

    // 3. Sample desired lookAt target point along Target Curve
    targetCurve.getPointAt(clampedProgress, tempTarget.current);
    currentLookAt.current.lerp(tempTarget.current, lerpFactor);

    // 4. Orient camera towards interpolated lookAt target
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}
