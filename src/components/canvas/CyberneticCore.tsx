"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// High performance 3D Simplex noise GLSL snippet
const noiseGLSL = `
// Simplex 3D noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
`;

const coreVertexShader = `
${noiseGLSL}

uniform float uTime;
uniform float uDisplacement;
uniform float uMorph;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;
varying vec3 vViewPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  
  // Morphing procedural organic wave displacement
  float frequency = 1.6 + uMorph * 0.8;
  float speed = uTime * 0.7;
  float noise = snoise(position * frequency + vec3(speed, speed * 0.6, speed * 0.3));
  vNoise = noise;

  float displacement = (noise * 0.28 + 0.05) * uDisplacement;
  vec3 newPosition = position + normal * displacement;
  
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  vPosition = newPosition;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const coreFragmentShader = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uTime;
uniform float uFresnelPower;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // Fresnel calculation for luminous rim glow
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
  
  // Dynamic color blending based on noise and vertex normal
  vec3 baseColor = mix(uColorA, uColorB, vNoise * 0.5 + 0.5);
  vec3 finalColor = mix(baseColor, uColorC, fresnel);
  
  // Extra iridescent pulse along the edge
  finalColor += uColorA * fresnel * 1.35;

  gl_FragColor = vec4(finalColor, 0.92);
}
`;

type CyberneticCoreProps = {
  explodeFactor?: number;
  noiseDisplacement?: number;
  rotationSpeed?: number;
  soundReactive?: boolean;
};

export default function CyberneticCore({
  explodeFactor = 0,
  noiseDisplacement = 1.0,
  rotationSpeed = 1.0,
  soundReactive = false,
}: CyberneticCoreProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const innerSingularityRef = useRef<THREE.Mesh>(null);
  const meshShaderRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisplacement: { value: 1.0 },
      uMorph: { value: 0 },
      uFresnelPower: { value: 2.8 },
      uColorA: { value: new THREE.Color("#38bdf8") }, // Cyan
      uColorB: { value: new THREE.Color("#818cf8") }, // Indigo
      uColorC: { value: new THREE.Color("#c084fc") }, // Purple
    }),
    [],
  );

  useEffect(() => {
    if (meshShaderRef.current) {
      meshShaderRef.current.uniforms.uDisplacement.value = noiseDisplacement;
    }
  }, [noiseDisplacement]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // Update core shader uniforms
    if (meshShaderRef.current) {
      meshShaderRef.current.uniforms.uTime.value = elapsed;
      meshShaderRef.current.uniforms.uMorph.value =
        Math.sin(elapsed * 0.5) * 0.5 + 0.5;

      if (soundReactive) {
        meshShaderRef.current.uniforms.uFresnelPower.value =
          2.2 + Math.sin(elapsed * 4.0) * 0.6;
      } else {
        meshShaderRef.current.uniforms.uFresnelPower.value = 2.8;
      }
    }

    // Gentle global float
    if (rootGroupRef.current) {
      rootGroupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.08;
    }

    // Independent gyroscopic ring rotations
    const speed = delta * rotationSpeed;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += speed * 0.45;
      outerRingRef.current.rotation.y += speed * 0.6;
      // Explode outwards based on scroll trigger factor
      const targetScale = 1 + explodeFactor * 0.45;
      outerRingRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1,
      );
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.y -= speed * 0.75;
      midRingRef.current.rotation.z += speed * 0.35;
      const targetScale = 1 + explodeFactor * 0.28;
      midRingRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1,
      );
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= speed * 0.55;
      innerRingRef.current.rotation.z -= speed * 0.65;
    }

    // Pulsing inner singularity core
    if (innerSingularityRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.12;
      innerSingularityRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Central Organic Distorted Mesh */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.05, 32]} />
        <shaderMaterial
          ref={meshShaderRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={uniforms}
          transparent
          wireframe={false}
        />
      </mesh>

      {/* Subtle secondary wireframe halo overlay */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <icosahedronGeometry args={[1.05, 4]} />
        <meshBasicMaterial
          color="#7dd3fc"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Inner Radiant Singularity */}
      <mesh ref={innerSingularityRef}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight
          color="#38bdf8"
          intensity={soundReactive ? 3.5 : 2.2}
          distance={6}
          decay={2}
        />
      </mesh>

      {/* Concentric Gimbal Ring 1: Outer Gyroscopic Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[1.75, 0.024, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            metalness={0.9}
            roughness={0.15}
            emissive="#0284c7"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Orbital Marker Nodes */}
        <mesh position={[1.75, 0, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#7dd3fc" />
        </mesh>
        <mesh position={[-1.75, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
      </group>

      {/* Concentric Gimbal Ring 2: Middle Gyroscopic Ring */}
      <group ref={midRingRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.42, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#c084fc"
            metalness={0.85}
            roughness={0.2}
            emissive="#7c3aed"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0, 1.42, 0]}>
          <sphereGeometry args={[0.048, 16, 16]} />
          <meshBasicMaterial color="#e0e7ff" />
        </mesh>
      </group>

      {/* Concentric Gimbal Ring 3: Inner Orbital Ring */}
      <group ref={innerRingRef}>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[1.22, 0.016, 16, 64]} />
          <meshStandardMaterial
            color="#818cf8"
            metalness={0.8}
            roughness={0.25}
            emissive="#4338ca"
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}
