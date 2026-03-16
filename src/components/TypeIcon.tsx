"use client";

import React from "react";
import Image from "next/image";
import { CareerTypeName } from "@/data/typeMatrix";

// Type icon gradient backgrounds matching BIG5 factor rows
const typeBorderColor: Record<CareerTypeName, string> = {
  // O (Openness) row - Purple
  PIONEER: "border-purple-500",
  INVENTOR: "border-purple-400",
  VISIONARY: "border-purple-400",
  // C (Conscientiousness) row - Blue
  EXECUTOR: "border-blue-500",
  STRATEGIST: "border-blue-400",
  GUARDIAN: "border-blue-400",
  // E (Extraversion) row - Orange
  CATALYST: "border-orange-500",
  ANALYST: "border-orange-400",
  COMMANDER: "border-orange-400",
  // A (Agreeableness) row - Green
  SUPPORTER: "border-green-500",
  MEDIATOR: "border-green-400",
  HARMONIZER: "border-green-400",
  // N (Stability) row - Slate
  ANCHOR: "border-slate-400",
  INSPECTOR: "border-slate-400",
  STABILIZER: "border-slate-400",
};

// Glow color per BIG5 factor
const typeGlow: Record<CareerTypeName, string> = {
  PIONEER: "shadow-purple-500/40",
  INVENTOR: "shadow-purple-400/40",
  VISIONARY: "shadow-purple-400/40",
  EXECUTOR: "shadow-blue-500/40",
  STRATEGIST: "shadow-blue-400/40",
  GUARDIAN: "shadow-blue-400/40",
  CATALYST: "shadow-orange-500/40",
  ANALYST: "shadow-orange-400/40",
  COMMANDER: "shadow-orange-400/40",
  SUPPORTER: "shadow-green-500/40",
  MEDIATOR: "shadow-green-400/40",
  HARMONIZER: "shadow-green-400/40",
  ANCHOR: "shadow-slate-400/40",
  INSPECTOR: "shadow-slate-400/40",
  STABILIZER: "shadow-slate-400/40",
};

interface TypeIconProps {
  typeName: CareerTypeName;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function TypeIcon({
  typeName,
  size = "md",
  showLabel = false,
}: TypeIconProps) {
  const borderColor = typeBorderColor[typeName];
  if (!borderColor) return null;

  const glowColor = typeGlow[typeName];

  const sizeConfig = {
    sm: { container: "w-9 h-9", imgSize: 36, radius: "rounded-md" },
    md: { container: "w-[52px] h-[52px]", imgSize: 52, radius: "rounded-lg" },
    lg: { container: "w-[72px] h-[72px]", imgSize: 72, radius: "rounded-xl" },
  };

  const { container, imgSize, radius } = sizeConfig[size];
  const iconSrc = `/icons/${typeName.toLowerCase()}.png`;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Outer wrapper: border + shadow */}
      <div
        className={`${container} ${radius} border-2 ${borderColor}
                     shadow-lg ${glowColor}
                     bg-[#0A0F1A] p-[2px]`}
      >
        {/* Inner clip wrapper: ensures image is fully clipped inside rounded corners */}
        <div className={`w-full h-full ${radius} overflow-hidden`}>
          <Image
            src={iconSrc}
            alt={typeName}
            width={imgSize}
            height={imgSize}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      </div>
      {showLabel && (
        <span className="text-text-muted text-xs font-mono mt-1">
          {typeName}
        </span>
      )}
    </div>
  );
}
