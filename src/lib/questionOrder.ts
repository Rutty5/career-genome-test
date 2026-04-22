import { BIG5_QUESTIONS, BC_QUESTIONS, CC_QUESTIONS, Question, ForcedChoiceQuestion } from "@/data/questions";
import { DiagnosisVersion } from "@/store/diagnosis";

// BC要素を前半・後半に分ける
const BC_FRONT_ELEMENTS = ["SH", "HK", "JK", "KH", "KK", "SZ"] as const;
const BC_BACK_ELEMENTS  = ["HS", "KC", "JN", "JH", "KR", "SC"] as const;

/**
 * 4セクション構成でシャッフルされた質問リストを返す
 *
 * S1: BIG5 25問 (因子インターリーブ: O1,C1,E1,A1,N1, O2,C2,...)
 * S2: BC前半 30問 (SH/HK/JK/KH/KK/SZ, 各5問インターリーブ)
 * S3: BC後半 30問 (HS/KC/JN/JH/KR/SC, 各5問インターリーブ)
 * S4: CC 10問 (CC1→CC10)
 */
export function getOrderedQuestions(_version: DiagnosisVersion): Question[] {
  const result: Question[] = [];

  // ── Section 1: BIG5 (因子インターリーブ) ──
  const big5ByFactor: Record<string, ForcedChoiceQuestion[]> = { O: [], C: [], E: [], A: [], N: [] };
  for (const q of BIG5_QUESTIONS) {
    if (q.factor) big5ByFactor[q.factor].push(q);
  }
  const maxBig5 = Math.max(...Object.values(big5ByFactor).map((a) => a.length));
  for (let i = 0; i < maxBig5; i++) {
    for (const factor of ["O", "C", "E", "A", "N"]) {
      if (i < big5ByFactor[factor].length) result.push(big5ByFactor[factor][i]);
    }
  }

  // ── Section 2: BC前半 (要素インターリーブ) ──
  const bcFrontByElement: Record<string, ForcedChoiceQuestion[]> = {};
  for (const el of BC_FRONT_ELEMENTS) bcFrontByElement[el] = [];
  for (const q of BC_QUESTIONS) {
    if (q.element && BC_FRONT_ELEMENTS.includes(q.element as typeof BC_FRONT_ELEMENTS[number])) {
      bcFrontByElement[q.element].push(q);
    }
  }
  const maxBcFront = Math.max(...Object.values(bcFrontByElement).map((a) => a.length));
  for (let i = 0; i < maxBcFront; i++) {
    for (const el of BC_FRONT_ELEMENTS) {
      if (i < bcFrontByElement[el].length) result.push(bcFrontByElement[el][i]);
    }
  }

  // ── Section 3: BC後半 (要素インターリーブ) ──
  const bcBackByElement: Record<string, ForcedChoiceQuestion[]> = {};
  for (const el of BC_BACK_ELEMENTS) bcBackByElement[el] = [];
  for (const q of BC_QUESTIONS) {
    if (q.element && BC_BACK_ELEMENTS.includes(q.element as typeof BC_BACK_ELEMENTS[number])) {
      bcBackByElement[q.element].push(q);
    }
  }
  const maxBcBack = Math.max(...Object.values(bcBackByElement).map((a) => a.length));
  for (let i = 0; i < maxBcBack; i++) {
    for (const el of BC_BACK_ELEMENTS) {
      if (i < bcBackByElement[el].length) result.push(bcBackByElement[el][i]);
    }
  }

  // ── Section 4: CC ──
  result.push(...CC_QUESTIONS);

  return result;
}

export function getSectionInfo(question: Question): {
  sectionLabel: string;
  sectionNum: 1 | 2 | 3 | 4;
} {
  if (question.section === "big5") return { sectionLabel: "あなたの性格特性について", sectionNum: 1 };
  if (question.section === "bc") {
    const element = (question as ForcedChoiceQuestion).element;
    if (element && BC_FRONT_ELEMENTS.includes(element as typeof BC_FRONT_ELEMENTS[number])) {
      return { sectionLabel: "ビジネスコンピテンシー（前半）", sectionNum: 2 };
    }
    return { sectionLabel: "ビジネスコンピテンシー（後半）", sectionNum: 3 };
  }
  return { sectionLabel: "あなたの現在の状況と希望について", sectionNum: 4 };
}

export function getSectionLabel(question: Question, _index: number, _total: number, _version: DiagnosisVersion): string {
  const orderedQuestions = getOrderedQuestions(_version);
  const { sectionLabel } = getSectionInfo(question);
  const sectionQs = orderedQuestions.filter((q) => getSectionInfo(q).sectionNum === getSectionInfo(question).sectionNum);
  const sectionIndex = sectionQs.findIndex((q) => q.id === question.id) + 1;
  return `${sectionLabel} ${sectionIndex}/${sectionQs.length}`;
}
