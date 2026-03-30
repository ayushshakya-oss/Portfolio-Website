"use client";

import { ContactShadows, Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type CanvasSceneProps = {
  introReady: boolean;
};

const CAMERA_POINTS = [
  { x: 0, y: 1.35, z: 7.1 },
  { x: 1.25, y: 1.28, z: 6.2 },
  { x: -1.35, y: 1.2, z: 5.2 },
  { x: 0.8, y: 1.05, z: 4.2 },
  { x: 0, y: 1.1, z: 3.55 },
];

function seededValue(seed: number) {
  const sine = Math.sin(seed * 12.9898) * 43758.5453;
  return sine - Math.floor(sine);
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 220;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const stride = index * 3;
      const xRand = seededValue(index + 1);
      const yRand = seededValue(index + 101);
      const zRand = seededValue(index + 201);

      data[stride] = (xRand - 0.5) * 16;
      data[stride + 1] = yRand * 6 - 0.5;
      data[stride + 2] = (zRand - 0.5) * 16;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef} position={[0, 0.4, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#61d7ff"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

function Workstation() {
  const groupRef = useRef<THREE.Group>(null);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    groupRef.current.position.y = -0.68 + Math.sin(elapsed * 1.2) * 0.04;
    groupRef.current.rotation.y = state.mouse.x * 0.18;

    if (screenMaterialRef.current) {
      screenMaterialRef.current.emissiveIntensity =
        0.45 + Math.sin(elapsed * 9) * 0.05 + Math.sin(elapsed * 23) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.2, 2.2]} />
        <meshStandardMaterial
          color="#12182a"
          roughness={0.63}
          metalness={0.3}
        />
      </mesh>

      {[
        [-1.9, -0.9, 0.95],
        [1.9, -0.9, 0.95],
        [-1.9, -0.9, -0.95],
        [1.9, -0.9, -0.95],
      ].map((position, index) => (
        <mesh
          key={`desk-leg-${index}`}
          position={position as [number, number, number]}
          castShadow
        >
          <boxGeometry args={[0.12, 1.7, 0.12]} />
          <meshStandardMaterial color="#0a0f1e" roughness={0.5} />
        </mesh>
      ))}

      <mesh position={[0, 0.52, -0.48]} castShadow>
        <boxGeometry args={[1.85, 1.05, 0.1]} />
        <meshStandardMaterial
          color="#111528"
          roughness={0.35}
          metalness={0.35}
        />
      </mesh>

      <mesh position={[0, 0.56, -0.42]}>
        <planeGeometry args={[1.55, 0.82]} />
        <meshStandardMaterial
          ref={screenMaterialRef}
          color="#08111d"
          emissive="#1e4d68"
          emissiveIntensity={0.48}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 0.08, 0.2]} castShadow>
        <boxGeometry args={[1.25, 0.07, 0.45]} />
        <meshStandardMaterial color="#1b2138" roughness={0.45} />
      </mesh>

      <mesh position={[0, 0.16, -0.52]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.52, 18]} />
        <meshStandardMaterial
          color="#0e1426"
          metalness={0.55}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, -0.63, 0.65]} castShadow>
        <boxGeometry args={[0.95, 0.22, 0.95]} />
        <meshStandardMaterial
          color="#1e2d45"
          roughness={0.45}
          metalness={0.22}
        />
      </mesh>
      <mesh position={[0, -0.26, 0.32]} castShadow>
        <boxGeometry args={[0.88, 0.8, 0.22]} />
        <meshStandardMaterial color="#22314a" roughness={0.4} metalness={0.2} />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.14} floatIntensity={0.18}>
        <mesh position={[-1.32, 0.82, -0.25]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#7f58ff"
            emissive="#7f58ff"
            emissiveIntensity={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SceneRig({ introReady }: CanvasSceneProps) {
  const { camera } = useThree();
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const cameraTarget = useRef(new THREE.Vector3(0, 1.35, 9.6));

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX / window.innerWidth - 0.5;
      mouseRef.current.y = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    if (!introReady) {
      cameraTarget.current.set(0, 1.35, 9.6);
      return;
    }

    gsap.to(cameraTarget.current, {
      ...CAMERA_POINTS[0],
      duration: 1.8,
      ease: "power3.out",
    });
  }, [introReady]);

  useEffect(() => {
    if (!introReady) {
      return;
    }

    const moveTo = (index: number) => {
      const point = CAMERA_POINTS[index] ?? CAMERA_POINTS[0];
      gsap.to(cameraTarget.current, {
        ...point,
        duration: 1.15,
        ease: "power2.out",
      });
    };

    const sectionIds = ["hero", "about", "projects", "skills", "contact"];
    const triggers = sectionIds.map((id, index) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => moveTo(index),
        onEnterBack: () => moveTo(index),
      }),
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [introReady]);

  useFrame((_, delta) => {
    const blend = 1 - Math.exp(-delta * 3.4);
    camera.position.lerp(cameraTarget.current, blend);

    const lookX = mouseRef.current.x * 0.58;
    const lookY = 1 + mouseRef.current.y * 0.28;
    camera.lookAt(lookX, lookY, 0);
  });

  return (
    <>
      <ambientLight intensity={0.27} />
      <directionalLight
        position={[3, 6, 2]}
        intensity={1}
        color="#76dbff"
        castShadow
      />
      <pointLight
        position={[-2.5, 1.6, 1.6]}
        intensity={1.2}
        color="#58d8ff"
        distance={8}
      />
      <pointLight
        position={[2.8, 0.9, -1.7]}
        intensity={1.1}
        color="#7f58ff"
        distance={7}
      />

      <Workstation />
      <ParticleField />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.35}
        blur={2.2}
        scale={12}
        far={3.2}
      />
    </>
  );
}

export default function CanvasScene({ introReady }: CanvasSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.35, 10], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      shadows
    >
      <color attach="background" args={["#03050a"]} />
      <fog attach="fog" args={["#03050a", 7.5, 16]} />
      <Suspense fallback={null}>
        <SceneRig introReady={introReady} />
      </Suspense>
    </Canvas>
  );
}
