import type { Metadata } from "next";
import "./globals.css";
import { DiagnosisProvider } from "@/store/diagnosis";

export const metadata: Metadata = {
  title: "CAREER GENOME TEST - キャリアを科学する",
  description:
    "BIG5性格分析 × BUSINESS COMPETENCYであなたのキャリアDNAを解読。15のキャリアタイプを判定し、現在と2030年の適職をマッチング。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <DiagnosisProvider>{children}</DiagnosisProvider>
      </body>
    </html>
  );
}
