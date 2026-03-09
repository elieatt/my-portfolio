"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";

interface Props {
  position: [number, number, number];
}

export default function GridZone({ position }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const repaired = useWorldStore((s) => s.repairedZones.has("grid"));
  const setActiveZone = useWorldStore((s) => s.setActiveZone);
  const openRepairTerminal = useWorldStore((s) => s.openRepairTerminal);
  const [hovered, setHovered] = useState(false);

  const nodes = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        arr.push([x * 0.7, y * 0.7, 0]);
    return arr;
  }, []);

  const edges = useMemo(() => {
    const result: [[number,number,number],[number,number,number]][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x < 1) result.push([[x*0.7, y*0.7, 0], [(x+1)*0.7, y*0.7, 0]]);
        if (y < 1) result.push([[x*0.7, y*0.7, 0], [x*0.7, (y+1)*0.7, 0]]);
      }
    }
    return result;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * (repaired ? 0.15 : 0.3);
    if (!repaired) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    } else {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  const handleClick = () => {
    if (repaired) { setActiveZone("grid"); return; }
    openRepairTerminal("grid");
  };

  const color = repaired ? "#00ccff" : hovered ? "#0066ff" : "#ff0066";

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Nodes */}
        {nodes.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh>
              <sphereGeometry args={[repaired ? 0.14 : 0.12, repaired ? 6 : 4, repaired ? 6 : 4]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={repaired ? 1.6 : 0.9}
                wireframe={!repaired && i % 3 === 0}
              />
            </mesh>
            {repaired && (
              <mesh scale={0.7}>
                <sphereGeometry args={[0.14, 6, 6]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.2} />
              </mesh>
            )}
          </group>
        ))}

        {repaired && edges.map((edge, i) => (
          <Line
            key={i}
            points={edge}
            color={color}
            lineWidth={0.8}
            transparent
            opacity={0.4}
          />
        ))}

        {/* Invisible click-catcher */}
        <mesh onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <planeGeometry args={[2.4, 2.4]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      <Text position={[0, -1.8, 0]} fontSize={0.25} color={repaired ? "#00ccff" : "#ff3333"} anchorX="center">
        {repaired ? UI_TEXT.zoneLabels.grid.restored : UI_TEXT.zoneLabels.grid.broken}
      </Text>
    </group>
  );
}
