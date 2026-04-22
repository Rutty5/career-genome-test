"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/store/diagnosis";
import { computeResults } from "@/lib/scoring";

const loadingTexts = [
  "あなたの回答を分析しています...",
  "性格特性を解析中...",
  "ビジネスコンピテンシーを測定中...",
  "84職種とマッチング中...",
  "あなたのキャリアDNAを解読しています...",
];

export default function LoadingScreen() {
  const router = useRouter();
  const { answers, version, setResults } = useDiagnosis();
  const [textIndex, setTextIndex] = useState(0);
  const computed = useRef(false);

  // Compute results once
  useEffect(() => {
    if (!computed.current) {
      computed.current = true;
      const results = computeResults(answers, version);
      setResults(results);
    }
  }, [answers, version, setResults]);

  // Text animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < loadingTexts.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Navigate after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/results");
    }, 6500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* DNA Helix Animation */}
      <div className="mb-12 relative" style={{ perspective: "400px" }}>
        <div className="dna-helix flex flex-col items-center gap-3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center gap-6" style={{ animationDelay: `${i * 0.15}s` }}>
              <div
                className="w-3 h-3 rounded-full pulse-glow"
                style={{
                  backgroundColor: ["#A855F7", "#3B82F6", "#FF8C42", "#10B981", "#94A3B8", "#A855F7", "#3B82F6", "#FF8C42"][i],
                  animationDelay: `${i * 0.2}s`,
                  transform: `translateX(${Math.sin((i * Math.PI) / 4) * 20}px)`,
                }}
              />
              <div className="w-8 h-[1px] bg-white/10" />
              <div
                className="w-3 h-3 rounded-full pulse-glow"
                style={{
                  backgroundColor: ["#10B981", "#FF8C42", "#3B82F6", "#A855F7", "#FF8C42", "#94A3B8", "#10B981", "#3B82F6"][i],
                  animationDelay: `${i * 0.2 + 0.5}s`,
                  transform: `translateX(${-Math.sin((i * Math.PI) / 4) * 20}px)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading text */}
      <div className="h-8 flex items-center">
        <p key={textIndex} className="text-text-secondary text-sm sm:text-base animate-fade-in font-heading-jp">
          {loadingTexts[textIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {loadingTexts.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i <= textIndex ? "bg-accent-orange" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
