import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DataGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const globePointsRef = useRef<THREE.Points>(null);
  const pulseGroupRef = useRef<THREE.Group>(null);

  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const globeRadius = 3.6;
  const pointCount = 3000;

  // 1. Fibonacci Sphere generation for 3,000 uniform surface points
  const { pointsGeometry, nodePoints } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    const cyan = new THREE.Color('#38bdf8');
    const violet = new THREE.Color('#8b5cf6');
    const nodes: THREE.Vector3[] = [];

    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio angle

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      positions[i * 3] = x * globeRadius;
      positions[i * 3 + 1] = y * globeRadius;
      positions[i * 3 + 2] = z * globeRadius;

      // Color gradient from cyan to violet
      const colorMix = (y + 1) * 0.5;
      const col = cyan.clone().lerp(violet, colorMix);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      // Store a subset of nodes as network hub targets
      if (i % 120 === 0 && nodes.length < 24) {
        nodes.push(new THREE.Vector3(x * globeRadius, y * globeRadius, z * globeRadius));
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { pointsGeometry: geo, nodePoints: nodes };
  }, []);

  // 2. Network Arcs & Elevated Bezier Curves between nodes
  const { arcs, arcCurves } = useMemo(() => {
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const arcLines: THREE.Line[] = [];

    const lineMat = new THREE.LineBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < nodePoints.length; i++) {
      const p1 = nodePoints[i];
      const p2 = nodePoints[(i + 5) % nodePoints.length];

      // Midpoint elevated away from center
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(globeRadius + distance * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      curves.push(curve);

      const pts = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      arcLines.push(new THREE.Line(lineGeo, lineMat));
    }

    return { arcs: arcLines, arcCurves: curves };
  }, [nodePoints]);

  // 3. Pulse Packets traveling along arcs
  const pulseCount = arcCurves.length;
  const pulseMeshes = useMemo(() => {
    const pulseMat = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      blending: THREE.AdditiveBlending,
    });
    const pulseGeo = new THREE.SphereGeometry(0.08, 8, 8);

    return Array.from({ length: pulseCount }).map(() => new THREE.Mesh(pulseGeo, pulseMat));
  }, [pulseCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Responsive positioning and scaling for mobile portrait vs desktop
    const isMobile = state.viewport.aspect < 1.0;
    const targetX = isMobile ? 0 : 3.8;
    const targetZ = isMobile ? -2 : 0;
    const targetScale = isMobile ? 0.72 : 1.0;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
    const currScale = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(currScale, targetScale, 4, delta));

    // Automatic slow rotation of the globe
    groupRef.current.rotation.y += delta * 0.22;

    // 3D Parallax tilt from mouse
    targetRotation.current.x = THREE.MathUtils.damp(targetRotation.current.x, state.pointer.y * 0.35, 4, delta);
    targetRotation.current.y = THREE.MathUtils.damp(targetRotation.current.y, state.pointer.x * 0.35, 4, delta);
    groupRef.current.rotation.x = targetRotation.current.x;

    // Move packet pulses along arc paths
    const time = state.clock.getElapsedTime();
    pulseMeshes.forEach((mesh, idx) => {
      const curve = arcCurves[idx];
      const t = (time * 0.45 + idx * 0.15) % 1;
      const point = curve.getPointAt(t);
      mesh.position.copy(point);
    });
  });

  return (
    <group ref={groupRef} position={[3.8, -12, 0]}>
      {/* 3000 Particle Data Globe Surface */}
      <points ref={globePointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Network Arcs */}
      {arcs.map((arc, i) => (
        <primitive key={i} object={arc} />
      ))}

      {/* Light Pulses racing along arcs */}
      <group ref={pulseGroupRef}>
        {pulseMeshes.map((mesh, i) => (
          <primitive key={i} object={mesh} />
        ))}
      </group>

      {/* Inner Glowing Atmosphere */}
      <mesh>
        <sphereGeometry args={[globeRadius * 0.96, 32, 32]} />
        <meshBasicMaterial
          color="#070b16"
          transparent
          opacity={0.88}
        />
      </mesh>
    </group>
  );
}
