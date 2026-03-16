export interface JobProfile {
  O: number;
  C: number;
  E: number;
  A: number;
  N: number;
  ACT: number;
  THK: number;
  TMW: number;
}

export interface CurrentJob {
  id: string;
  name: string;
  category: string;
  profile: JobProfile;
}

export interface GrowthJob {
  id: string;
  name: string;
  category: string;
  profile: JobProfile;
  demandIndex: number;
  automationRisk: number;
}

export interface DecliningJob {
  id: string;
  name: string;
  category: string;
  demandDeclinePercent: number;
}

export const currentJobs: CurrentJob[] = [
  // カテゴリ1: 営業・ビジネス開発 (5)
  { id: "N-01", name: "法人営業マネージャー", category: "営業・ビジネス開発", profile: { O: 55, C: 70, E: 85, A: 65, N: 70, ACT: 80, THK: 55, TMW: 65 } },
  { id: "N-02", name: "ソリューション営業", category: "営業・ビジネス開発", profile: { O: 65, C: 65, E: 80, A: 70, N: 65, ACT: 75, THK: 65, TMW: 60 } },
  { id: "N-03", name: "事業開発・アライアンス", category: "営業・ビジネス開発", profile: { O: 80, C: 60, E: 80, A: 65, N: 65, ACT: 75, THK: 70, TMW: 65 } },
  { id: "N-04", name: "カスタマーサクセス", category: "営業・ビジネス開発", profile: { O: 60, C: 70, E: 70, A: 80, N: 65, ACT: 70, THK: 60, TMW: 80 } },
  { id: "N-05", name: "営業企画・推進", category: "営業・ビジネス開発", profile: { O: 60, C: 75, E: 65, A: 60, N: 70, ACT: 65, THK: 75, TMW: 60 } },
  // カテゴリ2: マーケティング・広報 (5)
  { id: "N-06", name: "マーケティングマネージャー", category: "マーケティング・広報", profile: { O: 75, C: 65, E: 75, A: 60, N: 65, ACT: 70, THK: 75, TMW: 60 } },
  { id: "N-07", name: "デジタルマーケティング", category: "マーケティング・広報", profile: { O: 75, C: 65, E: 60, A: 55, N: 65, ACT: 70, THK: 80, TMW: 50 } },
  { id: "N-08", name: "広報・PR", category: "マーケティング・広報", profile: { O: 70, C: 65, E: 80, A: 70, N: 65, ACT: 65, THK: 60, TMW: 75 } },
  { id: "N-09", name: "ブランドマネージャー", category: "マーケティング・広報", profile: { O: 80, C: 65, E: 70, A: 60, N: 65, ACT: 65, THK: 75, TMW: 60 } },
  { id: "N-10", name: "CRM・顧客分析", category: "マーケティング・広報", profile: { O: 60, C: 75, E: 50, A: 60, N: 70, ACT: 55, THK: 85, TMW: 50 } },
  // カテゴリ3: 人事・組織開発 (5)
  { id: "N-11", name: "人事マネージャー", category: "人事・組織開発", profile: { O: 60, C: 70, E: 70, A: 80, N: 70, ACT: 65, THK: 65, TMW: 80 } },
  { id: "N-12", name: "採用責任者", category: "人事・組織開発", profile: { O: 65, C: 65, E: 80, A: 75, N: 65, ACT: 75, THK: 55, TMW: 75 } },
  { id: "N-13", name: "組織開発・研修企画", category: "人事・組織開発", profile: { O: 75, C: 65, E: 70, A: 75, N: 65, ACT: 60, THK: 70, TMW: 80 } },
  { id: "N-14", name: "労務・コンプライアンス", category: "人事・組織開発", profile: { O: 40, C: 85, E: 50, A: 65, N: 80, ACT: 55, THK: 80, TMW: 55 } },
  { id: "N-15", name: "ダイバーシティ推進", category: "人事・組織開発", profile: { O: 75, C: 60, E: 70, A: 85, N: 65, ACT: 60, THK: 60, TMW: 85 } },
  // カテゴリ4: 経営・企画 (4)
  { id: "N-16", name: "経営企画", category: "経営・企画", profile: { O: 70, C: 75, E: 65, A: 55, N: 75, ACT: 60, THK: 85, TMW: 55 } },
  { id: "N-17", name: "事業企画・新規事業", category: "経営・企画", profile: { O: 85, C: 60, E: 75, A: 55, N: 65, ACT: 80, THK: 75, TMW: 55 } },
  { id: "N-18", name: "CFO・財務部長", category: "経営・企画", profile: { O: 50, C: 85, E: 60, A: 50, N: 80, ACT: 55, THK: 90, TMW: 50 } },
  { id: "N-19", name: "COO・業務統括", category: "経営・企画", profile: { O: 60, C: 80, E: 75, A: 60, N: 75, ACT: 80, THK: 70, TMW: 70 } },
  // カテゴリ5: IT・テクノロジー (5)
  { id: "N-20", name: "プロジェクトマネージャー（IT）", category: "IT・テクノロジー", profile: { O: 60, C: 80, E: 70, A: 65, N: 75, ACT: 75, THK: 70, TMW: 75 } },
  { id: "N-21", name: "システムアーキテクト", category: "IT・テクノロジー", profile: { O: 80, C: 75, E: 50, A: 50, N: 70, ACT: 55, THK: 90, TMW: 45 } },
  { id: "N-22", name: "インフラエンジニア", category: "IT・テクノロジー", profile: { O: 50, C: 85, E: 40, A: 55, N: 80, ACT: 65, THK: 80, TMW: 50 } },
  { id: "N-23", name: "セキュリティエンジニア", category: "IT・テクノロジー", profile: { O: 55, C: 85, E: 40, A: 50, N: 85, ACT: 60, THK: 85, TMW: 45 } },
  { id: "N-24", name: "ITコンサルタント", category: "IT・テクノロジー", profile: { O: 70, C: 70, E: 75, A: 60, N: 70, ACT: 70, THK: 80, TMW: 60 } },
  // カテゴリ6: 製造・品質管理 (4)
  { id: "N-25", name: "生産管理マネージャー", category: "製造・品質管理", profile: { O: 45, C: 85, E: 60, A: 60, N: 80, ACT: 75, THK: 70, TMW: 65 } },
  { id: "N-26", name: "品質管理・QA", category: "製造・品質管理", profile: { O: 40, C: 90, E: 45, A: 55, N: 85, ACT: 60, THK: 85, TMW: 50 } },
  { id: "N-27", name: "購買・調達マネージャー", category: "製造・品質管理", profile: { O: 50, C: 75, E: 65, A: 65, N: 75, ACT: 70, THK: 70, TMW: 60 } },
  { id: "N-28", name: "工場長・製造統括", category: "製造・品質管理", profile: { O: 50, C: 80, E: 70, A: 65, N: 80, ACT: 80, THK: 65, TMW: 70 } },
  // カテゴリ7: 教育・医療・福祉 (4)
  { id: "N-29", name: "研修講師・企業内教育", category: "教育・医療・福祉", profile: { O: 70, C: 65, E: 80, A: 80, N: 65, ACT: 65, THK: 60, TMW: 80 } },
  { id: "N-30", name: "キャリアカウンセラー", category: "教育・医療・福祉", profile: { O: 65, C: 60, E: 65, A: 85, N: 70, ACT: 55, THK: 65, TMW: 85 } },
  { id: "N-31", name: "医療事務管理", category: "教育・医療・福祉", profile: { O: 40, C: 85, E: 55, A: 70, N: 75, ACT: 60, THK: 70, TMW: 65 } },
  { id: "N-32", name: "福祉施設管理者", category: "教育・医療・福祉", profile: { O: 50, C: 75, E: 65, A: 85, N: 70, ACT: 65, THK: 55, TMW: 80 } },
  // カテゴリ8: クリエイティブ・専門職 (3)
  { id: "N-33", name: "クリエイティブディレクター", category: "クリエイティブ・専門職", profile: { O: 90, C: 55, E: 75, A: 55, N: 60, ACT: 70, THK: 65, TMW: 65 } },
  { id: "N-34", name: "テクニカルライター", category: "クリエイティブ・専門職", profile: { O: 65, C: 80, E: 40, A: 55, N: 70, ACT: 55, THK: 85, TMW: 40 } },
  { id: "N-35", name: "特許・知財専門家", category: "クリエイティブ・専門職", profile: { O: 60, C: 85, E: 45, A: 50, N: 75, ACT: 50, THK: 90, TMW: 40 } },
];

