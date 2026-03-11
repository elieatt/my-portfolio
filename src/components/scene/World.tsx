"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useWorldStore } from "@/store/worldStore";
import OriginZone from "./zones/OriginZone";
import WorkshopZone from "./zones/WorkshopZone";
import GridZone from "./zones/GridZone";
import SignalZone from "./zones/SignalZone";
import GlitchEffect from "./effects/GlitchEffect";
import HiddenArtifact from "./zones/HiddenArtifact";

function CameraController() {
  const { camera, size } = useThree();

  useEffect(() => {
    // On narrow screens (portrait mobile) the horizontal FOV is very small —
    // push the camera back so all 4 zones (±5 units) stay in frame.
    const z = size.width < 600 ? 20 : size.width < 900 ? 15 : 12;
    camera.position.set(0, 2, z);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

function Floor() {
  const integrity = useWorldStore((s) => s.integrity);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[40, 40, 10, 10]} />
      <meshStandardMaterial
        color={integrity === 100 ? "#00ff88" : integrity >= 50 ? "#003322" : "#110000"}
        wireframe
        emissive={integrity === 100 ? "#00ff88" : integrity >= 50 ? "#002211" : "#110000"}
        emissiveIntensity={0.15 + (integrity / 100) * 0.4}
      />
    </mesh>
  );
}

function AmbientLight() {
  const integrity = useWorldStore((s) => s.integrity);
  const intensity = 0.1 + (integrity / 100) * 0.6;
  const color = integrity === 100 ? "#88ffcc" : integrity > 50 ? "#44aa66" : "#004400";

  return (
    <>
      <ambientLight intensity={intensity} color={color} />
      <pointLight position={[0, 8, 0]} intensity={0.5 + integrity / 200} color={color} />
    </>
  );
}

export default function World() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60 }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: "#000000" }}
    >
      <Suspense fallback={null}>
        <CameraController />
        <AmbientLight />
        <Floor />
        <Stars radius={60} depth={30} count={1500} factor={3} speed={1} />

        {/* 4 zones in a cross layout */}
        <OriginZone position={[-5, 0, 0]} />
        <WorkshopZone position={[5, 0, 0]} />
        <GridZone position={[0, 0, -5]} />
        <SignalZone position={[0, 0, 5]} />

        <HiddenArtifact />
        <GlitchEffect />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={25}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Suspense>
    </Canvas>
  );
}
