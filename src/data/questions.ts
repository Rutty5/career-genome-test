export type QuestionType = "likert7" | "select";

export interface Question {
  id: string;
  text: string;
  section: "big5" | "hc" | "cc";
  factor?: "O" | "C" | "E" | "A" | "N";
  axis?: "ACT" | "THK" | "TMW";
  free: boolean;
  type: QuestionType;
  options?: string[];
  reverse?: boolean; // true = 逆転項目 (8 - value)
}

export const questions: Question[] = [
  // ═══════════════════════════════════════════════════════════
  // BIG5 — Openness (開放性)
  // ═══════════════════════════════════════════════════════════
  { id: "O1", text: "業界の常識や前例がある場面でも、あえて新しいやり方を試すほうですか？", section: "big5", factor: "O", free: true, type: "likert7" },
  { id: "O2", text: "異業種の事例やまったく畑違いの知識から、仕事のヒントを得ることが多いですか？", section: "big5", factor: "O", free: true, type: "likert7" },
  { id: "O3", text: "仕事のやり方は実績のある方法を守り、あまり変えないほうですか？", section: "big5", factor: "O", free: true, type: "likert7", reverse: true },
  { id: "O4", text: "自分の専門外のテーマでも、時間をかけて深く調べようとするほうですか？", section: "big5", factor: "O", free: false, type: "likert7" },
  { id: "O5", text: "抽象的なアイデアより、すぐ使える具体的なノウハウのほうが価値があると思いますか？", section: "big5", factor: "O", free: false, type: "likert7", reverse: true },

  // ═══════════════════════════════════════════════════════════
  // BIG5 — Conscientiousness (誠実性)
  // ═══════════════════════════════════════════════════════════
  { id: "C1", text: "仕事の納期や約束は、多少無理をしてでも必ず守るほうですか？", section: "big5", factor: "C", free: true, type: "likert7" },
  { id: "C2", text: "プロジェクトを始める前に、段取りやスケジュールを細かく組み立てるほうですか？", section: "big5", factor: "C", free: true, type: "likert7" },
  { id: "C3", text: "細かい計画を立てるより、その場の状況に応じて柔軟に対応するほうが得意ですか？", section: "big5", factor: "C", free: true, type: "likert7", reverse: true },
  { id: "C4", text: "資料やデータの細かい部分が気になり、自分の目でチェックしないと落ち着かないほうですか？", section: "big5", factor: "C", free: false, type: "likert7" },
  { id: "C5", text: "締め切りにはある程度余裕を持って臨むより、ギリギリのほうが集中できるタイプですか？", section: "big5", factor: "C", free: false, type: "likert7", reverse: true },

  // ═══════════════════════════════════════════════════════════
  // BIG5 — Extraversion (外向性)
  // ═══════════════════════════════════════════════════════════
  { id: "E1", text: "会議や商談の場で、自分から積極的に発言するほうですか？", section: "big5", factor: "E", free: true, type: "likert7" },
  { id: "E2", text: "初対面の相手とでも、短時間で打ち解けて関係を築けるほうですか？", section: "big5", factor: "E", free: true, type: "likert7" },
  { id: "E3", text: "大人数の飲み会やイベントより、少人数でじっくり話すほうが好きですか？", section: "big5", factor: "E", free: true, type: "likert7", reverse: true },
  { id: "E4", text: "社内外の人脈を広げることに、時間やエネルギーを積極的に使うほうですか？", section: "big5", factor: "E", free: false, type: "likert7" },
  { id: "E5", text: "一人で黙々と作業に集中する時間のほうが、会議や交流の時間より充実感がありますか？", section: "big5", factor: "E", free: false, type: "likert7", reverse: true },

  // ═══════════════════════════════════════════════════════════
  // BIG5 — Agreeableness (協調性)
  // ═══════════════════════════════════════════════════════════
  { id: "A1", text: "チームの意見が割れたとき、自ら間に入って調整しようとするほうですか？", section: "big5", factor: "A", free: true, type: "likert7" },
  { id: "A2", text: "自分の成果よりも、チーム全体の成功を優先して動くほうですか？", section: "big5", factor: "A", free: true, type: "likert7" },
  { id: "A3", text: "仕事では相手の気持ちに配慮するより、正論をはっきり伝えることを優先しますか？", section: "big5", factor: "A", free: true, type: "likert7", reverse: true },
  { id: "A4", text: "相手の立場や感情を考えたうえで、伝え方やタイミングを調整するほうですか？", section: "big5", factor: "A", free: false, type: "likert7" },
  { id: "A5", text: "競争的な環境のほうが協力的な環境よりも自分の力を発揮しやすいですか？", section: "big5", factor: "A", free: false, type: "likert7", reverse: true },

  // ═══════════════════════════════════════════════════════════
  // BIG5 — Stability (安定性 / N reverse-coded)
  // ═══════════════════════════════════════════════════════════
  { id: "N1", text: "想定外のトラブルが発生しても、冷静に状況を整理して対応できるほうですか？", section: "big5", factor: "N", free: true, type: "likert7" },
  { id: "N2", text: "厳しいフィードバックを受けたとき、感情的にならず改善点として受け止められるほうですか？", section: "big5", factor: "N", free: true, type: "likert7" },
  { id: "N3", text: "仕事で大きな失敗をすると、数日間引きずって気分が落ち込むほうですか？", section: "big5", factor: "N", free: true, type: "likert7", reverse: true },
  { id: "N4", text: "仕事で失敗したとき、引きずるよりも「次にどうするか」に切り替えられるほうですか？", section: "big5", factor: "N", free: false, type: "likert7" },
  { id: "N5", text: "将来のキャリアや会社の先行きについて、漠然とした不安を感じることが多いですか？", section: "big5", factor: "N", free: false, type: "likert7", reverse: true },

  // ═══════════════════════════════════════════════════════════
  // HC — Action (行動力)
  // ═══════════════════════════════════════════════════════════
  { id: "ACT1", text: "方針が決まったら、細部が固まる前でもまず動き出すほうですか？", section: "hc", axis: "ACT", free: true, type: "likert7" },
  { id: "ACT2", text: "会議で結論が出たあと、最初にタスクに着手するのは自分であることが多いですか？", section: "hc", axis: "ACT", free: true, type: "likert7" },
  { id: "ACT3", text: "行動する前に、リスクや課題を十分に洗い出してから動くほうですか？", section: "hc", axis: "ACT", free: true, type: "likert7", reverse: true },
  { id: "ACT4", text: "複数のタスクを同時に抱えても、手が止まらずに処理し続けられるほうですか？", section: "hc", axis: "ACT", free: true, type: "likert7" },
  { id: "ACT5", text: "新しいツールやシステムが導入されたとき、説明書より先にまず触って覚えるほうですか？", section: "hc", axis: "ACT", free: true, type: "likert7" },

  // ═══════════════════════════════════════════════════════════
  // HC — Thinking (思考力)
  // ═══════════════════════════════════════════════════════════
  { id: "THK1", text: "問題が起きたとき、すぐに対処するよりまず原因の構造を整理したくなるほうですか？", section: "hc", axis: "THK", free: true, type: "likert7" },
  { id: "THK2", text: "報告書やプレゼン資料を作るとき、情報の論理構成に最も時間をかけるほうですか？", section: "hc", axis: "THK", free: true, type: "likert7" },
  { id: "THK3", text: "直感やひらめきを、データや論理的根拠よりも重視して判断することが多いですか？", section: "hc", axis: "THK", free: true, type: "likert7", reverse: true },
  { id: "THK4", text: "チーム内で意見が分かれたとき、感情より論理で判断すべきだと考えるほうですか？", section: "hc", axis: "THK", free: true, type: "likert7" },
  { id: "THK5", text: "業務改善のアイデアを出すとき、現状のデータ分析から始めるほうですか？", section: "hc", axis: "THK", free: true, type: "likert7" },

  // ═══════════════════════════════════════════════════════════
  // HC — Teamwork (協働力)
  // ═══════════════════════════════════════════════════════════
  { id: "TMW1", text: "プロジェクトの成功は、個人の能力より「チームの噛み合い」で決まると思いますか？", section: "hc", axis: "TMW", free: true, type: "likert7" },
  { id: "TMW2", text: "自分の担当外でも、チーム全体の進捗が気になって声をかけることが多いですか？", section: "hc", axis: "TMW", free: true, type: "likert7" },
  { id: "TMW3", text: "チームで動くより、一人で責任を持って完結させるほうが成果を出しやすいですか？", section: "hc", axis: "TMW", free: true, type: "likert7", reverse: true },
  { id: "TMW4", text: "チーム内に意見を言いにくそうな人がいたら、自分からその人に話を振るほうですか？", section: "hc", axis: "TMW", free: true, type: "likert7" },
  { id: "TMW5", text: "チームの成果を発表するとき、メンバー全員の貢献に言及するほうですか？", section: "hc", axis: "TMW", free: true, type: "likert7" },

  // ═══════════════════════════════════════════════════════════
  // Career Context (paid only)
  // ═══════════════════════════════════════════════════════════
  { id: "CC1", text: "現在（または直近）の職種カテゴリを選んでください", section: "cc", free: false, type: "select", options: ["営業・販売", "マーケティング・広報", "人事・総務・労務", "経理・財務・経営企画", "IT・エンジニア", "製造・生産管理", "物流・購買", "研究・開発", "医療・福祉・介護", "教育・研修", "クリエイティブ・デザイン", "その他"] },
  { id: "CC2", text: "マネジメント経験として、最も近いものを選んでください", section: "cc", free: false, type: "select", options: ["マネジメント経験なし", "5名以下のチーム", "6〜20名の部門", "20名以上の組織"] },
  { id: "CC3", text: "現在の業界にあと何年いる想定ですか？", section: "cc", free: false, type: "select", options: ["すぐにでも離れたい", "1〜2年以内", "3〜5年", "定年まで"] },
  { id: "CC4", text: "まったく異なる業界への転職に、どの程度オープンですか？", section: "cc", free: false, type: "likert7" },
  { id: "CC5", text: "転職先を選ぶとき、最も重視するものを1つ選んでください", section: "cc", free: false, type: "select", options: ["年収・報酬", "仕事のやりがい・成長", "ワークライフバランス", "企業の安定性・将来性", "社会的意義・貢献度"] },
  { id: "CC6", text: "転職時の年収変動について、許容できる範囲を選んでください", section: "cc", free: false, type: "select", options: ["年収アップが必須", "現状維持なら可", "10%減まで可", "20%減まで可", "やりがい重視で年収は問わない"] },
  { id: "CC7", text: "リモートワーク中心の働き方に、どの程度魅力を感じますか？", section: "cc", free: false, type: "likert7" },
  { id: "CC8", text: "新しいスキル習得に週何時間を確保できますか？", section: "cc", free: false, type: "select", options: ["ほぼ確保できない", "週2〜3時間", "週5〜7時間", "週10時間以上"] },
  { id: "CC9", text: "AI・テクノロジーを活用する仕事に、どの程度興味がありますか？", section: "cc", free: false, type: "likert7" },
  { id: "CC10", text: "5年後の理想の働き方に最も近いものを選んでください", section: "cc", free: false, type: "select", options: ["組織内でマネジメント", "組織内で専門職", "フリーランス・独立", "副業・パラレルワーク", "起業"] },
];

// Reverse question lookup (for scoring)
const reverseIds = new Set(questions.filter((q) => q.reverse).map((q) => q.id));
export function isReversed(questionId: string): boolean {
  return reverseIds.has(questionId);
}
