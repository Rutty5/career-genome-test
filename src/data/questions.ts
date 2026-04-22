// ================================================================
// questions.ts — CAREER GENOME 95問 (forced_choice × 85 + select × 10)
// BIG5×25 + BC×60 + CC×10
// ================================================================

export type QuestionType = "forced_choice" | "select" | "likert7";

// ----------------------------------------------------------------
// BC要素 (12要素)
// ----------------------------------------------------------------
export type BCElement =
  | "SH" | "HK" | "JK"   // ACT: 主体性・発信力・実行力
  | "KH" | "KK" | "SZ"   // THK: 課題発見・課題解決・専門性
  | "HS" | "KC" | "JN" | "JH" | "KR" | "SC"; // TMW: 発信・傾聴・情報・柔軟・協調・自己

export type BCCategory = "ACT" | "THK" | "TMW";

export const bcCategoryLabels: Record<BCCategory, { en: string; jp: string }> = {
  ACT: { en: "Action", jp: "行動力" },
  THK: { en: "Thinking", jp: "思考力" },
  TMW: { en: "Teamwork", jp: "協働力" },
};

export const bcElementLabels: Record<BCElement, { jp: string; category: BCCategory }> = {
  SH: { jp: "主体性",   category: "ACT" },
  HK: { jp: "発信力",   category: "ACT" },
  JK: { jp: "実行力",   category: "ACT" },
  KH: { jp: "課題発見力", category: "THK" },
  KK: { jp: "課題解決力", category: "THK" },
  SZ: { jp: "専門性",   category: "THK" },
  HS: { jp: "発信・表現力", category: "TMW" },
  KC: { jp: "傾聴力",   category: "TMW" },
  JN: { jp: "情報収集力", category: "TMW" },
  JH: { jp: "柔軟性",   category: "TMW" },
  KR: { jp: "協調性",   category: "TMW" },
  SC: { jp: "自己管理力", category: "TMW" },
};

export const FORCED_CHOICE_OPTIONS = [
  { value: 4, label: "Aにとても近い" },
  { value: 3, label: "Aにやや近い" },
  { value: 2, label: "Bにやや近い" },
  { value: 1, label: "Bにとても近い" },
] as const;

// ----------------------------------------------------------------
// Question interfaces
// ----------------------------------------------------------------
export interface ForcedChoiceQuestion {
  id: string;
  section: "big5" | "bc";
  factor?: "O" | "C" | "E" | "A" | "N";
  element?: BCElement;
  type: "forced_choice";
  optionA: string;
  optionB: string;
}

export interface SelectQuestion {
  id: string;
  section: "cc";
  type: "select";
  text: string;
  options: string[];
}

export interface LikertQuestion {
  id: string;
  section: "cc";
  type: "likert7";
  text: string;
}

export type Question = ForcedChoiceQuestion | SelectQuestion | LikertQuestion;

