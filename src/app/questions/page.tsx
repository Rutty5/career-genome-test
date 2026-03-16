"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/store/diagnosis";
import { getOrderedQuestions, getSectionLabel } from "@/lib/questionOrder";

const likertLabels = [
  "まったくそうではない",
  "そうではない",
  "あまりそうではない",
  "どちらともいえない",
  "ややそうである",
  "そうである",
  "非常にそうである",
];

export default function QuestionsPage() {
  const router = useRouter();
  const { version, answers, setAnswer, currentQuestion, setCurrentQuestion } = useDiagnosis();
  const orderedQuestions = useMemo(() => getOrderedQuestions(version), [version]);
  const total = orderedQuestions.length;
  const [direction, setDirection] = useState<"right" | "left">("right");

  const question = orderedQuestions[currentQuestion];
  const sectionLabel = question ? getSectionLabel(question, currentQuestion, total, version) : "";
  const currentAnswer = question ? answers[question.id] : undefined;

  const handleNext = useCallback(() => {
    if (currentAnswer === undefined) return;
    if (currentQuestion < total - 1) {
      setDirection("right");
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push("/loading-screen");
    }
  }, [currentAnswer, currentQuestion, total, setCurrentQuestion, router]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection("left");
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion, setCurrentQuestion]);

  const handleLikert = (value: number) => {
    if (question) setAnswer(question.id, value);
  };

  const handleSelect = (option: string) => {
    if (question) setAnswer(question.id, option);
  };

  if (!question) return null;

  const progress = ((currentQuestion + 1) / total) * 100;

  return (
    <main className="min-h-screen flex flex-col px-4 py-6 sm:py-12">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-text-muted text-xs font-mono">
            {currentQuestion + 1} / {total}
          </span>
          <span className="text-text-muted text-xs">
            {sectionLabel}
          </span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-orange rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 flex items-center justify-center">
        <div
          key={question.id}
          className={`card p-6 sm:p-8 w-full max-w-2xl ${
            direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
          }`}
        >
          {/* Question text */}
          <p className="text-text-primary text-base sm:text-lg leading-relaxed mb-8 font-heading-jp font-medium">
            {question.text}
          </p>

          {/* Answer area */}
          {question.type === "likert7" ? (
            <div className="space-y-4">
              {/* Scale labels */}
              <div className="hidden sm:flex justify-between text-text-muted text-xs mb-1">
                <span>{likertLabels[0]}</span>
                <span>{likertLabels[6]}</span>
              </div>
              {/* Buttons */}
              <div className="flex gap-2 sm:gap-3 justify-center">
                {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleLikert(val)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border text-sm font-mono transition-all duration-200 ${
                      currentAnswer === val
                        ? "border-accent-orange bg-accent-orange/20 text-accent-orange scale-110"
                        : "border-white/10 text-text-secondary hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              {/* Mobile labels */}
              <div className="flex sm:hidden justify-between text-text-muted text-[10px] mt-1">
                <span>そうでない</span>
                <span>どちらとも</span>
                <span>そうである</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left py-3 px-4 rounded-lg border text-sm transition-all duration-200 ${
                    currentAnswer === option
                      ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                      : "border-white/10 text-text-secondary hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-2xl mx-auto flex justify-between items-center mt-6 gap-4">
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className="py-3 px-6 rounded-lg border border-white/10 text-text-secondary text-sm
                     hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← 戻る
        </button>
        <button
          onClick={handleNext}
          disabled={currentAnswer === undefined}
          className={`py-3 px-8 rounded-lg text-sm font-heading-jp transition-all duration-200 ${
            currentAnswer !== undefined
              ? "bg-accent-orange text-white hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white/5 text-text-muted cursor-not-allowed"
          }`}
        >
          {currentQuestion === total - 1 ? "結果を見る →" : "次へ →"}
        </button>
      </div>
    </main>
  );
}
