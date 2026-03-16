import { questions, Question } from "@/data/questions";
import { DiagnosisVersion } from "@/store/diagnosis";

/**
 * Generate ordered question list based on version.
 *
 * Paid order:
 *   Section 1: BIG5 25問 (factor shuffle: O1,C1,E1,A1,N1,O2,C2,E2,A2,N2...)
 *   Section 2: HC 15問 (axis shuffle: ACT1,THK1,TMW1,ACT2,THK2,TMW2...)
 *   Section 3: CC 10問 (CC1→CC10)
 *
 * Free order:
 *   Section 1: BIG5 15問 (free=true only, same shuffle)
 *   Section 2: HC 15問 (same)
 */
export function getOrderedQuestions(version: DiagnosisVersion): Question[] {
  const result: Question[] = [];

  // BIG5 section - shuffle by factor
  const big5Qs = questions.filter(
    (q) => q.section === "big5" && (version === "paid" || q.free)
  );
  const big5ByFactor: Record<string, Question[]> = { O: [], C: [], E: [], A: [], N: [] };
  for (const q of big5Qs) {
    if (q.factor) big5ByFactor[q.factor].push(q);
  }
  const maxBig5 = Math.max(...Object.values(big5ByFactor).map((arr) => arr.length));
  for (let i = 0; i < maxBig5; i++) {
    for (const factor of ["O", "C", "E", "A", "N"]) {
      if (i < big5ByFactor[factor].length) {
        result.push(big5ByFactor[factor][i]);
      }
    }
  }

  // HC section - shuffle by axis
  const hcQs = questions.filter((q) => q.section === "hc");
  const hcByAxis: Record<string, Question[]> = { ACT: [], THK: [], TMW: [] };
  for (const q of hcQs) {
    if (q.axis) hcByAxis[q.axis].push(q);
  }
  const maxHc = Math.max(...Object.values(hcByAxis).map((arr) => arr.length));
  for (let i = 0; i < maxHc; i++) {
    for (const axis of ["ACT", "THK", "TMW"]) {
      if (i < hcByAxis[axis].length) {
        result.push(hcByAxis[axis][i]);
      }
    }
  }

  // CC section (paid only)
  if (version === "paid") {
    const ccQs = questions.filter((q) => q.section === "cc");
    result.push(...ccQs);
  }

  return result;
}

export function getSectionLabel(question: Question, index: number, total: number, version: DiagnosisVersion): string {
  const orderedQuestions = getOrderedQuestions(version);
  const sectionQuestions = orderedQuestions.filter((q) => q.section === question.section);
  const sectionIndex = sectionQuestions.findIndex((q) => q.id === question.id) + 1;
  const sectionTotal = sectionQuestions.length;

  switch (question.section) {
    case "big5":
      return `あなたの性格特性について ${sectionIndex}/${sectionTotal}`;
    case "hc":
      return `仕事での行動パターンについて ${sectionIndex}/${sectionTotal}`;
    case "cc":
      return `あなたの現在の状況と希望について ${sectionIndex}/${sectionTotal}`;
    default:
      return "";
  }
}