// ================================================================
// BIG5 設問 (25問) — forced_choice
// ================================================================
export const BIG5_QUESTIONS: ForcedChoiceQuestion[] = [
  // O: 開放性
  {
    id: "O1", section: "big5", factor: "O", type: "forced_choice",
    optionA: "新しいアイデアや手法を積極的に試す",
    optionB: "実績のある方法を着実に実行する",
  },
  {
    id: "O2", section: "big5", factor: "O", type: "forced_choice",
    optionA: "異業種や専門外の知識から刺激を得る",
    optionB: "自分の専門領域を深く掘り下げる",
  },
  {
    id: "O3", section: "big5", factor: "O", type: "forced_choice",
    optionA: "抽象的なコンセプトや理論を考えるのが好き",
    optionB: "すぐ使える実践的なノウハウを求める",
  },
  {
    id: "O4", section: "big5", factor: "O", type: "forced_choice",
    optionA: "仕事のやり方を自分なりに工夫・改変する",
    optionB: "決められた手順・ルールを正確に守る",
  },
  {
    id: "O5", section: "big5", factor: "O", type: "forced_choice",
    optionA: "未知の課題に取り組むとワクワクする",
    optionB: "慣れた課題を確実にこなすほうが充実感がある",
  },

  // C: 誠実性
  {
    id: "C1", section: "big5", factor: "C", type: "forced_choice",
    optionA: "期限や約束を必ず守ることを最優先にする",
    optionB: "状況に応じて柔軟に調整することを優先する",
  },
  {
    id: "C2", section: "big5", factor: "C", type: "forced_choice",
    optionA: "作業前に詳細な計画・段取りを組み立てる",
    optionB: "まず動き出してから方向を修正していく",
  },
  {
    id: "C3", section: "big5", factor: "C", type: "forced_choice",
    optionA: "資料の細かい部分まで自分でチェックする",
    optionB: "大まかな方向性を確認したら他者に任せる",
  },
  {
    id: "C4", section: "big5", factor: "C", type: "forced_choice",
    optionA: "締め切りより早めに仕上げて見直す時間を確保する",
    optionB: "ギリギリまで磨き続けてから提出する",
  },
  {
    id: "C5", section: "big5", factor: "C", type: "forced_choice",
    optionA: "目標を細かいマイルストーンに分解して管理する",
    optionB: "大きな目標だけ意識して日々の流れに乗る",
  },

  // E: 外向性
  {
    id: "E1", section: "big5", factor: "E", type: "forced_choice",
    optionA: "会議や商談では積極的に自分から発言する",
    optionB: "他者の意見をじっくり聞いてから判断する",
  },
  {
    id: "E2", section: "big5", factor: "E", type: "forced_choice",
    optionA: "初対面の人とすぐに打ち解けてしまう",
    optionB: "関係を深めるのに時間をかけるほうだ",
  },
  {
    id: "E3", section: "big5", factor: "E", type: "forced_choice",
    optionA: "大人数のイベントや交流会でエネルギーをもらう",
    optionB: "少人数でじっくり話す場のほうが充実感がある",
  },
  {
    id: "E4", section: "big5", factor: "E", type: "forced_choice",
    optionA: "社内外の人脈を広げることに積極的に時間を使う",
    optionB: "深い専門知識を蓄積することに時間を使う",
  },
  {
    id: "E5", section: "big5", factor: "E", type: "forced_choice",
    optionA: "チームで活発に議論しながら進めるほうが好き",
    optionB: "一人で集中して黙々と作業するほうが好き",
  },

  // A: 協調性
  {
    id: "A1", section: "big5", factor: "A", type: "forced_choice",
    optionA: "チームの意見が割れたとき自ら調整役に入る",
    optionB: "自分の立場と意見をはっきり主張する",
  },
  {
    id: "A2", section: "big5", factor: "A", type: "forced_choice",
    optionA: "チーム全体の成功を個人の成果より優先する",
    optionB: "自分の担当範囲で最高の成果を出すことに集中する",
  },
  {
    id: "A3", section: "big5", factor: "A", type: "forced_choice",
    optionA: "相手の感情に配慮しながら伝え方を工夫する",
    optionB: "感情より事実・論理を優先してはっきり伝える",
  },
  {
    id: "A4", section: "big5", factor: "A", type: "forced_choice",
    optionA: "対立を避けて全員が納得できる着地点を探す",
    optionB: "正しい結論のためなら摩擦をいとわない",
  },
  {
    id: "A5", section: "big5", factor: "A", type: "forced_choice",
    optionA: "協力的・支援的な環境で力を発揮する",
    optionB: "競争的・実力主義の環境で力を発揮する",
  },

  // N: 安定性
  {
    id: "N1", section: "big5", factor: "N", type: "forced_choice",
    optionA: "想定外のトラブルでも冷静に対応できる",
    optionB: "トラブル時は感情が表に出やすい",
  },
  {
    id: "N2", section: "big5", factor: "N", type: "forced_choice",
    optionA: "厳しいフィードバックを改善点として受け止める",
    optionB: "批判的な意見をもらうとしばらく落ち込む",
  },
  {
    id: "N3", section: "big5", factor: "N", type: "forced_choice",
    optionA: "失敗後すぐに「次どうするか」に切り替えられる",
    optionB: "失敗を引きずって気分が数日続くことがある",
  },
  {
    id: "N4", section: "big5", factor: "N", type: "forced_choice",
    optionA: "プレッシャーのある環境でも安定したパフォーマンスを出せる",
    optionB: "プレッシャーがかかると実力が出しにくくなる",
  },
  {
    id: "N5", section: "big5", factor: "N", type: "forced_choice",
    optionA: "将来への漠然とした不安はあまり感じない",
    optionB: "キャリアや会社の先行きに不安を感じることが多い",
  },
];

