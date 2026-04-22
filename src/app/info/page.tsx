"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/store/diagnosis";

export default function InfoPage() {
  const router = useRouter();
  const { setUserInfo } = useDiagnosis();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("お名前を入力してください");
      return;
    }
    setError("");
    setUserInfo({ nickname: nickname.trim(), ageRange: "", email: email.trim() });
    router.push("/questions");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <p className="text-text-muted font-mono text-sm mb-2">FULL DIAGNOSIS</p>
          <h1 className="font-heading-en text-3xl tracking-wider text-text-primary mb-2">
            BASIC INFO
          </h1>
          <p className="text-text-secondary text-sm">
            診断に必要な基本情報を入力してください
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-6">
          {/* Nickname */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              お名前（フルネーム） <span className="text-accent-red text-xs">必須</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="例：山田 太郎"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary
                         placeholder:text-text-muted focus:outline-none focus:border-accent-orange/50
                         transition-colors"
              maxLength={30}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              メールアドレス <span className="text-text-muted text-xs">任意・結果送付用</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary
                         placeholder:text-text-muted focus:outline-none focus:border-accent-orange/50
                         transition-colors"
            />
          </div>

          {error && (
            <p className="text-accent-red text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-accent-orange text-white font-heading-jp text-lg
                       hover:bg-opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            診断を始める
          </button>

          <p className="text-text-muted text-xs text-center leading-relaxed">
            個人情報は診断結果の表示・送付のみに使用します
          </p>
        </form>
      </div>
    </main>
  );
}
