import jsPDF from "jspdf";
import { DiagnosisResults } from "@/store/diagnosis";
import { careerTypes } from "@/data/types";
import { big5Labels, BIG5Factor, CareerTypeName, hcLabels, HCAxis } from "@/data/typeMatrix";
import { registerJapaneseFont } from "@/lib/fontLoader";

interface ReportData {
  nickname: string;
  results: DiagnosisResults;
  date: string;
  diagnosisId: string;
}

export async function generateReport(data: ReportData): Promise<jsPDF> {
  const { nickname, results, date, diagnosisId } = data;
  const typeData = careerTypes[results.mainType as CareerTypeName];
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Register Japanese font for CJK character support
  await registerJapaneseFont(doc);

  const W = 210;
  const H = 297;
  const margin = 15;
  const contentW = W - margin * 2;

  // Colors
  const bgColor: [number, number, number] = [10, 15, 26]; // #0A0F1A
  const textWhite: [number, number, number] = [240, 240, 240];
  const textMuted: [number, number, number] = [160, 175, 195];
  const accentOrange: [number, number, number] = [255, 140, 66];
  const accentBlue: [number, number, number] = [59, 130, 246];
  const accentGreen: [number, number, number] = [16, 185, 129];
  const accentPurple: [number, number, number] = [168, 85, 247];
  const accentRed: [number, number, number] = [239, 68, 68];
  const cardBg: [number, number, number] = [20, 28, 45];

  // Helper: draw background
  function drawBackground() {
    doc.setFillColor(...bgColor);
    doc.rect(0, 0, W, H, "F");
  }

  // Helper: draw header
  function drawHeader(sheet: string, totalSheets: string) {
    doc.setFont("Meiryo", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...textMuted);
    doc.text("CAREER PROFILING", margin, 12);
    doc.text(sheet, W - margin, 12, { align: "right" });
    doc.setFont("Meiryo", "normal");

    doc.setFontSize(8);
    doc.text(`${nickname}  |  ${date}  |  ${diagnosisId}`, margin, 18);
  }

  // Helper: draw footer
  function drawFooter(sheetLabel: string) {
    doc.setFontSize(7);
    doc.setTextColor(...textMuted);
    doc.text("CAREER PROFILING by GCI Inc.  |  CONFIDENTIAL", margin, H - 8);
    doc.text(sheetLabel, W - margin, H - 8, { align: "right" });
  }

  // Helper: draw section title
  function drawSectionTitle(y: number, title: string, color: [number, number, number] = textWhite): number {
    doc.setFont("Meiryo", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...color);
    doc.text(title, margin, y);
    doc.setFont("Meiryo", "normal");
    return y + 8;
  }

  // Helper: draw a card background
  function drawCard(x: number, y: number, w: number, h: number) {
    doc.setFillColor(...cardBg);
    doc.setDrawColor(60, 70, 90);
    doc.setLineWidth(0.2);
    doc.roundedRect(x, y, w, h, 2, 2, "FD");
  }

  // Helper: draw horizontal bar
  function drawBar(x: number, y: number, w: number, h: number, value: number, maxVal: number, color: [number, number, number]) {
    doc.setFillColor(40, 48, 65);
    doc.roundedRect(x, y, w, h, 1.5, 1.5, "F");
    const fillW = (value / maxVal) * w;
    doc.setFillColor(...color);
    doc.roundedRect(x, y, fillW, h, 1.5, 1.5, "F");
  }

  // ════════════════════════════════════════
  // PAGE 1: PERSONAL GENOME
  // ════════════════════════════════════════
  drawBackground();
  drawHeader("PERSONAL GENOME — SHEET 1 of 3", "Sheet 1/3");

  let y = 28;

  // Type declaration
  doc.setFont("Meiryo", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...accentPurple);
  doc.text(typeData.name, W / 2, y, { align: "center" });
  y += 10;

  doc.setFontSize(16);
  doc.setTextColor(...textWhite);
  doc.text(typeData.nameJp, W / 2, y, { align: "center" });
  y += 9;

  doc.setFont("Meiryo", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...accentOrange);
  doc.text(`"${typeData.catch}"`, W / 2, y, { align: "center" });
  y += 14;

  // GENOME PROFILE
  y = drawSectionTitle(y, "GENOME PROFILE");
  drawCard(margin, y, contentW, 28);
  doc.setFontSize(10);
  doc.setTextColor(...textWhite);
  const profileLines = doc.splitTextToSize(typeData.profile, contentW - 10);
  doc.text(profileLines, margin + 5, y + 7);
  y += 32;

  // STRENGTHS & CHALLENGES
  const halfW = (contentW - 6) / 2;

  y = drawSectionTitle(y, "STRENGTHS");
  drawCard(margin, y, halfW, 18);
  doc.setFontSize(10);
  doc.setTextColor(...accentGreen);
  typeData.strengths.forEach((s, i) => {
    doc.text(`● ${s}`, margin + 5, y + 6 + i * 5.5);
  });

  doc.setFontSize(12);
  doc.setTextColor(...textWhite);
  doc.text("CHALLENGES", margin + halfW + 6, y - 6);
  drawCard(margin + halfW + 6, y, halfW, 18);
  doc.setFontSize(10);
  doc.setTextColor(...accentRed);
  typeData.challenges.forEach((c, i) => {
    doc.text(`▲ ${c}`, margin + halfW + 11, y + 6 + i * 5.5);
  });
  y += 24;

  // BIG5 PERSONALITY
  y = drawSectionTitle(y, "BIG5 PERSONALITY");

  const big5Factors: BIG5Factor[] = ["O", "C", "E", "A", "N"];
  const big5Colors: Record<string, [number, number, number]> = {
    O: [168, 85, 247],
    C: [59, 130, 246],
    E: [255, 140, 66],
    A: [16, 185, 129],
    N: [148, 163, 184],
  };

  big5Factors.forEach((f, i) => {
    const by = y + i * 12;
    doc.setFontSize(10);
    doc.setTextColor(...textMuted);
    doc.text(`${f}  ${big5Labels[f].jp}`, margin, by + 4);

    drawBar(margin + 35, by, contentW - 55, 6, results.big5[f], 100, big5Colors[f]);

    doc.setFont("Meiryo", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...big5Colors[f]);
    doc.text(`${results.big5[f]}`, W - margin, by + 4, { align: "right" });
    doc.setFont("Meiryo", "normal");
  });
  y += 66;

  // BUSINESS COMPETENCY 3-AXIS
  y = drawSectionTitle(y, "BUSINESS COMPETENCY 3-AXIS");

  const hcAxes: HCAxis[] = ["ACT", "THK", "TMW"];
  const hcColors: Record<string, [number, number, number]> = {
    ACT: [255, 140, 66],
    THK: [59, 130, 246],
    TMW: [16, 185, 129],
  };
  const hcJpLabels: Record<string, string> = {
    ACT: "ACT  行動力・実行力",
    THK: "THK  思考力・分析力",
    TMW: "TMW  協働力・チームワーク",
  };

  hcAxes.forEach((a, i) => {
    const ay = y + i * 12;
    doc.setFontSize(10);
    doc.setTextColor(...textMuted);
    doc.text(hcJpLabels[a], margin, ay + 4);

    drawBar(margin + 55, ay, contentW - 75, 6, results.hc[a], 100, hcColors[a]);

    doc.setFont("Meiryo", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...hcColors[a]);
    doc.text(`${results.hc[a]}%`, W - margin, ay + 4, { align: "right" });
    doc.setFont("Meiryo", "normal");
  });

  drawFooter("Sheet 1/3 — PERSONAL GENOME");

  // ════════════════════════════════════════
  // PAGE 2: CAREER STRATEGY MAP
  // ════════════════════════════════════════
  doc.addPage();
  drawBackground();
  drawHeader("CAREER STRATEGY MAP — SHEET 2 of 3", "Sheet 2/3");

  y = 24;

  // Type info line
  doc.setFontSize(10);
  doc.setTextColor(...textMuted);
  doc.text(`${typeData.name} / ${typeData.nameJp}`, margin, y);
  y += 10;

  // CURRENT JOB MATCH
  y = drawSectionTitle(y, "CURRENT JOB MATCH");
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  doc.text("いまのあなたに合う職種", margin + 58, y - 8);

  results.currentJobsTop3.forEach((job, i) => {
    drawCard(margin, y, contentW, 14);
    doc.setFont("Meiryo", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...accentOrange);
    doc.text(`${i + 1}`, margin + 6, y + 10);

    doc.setFontSize(12);
    doc.setTextColor(...textWhite);
    doc.text(job.name, margin + 18, y + 7);

    doc.setFontSize(14);
    doc.setTextColor(...accentGreen);
    doc.text(`${job.fitRate}%`, W - margin - 5, y + 10, { align: "right" });
    doc.setFont("Meiryo", "normal");

    y += 17;
  });
  y += 5;

  // 2030 JOB MATCH
  y = drawSectionTitle(y, "2030 JOB MATCH");
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  doc.text("2030年、あなたが輝く職種", margin + 46, y - 8);

  results.futureJobsTop3.forEach((job, i) => {
    drawCard(margin, y, contentW, 18);
    doc.setFont("Meiryo", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...accentBlue);
    doc.text(`${i + 1}`, margin + 6, y + 10);

    doc.setFontSize(12);
    doc.setTextColor(...textWhite);
    doc.text(job.name, margin + 18, y + 7);

    doc.setFontSize(14);
    doc.setTextColor(...accentGreen);
    doc.text(`${job.fitRate}%`, W - margin - 5, y + 10, { align: "right" });
    doc.setFont("Meiryo", "normal");

    // Demand and risk
    doc.setFontSize(8);
    doc.setTextColor(...accentBlue);
    doc.text(`需要 ↑${job.demandIndex}`, margin + 18, y + 14);

    const riskColor = job.automationRisk > 20 ? accentRed : accentGreen;
    doc.setTextColor(...riskColor);
    const riskLabel = job.automationRisk <= 15 ? "低" : job.automationRisk <= 30 ? "中" : "高";
    doc.text(`自動化リスク ${riskLabel}`, margin + 55, y + 14);

    y += 21;
  });
  y += 5;

  // CAREER RISK ALERT
  if (results.riskAlert && results.riskAlert.hasRisk) {
    doc.setFontSize(12);
    doc.setTextColor(...accentRed);
    doc.text("⚠  CAREER RISK ALERT", margin, y);
    y += 8;
    drawCard(margin, y, contentW, 24);
    doc.setFontSize(10);
    doc.setTextColor(...textWhite);
    const riskText = `現職カテゴリ「${results.riskAlert.category}」は、2030年までに需要が ▼${results.riskAlert.demandDecline}%減少 する見込みです。早期のスキル転換を推奨します。`;
    const riskLines = doc.splitTextToSize(riskText, contentW - 10);
    doc.text(riskLines, margin + 5, y + 7);

    doc.setFontSize(9);
    doc.setTextColor(...accentBlue);
    doc.text("推奨キャリア転換先:", margin + 5, y + 18);
    const recJobs = results.futureJobsTop3.map(j => j.name).join("  |  ");
    doc.text(recJobs, margin + 40, y + 18);
    y += 28;
  }

  // SKILL GAP ANALYSIS
  y = drawSectionTitle(y, "SKILL GAP ANALYSIS");
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  doc.text("現在 → 2030年目標", margin + 52, y - 8);

  const skillGaps = [
    { label: "AI活用スキル", current: Math.round(Math.min(results.big5.O * 0.5, 50)), target: 75 },
    { label: "データ分析", current: Math.round(Math.min(results.hc.THK * 0.6, 50)), target: 70 },
    { label: "対人支援力", current: Math.round(Math.min(results.hc.TMW * 0.9, 85)), target: 85 },
    { label: "組織設計知識", current: Math.round(Math.min(results.big5.C * 0.4, 40)), target: 65 },
    { label: "プロジェクト管理", current: Math.round(Math.min(results.hc.ACT * 0.7, 60)), target: 80 },
  ];

  skillGaps.forEach((skill, i) => {
    const sy = y + i * 10;
    doc.setFontSize(10);
    doc.setTextColor(...textMuted);
    doc.text(`${i + 1}. ${skill.label}`, margin, sy + 4);

    // Target bar (background)
    drawBar(margin + 45, sy, contentW - 68, 5, skill.target, 100, [45, 55, 80]);
    // Current bar (foreground)
    drawBar(margin + 45, sy, contentW - 68, 5, skill.current, 100, accentOrange);

    doc.setFontSize(9);
    doc.setTextColor(...textMuted);
    doc.text(`${skill.current} → ${skill.target}`, W - margin, sy + 4, { align: "right" });
  });

  drawFooter("Sheet 2/3 — CAREER STRATEGY MAP");

  // ════════════════════════════════════════
  // PAGE 3: RESULT GUIDE
  // ════════════════════════════════════════
  doc.addPage();
  drawBackground();
  drawHeader("あなたの診断結果ガイド — SHEET 3 of 3", "Sheet 3/3");

  y = 24;
  doc.setFontSize(10);
  doc.setTextColor(...textMuted);
  doc.text(`${typeData.name} / ${typeData.nameJp}`, margin, y);
  y += 12;

  // Type explanation title
  doc.setFont("Meiryo", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...accentPurple);
  doc.text(`${typeData.name}（${typeData.nameJp}）`, margin, y);
  y += 12;
  doc.setFont("Meiryo", "normal");

  // Profile in detail
  doc.setFontSize(11);
  doc.setTextColor(...textWhite);
  const guideProfile = doc.splitTextToSize(typeData.profile, contentW);
  doc.text(guideProfile, margin, y);
  y += guideProfile.length * 6 + 10;

  // Strengths section
  y = drawSectionTitle(y, "あなたの強みと働き方の特徴");
  y += 2;

  doc.setFontSize(11);
  doc.setTextColor(...accentGreen);
  doc.text("あなたの強み", margin, y);
  y += 7;

  doc.setFontSize(10);
  doc.setTextColor(...textWhite);
  typeData.strengths.forEach((s) => {
    doc.text(`●  ${s}`, margin + 5, y);
    y += 6;
  });
  y += 4;

  doc.setFontSize(11);
  doc.setTextColor(...accentRed);
  doc.text("気をつけたいこと", margin, y);
  y += 7;

  doc.setTextColor(...textWhite);
  doc.setFontSize(10);
  typeData.challenges.forEach((c) => {
    doc.text(`▲  ${c}`, margin + 5, y);
    y += 6;
  });
  y += 8;

  // Current jobs explanation
  y = drawSectionTitle(y, "いまの適職と、これからの選択肢");
  y += 4;

  doc.setFontSize(11);
  doc.setTextColor(...accentGreen);
  doc.text("いま、あなたに合う仕事", margin, y);
  y += 7;

  doc.setFontSize(10);
  doc.setTextColor(...textWhite);
  results.currentJobsTop3.forEach((job, i) => {
    doc.text(`${i + 1}位  ${job.name} (適合 ${job.fitRate}%)`, margin + 5, y);
    y += 6;
  });
  y += 5;

  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  const currentExplain = "いずれも「人を支え、導く」仕事であり、あなたの本質的な強みが直接活きる領域です。";
  const currentLines = doc.splitTextToSize(currentExplain, contentW - 10);
  doc.text(currentLines, margin + 5, y);
  y += currentLines.length * 5 + 8;

  // Future jobs explanation
  doc.setFontSize(11);
  doc.setTextColor(...accentBlue);
  doc.text("2030年に向けて、目指せる仕事", margin, y);
  y += 7;

  doc.setFontSize(10);
  doc.setTextColor(...textWhite);
  results.futureJobsTop3.forEach((job, i) => {
    doc.text(`${i + 1}位  ${job.name} (適合 ${job.fitRate}%)`, margin + 5, y);
    y += 6;
  });
  y += 5;

  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  const futureExplain = "いずれも「人の課題をテクノロジーで解決する」新しい支援職です。共感力×AIで市場価値が高まります。";
  const futureLines = doc.splitTextToSize(futureExplain, contentW - 10);
  doc.text(futureLines, margin + 5, y);
  y += futureLines.length * 5 + 10;

  // Personal message
  y = drawSectionTitle(y, "あなたへのメッセージ");
  y += 4;

  drawCard(margin, y, contentW, 45);
  doc.setFontSize(10);
  doc.setTextColor(...textWhite);

  const message = `あなたの診断結果は、あなたのキャリアの最大の武器をはっきりと示しています。これまでのご経験で培われた力は、AIには代替できない、人間だけが持つ価値です。ここにAI活用スキルを加えることで、2030年以降も必要とされ続ける希少な人材ポジションを築くことができます。大切なのは、過去の延長で考えるのではなく、「未来から逆算して、いま何を始めるか」です。`;

  const msgLines = doc.splitTextToSize(message, contentW - 10);
  doc.text(msgLines, margin + 5, y + 7);

  y += 50;
  doc.setFont("Meiryo", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...accentOrange);
  doc.text("Will × Can × Must × Need  ──  あなたのキャリアを、データで科学する。", W / 2, y, { align: "center" });
  doc.setFont("Meiryo", "normal");

  // Data sources
  y += 10;
  doc.setFontSize(7);
  doc.setTextColor(...textMuted);
  doc.text("WEF Future of Jobs Report 2025  |  McKinsey Global Institute  |  NRI × Oxford 日本版自動化リスク  |  経済産業省 IT人材需給調査", margin, y);
  y += 5;
  doc.text("CAREER GENOME (BIG5 × BUSINESS COMPETENCY)", margin, y);

  drawFooter("Sheet 3/3 — RESULT GUIDE");

  return doc;
}

export function downloadReport(data: ReportData) {
  generateReport(data).then((doc) => {
    const namePart = data.nickname ? `_${data.nickname}` : "";
    const filename = `career_profiling${namePart}_${data.date.replace(/-/g, "")}.pdf`;
    doc.save(filename);
  });
}
