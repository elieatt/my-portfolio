"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  opacity: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Particle[] = [];
    let animId: number;

    const onMove = (e: MouseEvent) => {
      particles.push({ x: e.clientX, y: e.clientY, opacity: 0.55 });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.opacity -= 0.035;
        if (p.opacity <= 0) { particles.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(0, 255, 80, ${p.opacity})`;
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
    />
  );
}
