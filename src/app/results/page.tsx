"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/store/diagnosis";
import { careerTypes } from "@/data/types";
import { big5Labels, BIG5Factor, CareerTypeName } from "@/data/typeMatrix";
import RadarChart from "@/components/RadarChart";
import HCBarChart from "@/components/HCBarChart";
import TypeIcon from "@/components/TypeIcon";
import { downloadReport } from "@/lib/reportGenerator";

export default function ResultsPage() {
  const router = useRouter();
  const { results, userInfo } = useDiagnosis();
  const [big5Open, setBig5Open] = useState(false);
  const [hcOpen, setHcOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);
  const [reportGenerating, setReportGenerating] = useState(false);

  const typeData = useMemo(() => {
    if (!results) return null;
    return careerTypes[results.mainType as CareerTypeName];
  }, [results]);

  const subTypeData = useMemo(() => {
    if (!results?.subType) return null;
    return careerTypes[results.subType as CareerTypeName];
  }, [results]);

  if (!results || !typeData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">診断結果がありません</p>
          <button onClick={() => router.push("/")} className="text-accent-orange hover:underline">
            トップに戻る
          </button>
        </div>
      </main>
    );
  }

  const handleShare = async () => {
    const text = `【CAREER GENOME TEST】\n私のキャリアタイプは「${typeData.name}（${typeData.nameJp}）」\n\n「${typeData.phrase}」\n\n#CareerGenomeTest #キャリア診断`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportData = async () => {
    const date = new Date().toISOString().split("T")[0];
    const id = `CGT-${Date.now().toString(36).toUpperCase()}`;
    const text = `===== CAREER GENOME 診断結果データ =====
ニックネーム: ${userInfo.nickname}
診断日: ${date}
診断ID: ${id}
バージョン: PAID

■ タイプ判定
メインタイプ: ${typeData.name} / ${typeData.nameJp}
${results.subType && subTypeData ? `サブタイプ: ${subTypeData.name} / ${subTypeData.nameJp}（差分${results.subTypeDiff}pt）` : "サブタイプ: なし"}

■ BIG5 スコア（0-100）
O（開放性）: ${results.big5.O}
C（誠実性）: ${results.big5.C}
E（外向性）: ${results.big5.E}
A（協調性）: ${results.big5.A}
N（安定性）: ${results.big5.N}

■ HR COMPETENCY スコア（0-100）
ACT（行動力）: ${results.hc.ACT}
THK（思考力）: ${results.hc.THK}
TMW（協働力）: ${results.hc.TMW}

■ 現在の適職 TOP3
${results.currentJobsTop3.map((j, i) => `${i + 1}. ${j.name}（適合率 ${j.fitRate}%）`).join("\n")}

■ 2030年適職 TOP3
${results.futureJobsTop3.map((j, i) => `${i + 1}. ${j.name}（適合率 ${j.fitRate}% / 需要指数 ${j.demandIndex} / リスク ${j.automationRisk}）`).join("\n")}

${results.riskAlert ? `■ キャリアリスクアラート
現職カテゴリ: ${results.riskAlert.category}
リスク判定: ${results.riskAlert.hasRisk ? "あり" : "なし"}
需要変動予測: ${results.riskAlert.hasRisk ? `-${results.riskAlert.demandDecline}%` : "安定"}` : ""}

■ キャリアコンテキスト
CC1 現職: ${results.ccAnswers.CC1 || "未回答"}
CC2 マネジメント: ${results.ccAnswers.CC2 || "未回答"}
CC3 業界残年数: ${results.ccAnswers.CC3 || "未回答"}
CC4 業界変更意欲: ${results.ccAnswers.CC4 || "未回答"}
CC5 最重視項目: ${results.ccAnswers.CC5 || "未回答"}
CC6 年収許容: ${results.ccAnswers.CC6 || "未回答"}
CC7 リモート志向: ${results.ccAnswers.CC7 || "未回答"}
CC8 学習時間: ${results.ccAnswers.CC8 || "未回答"}
CC9 AI興味度: ${results.ccAnswers.CC9 || "未回答"}
CC10 5年後理想: ${results.ccAnswers.CC10 || "未回答"}
==========================================`;
    await navigator.clipboard.writeText(text);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2000);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Section 1: Type Declaration */}
        <section className="text-center animate-fade-in py-8">
          <p className="text-text-muted text-sm font-mono mb-4">{userInfo.nickname} さんのキャリアタイプ</p>
          <div className="flex justify-center mb-4">
            <TypeIcon typeName={results.mainType as CareerTypeName} size="lg" />
          </div>
          <h1 className="font-heading-en text-4xl sm:text-5xl tracking-wider text-accent-purple mb-2">
            {typeData.name}
          </h1>
          <p className="text-text-secondary text-lg font-heading-jp mb-3">{typeData.nameJp}</p>
          <p className="text-accent-orange text-sm italic">{typeData.catch}</p>
        </section>

        {/* Section 2: Career Phrase */}
        <section className="card p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-orange" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent-orange" />
          <blockquote className="text-center py-4">
            <p className="text-text-primary text-lg sm:text-xl font-heading-jp leading-relaxed">
              「{typeData.phrase}」
            </p>
          </blockquote>
          <div className="text-center mt-4">
            <button
              onClick={handleShare}
              className="text-accent-orange text-sm hover:underline transition-colors"
            >
              {copied ? "✓ コピーしました" : "この結果をシェアする →"}
            </button>
          </div>
        </section>

        {/* Section 3: Genome Profile */}
        <section className="card p-6">
          <h2 className="font-heading-jp text-lg text-text-primary mb-4">あなたのキャリアDNA</h2>
          <p className="text-text-secondary text-sm leading-relaxed">{typeData.profile}</p>
        </section>

        {/* Section 4: Current Jobs TOP3 */}
        <section className="card p-6">
          <h2 className="font-heading-jp text-lg text-text-primary mb-1">いまのあなたに合う職種</h2>
          <p className="text-accent-green text-xs mb-4 font-mono">CURRENT CAREER MATCH</p>
          <div className="space-y-3">
            {results.currentJobsTop3.map((job, i) => (
              <div key={job.id} className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="font-heading-en text-xl text-accent-orange">{i + 1}</span>
                  <span className="text-text-primary text-sm">{job.name}</span>
                </div>
                <span className="font-mono text-accent-green text-sm">{job.fitRate}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Future Jobs TOP3 */}
        <section className="card p-6">
          <h2 className="font-heading-jp text-lg text-text-primary mb-1">2030年、あなたが輝く職種</h2>
          <p className="text-accent-blue text-xs mb-4 font-mono">FUTURE CAREER MATCH</p>
          <div className="space-y-3">
            {results.futureJobsTop3.map((job, i) => (
              <div key={job.id} className="py-3 px-4 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-heading-en text-xl text-accent-blue">{i + 1}</span>
                    <span className="text-text-primary text-sm">{job.name}</span>
                  </div>
                  <span className="font-mono text-accent-green text-sm">{job.fitRate}%</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="text-accent-blue">需要指数: {job.demandIndex}</span>
                  <span className={job.automationRisk > 20 ? "text-accent-red" : "text-accent-green"}>
                    自動化リスク: {job.automationRisk}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Risk Alert */}
        {results.riskAlert && (
          <section className="card p-6 border-accent-red/30">
            <h2 className="font-heading-jp text-lg text-text-primary mb-4 flex items-center gap-2">
              <span>⚠</span> キャリアリスクアラート
            </h2>
            {results.riskAlert.hasRisk ? (
              <div className="space-y-3">
                <p className="text-text-secondary text-sm">
                  <span className="text-accent-red font-bold">{results.riskAlert.category}</span> の需要は
                  <span className="text-accent-red font-mono"> -{results.riskAlert.demandDecline}%</span> の減少が予測されています。
                </p>
                <div>
                  <p className="text-text-muted text-xs mb-1">影響が懸念される職種:</p>
                  <div className="flex flex-wrap gap-2">
                    {results.riskAlert.decliningJobNames.map((name) => (
                      <span key={name} className="px-2 py-1 rounded bg-accent-red/10 text-accent-red text-xs">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-accent-blue text-sm mt-2">
                  → 推奨転換先: 上記の2030年適職TOP3をご参照ください
                </p>
              </div>
            ) : (
              <p className="text-accent-green text-sm">現在のキャリアカテゴリに大きなリスクは検出されませんでした。</p>
            )}
          </section>
        )}

        {/* Section 7: Skill Gap */}
        <section className="card p-6">
          <h2 className="font-heading-jp text-lg text-text-primary mb-4">スキルギャップ分析</h2>
          <div className="space-y-4">
            {[
              { label: "デジタルリテラシー", current: Math.min(results.big5.O, 80), target: 85 },
              { label: "データ分析力", current: Math.min(results.hc.THK, 75), target: 80 },
              { label: "リーダーシップ", current: Math.min(results.big5.E, 80), target: 75 },
              { label: "チーム協働力", current: Math.min(results.hc.TMW, 80), target: 80 },
              { label: "変化適応力", current: Math.round(Math.min(results.big5.O + results.big5.N, 160) / 2), target: 80 },
            ].map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">{skill.label}</span>
                  <span className="font-mono text-text-muted text-xs">
                    {Math.round(skill.current)} → {skill.target}
                  </span>
                </div>
                <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-accent-blue/30 rounded-full"
                    style={{ width: `${skill.target}%` }}
                  />
                  <div
                    className="absolute h-full bg-accent-orange rounded-full"
                    style={{ width: `${Math.round(skill.current)}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-text-muted text-xs mt-2">
              <span className="inline-block w-3 h-2 bg-accent-orange rounded mr-1" /> 現在のレベル
              <span className="inline-block w-3 h-2 bg-accent-blue/30 rounded mx-1 ml-4" /> 目標レベル
            </p>
          </div>
        </section>

        {/* Section 8: Strengths & Challenges */}
        <section className="card p-6">
          <h2 className="font-heading-jp text-lg text-text-primary mb-4">強み・課題</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-accent-green text-xs font-mono mb-2">STRENGTHS</p>
              <div className="flex flex-wrap gap-2">
                {typeData.strengths.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-accent-green/10 text-accent-green text-sm border border-accent-green/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-accent-red text-xs font-mono mb-2">CHALLENGES</p>
              <div className="flex flex-wrap gap-2">
                {typeData.challenges.map((c) => (
                  <span key={c} className="px-3 py-1.5 rounded-full bg-accent-red/10 text-accent-red text-sm border border-accent-red/20">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Sub Type */}
        {subTypeData && (
          <section className="card p-6">
            <h2 className="font-heading-jp text-lg text-text-primary mb-3">サブタイプ</h2>
            <div className="flex items-center gap-4">
              <TypeIcon typeName={results.subType as CareerTypeName} size="sm" />
              <div>
                <span className="font-heading-en text-2xl text-accent-purple">{subTypeData.name}</span>
                <span className="text-text-secondary text-sm ml-2">{subTypeData.nameJp}</span>
                <span className="text-text-muted text-xs font-mono ml-2">差分 {results.subTypeDiff}pt</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm mt-2 italic">{subTypeData.catch}</p>
          </section>
        )}

        {/* Section 10: BIG5 Detail (collapsible) */}
        <section className="card overflow-hidden">
          <button
            onClick={() => setBig5Open(!big5Open)}
            className="w-full p-6 flex justify-between items-center text-left hover:bg-white/2 transition-colors"
          >
            <h2 className="font-heading-jp text-lg text-text-primary">BIG5 スコア詳細</h2>
            <span className="text-text-muted text-xl">{big5Open ? "−" : "+"}</span>
          </button>
          {big5Open && (
            <div className="px-6 pb-6 animate-fade-in">
              <RadarChart scores={results.big5} />
              <div className="space-y-3 mt-4">
                {(["O", "C", "E", "A", "N"] as BIG5Factor[]).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: big5Labels[f].color }} />
                    <span className="text-text-secondary text-sm w-16">{big5Labels[f].jp}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${results.big5[f]}%`, backgroundColor: big5Labels[f].color }}
                      />
                    </div>
                    <span className="font-mono text-sm text-text-primary w-8 text-right">{results.big5[f]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Section 11: HC Detail (collapsible) */}
        <section className="card overflow-hidden">
          <button
            onClick={() => setHcOpen(!hcOpen)}
            className="w-full p-6 flex justify-between items-center text-left hover:bg-white/2 transition-colors"
          >
            <h2 className="font-heading-jp text-lg text-text-primary">HR COMPETENCY 詳細</h2>
            <span className="text-text-muted text-xl">{hcOpen ? "−" : "+"}</span>
          </button>
          {hcOpen && (
            <div className="px-6 pb-6 animate-fade-in">
              <HCBarChart scores={results.hc} />
            </div>
          )}
        </section>

        {/* Report Download */}
        <section className="card p-6 text-center">
          <h2 className="font-heading-jp text-lg text-text-primary mb-2">診断レポート</h2>
          <p className="text-text-muted text-xs mb-4">
            CAREER PROFILING PERSONAL GENOMEの診断結果をPDFでダウンロードできます
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setReportGenerating(true);
                const date = new Date().toISOString().split("T")[0];
                const id = `CP-${date.replace(/-/g, "")}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
                downloadReport({
                  nickname: userInfo.nickname,
                  results,
                  date,
                  diagnosisId: id,
                });
                setTimeout(() => setReportGenerating(false), 2000);
              }}
              disabled={reportGenerating}
              className="py-3 px-6 rounded-lg bg-accent-orange text-white text-sm font-heading-jp
                         hover:bg-opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {reportGenerating ? "生成中..." : "📄 レポートをダウンロード (PDF)"}
            </button>
            <button
              onClick={handleExportData}
              className="py-3 px-6 rounded-lg border border-accent-blue text-accent-blue text-sm
                         hover:bg-accent-blue/10 transition-all"
            >
              {exportCopied ? "✓ コピーしました" : "診断データをコピーする"}
            </button>
          </div>
        </section>

        {/* Section 12: CTA */}
        <section className="card p-8 text-center bg-gradient-to-br from-accent-orange/5 to-accent-purple/5 border-accent-orange/20">
          <h2 className="font-heading-jp text-xl text-text-primary mb-3">
            CAREER GENOME PROGRAMで、キャリアを実現する
          </h2>
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            AIスキル習得＋キャリア戦略＋応募書類作成を3ヶ月で完了
          </p>
          <button
            className="py-4 px-8 rounded-lg bg-accent-purple text-white font-heading-jp text-lg
                       hover:bg-opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg shadow-accent-purple/20"
          >
            プログラムの詳細を見る
          </button>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <button
            onClick={() => router.push("/")}
            className="text-text-muted text-xs hover:text-text-secondary transition-colors"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </main>
  );
}
