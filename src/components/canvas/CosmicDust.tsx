"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.123) * 43758.5453;
  return x - Math.floor(x);
}

export default function CosmicDust() {
  const pointsRef1 = useRef<THREE.Points>(null);
  const pointsRef2 = useRef<THREE.Points>(null);

  // Foreground ambient glowing dust motes
  const { positions1, colors1 } = useMemo(() => {
    const count = 360;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color("#38bdf8"); // Cyan
    const colorB = new THREE.Color("#a855f7"); // Purple
    const colorC = new THREE.Color("#e0f2fe"); // Pale ice blue

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2 + seededRandom(i * 3) * 12;
      const theta = seededRandom(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(seededRandom(i * 3 + 2) * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = (seededRandom(i * 3 + 3) - 0.5) * 10 + 0.5;
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Color distribution
      const mixed =
        seededRandom(i * 7) > 0.6
          ? colorA
          : seededRandom(i * 7) > 0.3
            ? colorB
            : colorC;
      col[i3] = mixed.r;
      col[i3 + 1] = mixed.g;
      col[i3 + 2] = mixed.b;
    }

    return { positions1: pos, colors1: col };
  }, []);

  // Background deeper starfield
  const positions2 = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (seededRandom(i + 100) - 0.5) * 32;
      pos[i3 + 1] = (seededRandom(i + 200) - 0.5) * 24;
      pos[i3 + 2] = -5 - seededRandom(i + 300) * 22;
    }

    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef1.current) {
      pointsRef1.current.rotation.y += delta * 0.02;
      pointsRef1.current.rotation.x += delta * 0.008;
    }
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y -= delta * 0.006;
    }
  });

  return (
    <group>
      {/* Foreground nebula dust */}
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions1, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors1, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Deep starfield */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions2, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#94a3b8"
          size={0.022}
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
