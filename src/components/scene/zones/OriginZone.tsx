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

export default function OriginZone({ position }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const repaired = useWorldStore((s) => s.repairedZones.has("origin"));
  const repairZone = useWorldStore((s) => s.repairZone);
  const setActiveZone = useWorldStore((s) => s.setActiveZone);
  const [hovered, setHovered] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [repairProgress, setRepairProgress] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (repairing && repairProgress < 1) {
      setRepairProgress((p) => Math.min(p + delta * 0.6, 1));
    }
    meshRef.current.rotation.y += delta * (repaired ? 0.15 : 0.4);
    meshRef.current.rotation.x += delta * (repaired ? 0.07 : 0.2);
    if (ringRef.current && repaired) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.6;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });

  const handleClick = () => {
    if (repaired) { setActiveZone("origin"); return; }
    if (!repairing) {
      setRepairing(true);
      setTimeout(() => repairZone("origin"), 1800);
    }
  };

  const color = repaired
    ? "#00ffcc"
    : repairing
    ? new THREE.Color().lerpColors(new THREE.Color("#ff0000"), new THREE.Color("#00ffcc"), repairProgress).getStyle()
    : hovered ? "#ff4444" : "#ff0000";

  return (
    <group position={position}>
      <Float speed={repaired ? 1 : 3} rotationIntensity={repaired ? 0.1 : 1.5} floatIntensity={repaired ? 0.4 : 2}>
        <group onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          {/* Wireframe shell */}
          <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, repaired ? 2 : 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={repaired ? 1.4 : 0.8} wireframe />
          </mesh>

          {/* Inner transparent glow — repaired only */}
          {repaired && (
            <mesh scale={0.88}>
              <icosahedronGeometry args={[1, 2]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.12} />
            </mesh>
          )}

          {/* Orbiting ring — repaired only */}
          {repaired && (
            <mesh ref={ringRef}>
              <torusGeometry args={[1.4, 0.018, 6, 48]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
            </mesh>
          )}
        </group>
      </Float>

      <Text position={[0, -1.8, 0]} fontSize={0.25} color={repaired ? "#00ffcc" : "#ff3333"} anchorX="center">
        {repaired ? UI_TEXT.zoneLabels.origin.restored : repairing ? UI_TEXT.zoneLabels.origin.repairing : UI_TEXT.zoneLabels.origin.broken}
      </Text>
    </group>
  );
}
