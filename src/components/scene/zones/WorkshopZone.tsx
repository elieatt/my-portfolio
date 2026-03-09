"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";

interface Props {
  position: [number, number, number];
}

function GlowCube({ x, color, repaired }: { x: number; color: string; repaired: boolean }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={repaired ? 1.4 : 0.7} wireframe />
      </mesh>
      {repaired && (
        <mesh scale={0.82}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
}

export default function WorkshopZone({ position }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const repaired = useWorldStore((s) => s.repairedZones.has("workshop"));
  const setActiveZone = useWorldStore((s) => s.setActiveZone);
  const openRepairTerminal = useWorldStore((s) => s.openRepairTerminal);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (repaired) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.15;
    } else {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  const handleClick = () => {
    if (repaired) { setActiveZone("workshop"); return; }
    openRepairTerminal("workshop");
  };

  const color = repaired ? "#ff8800" : hovered ? "#ff6600" : "#ff2200";

  return (
    <group position={position}>
      <Float speed={repaired ? 1 : 1.5} floatIntensity={repaired ? 0.3 : 1.2}>
        <group
          ref={groupRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <GlowCube x={-0.7} color={color} repaired={repaired} />
          <GlowCube x={0.7} color={color} repaired={repaired} />

          {/* Connector rod */}
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={repaired ? 2.0 : 0.5} />
          </mesh>
        </group>
      </Float>

      <Text position={[0, -1.8, 0]} fontSize={0.25} color={repaired ? "#ff8800" : "#ff3333"} anchorX="center">
        {repaired ? UI_TEXT.zoneLabels.workshop.restored : UI_TEXT.zoneLabels.workshop.broken}
      </Text>
    </group>
  );
}