// ════════════════════════════════════════════════════════════════════
// 成長職種 34件 — PDF「2030年適職診断データベース」準拠
// 4カテゴリ: テクノロジー・デジタル / サステナビリティ・グリーン
//            ヒューマンケア・AI共存 / クリエイティブ・ものづくり
// ════════════════════════════════════════════════════════════════════
export const growthJobs: GrowthJob[] = [
  // ── カテゴリA: テクノロジー・デジタル (10) ──
  { id: "G-01", name: "データサイエンティスト", category: "テクノロジー・デジタル",
    profile: { O: 80, C: 75, E: 50, A: 50, N: 70, ACT: 55, THK: 95, TMW: 40 },
    demandIndex: 90, automationRisk: 15 },
  { id: "G-02", name: "AI/機械学習エンジニア", category: "テクノロジー・デジタル",
    profile: { O: 80, C: 80, E: 45, A: 50, N: 70, ACT: 70, THK: 90, TMW: 45 },
    demandIndex: 92, automationRisk: 12 },
  { id: "G-03", name: "サイバーセキュリティアナリスト", category: "テクノロジー・デジタル",
    profile: { O: 60, C: 85, E: 50, A: 50, N: 85, ACT: 65, THK: 85, TMW: 50 },
    demandIndex: 88, automationRisk: 12 },
  { id: "G-04", name: "クラウドアーキテクト", category: "テクノロジー・デジタル",
    profile: { O: 70, C: 80, E: 45, A: 50, N: 75, ACT: 65, THK: 85, TMW: 50 },
    demandIndex: 85, automationRisk: 18 },
  { id: "G-05", name: "ブロックチェーンエンジニア", category: "テクノロジー・デジタル",
    profile: { O: 85, C: 75, E: 45, A: 45, N: 65, ACT: 70, THK: 85, TMW: 45 },
    demandIndex: 72, automationRisk: 15 },
  { id: "G-06", name: "UI/UXデザイナー", category: "テクノロジー・デジタル",
    profile: { O: 85, C: 65, E: 65, A: 70, N: 60, ACT: 65, THK: 70, TMW: 65 },
    demandIndex: 82, automationRisk: 20 },
  { id: "G-07", name: "IoTエンジニア", category: "テクノロジー・デジタル",
    profile: { O: 75, C: 80, E: 45, A: 50, N: 75, ACT: 70, THK: 80, TMW: 50 },
    demandIndex: 80, automationRisk: 18 },
  { id: "G-08", name: "デジタルマーケター", category: "テクノロジー・デジタル",
    profile: { O: 75, C: 65, E: 75, A: 60, N: 60, ACT: 75, THK: 70, TMW: 55 },
    demandIndex: 82, automationRisk: 22 },
  { id: "G-09", name: "プロダクトマネージャー", category: "テクノロジー・デジタル",
    profile: { O: 80, C: 70, E: 75, A: 65, N: 65, ACT: 80, THK: 70, TMW: 70 },
    demandIndex: 88, automationRisk: 10 },
  { id: "G-10", name: "AIエシシスト（AI倫理専門家）", category: "テクノロジー・デジタル",
    profile: { O: 75, C: 80, E: 60, A: 70, N: 75, ACT: 50, THK: 85, TMW: 65 },
    demandIndex: 78, automationRisk: 8 },

  // ── カテゴリBC: サステナビリティ・グリーン (7) ──
  { id: "G-11", name: "再生エネルギーエンジニア", category: "サステナビリティ・グリーン",
    profile: { O: 70, C: 80, E: 55, A: 55, N: 75, ACT: 70, THK: 80, TMW: 55 },
    demandIndex: 85, automationRisk: 15 },
  { id: "G-12", name: "環境コンサルタント", category: "サステナビリティ・グリーン",
    profile: { O: 75, C: 70, E: 70, A: 70, N: 70, ACT: 65, THK: 75, TMW: 70 },
    demandIndex: 82, automationRisk: 10 },
  { id: "G-13", name: "スマート農業技術者", category: "サステナビリティ・グリーン",
    profile: { O: 70, C: 75, E: 55, A: 60, N: 70, ACT: 75, THK: 70, TMW: 55 },
    demandIndex: 78, automationRisk: 18 },
  { id: "G-14", name: "循環経済デザイナー", category: "サステナビリティ・グリーン",
    profile: { O: 85, C: 65, E: 65, A: 65, N: 60, ACT: 65, THK: 75, TMW: 65 },
    demandIndex: 76, automationRisk: 10 },
  { id: "G-15", name: "DXコンサルタント", category: "サステナビリティ・グリーン",
    profile: { O: 80, C: 70, E: 80, A: 60, N: 70, ACT: 75, THK: 75, TMW: 60 },
    demandIndex: 88, automationRisk: 12 },
  { id: "G-16", name: "情報セキュリティ管理者", category: "サステナビリティ・グリーン",
    profile: { O: 55, C: 85, E: 55, A: 55, N: 85, ACT: 60, THK: 85, TMW: 55 },
    demandIndex: 85, automationRisk: 12 },
  { id: "G-17", name: "ITプロジェクトマネージャー", category: "サステナビリティ・グリーン",
    profile: { O: 60, C: 80, E: 70, A: 65, N: 75, ACT: 80, THK: 65, TMW: 75 },
    demandIndex: 82, automationRisk: 15 },

  // ── カテゴリDE: ヒューマンケア・AI共存 (9) ──
  { id: "G-18", name: "看護師・介護福祉士", category: "ヒューマンケア・AI共存",
    profile: { O: 50, C: 75, E: 65, A: 90, N: 75, ACT: 70, THK: 55, TMW: 85 },
    demandIndex: 90, automationRisk: 5 },
  { id: "G-19", name: "心理カウンセラー", category: "ヒューマンケア・AI共存",
    profile: { O: 65, C: 60, E: 60, A: 90, N: 70, ACT: 45, THK: 65, TMW: 90 },
    demandIndex: 85, automationRisk: 5 },
  { id: "G-20", name: "作業療法士・理学療法士", category: "ヒューマンケア・AI共存",
    profile: { O: 60, C: 70, E: 65, A: 85, N: 70, ACT: 70, THK: 60, TMW: 80 },
    demandIndex: 82, automationRisk: 8 },
  { id: "G-21", name: "社会福祉士", category: "ヒューマンケア・AI共存",
    profile: { O: 55, C: 70, E: 65, A: 90, N: 75, ACT: 60, THK: 55, TMW: 90 },
    demandIndex: 80, automationRisk: 5 },
  { id: "G-22", name: "教育コーディネーター", category: "ヒューマンケア・AI共存",
    profile: { O: 70, C: 65, E: 75, A: 80, N: 65, ACT: 65, THK: 65, TMW: 80 },
    demandIndex: 82, automationRisk: 10 },
  { id: "G-23", name: "コミュニティマネージャー", category: "ヒューマンケア・AI共存",
    profile: { O: 70, C: 60, E: 85, A: 80, N: 60, ACT: 75, THK: 50, TMW: 85 },
    demandIndex: 78, automationRisk: 8 },
  { id: "G-24", name: "ファシリテーター", category: "ヒューマンケア・AI共存",
    profile: { O: 70, C: 55, E: 85, A: 80, N: 60, ACT: 65, THK: 55, TMW: 90 },
    demandIndex: 80, automationRisk: 5 },
  { id: "G-25", name: "組織開発コンサルタント・コーチ", category: "ヒューマンケア・AI共存",
    profile: { O: 75, C: 65, E: 75, A: 80, N: 65, ACT: 60, THK: 70, TMW: 85 },
    demandIndex: 82, automationRisk: 8 },
  { id: "G-26", name: "ライフキャリアデザイナー", category: "ヒューマンケア・AI共存",
    profile: { O: 70, C: 60, E: 70, A: 85, N: 65, ACT: 60, THK: 60, TMW: 85 },
    demandIndex: 78, automationRisk: 5 },

  // ── カテゴリFG: クリエイティブ・ものづくり (8) ──
  { id: "G-27", name: "動画クリエイター・映像ディレクター", category: "クリエイティブ・ものづくり",
    profile: { O: 90, C: 60, E: 75, A: 55, N: 55, ACT: 80, THK: 55, TMW: 60 },
    demandIndex: 82, automationRisk: 20 },
  { id: "G-28", name: "メタバースデザイナー", category: "クリエイティブ・ものづくり",
    profile: { O: 90, C: 65, E: 60, A: 55, N: 60, ACT: 70, THK: 70, TMW: 55 },
    demandIndex: 78, automationRisk: 18 },
  { id: "G-29", name: "ゲームデザイナー", category: "クリエイティブ・ものづくり",
    profile: { O: 90, C: 60, E: 65, A: 55, N: 55, ACT: 75, THK: 65, TMW: 60 },
    demandIndex: 76, automationRisk: 15 },
  { id: "G-30", name: "ロボットエンジニア", category: "クリエイティブ・ものづくり",
    profile: { O: 80, C: 80, E: 50, A: 50, N: 70, ACT: 70, THK: 85, TMW: 50 },
    demandIndex: 85, automationRisk: 12 },
  { id: "G-31", name: "スマートシティプランナー", category: "クリエイティブ・ものづくり",
    profile: { O: 80, C: 70, E: 70, A: 65, N: 65, ACT: 65, THK: 80, TMW: 70 },
    demandIndex: 80, automationRisk: 10 },
  { id: "G-32", name: "バイオテクノロジー研究者", category: "クリエイティブ・ものづくり",
    profile: { O: 85, C: 80, E: 45, A: 50, N: 70, ACT: 55, THK: 90, TMW: 45 },
    demandIndex: 82, automationRisk: 10 },
  { id: "G-33", name: "宇宙産業エンジニア", category: "クリエイティブ・ものづくり",
    profile: { O: 90, C: 75, E: 55, A: 50, N: 65, ACT: 65, THK: 85, TMW: 50 },
    demandIndex: 75, automationRisk: 10 },
  { id: "G-34", name: "AIコンテンツプロデューサー", category: "クリエイティブ・ものづくり",
    profile: { O: 85, C: 60, E: 75, A: 60, N: 55, ACT: 80, THK: 65, TMW: 60 },
    demandIndex: 85, automationRisk: 18 },
];

