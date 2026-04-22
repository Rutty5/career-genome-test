"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type DiagnosisVersion = "free" | "paid";

export interface UserInfo {
  nickname: string;
  ageRange: string;
  email: string;
}

export interface DiagnosisResults {
  big5: { O: number; C: number; E: number; A: number; N: number };
  hc: { ACT: number; THK: number; TMW: number };
  bc: { SH: number; HK: number; JK: number; KH: number; KK: number; SZ: number; HS: number; KC: number; JN: number; JH: number; KR: number; SC: number };
  bcCategory: { ACT: number; THK: number; TMW: number };
  mainType: string;
  subType: string | null;
  subTypeDiff: number | null;
  currentJobsTop3: { id: string; name: string; fitRate: number }[];
  futureJobsTop3: { id: string; name: string; fitRate: number; demandIndex: number; automationRisk: number }[];
  riskAlert: {
    hasRisk: boolean;
    category: string;
    demandDecline: number;
    decliningJobNames: string[];
  } | null;
  ccAnswers: Record<string, string | number>;
}

interface DiagnosisState {
  version: DiagnosisVersion;
  userInfo: UserInfo;
  answers: Record<string, number | string>;
  currentQuestion: number;
  results: DiagnosisResults | null;
  setVersion: (v: DiagnosisVersion) => void;
  setUserInfo: (info: UserInfo) => void;
  setAnswer: (questionId: string, value: number | string) => void;
  setCurrentQuestion: (n: number) => void;
  setResults: (r: DiagnosisResults) => void;
  reset: () => void;
}

const defaultUserInfo: UserInfo = { nickname: "", ageRange: "", email: "" };

// ── sessionStorage helpers ──
const STORAGE_KEY = "careerGenomeDiagnosis";

interface PersistedState {
  version: DiagnosisVersion;
  userInfo: UserInfo;
  answers: Record<string, number | string>;
  currentQuestion: number;
}

function loadPersistedState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function savePersistedState(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded — ignore */ }
}

function clearPersistedState() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

const DiagnosisContext = createContext<DiagnosisState | null>(null);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const persisted = loadPersistedState();

  const [version, setVersionRaw] = useState<DiagnosisVersion>(persisted?.version ?? "paid");
  const [userInfo, setUserInfoRaw] = useState<UserInfo>(persisted?.userInfo ?? defaultUserInfo);
  const [answers, setAnswers] = useState<Record<string, number | string>>(persisted?.answers ?? {});
  const [currentQuestion, setCurrentQuestionRaw] = useState(persisted?.currentQuestion ?? 0);
  const [results, setResults] = useState<DiagnosisResults | null>(null);

  // Persist to sessionStorage whenever key state changes
  useEffect(() => {
    savePersistedState({ version, userInfo, answers, currentQuestion });
  }, [version, userInfo, answers, currentQuestion]);

  const setVersion = useCallback((v: DiagnosisVersion) => { setVersionRaw(v); }, []);
  const setUserInfo = useCallback((info: UserInfo) => { setUserInfoRaw(info); }, []);
  const setCurrentQuestion = useCallback((n: number) => { setCurrentQuestionRaw(n); }, []);

  const setAnswer = useCallback((questionId: string, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const reset = useCallback(() => {
    setVersionRaw("paid");
    setUserInfoRaw(defaultUserInfo);
    setAnswers({});
    setCurrentQuestionRaw(0);
    setResults(null);
    clearPersistedState();
  }, []);

  return (
    <DiagnosisContext.Provider
      value={{
        version,
        userInfo,
        answers,
        currentQuestion,
        results,
        setVersion,
        setUserInfo,
        setAnswer,
        setCurrentQuestion,
        setResults,
        reset,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error("useDiagnosis must be used within DiagnosisProvider");
  return ctx;
}
