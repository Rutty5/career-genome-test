"use client";

/**
 * GenomeMap — サーキュラーゲノムマップ
 * 外側リング: BIG5 5因子  /  内側リング: HC 3軸 (ACT/THK/TMW)
 */

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { BIG5Factor, HCAxis } from "@/data/typeMatrix";

const MAX_SCORE = 100;
const ANIM_MS = 1400;
const OUTER_R = 150;
const INNER_R = 100;
const RING_W = 28;
const LABEL_PAD = 14;

const BIG5_COLORS: Record<BIG5Factor, string> = {
  O: "#A855F7",
  C: "#3B82F6",
  E: "#FF8C42",
  A: "#10B981",
  N: "#94A3B8",
};

const BIG5_LABELS: Record<BIG5Factor, string> = {
  O: "開放性",
  C: "誠実性",
  E: "外向性",
  A: "協調性",
  N: "安定性",
};

const HC_COLORS: Record<HCAxis, string> = {
  ACT: "#FF8C42",
  THK: "#3B82F6",
  TMW: "#10B981",
};

const HC_LABELS: Record<HCAxis, string> = {
  ACT: "行動力",
  THK: "思考力",
  TMW: "協働力",
};

const BIG5_ORDER: BIG5Factor[] = ["O", "C", "E", "A", "N"];
const HC_ORDER: HCAxis[] = ["ACT", "THK", "TMW"];

function opacity(score: number) {
  return 0.3 + (score / MAX_SCORE) * 0.7;
}

interface GenomeMapProps {
  big5: Record<BIG5Factor, number>;
  hc: Record<HCAxis, number>;
  typeName?: string;
  size?: number;
}

export default function GenomeMap({ big5, hc, typeName, size = 360 }: GenomeMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!svgRef.current || drawn) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const cx = size / 2;
    const g = svg.append("g").attr("transform", `translate(${cx},${cx})`);

    // グリッド円
    [INNER_R - RING_W, INNER_R, OUTER_R, OUTER_R + RING_W].forEach((r) => {
      g.append("circle")
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "rgba(255,255,255,0.08)")
        .attr("stroke-width", 0.5);
    });

    // ===== 外側: BIG5 =====
    const b5Arc = (2 * Math.PI) / 5;
    const b5Gap = 0.05;

    BIG5_ORDER.forEach((f, i) => {
      const score = big5[f];
      const start = i * b5Arc + b5Gap / 2;
      const full = (i + 1) * b5Arc - b5Gap / 2;
      const target = start + (full - start) * (score / MAX_SCORE);
      const color = BIG5_COLORS[f];

      // 背景
      const bgArc = d3.arc<unknown>()
        .innerRadius(OUTER_R).outerRadius(OUTER_R + RING_W)
        .startAngle(start).endAngle(full).cornerRadius(4);
      g.append("path").attr("d", bgArc({}) as string).attr("fill", color).attr("opacity", 0.1);

      // スコア
      const arc = d3.arc<{ endAngle: number }>()
        .innerRadius(OUTER_R).outerRadius(OUTER_R + RING_W)
        .startAngle(start).cornerRadius(4);
      g.append("path")
        .datum({ endAngle: start })
        .attr("d", (d) => arc(d) as string)
        .attr("fill", color).attr("opacity", opacity(score))
        .transition().duration(ANIM_MS).delay(i * 80)
        .attrTween("d", function () {
          const interp = d3.interpolate(start, target);
          return (t) => arc({ endAngle: interp(t) }) as string;
        });

      // ラベル
      const la = (start + full) / 2 - Math.PI / 2;
      const lr = OUTER_R + RING_W + LABEL_PAD;
      g.append("text")
        .attr("x", Math.cos(la) * lr).attr("y", Math.sin(la) * lr)
        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
        .attr("fill", color).attr("font-size", "8px").attr("font-weight", "600")
        .text(BIG5_LABELS[f].slice(0, 3))
        .attr("opacity", 0)
        .transition().delay(ANIM_MS + i * 40).duration(300).attr("opacity", 1);
    });

    // ===== 内側: HC 3軸 =====
    const hcArc = (2 * Math.PI) / 3;
    const hcGap = 0.06;

    HC_ORDER.forEach((axis, i) => {
      const score = hc[axis];
      const start = i * hcArc + hcGap / 2;
      const full = (i + 1) * hcArc - hcGap / 2;
      const target = start + (full - start) * (score / MAX_SCORE);
      const color = HC_COLORS[axis];

      const bgArc = d3.arc<unknown>()
        .innerRadius(INNER_R - RING_W).outerRadius(INNER_R)
        .startAngle(start).endAngle(full).cornerRadius(4);
      g.append("path").attr("d", bgArc({}) as string).attr("fill", color).attr("opacity", 0.1);

      const arc = d3.arc<{ endAngle: number }>()
        .innerRadius(INNER_R - RING_W).outerRadius(INNER_R)
        .startAngle(start).cornerRadius(4);
      g.append("path")
        .datum({ endAngle: start })
        .attr("d", (d) => arc(d) as string)
        .attr("fill", color).attr("opacity", opacity(score))
        .transition().duration(ANIM_MS).delay(400 + i * 120)
        .attrTween("d", function () {
          const interp = d3.interpolate(start, target);
          return (t) => arc({ endAngle: interp(t) }) as string;
        });

      // ラベル
      const la = (start + full) / 2 - Math.PI / 2;
      const lr = INNER_R - RING_W - 14;
      g.append("text")
        .attr("x", Math.cos(la) * lr).attr("y", Math.sin(la) * lr)
        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
        .attr("fill", color).attr("font-size", "7px").attr("font-weight", "600")
        .text(HC_LABELS[axis])
        .attr("opacity", 0)
        .transition().delay(ANIM_MS + 300 + i * 50).duration(300).attr("opacity", 0.9);
    });

    // ===== 中央テキスト =====
    if (typeName) {
      g.append("text")
        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
        .attr("fill", "#ffffff").attr("font-size", "9px").attr("font-weight", "700")
        .attr("letter-spacing", "1px")
        .text(typeName)
        .attr("opacity", 0)
        .transition().delay(ANIM_MS + 500).duration(400).attr("opacity", 0.9);
    }

    setDrawn(true);
  }, [big5, hc, typeName, size, drawn]);

  return (
    <div className="flex justify-center">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-full h-auto"
        aria-label="キャリアゲノムマップ"
      />
    </div>
  );
}
