"use client";

import { Suspense, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { PORTFOLIO_CONTENT, TRACE_TEXT } from "@/data/content";
import type { PostMeta } from "@/lib/blog";
import PostTablet from "./artifacts/PostTablet";
import ProjectCrystal from "./artifacts/ProjectCrystal";
import ExperiencePillar from "./artifacts/ExperiencePillar";
import ContactBeacon from "./artifacts/ContactBeacon";
// Experimental — see components/trace/config.ts
import { TRACE_ENABLED } from "@/components/trace/config";
import { useTraceStore } from "@/components/trace/traceStore";

function Core() {
  const [hovered, setHovered] = useState(false);
  const traceDone = useTraceStore((s) => s.traceDone);
  const openTrace = useTraceStore((s) => s.openTrace);

  const handleClick = () => {
    if (!TRACE_ENABLED) return;
    openTrace();
  };

  const color = TRACE_ENABLED && hovered ? "#c9f5ff" : "#8fe8ff";

  return (
    <Float speed={0.6} floatIntensity={0.3} rotationIntensity={0.2}>
      <group
        onClick={TRACE_ENABLED ? handleClick : undefined}
        onPointerOver={TRACE_ENABLED ? () => setHovered(true) : undefined}
        onPointerOut={TRACE_ENABLED ? () => setHovered(false) : undefined}
      >
        <mesh>
          <icosahedronGeometry args={[1.1, 2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} wireframe />
        </mesh>
        <mesh scale={0.85}>
          <icosahedronGeometry args={[1.1, 2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.15} />
        </mesh>
        {TRACE_ENABLED && (
          <Text position={[0, -1.6, 0]} fontSize={0.15} color={color} anchorX="center">
            {traceDone ? TRACE_TEXT.coreLabelDone : TRACE_TEXT.coreLabel}
          </Text>
        )}
      </group>
    </Float>
  );
}

function ArtifactRing({ posts }: { posts: PostMeta[] }) {
  const { projects, experience } = PORTFOLIO_CONTENT;
  const radius = 6.5;

  const items: { key: string; node: ReactNode }[] = [
    ...posts.map((post) => ({ key: `post-${post.slug}`, node: <PostTablet post={post} /> })),
    ...projects.map((project) => ({
      key: `project-${project.id}`,
      node: <ProjectCrystal project={project} />,
    })),
    ...experience.map((job) => ({ key: `exp-${job.id}`, node: <ExperiencePillar job={job} /> })),
    { key: "contact", node: <ContactBeacon /> },
  ];

  return (
    <>
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.6;
        return (
          <group key={item.key} position={[x, y, z]}>
            {item.node}
          </group>
        );
      })}
    </>
  );
}

interface Props {
  posts: PostMeta[];
}

export default function InnerWorld({ posts }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 3, 15], fov: 55 }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: "#000000" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} color="#88ccff" />
        <pointLight position={[0, 4, 0]} intensity={1.2} color="#aaffff" />
        <Stars radius={80} depth={40} count={4000} factor={3.5} speed={0.5} />
        <Core />
        <ArtifactRing posts={posts} />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.6} luminanceThreshold={0.25} luminanceSmoothing={0.9} resolutionScale={0.5} />
        </EffectComposer>
        <OrbitControls enablePan={false} minDistance={5} maxDistance={22} maxPolarAngle={Math.PI / 1.7} />
      </Suspense>
    </Canvas>
  );
}
