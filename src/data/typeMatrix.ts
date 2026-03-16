export type BIG5Factor = "O" | "C" | "E" | "A" | "N";
export type HCAxis = "ACT" | "THK" | "TMW";
export type CareerTypeName =
  | "PIONEER" | "INVENTOR" | "VISIONARY"
  | "EXECUTOR" | "STRATEGIST" | "GUARDIAN"
  | "CATALYST" | "ANALYST" | "COMMANDER"
  | "SUPPORTER" | "MEDIATOR" | "HARMONIZER"
  | "ANCHOR" | "INSPECTOR" | "STABILIZER";

export const typeMatrix: Record<BIG5Factor, Record<HCAxis, CareerTypeName>> = {
  O: { ACT: "PIONEER", THK: "INVENTOR", TMW: "VISIONARY" },
  C: { ACT: "EXECUTOR", THK: "STRATEGIST", TMW: "GUARDIAN" },
  E: { ACT: "CATALYST", THK: "ANALYST", TMW: "COMMANDER" },
  A: { ACT: "SUPPORTER", THK: "MEDIATOR", TMW: "HARMONIZER" },
  N: { ACT: "ANCHOR", THK: "INSPECTOR", TMW: "STABILIZER" },
};

export const big5TiebreakOrder: BIG5Factor[] = ["O", "E", "C", "A", "N"];
export const hcTiebreakOrder: HCAxis[] = ["ACT", "TMW", "THK"];

export const big5Labels: Record<BIG5Factor, { en: string; jp: string; color: string }> = {
  O: { en: "Openness", jp: "開放性", color: "#A855F7" },
  C: { en: "Conscientiousness", jp: "誠実性", color: "#3B82F6" },
  E: { en: "Extraversion", jp: "外向性", color: "#FF8C42" },
  A: { en: "Agreeableness", jp: "協調性", color: "#10B981" },
  N: { en: "Stability", jp: "安定性", color: "#94A3B8" },
};

export const hcLabels: Record<HCAxis, { en: string; jp: string; color: string }> = {
  ACT: { en: "Action", jp: "行動力", color: "#FF8C42" },
  THK: { en: "Thinking", jp: "思考力", color: "#3B82F6" },
  TMW: { en: "Teamwork", jp: "協働力", color: "#10B981" },
};
