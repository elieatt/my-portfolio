"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";

interface Props {
  position: [number, number, number];
}

function SignalRing({ color, phase }: { color: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    let s = ref.current.scale.x + delta * 0.9;
    if (s > 3.5) s = phase;
    ref.current.scale.setScalar(s);
    mat.opacity = Math.max(0, 1 - (s - phase) / (3.5 - phase));
  });

  return (
    <mesh ref={ref} scale={phase} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.8, 0.018, 6, 40]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.8} />
    </mesh>
  );
}

export default function SignalZone({ position }: Props) {
  const dishRef = useRef<THREE.Mesh>(null);
  const repaired = useWorldStore((s) => s.repairedZones.has("signal"));
  const setActiveZone = useWorldStore((s) => s.setActiveZone);
  const openRepairTerminal = useWorldStore((s) => s.openRepairTerminal);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!dishRef.current) return;
    if (!repaired) {
      dishRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.4;
      dishRef.current.rotation.x += delta * 0.3;
    } else {
      dishRef.current.rotation.y += delta * 0.4;
    }
  });

  const handleClick = () => {
    if (repaired) { setActiveZone("signal"); return; }
    openRepairTerminal("signal");
  };

  const color = repaired ? "#cc00ff" : hovered ? "#8800dd" : "#ff0033";

  return (
    <group position={position}>
      <group onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Wireframe cone shell */}
        <mesh ref={dishRef}>
          <coneGeometry args={[0.8, 1.2, repaired ? 16 : 5, 1, true]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={repaired ? 1.4 : 0.8}
            wireframe
            side={THREE.DoubleSide}
          />
        </mesh>

        {repaired && (
          <mesh scale={0.88}>
            <coneGeometry args={[0.8, 1.2, 16, 1, true]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
        )}

        {repaired && <SignalRing color={color} phase={1.0} />}
        {repaired && <SignalRing color={color} phase={2.2} />}
        {repaired && <SignalRing color={color} phase={3.0} />}
      </group>

      <Text position={[0, -1.8, 0]} fontSize={0.25} color={repaired ? "#cc00ff" : "#ff3333"} anchorX="center">
        {repaired ? UI_TEXT.zoneLabels.signal.restored : UI_TEXT.zoneLabels.signal.broken}
      </Text>
    </group>
  );
}