// ================================================================
// BC 設問 (60問) — forced_choice, 12要素×5問
// ================================================================
export const BC_QUESTIONS: ForcedChoiceQuestion[] = [
  // SH: 主体性
  {
    id: "SH1", section: "bc", element: "SH", type: "forced_choice",
    optionA: "指示を待たず自分から課題を見つけて動く",
    optionB: "方向性が示されてから最善を尽くして動く",
  },
  {
    id: "SH2", section: "bc", element: "SH", type: "forced_choice",
    optionA: "誰も手を挙げなければ自分がやると決める",
    optionB: "適任者が決まってから全力でサポートする",
  },
  {
    id: "SH3", section: "bc", element: "SH", type: "forced_choice",
    optionA: "会議で司会や進行役を自ら引き受けることが多い",
    optionB: "参加者として意見を出すほうが自分らしい",
  },
  {
    id: "SH4", section: "bc", element: "SH", type: "forced_choice",
    optionA: "上司に相談する前にまず自分で考え動く",
    optionB: "早めに上司の意図を確認してから動く",
  },
  {
    id: "SH5", section: "bc", element: "SH", type: "forced_choice",
    optionA: "担当外の問題でも見つけたら自分から対応する",
    optionB: "担当範囲を守り責任を持って完結させる",
  },

  // HK: 発信力
  {
    id: "HK1", section: "bc", element: "HK", type: "forced_choice",
    optionA: "自分のアイデアを積極的に発言・提案する",
    optionB: "まず周囲の意見をしっかり聞いてから話す",
  },
  {
    id: "HK2", section: "bc", element: "HK", type: "forced_choice",
    optionA: "プレゼンや発表の機会には積極的に手を挙げる",
    optionB: "発表より資料作成や裏方のほうが得意だ",
  },
  {
    id: "HK3", section: "bc", element: "HK", type: "forced_choice",
    optionA: "自分の考えを相手に分かりやすく伝えるのが得意",
    optionB: "論理的に整理するより感覚・直感で伝えるほうが多い",
  },
  {
    id: "HK4", section: "bc", element: "HK", type: "forced_choice",
    optionA: "上位者や顧客にも臆せず自分の意見を述べられる",
    optionB: "立場が上の相手には慎重に言葉を選ぶ",
  },
  {
    id: "HK5", section: "bc", element: "HK", type: "forced_choice",
    optionA: "チームの方向性がずれていると感じたら声を上げる",
    optionB: "周囲の空気を読みながら発言のタイミングを計る",
  },

  // JK: 実行力
  {
    id: "JK1", section: "bc", element: "JK", type: "forced_choice",
    optionA: "決まったことは迷わずすぐに実行に移す",
    optionB: "実行前にもう一度リスクを確認してから動く",
  },
  {
    id: "JK2", section: "bc", element: "JK", type: "forced_choice",
    optionA: "困難があっても諦めずやり遂げることが多い",
    optionB: "状況が変わったら方向転換するほうが合理的だと思う",
  },
  {
    id: "JK3", section: "bc", element: "JK", type: "forced_choice",
    optionA: "タスクが多くても優先順位を付けて次々と処理する",
    optionB: "一つのことに集中して丁寧に仕上げる",
  },
  {
    id: "JK4", section: "bc", element: "JK", type: "forced_choice",
    optionA: "締め切りを意識して逆算しながら行動する",
    optionB: "その日の状況を見ながら柔軟に対応する",
  },
  {
    id: "JK5", section: "bc", element: "JK", type: "forced_choice",
    optionA: "完璧でなくても期限内に出して改善する",
    optionB: "十分な完成度になるまで提出を待つほうだ",
  },

  // KH: 課題発見力
  {
    id: "KH1", section: "bc", element: "KH", type: "forced_choice",
    optionA: "現状の問題を自分から探して言語化するほうだ",
    optionB: "指摘された問題に対して解決策を考えるほうだ",
  },
  {
    id: "KH2", section: "bc", element: "KH", type: "forced_choice",
    optionA: "業務の非効率な部分が気になって改善提案をする",
    optionB: "現行の仕組みを安定運用することを重視する",
  },
  {
    id: "KH3", section: "bc", element: "KH", type: "forced_choice",
    optionA: "データや現場観察から問題の兆候を早期に察知する",
    optionB: "問題が明確になってから分析・対応する",
  },
  {
    id: "KH4", section: "bc", element: "KH", type: "forced_choice",
    optionA: "「なぜ？」と掘り下げて本質的な原因を探る",
    optionB: "「どうする？」と素早く解決策を考える",
  },
  {
    id: "KH5", section: "bc", element: "KH", type: "forced_choice",
    optionA: "顧客や現場のニーズを自ら聞きに行って課題を掘る",
    optionB: "社内の数値・報告から課題を把握する",
  },

  // KK: 課題解決力
  {
    id: "KK1", section: "bc", element: "KK", type: "forced_choice",
    optionA: "複雑な問題を構造化して整理するのが得意",
    optionB: "感覚とスピードで素早く対応するほうが得意",
  },
  {
    id: "KK2", section: "bc", element: "KK", type: "forced_choice",
    optionA: "解決策を考えるとき複数の選択肢を比較検討する",
    optionB: "最善と思う方法を直感で選び素早く動く",
  },
  {
    id: "KK3", section: "bc", element: "KK", type: "forced_choice",
    optionA: "解決した後も振り返って再発防止策まで考える",
    optionB: "問題を解決したら次の課題へすぐ移る",
  },
  {
    id: "KK4", section: "bc", element: "KK", type: "forced_choice",
    optionA: "他部署や外部の知見を取り入れて解決策を組み立てる",
    optionB: "自分の経験と専門知識をベースに解決策を出す",
  },
  {
    id: "KK5", section: "bc", element: "KK", type: "forced_choice",
    optionA: "困難な課題ほど燃えてアイデアが湧いてくる",
    optionB: "確実に解けることに集中してコツコツ積み上げる",
  },

  // SZ: 専門性
  {
    id: "SZ1", section: "bc", element: "SZ", type: "forced_choice",
    optionA: "特定分野を深く追求してプロフェッショナルを目指す",
    optionB: "幅広い分野を学んでゼネラリストとして活躍したい",
  },
  {
    id: "SZ2", section: "bc", element: "SZ", type: "forced_choice",
    optionA: "自分の専門分野の最新トレンドを常にキャッチアップする",
    optionB: "業界横断的な情報収集で全体感を把握する",
  },
  {
    id: "SZ3", section: "bc", element: "SZ", type: "forced_choice",
    optionA: "専門知識を活かして問題解決のアドバイスをする",
    optionB: "プロセス管理や調整役として全体を推進する",
  },
  {
    id: "SZ4", section: "bc", element: "SZ", type: "forced_choice",
    optionA: "資格取得や体系的な学習で知識を深めるほうだ",
    optionB: "実務経験や現場から学ぶことを重視する",
  },
  {
    id: "SZ5", section: "bc", element: "SZ", type: "forced_choice",
    optionA: "専門用語や詳細な技術まで正確に理解したい",
    optionB: "全体像と要点が分かれば詳細は専門家に任せる",
  },

  // HS: 発信・表現力
  {
    id: "HS1", section: "bc", element: "HS", type: "forced_choice",
    optionA: "資料作成のとき相手に伝わる構成・デザインにこだわる",
    optionB: "内容が正確であれば見た目は最低限でよい",
  },
  {
    id: "HS2", section: "bc", element: "HS", type: "forced_choice",
    optionA: "話し方・言葉の選び方を相手に合わせて変える",
    optionB: "誰にでも同じ表現で一貫して伝える",
  },
  {
    id: "HS3", section: "bc", element: "HS", type: "forced_choice",
    optionA: "メールや報告書で結論を最初に書く構成にする",
    optionB: "背景・経緯から順に説明する構成にする",
  },
  {
    id: "HS4", section: "bc", element: "HS", type: "forced_choice",
    optionA: "複雑な内容を図や例えで分かりやすく伝える",
    optionB: "正確さを優先して詳細なテキストで伝える",
  },
  {
    id: "HS5", section: "bc", element: "HS", type: "forced_choice",
    optionA: "フィードバックを得て伝え方を継続的に改善する",
    optionB: "自分の伝え方に自信があり大きく変えないほうだ",
  },

  // KC: 傾聴力
  {
    id: "KC1", section: "bc", element: "KC", type: "forced_choice",
    optionA: "相手の話を最後まで遮らず聞くのが得意",
    optionB: "要点が分かったら先に提案・返答するほうだ",
  },
  {
    id: "KC2", section: "bc", element: "KC", type: "forced_choice",
    optionA: "相手の言葉の裏にある感情や意図を読み取ろうとする",
    optionB: "発言された内容・事実に集中して理解する",
  },
  {
    id: "KC3", section: "bc", element: "KC", type: "forced_choice",
    optionA: "相槌・うなずきで相手が話しやすい雰囲気を作る",
    optionB: "必要最低限の反応で集中して聞く",
  },
  {
    id: "KC4", section: "bc", element: "KC", type: "forced_choice",
    optionA: "人の悩みを聞いていると自然と相談を受けることが多い",
    optionB: "論理的な議論・意見交換のほうが得意だ",
  },
  {
    id: "KC5", section: "bc", element: "KC", type: "forced_choice",
    optionA: "聞いた内容を自分の言葉で確認・要約するほうだ",
    optionB: "聞いた内容をそのまま受け取って行動するほうだ",
  },

  // JN: 情報収集力
  {
    id: "JN1", section: "bc", element: "JN", type: "forced_choice",
    optionA: "意思決定の前に積極的に情報を集めてから動く",
    optionB: "手元の情報で判断してスピードを優先する",
  },
  {
    id: "JN2", section: "bc", element: "JN", type: "forced_choice",
    optionA: "公式な報告だけでなく現場の声・非公式情報も集める",
    optionB: "公式な報告・数値データを中心に判断する",
  },
  {
    id: "JN3", section: "bc", element: "JN", type: "forced_choice",
    optionA: "社内外の人脈を活用して情報を取りに行く",
    optionB: "公開情報・資料の調査で情報を収集する",
  },
  {
    id: "JN4", section: "bc", element: "JN", type: "forced_choice",
    optionA: "集めた情報を整理・体系化してチームに共有する",
    optionB: "情報は自分の判断に活かすことを優先する",
  },
  {
    id: "JN5", section: "bc", element: "JN", type: "forced_choice",
    optionA: "情報の信頼性・出典を確認してから使う",
    optionB: "スピード重視で情報の精度は後から検証する",
  },

  // JH: 柔軟性
  {
    id: "JH1", section: "bc", element: "JH", type: "forced_choice",
    optionA: "状況が変わったらすぐに計画を変更できる",
    optionB: "一度決めた計画はできるだけ変えずに進む",
  },
  {
    id: "JH2", section: "bc", element: "JH", type: "forced_choice",
    optionA: "自分と違う価値観・働き方の人とうまくやれる",
    optionB: "同じ価値観・スタイルの人と一緒に働くほうがやりやすい",
  },
  {
    id: "JH3", section: "bc", element: "JH", type: "forced_choice",
    optionA: "想定外の変化に対してもすぐに適応できる",
    optionB: "変化には時間をかけて慎重に対応するほうだ",
  },
  {
    id: "JH4", section: "bc", element: "JH", type: "forced_choice",
    optionA: "複数の仕事を同時進行で切り替えながらこなせる",
    optionB: "一つのことに集中して順番に片付けるほうが得意",
  },
  {
    id: "JH5", section: "bc", element: "JH", type: "forced_choice",
    optionA: "批判や反対意見を受けても考え方を変えることができる",
    optionB: "自分の考えを信じて一貫して主張し続ける",
  },

  // KR: 協調性
  {
    id: "KR1", section: "bc", element: "KR", type: "forced_choice",
    optionA: "チームの雰囲気・関係性を大切にしながら進める",
    optionB: "成果・効率を最優先にして進める",
  },
  {
    id: "KR2", section: "bc", element: "KR", type: "forced_choice",
    optionA: "困っているメンバーに気づいて自然とサポートする",
    optionB: "自分の担当を完璧にこなすことで貢献する",
  },
  {
    id: "KR3", section: "bc", element: "KR", type: "forced_choice",
    optionA: "対立があるとき両者の言い分を聞いて調整する",
    optionB: "正しい結論を出すことを優先して意見を言う",
  },
  {
    id: "KR4", section: "bc", element: "KR", type: "forced_choice",
    optionA: "チームのルール・方針を守って行動する",
    optionB: "より良い方法があると思えば独自の判断で動く",
  },
  {
    id: "KR5", section: "bc", element: "KR", type: "forced_choice",
    optionA: "チームの成功を自分の成功と感じる",
    optionB: "個人として評価されることにやりがいを感じる",
  },

  // SC: 自己管理力
  {
    id: "SC1", section: "bc", element: "SC", type: "forced_choice",
    optionA: "体調・メンタルを安定させて仕事のパフォーマンスを保つ",
    optionB: "仕事のエネルギーで体調の波は乗り越えられる",
  },
  {
    id: "SC2", section: "bc", element: "SC", type: "forced_choice",
    optionA: "感情が乱れても仕事中は冷静さを保てる",
    optionB: "感情がそのまま表情や発言に出やすい",
  },
  {
    id: "SC3", section: "bc", element: "SC", type: "forced_choice",
    optionA: "日々のルーティン（運動・睡眠・食事など）を意識して整える",
    optionB: "仕事の流れに合わせてその都度生活を調整する",
  },
  {
    id: "SC4", section: "bc", element: "SC", type: "forced_choice",
    optionA: "ストレスを感じたら自分なりの解消法で早めに対処する",
    optionB: "ストレスは仕事が片付けば自然に解消されると思う",
  },
  {
    id: "SC5", section: "bc", element: "SC", type: "forced_choice",
    optionA: "長期的な目標に向けて日々の行動を自律的に管理する",
    optionB: "目の前の仕事に集中して流れに乗りながら進む",
  },
];

