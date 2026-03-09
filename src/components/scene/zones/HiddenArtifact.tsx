"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWorldStore } from "@/store/worldStore";

// Hidden below the wireframe floor (floor is at y=-2.5).
// Visible only when the user orbits upward and looks through the grid gaps.
export default function HiddenArtifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const easterEggFound = useWorldStore((s) => s.easterEggFound);
  const findEasterEgg = useWorldStore((s) => s.findEasterEgg);

  const integrity = useWorldStore((s) => s.integrity);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.18;
    // Very subtle pulse — hard to notice
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    meshRef.current.scale.setScalar(pulse);
  });

  // Only exists after full repair, and disappears once collected
  if (integrity < 100 || easterEggFound) return null;

  const color = hovered ? "#cc44ff" : "#660099";

  return (
    <mesh
      ref={meshRef}
      // Far corner, deep below floor — not directly below camera center
      position={[-8, -4.8, -8]}
      onClick={() => {
        document.body.style.cursor = "default";
        findEasterEgg();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHovered(false);
      }}
    >
      <tetrahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.2}
        wireframe={false}
      />
    </mesh>
  );
}
