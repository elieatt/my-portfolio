"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { PORTFOLIO_CONTENT } from "@/data/content";
import { useInnerWorldStore } from "../innerWorldStore";

type Project = (typeof PORTFOLIO_CONTENT.projects)[number];

interface Props {
  project: Project;
}

export default function ProjectCrystal({ project }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setActiveArtifact = useInnerWorldStore((s) => s.setActiveArtifact);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.4;
  });

  const color = hovered ? "#c9ffb0" : "#7cff6b";

  return (
    <Float speed={1} floatIntensity={0.4} rotationIntensity={0.2}>
      <group
        onClick={() => setActiveArtifact({ kind: "project", id: project.id })}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.6 : 0.9}
            wireframe
          />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.16} color={color} anchorX="center">
          {project.name}
        </Text>
      </group>
    </Float>
  );
}
