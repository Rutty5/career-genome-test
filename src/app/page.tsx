"use client";

import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/store/diagnosis";

export default function TopPage() {
  const router = useRouter();
  const { setVersion } = useDiagnosis();

  const handleStart = () => {
    setVersion("paid");
    router.push("/info");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* DNA decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-accent-purple opacity-20 pulse-glow" />
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-accent-blue opacity-15 pulse-glow" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-accent-orange opacity-20 pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 rounded-full bg-accent-green opacity-15 pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in">
        {/* Logo */}
        <div className="mb-2 text-lg tracking-widest text-text-muted font-mono">
          🧬
        </div>
        <h1 className="font-heading-en text-5xl sm:text-7xl tracking-wider text-text-primary mb-3">
          CAREER GENOME TEST
        </h1>
        <p className="text-accent-orange text-lg sm:text-xl font-heading-jp mb-4">
          キャリアを科学する
        </p>
        <p className="text-text-secondary text-sm sm:text-base mb-6 leading-relaxed max-w-md mx-auto">
          あなたの性格特性と行動特性から、<br />
          15のキャリアタイプを判定します
        </p>
        <p className="text-text-muted text-xs mb-10 max-w-md mx-auto leading-relaxed">
          BIG5性格分析 × BUSINESS COMPETENCY × キャリアコンテキストの科学的診断で、<br />
          現在の適職と2030年の適職をマッチングします
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-4 items-center mb-10">
          <button
            onClick={handleStart}
            className="w-full max-w-sm py-4 px-8 rounded-lg bg-accent-orange text-white font-heading-jp text-lg
                       hover:bg-opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg shadow-accent-orange/20"
          >
            診断を始める（95問・約20分）
          </button>
        </div>

        {/* Description */}
        <div className="card p-6 max-w-sm mx-auto">
          <p className="text-text-secondary text-xs leading-relaxed">
            <span className="block mb-1">
              <span className="text-accent-purple font-mono text-sm">BIG5性格分析</span>
              <span className="text-text-muted mx-2">×</span>
              <span className="text-accent-blue font-mono text-sm">BUSINESS COMPETENCY</span>
            </span>
            <span className="block">
              <span className="text-text-muted mr-2">=</span>
              <span className="text-accent-orange font-mono text-sm">あなたのキャリアDNA</span>
            </span>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
          <div className="text-center">
            <p className="text-accent-purple font-heading-en text-2xl">15</p>
            <p className="text-text-muted text-xs">キャリアタイプ</p>
          </div>
          <div className="text-center">
            <p className="text-accent-blue font-heading-en text-2xl">84</p>
            <p className="text-text-muted text-xs">マッチング職種</p>
          </div>
          <div className="text-center">
            <p className="text-accent-orange font-heading-en text-2xl">2030</p>
            <p className="text-text-muted text-xs">未来適職予測</p>
          </div>
        </div>
      </div>
    </main>
  );
}
