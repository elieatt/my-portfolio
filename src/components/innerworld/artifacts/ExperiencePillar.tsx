"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { useInnerWorldStore } from "../innerWorldStore";

type ExperienceItem = (typeof PORTFOLIO_CONTENT.experience)[number];

interface Props {
  job: ExperienceItem;
}

export default function ExperiencePillar({ job }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setActiveArtifact = useInnerWorldStore((s) => s.setActiveArtifact);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
  });

  const color = hovered ? "#ffcc88" : "#ff9933";

  return (
    <Float speed={0.8} floatIntensity={0.3} rotationIntensity={0.15}>
      <group
        onClick={() => setActiveArtifact({ kind: "experience", id: job.id })}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.35, 0.35, 1.4, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.6 : 0.9}
            wireframe
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.16} color={color} anchorX="center">
          {job.company}
        </Text>
      </group>
    </Float>
  );
}
