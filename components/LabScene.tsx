"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Core() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) {
      return;
    }

    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.32) * 0.24;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.38;
  });

  return (
    <mesh ref={mesh} position={[0.15, 0.05, 0]}>
      <icosahedronGeometry args={[1.08, 1]} />
      <meshStandardMaterial color="#b46a3c" roughness={0.42} metalness={0.22} wireframe />
    </mesh>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(210 * 3);

    for (let i = 0; i < 210; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 7.5;
      values[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      values[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!points.current) {
      return;
    }

    points.current.rotation.y = state.clock.elapsedTime * 0.035;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#596342" size={0.028} sizeAttenuation transparent opacity={0.64} />
    </points>
  );
}

export default function LabScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.7} />
        <directionalLight intensity={2.3} position={[2, 3, 4]} />
        <Core />
        <Particles />
      </Canvas>
    </div>
  );
}
