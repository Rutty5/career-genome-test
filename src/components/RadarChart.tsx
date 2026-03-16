"use client";

import React from "react";
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { big5Labels, BIG5Factor } from "@/data/typeMatrix";

interface RadarChartProps {
  scores: Record<BIG5Factor, number>;
}

export default function RadarChart({ scores }: RadarChartProps) {
  const data = (["O", "C", "E", "A", "N"] as BIG5Factor[]).map((f) => ({
    factor: `${big5Labels[f].jp}\n(${big5Labels[f].en})`,
    score: scores[f],
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis
          dataKey="factor"
          tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
          tickCount={5}
        />
        <Radar
          name="BIG5"
          dataKey="score"
          stroke="#A855F7"
          fill="#A855F7"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
