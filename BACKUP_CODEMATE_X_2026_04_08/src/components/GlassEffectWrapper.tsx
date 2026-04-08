import { ReactNode } from "react";

interface GlassEffectWrapperProps {
  children: ReactNode;
}

export default function GlassEffectWrapper({ children }: GlassEffectWrapperProps) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 -z-20" />

      {/* Glass effect layers */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* Animated glass-morphism backdrop */}
        <div className="absolute inset-0 backdrop-blur-3xl opacity-40" />
        
        {/* Frosted glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Glass light effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glass frost effect with semi-transparent cards */}
        <div className="absolute inset-0 backdrop-saturate-150 backdrop-brightness-110" />
      </div>

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
