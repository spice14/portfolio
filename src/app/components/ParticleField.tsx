import { useMemo } from "react";

type DustParticle = {
  id: string;
  depth: "near" | "far";
  left: number;
  top: number;
  size: number;
  opacity: number;
  travelX: number;
  travelY: number;
  pathDuration: number;
  kink1X: number;
  kink1Y: number;
  kink2X: number;
  kink2Y: number;
  shimmerDuration: number;
  delay: number;
};

const PARTICLE_COUNT = 350;

export function ParticleField() {
  const particles = useMemo<DustParticle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const depth: DustParticle["depth"] =
        Math.random() < 0.42 ? "near" : "far";
      const isNear = depth === "near";
      // Keep airflow mostly in one direction with a little counter-current.
      const horizontalDirection = Math.random() < 0.86 ? 1 : -1;

      return {
        id: `dust-${index}-${Math.random().toString(36).slice(2, 9)}`,
        depth,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: isNear ? 2.8 + Math.random() * 4 : 1.5 + Math.random() * 2.6,
        opacity: isNear
          ? 0.33 + Math.random() * 0.36
          : 0.2 + Math.random() * 0.28,
        travelX:
          horizontalDirection *
          (isNear ? 60 + Math.random() * 58 : 40 + Math.random() * 40),
        travelY: isNear ? -18 + Math.random() * 36 : -12 + Math.random() * 24,
        pathDuration: isNear
          ? 22 + Math.random() * 16
          : 32 + Math.random() * 22,
        kink1X: isNear ? -16 + Math.random() * 32 : -10 + Math.random() * 20,
        kink1Y: isNear ? -12 + Math.random() * 24 : -8 + Math.random() * 16,
        kink2X: isNear ? -14 + Math.random() * 28 : -9 + Math.random() * 18,
        kink2Y: isNear ? -10 + Math.random() * 20 : -7 + Math.random() * 14,
        shimmerDuration: isNear
          ? 4.2 + Math.random() * 2.4
          : 6 + Math.random() * 3,
        delay: -Math.random() * 20,
      };
    });
  }, []);

  return (
    <div className="spatial-particle-field" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`spatial-particle ${particle.depth === "near" ? "spatial-particle--near" : "spatial-particle--far"}`}
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              "--travel-x": `${particle.travelX}vw`,
              "--travel-y": `${particle.travelY}vh`,
              "--path-dur": `${particle.pathDuration}s`,
              "--kink-1-x": `${particle.kink1X}px`,
              "--kink-1-y": `${particle.kink1Y}px`,
              "--kink-2-x": `${particle.kink2X}px`,
              "--kink-2-y": `${particle.kink2Y}px`,
              "--shimmer-dur": `${particle.shimmerDuration}s`,
              "--delay": `${particle.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