// ================================================================
// CC 設問 (10問) — select / likert7
// ================================================================
export const CC_QUESTIONS: (SelectQuestion | LikertQuestion)[] = [
  {
    id: "CC1", section: "cc", type: "select",
    text: "現在（または直近）の職種カテゴリを選んでください",
    options: ["営業・販売", "マーケティング・広報", "人事・総務・労務", "経理・財務・経営企画", "IT・エンジニア", "製造・生産管理", "物流・購買", "研究・開発", "医療・福祉・介護", "教育・研修", "クリエイティブ・デザイン", "その他"],
  },
  {
    id: "CC2", section: "cc", type: "select",
    text: "マネジメント経験として、最も近いものを選んでください",
    options: ["マネジメント経験なし", "5名以下のチーム", "6〜20名の部門", "20名以上の組織"],
  },
  {
    id: "CC3", section: "cc", type: "select",
    text: "現在の業界にあと何年いる想定ですか？",
    options: ["すぐにでも離れたい", "1〜2年以内", "3〜5年", "定年まで"],
  },
  {
    id: "CC4", section: "cc", type: "likert7",
    text: "まったく異なる業界への転職に、どの程度オープンですか？",
  },
  {
    id: "CC5", section: "cc", type: "select",
    text: "転職先を選ぶとき、最も重視するものを1つ選んでください",
    options: ["年収・報酬", "仕事のやりがい・成長", "ワークライフバランス", "企業の安定性・将来性", "社会的意義・貢献度"],
  },
  {
    id: "CC6", section: "cc", type: "select",
    text: "転職時の年収変動について、許容できる範囲を選んでください",
    options: ["年収アップが必須", "現状維持なら可", "10%減まで可", "20%減まで可", "やりがい重視で年収は問わない"],
  },
  {
    id: "CC7", section: "cc", type: "likert7",
    text: "リモートワーク中心の働き方に、どの程度魅力を感じますか？",
  },
  {
    id: "CC8", section: "cc", type: "select",
    text: "新しいスキル習得に週何時間を確保できますか？",
    options: ["ほぼ確保できない", "週2〜3時間", "週5〜7時間", "週10時間以上"],
  },
  {
    id: "CC9", section: "cc", type: "likert7",
    text: "AI・テクノロジーを活用する仕事に、どの程度興味がありますか？",
  },
  {
    id: "CC10", section: "cc", type: "select",
    text: "5年後の理想の働き方に最も近いものを選んでください",
    options: ["組織内でマネジメント", "組織内で専門職", "フリーランス・独立", "副業・パラレルワーク", "起業"],
  },
];

// ================================================================
// Combined export
// ================================================================
export const questions: Question[] = [
  ...BIG5_QUESTIONS,
  ...BC_QUESTIONS,
  ...CC_QUESTIONS,
];

export const questionMap = new Map<string, Question>(questions.map((q) => [q.id, q]));
