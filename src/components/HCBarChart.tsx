"use client";

import React from "react";
import { hcLabels, HCAxis } from "@/data/typeMatrix";

interface HCBarChartProps {
  scores: Record<HCAxis, number>;
}

export default function HCBarChart({ scores }: HCBarChartProps) {
  const axes: HCAxis[] = ["ACT", "THK", "TMW"];

  return (
    <div className="space-y-4">
      {axes.map((axis) => (
        <div key={axis}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-text-secondary text-sm">
              {hcLabels[axis].jp}
              <span className="text-text-muted ml-1 font-mono text-xs">({hcLabels[axis].en})</span>
            </span>
            <span className="font-mono text-sm" style={{ color: hcLabels[axis].color }}>
              {scores[axis]}
            </span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${scores[axis]}%`,
                backgroundColor: hcLabels[axis].color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
