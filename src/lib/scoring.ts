import { DiagnosisVersion, DiagnosisResults } from "@/store/diagnosis";
import { BIG5Factor, HCAxis, typeMatrix, big5TiebreakOrder, hcTiebreakOrder, CareerTypeName } from "@/data/typeMatrix";
import { currentJobs, growthJobs, decliningJobs, categoryRiskMap, JobProfile } from "@/data/jobDatabase";

type BIG5Scores = Record<BIG5Factor, number>;
type HCScores = Record<HCAxis, number>;

// ══════════════════════════════════════════════════════════════
// BIG5 raw → normalized 0-100
// ══════════════════════════════════════════════════════════════
export function calculateBIG5(answers: Record<string, number | string>, version: DiagnosisVersion): BIG5Scores {
  const factors: BIG5Factor[] = ["O", "C", "E", "A", "N"];
  const result = {} as BIG5Scores;

  for (const f of factors) {
    const ids =
      version === "paid"
        ? [1, 2, 3, 4, 5].map((n) => `${f}${n}`)
        : [1, 2, 3].map((n) => `${f}${n}`);

    let answeredCount = 0;
    const raw = ids.reduce((sum, id) => {
      const val = Number(answers[id]);
      if (val >= 1 && val <= 7) {
        answeredCount++;
        return sum + val;
      }
      return sum + 4; // fallback only for genuinely missing answers
    }, 0);

    const min = ids.length; // all 1s
    const max = ids.length * 7; // all 7s
    result[f] = Math.round(((raw - min) / (max - min)) * 100);
  }
  return result;
}

// ══════════════════════════════════════════════════════════════
// HC raw → normalized 0-100
// ══════════════════════════════════════════════════════════════
export function calculateHC(answers: Record<string, number | string>): HCScores {
  const axes: HCAxis[] = ["ACT", "THK", "TMW"];
  const result = {} as HCScores;

  for (const a of axes) {
    const ids = [1, 2, 3, 4, 5].map((n) => `${a}${n}`);
    const raw = ids.reduce((sum, id) => {
      const val = Number(answers[id]);
      if (val >= 1 && val <= 7) return sum + val;
      return sum + 4;
    }, 0);
    result[a] = Math.round(((raw - 5) / (35 - 5)) * 100);
  }
  return result;
}

// ══════════════════════════════════════════════════════════════
// Type determination with tiebreak
// ══════════════════════════════════════════════════════════════
function getTopFactor(scores: BIG5Scores): BIG5Factor {
  let top: BIG5Factor = "O";
  let topScore = -1;
  for (const f of big5TiebreakOrder) {
    if (scores[f] > topScore) {
      topScore = scores[f];
      top = f;
    }
  }
  return top;
}

function getSecondFactor(scores: BIG5Scores, topFactor: BIG5Factor): { factor: BIG5Factor; diff: number } {
  let second: BIG5Factor = "O";
  let secondScore = -1;
  for (const f of big5TiebreakOrder) {
    if (f !== topFactor && scores[f] > secondScore) {
      secondScore = scores[f];
      second = f;
    }
  }
  return { factor: second, diff: scores[topFactor] - secondScore };
}

function getTopAxis(scores: HCScores): HCAxis {
  let top: HCAxis = "ACT";
  let topScore = -1;
  for (const a of hcTiebreakOrder) {
    if (scores[a] > topScore) {
      topScore = scores[a];
      top = a;
    }
  }
  return top;
}

export function determineType(big5: BIG5Scores, hc: HCScores): CareerTypeName {
  return typeMatrix[getTopFactor(big5)][getTopAxis(hc)];
}

export function determineSubType(
  big5: BIG5Scores,
  hc: HCScores
): { type: CareerTypeName; diff: number } | null {
  const topF = getTopFactor(big5);
  const { factor: secondF, diff } = getSecondFactor(big5, topF);
  if (diff <= 3) {
    const topA = getTopAxis(hc);
    return { type: typeMatrix[secondF][topA], diff };
  }
  return null;
}

// ══════════════════════════════════════════════════════════════
// Job matching — Improved fit formulas
// ══════════════════════════════════════════════════════════════

/**
 * BIG5 適合度: 平均絶対差を70で割り、0-100にスケーリング
 * - 完全一致(avgDiff=0) → 100%
 * - 平均差15pt → 79%
 * - 平均差25pt → 64%
 * - 平均差35pt → 50%
 * 旧: 100 - totalDiff/5 → 全てが80-90%に収束する問題を解消
 * 新: 除数55で差を増幅 → Top適職85%+、ミスマッチ30-45%
 */
