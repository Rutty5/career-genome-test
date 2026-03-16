"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type DiagnosisVersion = "free" | "paid";

export interface UserInfo {
  nickname: string;
  ageRange: string;
  email: string;
}

export interface DiagnosisResults {
  big5: { O: number; C: number; E: number; A: number; N: number };
  hc: { ACT: number; THK: number; TMW: number };
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

const DiagnosisContext = createContext<DiagnosisState | null>(null);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<DiagnosisVersion>("paid");
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<DiagnosisResults | null>(null);

  const setAnswer = useCallback((questionId: string, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const reset = useCallback(() => {
    setVersion("paid");
    setUserInfo(defaultUserInfo);
    setAnswers({});
    setCurrentQuestion(0);
    setResults(null);
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
