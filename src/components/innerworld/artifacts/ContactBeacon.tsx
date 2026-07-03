"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInnerWorldStore } from "../innerWorldStore";
import { INNER_WORLD_TEXT } from "@/data/content";

function PulseRing({ color, phase }: { color: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    let s = ref.current.scale.x + delta * 0.7;
    if (s > 2.6) s = phase;
    ref.current.scale.setScalar(s);
    mat.opacity = Math.max(0, 1 - (s - phase) / (2.6 - phase));
  });

  return (
    <mesh ref={ref} scale={phase} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.55, 0.015, 6, 36]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.8} />
    </mesh>
  );
}

export default function ContactBeacon() {
  const [hovered, setHovered] = useState(false);
  const setActiveArtifact = useInnerWorldStore((s) => s.setActiveArtifact);

  const color = hovered ? "#ffb3ff" : "#ff44ff";

  return (
    <group
      onClick={() => setActiveArtifact({ kind: "contact" })}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1.8 : 1.1} />
      </mesh>
      <PulseRing color={color} phase={0.8} />
      <PulseRing color={color} phase={1.7} />
      <Text position={[0, -1, 0]} fontSize={0.16} color={color} anchorX="center">
        {INNER_WORLD_TEXT.artifacts.contactLabel}
      </Text>
    </group>
  );
}