function big5Fit(userBig5: BIG5Scores, ideal: JobProfile): number {
  const factors: BIG5Factor[] = ["O", "C", "E", "A", "N"];
  const totalDiff = factors.reduce((sum, f) => sum + Math.abs(userBig5[f] - ideal[f]), 0);
  const avgDiff = totalDiff / factors.length;
  return Math.round(Math.max(0, Math.min(100, 100 * (1 - avgDiff / 55))));
}

/**
 * HC 適合度: BIG5と同じスケーリング
 * 旧: 100 - totalDiff/3 → 差が圧縮される問題を解消
 * 新: 除数55で差を増幅
 */
function hcFit(userHC: HCScores, ideal: JobProfile): number {
  const axes: HCAxis[] = ["ACT", "THK", "TMW"];
  const totalDiff = axes.reduce((sum, a) => sum + Math.abs(userHC[a] - ideal[a]), 0);
  const avgDiff = totalDiff / axes.length;
  return Math.round(Math.max(0, Math.min(100, 100 * (1 - avgDiff / 55))));
}

/**
 * コンテキスト適合: CC回答10問中6問を活用
 * 旧: base=50 + CC4(±3) + CC9(±5) → ほぼ機能していなかった
 * 新: 管理経験・スキル学習・AI興味・リモート志向・業界変更意欲を反映
 */
function contextFit(
  ccAnswers: Record<string, string | number>,
  jobName: string,
  jobCategory: string
): number {
  let score = 50;

  // ── CC2: マネジメント経験 → 管理職マッチ ──
  const cc2 = String(ccAnswers["CC2"] || "");
  const isManagement = /マネージャー|部長|統括|責任者|ディレクター|COO|CFO/.test(jobName);
  if (isManagement) {
    if (cc2.includes("20名以上")) score += 15;
    else if (cc2.includes("6〜20名")) score += 10;
    else if (cc2.includes("5名以下")) score += 3;
    else score -= 10; // 管理経験なし
  }

  // ── CC4: 異業種への転職オープンさ (likert 1-7) ──
  const cc4 = Number(ccAnswers["CC4"]) || 4;
  score += (cc4 - 4) * 5; // ±15 range

  // ── CC7: リモートワーク志向 (likert 1-7) ──
  const cc7 = Number(ccAnswers["CC7"]) || 4;
  const isRemoteFriendly = /データ|AI|デジタル|コンサル|デザイン|クリエイ|ライター|プロダクト|サイエンティスト/.test(jobName);
  if (isRemoteFriendly) {
    score += (cc7 - 4) * 4; // ±12
  }

  // ── CC8: スキル学習時間 → 高スキル職マッチ ──
  const cc8 = String(ccAnswers["CC8"] || "");
  const isHighSkill = /エンジニア|研究|アーキテクト|サイエンティスト|バイオ|セキュリティ/.test(jobName);
  if (isHighSkill) {
    if (cc8.includes("10時間以上")) score += 12;
    else if (cc8.includes("5〜7時間")) score += 6;
    else if (cc8.includes("2〜3時間")) score += 0;
    else score -= 8;
  }

  // ── CC9: AI・テクノロジー興味 (likert 1-7) ──
  const cc9 = Number(ccAnswers["CC9"]) || 4;
  const isTechJob = /AI|DX|IT|データ|サイバー|クラウド|IoT|ブロックチェーン|デジタル|セキュリティ|ロボット|メタバース/.test(
    jobName + jobCategory
  );
  if (isTechJob) {
    score += (cc9 - 4) * 7; // ±21
  }

  // ── CC5: 重視項目 → 職種特性マッチ ──
  const cc5 = String(ccAnswers["CC5"] || "");
  if (cc5.includes("社会的意義")) {
    const isSocial = /福祉|カウンセラー|教育|コミュニティ|介護|看護|ライフキャリア|ファシリテーター/.test(jobName);
    if (isSocial) score += 10;
  } else if (cc5.includes("成長")) {
    const isGrowth = /コンサルタント|プロダクト|エンジニア|データ|研究/.test(jobName);
    if (isGrowth) score += 8;
  } else if (cc5.includes("安定")) {
    const isStable = /管理|事務|品質|インフラ|労務/.test(jobName);
    if (isStable) score += 8;
  }

  return Math.max(10, Math.min(95, score));
}

