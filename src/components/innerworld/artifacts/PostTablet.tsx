"use client";

import { useState } from "react";
import { Text, Float } from "@react-three/drei";
import type { PostMeta } from "@/lib/blog";
import { useInnerWorldStore } from "../innerWorldStore";

interface Props {
  post: PostMeta;
}

export default function PostTablet({ post }: Props) {
  const [hovered, setHovered] = useState(false);
  const setActiveArtifact = useInnerWorldStore((s) => s.setActiveArtifact);

  const color = hovered ? "#baf5ff" : "#4fd6ff";

  return (
    <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.3}>
      <group
        onClick={() => setActiveArtifact({ kind: "post", post })}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <boxGeometry args={[1.1, 1.4, 0.06]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.6 : 0.9}
            wireframe
          />
        </mesh>
        <Text
          position={[0, 0, 0.04]}
          fontSize={0.12}
          maxWidth={0.9}
          textAlign="center"
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {post.title}
        </Text>
      </group>
    </Float>
  );
}
