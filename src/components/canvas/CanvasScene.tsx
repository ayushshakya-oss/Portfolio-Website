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

function createMoonTextures(seed = 1337) {
  const width = 768;
  const height = 384;

  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = width;
  albedoCanvas.height = height;

  const mariaCanvas = document.createElement("canvas");
  mariaCanvas.width = width;
  mariaCanvas.height = height;

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = width;
  roughnessCanvas.height = height;

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;

  const albedoContext = albedoCanvas.getContext("2d");
  const mariaContext = mariaCanvas.getContext("2d");
  const roughnessContext = roughnessCanvas.getContext("2d");
  const bumpContext = bumpCanvas.getContext("2d");

  if (!albedoContext || !mariaContext || !roughnessContext || !bumpContext) {
    return null;
  }

  const mulberry32 = (value: number) => {
    let t = value >>> 0;
    return () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  };

  const random = mulberry32(seed);

  bumpContext.fillStyle = "rgb(128, 128, 128)";
  bumpContext.fillRect(0, 0, width, height);

  const drawCrater = (cx: number, cy: number, radius: number) => {
    const gradient = bumpContext.createRadialGradient(
      cx,
      cy,
      radius * 0.08,
      cx,
      cy,
      radius,
    );
    gradient.addColorStop(0, "rgba(40, 40, 40, 0.55)");
    gradient.addColorStop(0.55, "rgba(128, 128, 128, 0)");
    gradient.addColorStop(0.78, "rgba(180, 180, 180, 0.22)");
    gradient.addColorStop(1, "rgba(128, 128, 128, 0)");
    bumpContext.fillStyle = gradient;
    bumpContext.beginPath();
    bumpContext.arc(cx, cy, radius, 0, Math.PI * 2);
    bumpContext.fill();
  };

  const craterCount = 85;
  for (let index = 0; index < craterCount; index += 1) {
    const cx = random() * width;
    const cy = random() * height;
    const radius = THREE.MathUtils.lerp(6, 48, Math.pow(random(), 2.2));
    drawCrater(cx, cy, radius);
  }

  // Maria: big, soft darker regions as a mask (alpha)
  mariaContext.clearRect(0, 0, width, height);
  for (let index = 0; index < 7; index += 1) {
    const cx = random() * width;
    const cy = random() * height;
    const radius = THREE.MathUtils.lerp(70, 170, random());
    const gradient = mariaContext.createRadialGradient(
      cx,
      cy,
      radius * 0.2,
      cx,
      cy,
      radius,
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.58)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    mariaContext.fillStyle = gradient;
    mariaContext.beginPath();
    mariaContext.arc(cx, cy, radius, 0, Math.PI * 2);
    mariaContext.fill();
  }

  const bumpImage = bumpContext.getImageData(0, 0, width, height);
  const bumpData = bumpImage.data;

  const mariaImage = mariaContext.getImageData(0, 0, width, height);
  const mariaData = mariaImage.data;

  const albedoImage = albedoContext.createImageData(width, height);
  const roughnessImage = roughnessContext.createImageData(width, height);
  const albedoData = albedoImage.data;
  const roughData = roughnessImage.data;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;

      const bumpValue = bumpData[index] / 255;
      const mariaMask = mariaData[index + 3] / 255;
      const noise =
        (Math.sin((x + seed) * 0.06) + Math.sin((y - seed) * 0.09)) * 0.5;
      const grain = (random() - 0.5) * 0.08;

      // Base lunar regolith tone + bump shading
      const base = 0.64;
      const shaded =
        base +
        (bumpValue - 0.5) * 0.55 +
        noise * 0.05 +
        grain -
        mariaMask * 0.2;
      const luminance = THREE.MathUtils.clamp(shaded, 0.16, 0.92);
      const colorByte = Math.round(luminance * 255);

      albedoData[index] = colorByte;
      albedoData[index + 1] = colorByte;
      albedoData[index + 2] = colorByte;
      albedoData[index + 3] = 255;

      // Moon is mostly matte; slightly smoother where darker (maria)
      const smoothness = THREE.MathUtils.clamp(
        (0.75 - luminance) * 0.55,
        0,
        0.18,
      );
      const roughnessValue = 0.96 - smoothness;
      const roughByte = Math.round(
        THREE.MathUtils.clamp(roughnessValue, 0, 1) * 255,
      );
      roughData[index] = roughByte;
      roughData[index + 1] = roughByte;
      roughData[index + 2] = roughByte;
      roughData[index + 3] = 255;
    }
  }

  albedoContext.putImageData(albedoImage, 0, 0);
  roughnessContext.putImageData(roughnessImage, 0, 0);
  bumpContext.putImageData(bumpImage, 0, 0);

  const map = new THREE.CanvasTexture(albedoCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughnessCanvas);
  roughnessMap.colorSpace = THREE.NoColorSpace;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.colorSpace = THREE.NoColorSpace;
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  return { map, roughnessMap, bumpMap };
}

function Moon() {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useMemo(() => createMoonTextures(9341), []);

  useEffect(() => {
    return () => {
      textures?.map.dispose();
      textures?.roughnessMap.dispose();
      textures?.bumpMap.dispose();
    };
  }, [textures]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = state.mouse.y * 0.06;
    groupRef.current.rotation.z = state.mouse.x * 0.06;
  });

  return (
    <Float speed={0.85} rotationIntensity={0} floatIntensity={0.26}>
      <group ref={groupRef} position={[0, 0.15, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.05, 64, 64]} />
          <meshStandardMaterial
            map={textures?.map ?? undefined}
            roughnessMap={textures?.roughnessMap ?? undefined}
            bumpMap={textures?.bumpMap ?? undefined}
            bumpScale={0.065}
            roughness={1}
            metalness={0}
          />
        </mesh>
      </group>
    </Float>
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

      <Moon />
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