// ════════════════════════════════════════════════════════════════════
// 衰退職種 15件 — PDF「2030年適職診断データベース」準拠
// WEF Future of Jobs Report 2025 ベース
// ════════════════════════════════════════════════════════════════════
export const decliningJobs: DecliningJob[] = [
  { id: "D-01", name: "一般事務員", category: "営業・販売", demandDeclinePercent: 40 },
  { id: "D-02", name: "銀行窓口係", category: "経理・財務・経営企画", demandDeclinePercent: 35 },
  { id: "D-03", name: "データ入力作業者", category: "営業・販売", demandDeclinePercent: 34 },
  { id: "D-04", name: "経理事務員・会計係", category: "経理・財務・経営企画", demandDeclinePercent: 30 },
  { id: "D-05", name: "郵便配達員・仕分け作業員", category: "物流・購買", demandDeclinePercent: 28 },
  { id: "D-06", name: "レジ係", category: "営業・販売", demandDeclinePercent: 26 },
  { id: "D-07", name: "工場組立・ライン作業員", category: "製造・生産管理", demandDeclinePercent: 24 },
  { id: "D-08", name: "印刷オペレーター・製本作業員", category: "製造・生産管理", demandDeclinePercent: 22 },
  { id: "D-09", name: "電話オペレーター・コールセンター", category: "営業・販売", demandDeclinePercent: 21 },
  { id: "D-10", name: "倉庫管理者", category: "物流・購買", demandDeclinePercent: 20 },
  { id: "D-11", name: "翻訳者（定型文書）", category: "クリエイティブ・デザイン", demandDeclinePercent: 20 },
  { id: "D-12", name: "税理士補助・経理補助", category: "経理・財務・経営企画", demandDeclinePercent: 19 },
  { id: "D-13", name: "旅行代理店スタッフ", category: "営業・販売", demandDeclinePercent: 18 },
  { id: "D-14", name: "新聞記者", category: "クリエイティブ・デザイン", demandDeclinePercent: 16 },
  { id: "D-15", name: "図書館司書", category: "教育・研修", demandDeclinePercent: 16 },
];

// Map CC1 categories to declining job categories for risk alert
export const categoryRiskMap: Record<string, string[]> = {
  "営業・販売": ["D-01", "D-03", "D-06", "D-09", "D-13"],
  "マーケティング・広報": [],
  "人事・総務・労務": [],
  "経理・財務・経営企画": ["D-02", "D-04", "D-12"],
  "IT・エンジニア": [],
  "製造・生産管理": ["D-07", "D-08"],
  "物流・購買": ["D-05", "D-10"],
  "研究・開発": [],
  "医療・福祉・介護": [],
  "教育・研修": ["D-15"],
  "クリエイティブ・デザイン": ["D-11", "D-14"],
  "その他": [],
};
