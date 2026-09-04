"use client";

import { ContactShadows, Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CosmicDust from "./CosmicDust";
import CyberneticCore from "./CyberneticCore";

gsap.registerPlugin(ScrollTrigger);

type CanvasSceneProps = {
  introReady: boolean;
  soundEnabled?: boolean;
};

function SceneRig({ introReady, soundEnabled = false }: CanvasSceneProps) {
  const { camera } = useThree();

  // Reference for the cybernetic core group
  const coreGroupRef = useRef<THREE.Group>(null);

  // Dynamic state for shader & ring animation
  const [explodeFactor, setExplodeFactor] = useState(0);
  const [noiseDisplacement, setNoiseDisplacement] = useState(1.0);

  // Targets for smooth lerping
  const targetCamPos = useRef(new THREE.Vector3(0, 0.4, 8.5));
  const targetCamLook = useRef(new THREE.Vector3(0, 0, 0));
  const targetCorePos = useRef(new THREE.Vector3(1.2, 0.1, 0));
  const targetCoreScale = useRef(1.0);

  // Inertia mouse tracking
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      // Normalized coordinates (-1 to 1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  // Intro entrance animation
  useEffect(() => {
    if (!introReady) {
      targetCamPos.current.set(0, 0.4, 9.5);
      return;
    }

    gsap.to(targetCamPos.current, {
      x: 0,
      y: 0.35,
      z: 6.2,
      duration: 2.2,
      ease: "power3.out",
    });
  }, [introReady]);

  // Section-driven ScrollTrigger choreography
  useEffect(() => {
    if (!introReady) {
      return;
    }

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Hero -> About
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Explode rings outwards as we scroll into About
          setExplodeFactor(progress * 0.9);
          setNoiseDisplacement(1.0 + progress * 0.4);

          // Shift core towards right / focal point
          const heroX = isMobile ? 0 : 1.2;
          const aboutX = isMobile ? 0 : 1.7;
          targetCorePos.current.x = THREE.MathUtils.lerp(heroX, aboutX, progress);
          targetCorePos.current.y = THREE.MathUtils.lerp(0.1, -0.15, progress);
          targetCoreScale.current = THREE.MathUtils.lerp(1.0, 1.15, progress);

          targetCamPos.current.z = THREE.MathUtils.lerp(6.2, 5.8, progress);
        },
      });

      // 2. About -> Projects
      ScrollTrigger.create({
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Core retreats to the background horizon behind project cards
          const aboutX = isMobile ? 0 : 1.7;
          targetCorePos.current.x = THREE.MathUtils.lerp(aboutX, 0, progress);
          targetCorePos.current.y = THREE.MathUtils.lerp(-0.15, 1.3, progress);
          targetCorePos.current.z = THREE.MathUtils.lerp(0, -2.4, progress);
          targetCoreScale.current = THREE.MathUtils.lerp(1.15, 0.9, progress);

          setExplodeFactor(THREE.MathUtils.lerp(0.9, 0.3, progress));
          setNoiseDisplacement(THREE.MathUtils.lerp(1.4, 0.8, progress));
          targetCamPos.current.z = THREE.MathUtils.lerp(5.8, 6.6, progress);
        },
      });

      // 3. Projects -> Skills
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Core rises to the left side
          const skillsX = isMobile ? 0 : -1.6;
          targetCorePos.current.x = THREE.MathUtils.lerp(0, skillsX, progress);
          targetCorePos.current.y = THREE.MathUtils.lerp(1.3, 0.35, progress);
          targetCorePos.current.z = THREE.MathUtils.lerp(-2.4, 0, progress);
          targetCoreScale.current = THREE.MathUtils.lerp(0.9, 1.05, progress);

          setExplodeFactor(THREE.MathUtils.lerp(0.3, 0.7, progress));
          setNoiseDisplacement(THREE.MathUtils.lerp(0.8, 1.2, progress));
          targetCamPos.current.z = THREE.MathUtils.lerp(6.6, 5.5, progress);
        },
      });

      // 4. Skills -> Resume
      ScrollTrigger.create({
        trigger: "#skills",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Core shifts from left to right-rear, illuminating the resume card
          const skillsX = isMobile ? 0 : -1.6;
          const resumeX = isMobile ? 0 : 1.4;
          targetCorePos.current.x = THREE.MathUtils.lerp(skillsX, resumeX, progress);
          targetCorePos.current.y = THREE.MathUtils.lerp(0.35, 0.1, progress);
          targetCorePos.current.z = THREE.MathUtils.lerp(0, -1.2, progress);
          targetCoreScale.current = THREE.MathUtils.lerp(1.05, 1.1, progress);

          setExplodeFactor(THREE.MathUtils.lerp(0.7, 0.4, progress));
          setNoiseDisplacement(THREE.MathUtils.lerp(1.2, 1.0, progress));
          targetCamPos.current.z = THREE.MathUtils.lerp(5.5, 5.9, progress);
        },
      });

      // 5. Resume -> Contact
      ScrollTrigger.create({
        trigger: "#resume",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Core glides to center-bottom as a glowing reactor
          const resumeX = isMobile ? 0 : 1.4;
          targetCorePos.current.x = THREE.MathUtils.lerp(resumeX, 0, progress);
          targetCorePos.current.y = THREE.MathUtils.lerp(0.1, -0.7, progress);
          targetCorePos.current.z = THREE.MathUtils.lerp(-1.2, 0.5, progress);
          targetCoreScale.current = THREE.MathUtils.lerp(1.1, 1.25, progress);

          setExplodeFactor(THREE.MathUtils.lerp(0.4, 0.15, progress));
          setNoiseDisplacement(THREE.MathUtils.lerp(1.0, 1.5, progress));
          targetCamPos.current.z = THREE.MathUtils.lerp(5.9, 4.8, progress);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [introReady]);

  useFrame((_, delta) => {
    // Smooth damping / inertia for mouse movement
    const mouseLerpFactor = 1 - Math.exp(-delta * 4.5);
    currentMouse.current.lerp(mouseRef.current, mouseLerpFactor);

    // Smooth camera trajectory interpolation
    const camLerpFactor = 1 - Math.exp(-delta * 3.8);
    camera.position.lerp(targetCamPos.current, camLerpFactor);

    // Parallax mouse tilt applied to camera lookAt
    const lookX = currentMouse.current.x * 0.45;
    const lookY = currentMouse.current.y * 0.35;
    targetCamLook.current.set(lookX, lookY, 0);
    camera.lookAt(targetCamLook.current);

    // Smooth core position and scale interpolation
    if (coreGroupRef.current) {
      coreGroupRef.current.position.lerp(targetCorePos.current, camLerpFactor);
      const currentScale = coreGroupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(
        currentScale,
        targetCoreScale.current,
        camLerpFactor,
      );
      coreGroupRef.current.scale.set(nextScale, nextScale, nextScale);

      // Subtle mouse tilt reaction on the core itself
      coreGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        coreGroupRef.current.rotation.y,
        currentMouse.current.x * 0.4,
        mouseLerpFactor,
      );
      coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        coreGroupRef.current.rotation.x,
        -currentMouse.current.y * 0.3,
        mouseLerpFactor,
      );
    }
  });

  return (
    <>
      {/* Lighting Architecture */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.5}
        color="#7dd3fc"
        castShadow
      />
      <pointLight
        position={[-3, 2, 2]}
        intensity={soundEnabled ? 2.5 : 1.6}
        color="#38bdf8"
        distance={9}
      />
      <pointLight
        position={[3.2, -1, -1.5]}
        intensity={1.4}
        color="#c084fc"
        distance={8}
      />

      {/* Floating 3D Core with Gyroscopic Orbitals */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={coreGroupRef}>
          <CyberneticCore
            explodeFactor={explodeFactor}
            noiseDisplacement={noiseDisplacement}
            rotationSpeed={soundEnabled ? 1.4 : 1.0}
            soundReactive={soundEnabled}
          />
        </group>
      </Float>

      {/* Volumetric Nebula and Deep Cosmic Dust */}
      <CosmicDust />

      {/* Soft Contact Shadows */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.4}
        blur={2.5}
        scale={14}
        far={4.5}
      />
    </>
  );
}

export default function CanvasScene({
  introReady,
  soundEnabled = false,
}: CanvasSceneProps) {
  return (
    <Canvas
      dpr={[1, typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1.5]}
      camera={{ position: [0, 0.4, 8.5], fov: 42 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      shadows
    >
      <color attach="background" args={["#020409"]} />
      <fog attach="fog" args={["#020409", 8, 20]} />
      <Suspense fallback={null}>
        <SceneRig introReady={introReady} soundEnabled={soundEnabled} />
      </Suspense>
    </Canvas>
  );
}