// ══════════════════════════════════════════════════════════════
// Current Job matching (現職マッチ)
// ══════════════════════════════════════════════════════════════
export function matchCurrentJobs(
  big5: BIG5Scores,
  hc: HCScores,
  ccAnswers: Record<string, string | number>,
  version: DiagnosisVersion
): { id: string; name: string; fitRate: number }[] {
  const scored = currentJobs.map((job) => {
    const b5 = big5Fit(big5, job.profile);
    const hcf = hcFit(hc, job.profile);
    let fitRate: number;
    if (version === "paid") {
      const cf = contextFit(ccAnswers, job.name, job.category);
      fitRate = b5 * 0.45 + hcf * 0.35 + cf * 0.20;
    } else {
      fitRate = b5 * 0.55 + hcf * 0.45;
    }
    return { id: job.id, name: job.name, fitRate: Math.round(fitRate) };
  });
  scored.sort((a, b) => b.fitRate - a.fitRate);
  return scored.slice(0, 3);
}

// ══════════════════════════════════════════════════════════════
// Future Job matching (2030適職マッチ)
// demandIndex/automationRiskは全ユーザー共通のため重みを抑制
// ══════════════════════════════════════════════════════════════
export function matchFutureJobs(
  big5: BIG5Scores,
  hc: HCScores,
  ccAnswers: Record<string, string | number>,
  version: DiagnosisVersion
): { id: string; name: string; fitRate: number; demandIndex: number; automationRisk: number }[] {
  const scored = growthJobs.map((job) => {
    const b5 = big5Fit(big5, job.profile);
    const hcf = hcFit(hc, job.profile);
    const riskInverse = 100 - job.automationRisk;
    let fitRate: number;
    if (version === "paid") {
      const cf = contextFit(ccAnswers, job.name, job.category);
      // 性格適合重視: b5+hcf=65%, コンテキスト=18%, 需要・リスク=17%
      fitRate = b5 * 0.35 + hcf * 0.30 + cf * 0.18 + job.demandIndex * 0.10 + riskInverse * 0.07;
    } else {
      fitRate = b5 * 0.40 + hcf * 0.35 + job.demandIndex * 0.15 + riskInverse * 0.10;
    }
    return {
      id: job.id,
      name: job.name,
      fitRate: Math.round(fitRate),
      demandIndex: job.demandIndex,
      automationRisk: job.automationRisk,
    };
  });
  scored.sort((a, b) => b.fitRate - a.fitRate);
  return scored.slice(0, 3);
}

// ══════════════════════════════════════════════════════════════
// Risk alert (衰退リスク)
// ══════════════════════════════════════════════════════════════
export function checkRiskAlert(
  cc1Answer: string
): DiagnosisResults["riskAlert"] {
  if (!cc1Answer) return null;
  const riskJobIds = categoryRiskMap[cc1Answer] || [];
  if (riskJobIds.length === 0) return { hasRisk: false, category: cc1Answer, demandDecline: 0, decliningJobNames: [] };

  const riskJobs = decliningJobs.filter((j) => riskJobIds.includes(j.id));
  const avgDecline = Math.round(riskJobs.reduce((s, j) => s + j.demandDeclinePercent, 0) / riskJobs.length);

  return {
    hasRisk: true,
    category: cc1Answer,
    demandDecline: avgDecline,
    decliningJobNames: riskJobs.map((j) => j.name),
  };
}

// ══════════════════════════════════════════════════════════════
// Full scoring pipeline
// ══════════════════════════════════════════════════════════════
export function computeResults(
  answers: Record<string, number | string>,
  version: DiagnosisVersion
): DiagnosisResults {
  const big5 = calculateBIG5(answers, version);
  const hc = calculateHC(answers);
  const mainType = determineType(big5, hc);
  const sub = version === "paid" ? determineSubType(big5, hc) : null;

  // Extract CC answers
  const ccAnswers: Record<string, string | number> = {};
  for (let i = 1; i <= 10; i++) {
    const key = `CC${i}`;
    if (answers[key] !== undefined) ccAnswers[key] = answers[key];
  }

  const currentJobsTop3 = matchCurrentJobs(big5, hc, ccAnswers, version);
  const futureJobsTop3 = matchFutureJobs(big5, hc, ccAnswers, version);
  const riskAlert = version === "paid" ? checkRiskAlert(String(ccAnswers["CC1"] || "")) : null;

  return {
    big5,
    hc,
    mainType,
    subType: sub?.type || null,
    subTypeDiff: sub?.diff ?? null,
    currentJobsTop3,
    futureJobsTop3,
    riskAlert,
    ccAnswers,
  };
}
