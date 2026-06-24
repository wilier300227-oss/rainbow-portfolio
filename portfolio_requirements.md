# ポートフォリオサイト 要件定義・ロードマップ
# 作成：2026年6月24日（Claude Codeによるgrilling要件定義セッション）
# 更新：2026年6月24日（公開方針変更・jimoty-alert/おんぷチャレンジをPrivate化）

---

## 0. このファイルの使い方

別のClaude Codeセッションに渡して作業を引き継ぐ。
このファイルを読めばgrilling要件定義の全決定事項が把握できる。

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| 屋号 | RAINBOW工房（クラウドワークス表示名） |
| 形態 | 個人事業主 |
| 所在 | 石川県かほく市 |
| 目的 | クラウドワークス発注者向けポートフォリオ兼名刺 |
| 公開先 | GitHub Pages |
| GitHubアカウント | wilier300227-oss |
| リポジトリ名 | rainbow-portfolio |
| 公開URL | https://wilier300227-oss.github.io/rainbow-portfolio/ |
| クラウドワークスURL | https://crowdworks.jp/public/employees/6871635?ref=login_header |

---

## 2. 確定した要件（grilling Q&A結果）

### サイト目的
- クラウドワークスのプロフィールURLからこのサイトに来た発注者が、信頼を深めてクラウドワークスに戻って依頼する導線
- クラウドワークスのプロフィール機能では表現しきれないデザイン・実績詳細・人となりを見せる

### 公開方針
- **すべての実績が完成してから公開**
- 目標：2週間（8時間/日）で全完成

### 制作物の公開方針（重要）

制作物によって「自分が使う用（実用版）」と「ポートフォリオ用（公開版）」を分ける。

| 区分 | 対象 | 方針 |
|------|------|------|
| **コード公開** | ①DXページ・②スプレッドシート・③GASデモ | GitHubにコードを公開 |
| **スクリーンショット公開** | ④jimoty-alert・⑥おんぷチャレンジ | リポジトリはPrivate。ポートフォリオには動作画面のスクリーンショット＋技術スタック＋説明文のみ掲載 |
| **サイト公開** | ⑤RAINBOW HP | GitHub Pagesで公開（個人情報・APIキーなしを確認の上） |

**スクリーンショット公開にする理由：**
- jimoty-alert：Mercari・Yahoo!オークションのスクレイピングが利用規約に抵触する可能性
- おんぷチャレンジ：著作権素材の置き換え完了前は非公開。完了後もコードより動作デモで見せる方が効果的
- 実用ツールはコードを公開すると機能を制限せざるを得ない（使う側も困る）

### 技術構成
- 純粋なHTML / CSS / JS（フレームワーク・ビルドツール不要）
- 外部CDN：Tailwind CDN・Font Awesome・Google Fonts
- 本人がHTMLを学習中のため、後から自分で直せることが重要

### デザイン仕様
| 用途 | 色 |
|------|----|
| ベース背景 | `#1a1a2e` |
| セクション背景（交互） | `#16213e` |
| アクセント | `#4f46e5` |
| アクセント（ホバー） | `#6366f1` |
| 本文テキスト | `#e2e8f0` |
| サブテキスト | `#94a3b8` |
| 見出し | `#ffffff` |

- フォント：Noto Sans JP（日本語）+ Inter（英数字）
- トーン：誠実・丁寧・現場目線。アニメーションは控えめ（フェードイン程度）
- RAINBOW合同会社HP（派手・虹色）とは別世界観にする

### ページ構成
1ページ構成（スクロール）：`#hero` → `#about` → `#services` → `#works` → `#contact`

### コード規約
- コメントは**日本語**で書く
- 各ファイル冒頭に「このファイルの役割」を日本語コメントで書く
- 変更しやすい箇所にコメントを入れる
- ファイル構成：`index.html` / `css/style.css` / `js/main.js` / `images/`

---

## 3. 現在の骨格ファイル

`C:\Users\81909\Desktop\works\` に以下が存在（別セッションで作成済み・GitHub push済み）：

```
works/
  index.html    ← 骨格ほぼ完成（hero/about/services/works/contact全あり）
  css/style.css
  js/main.js
  images/       ← 空（スクリーンショットは本人が後で差し替え）
  portfolio_requirements.md ← このファイル
```

**index.htmlの現状：**
- クラウドワークスURLはすでに正しく埋め込み済み
- 実績カード4枠（①〜④）あり。②③④は「準備中」表示
- ④jimoty-alertの説明文：「転売」→「リユース品価格調査ツール」に修正済み
- ⑤RAINBOW HP・⑥おんぷチャレンジのカードはまだない（追加必要）

---

## 4. 制作実績一覧（6件）

### 実績①：DXシステム販売ページ（個人再制作）
- **内容**：職業訓練グループ制作版を参考に、個人で一から再制作
- **注意**：グループ制作版（custom_ec_site）のコードは直接使わない。構成・デザインの参考のみ
- **技術タグ**：Astro / TailwindCSS / HTML / CSS
- **公開方法**：GitHubにコード公開 + デモURL
- **状態**：未着手（再制作必要）

### 実績②：スプレッドシート整理デモ
- **内容**：関数・条件付き書式・プルダウン・集計グラフを活用したサンプルシート
- **公開方法**：Googleスプレッドシートの共有リンク（実際に触れるデモ）
- **技術タグ**：Google Sheets / GAS / 関数 / 条件付き書式
- **生成スクリプト**：`works/gas/create_sales_demo.gs`（GASで一括生成）
- **共有リンク**：https://docs.google.com/spreadsheets/d/1eZihpxO8mPvhS5sYRA93KMPmNcGuLeEAMy8R3As0XgU/edit?usp=sharing
- **スクリーンショット**：`works/images/work-spreadsheet.png`
- **状態**：✅ 公開完了（ポートフォリオカード差し替え済み）

### 実績③：GAS自動化デモ
- **内容**：Googleフォーム送信 → スプレッドシート記録 → LINE通知、の自動化フロー
- **公開方法**：GitHubにコード公開 + README
- **注意**：GASコードにLINEトークン等をハードコードしない（PropertiesServiceで管理）→ 対応済み
- **技術タグ**：GAS / Google Forms / LINE API
- **GitHubリポジトリ**：https://github.com/wilier300227-oss/gas-form-line-notify （Public）
- **ローカル**：`C:\Users\81909\Desktop\gas-form-line-notify\`（main.gs / setup.gs / README.md）
- **状態**：✅ 公開完了（ポートフォリオカード差し替え済み）

### 実績④：jimoty-alert（リユース品価格調査ツール）
- **説明文**（確定）：「ジモティーの新着投稿をGemini Vision AIで自動解析し、フリマ相場と照合・LINE通知するリユース品価格調査ツールを開発・運用中」
- **注意**：「転売」という表現は使わない。「リユース品価格調査」に統一
- **技術タグ**：Python / Gemini Vision API / LINE Messaging API / Playwright / SQLite
- **場所**：`C:\Users\81909\Desktop\jimoty-alert\`
- **公開方法**：リポジトリはPrivate（コード非公開）。ポートフォリオにはスクリーンショット＋技術スタック＋説明文のみ
- **GitHubリポジトリ**：`wilier300227-oss/jimoty-alert`（Private済み）
- **セキュリティ対応済み**：`.gitignore`・`.env.example` 作成済み
- **現在の稼働状況**：稼働中（Facebook機能は一時無効化中）
- **ポートフォリオ掲載方法**：スクリーンショットではなく**アーキテクチャ図（`works/images/work-jimoty.svg`）**で掲載。理由＝生ログに「利益」表記・API 429エラー・バグ警告が映り込み、「リユース品価格調査」の建前と矛盾するため。図は処理フロー（新着監視→AI解析→相場照合→LINE通知）のみ提示。
- **状態**：✅ 公開完了（④カード差し替え済み・「稼働中」表示）

### 実績⑤：RAINBOW合同会社サイト
- **内容**：個人制作の架空会社HP。GSAP・アニメーション重め
- **場所**：`C:\Users\81909\Desktop\RAINBOW（HP）.zip`（解凍先：`RAINBOW（HP）/HTML/`）
- **技術タグ**：HTML / CSS / JS / GSAP / TailwindCDN / jQuery
- **公開方法**：GitHub Pagesで公開（個人情報・APIキーなしを確認の上）
- **確認事項**：個人情報・住所・電話番号・外部APIキーがないか確認してから公開
- **状態**：セキュリティ確認 + GitHub push + GitHub Pages公開 が必要

### 実績⑥：おんぷチャレンジ
- **内容**：子供向け音符学習アプリ（Web PWA版）
- **場所（元）**：`C:\Users\81909\OneDrive\piano.zip`（Web版は `piano/web/` に完成済み）
- **作業用クリーンフォルダ**：`C:\Users\81909\Desktop\onpu-challenge\`（Web版をnode_modules/.git除外でコピー＋著作権修正済み）
- **公開方法**：リポジトリはPrivate（コード非公開）。ポートフォリオには動作スクリーンショット＋技術スタック＋説明文のみ
- **著作権対応（完了）**：シール4種がサンリオキャラ（クロミ/シナモロール/マイメロディ/ポムポムプリン）だった → 完全オリジナルのメダルバッジ（金の星/緑の音符/赤の稲妻/紫の王冠）に差し替え済み（`onpu-challenge/stickers/*.png`）。生成スクリプトは scratchpad の `gen_stickers.py`
- **要注意（未対応）**：デスクトップ版（Tkinter `piano/app.py`）とルートの `sticker_book_preview.png` にも同じ著作権シールが残る。Web版のみ修正済み。フル公開時は要差し替え
- **PWAアイコン**：`icon-192/512.png` は白い音符のオリジナル（問題なし）
- **技術タグ**：HTML / JS / Canvas / Web Audio / SVM（音声認識）/ PWA
- **ポートフォリオ素材**：`works/images/work-onpu.png`（ゲーム画面＋シール帳のスマホ2画面合成）
- **状態**：✅ 著作権修正完了・Web版完成・⑥カード掲載完了。残：Privateリポジトリへのpush（任意）

---

## 5. 各制作物 セキュリティ・品質チェックリスト

### jimoty-alert（`C:\Users\81909\Desktop\jimoty-alert\`）
- [x] `.gitignore` 作成済み（.env / fb_session.json / *.db / logs/ 除外）
- [x] `.env.example` 作成済み（ダミー値入り）
- [x] README.md 作成済み
- [x] GitHubにpush済み（Privateリポジトリ）
- [ ] ポートフォリオカード用スクリーンショット撮影（ログ画面・通知画面）
- [ ] `[Flash] 自転車チェック失敗: 'parts'` 警告の修正（後回し可）
- [ ] Facebook機能の恒久対応（後回し可）

### RAINBOW合同会社サイト
- [ ] 個人情報（本名・住所・電話番号）が含まれていないか確認
- [ ] JSファイルにAPIキー・パスワードがハードコードされていないか確認
- [ ] 未完成箇所の洗い出し・修正
- [ ] GitHub push / GitHub Pages公開

### おんぷチャレンジ
- [ ] 著作権のあるシール素材を著作権フリーのものに差し替え
- [ ] Pythonコード内にAPIキー・個人情報がないか確認
- [ ] Web版実装
- [ ] GitHubにpush（Privateリポジトリ）
- [ ] ポートフォリオカード用スクリーンショット・デモ動画撮影

### GASデモ
- [ ] LINEトークンをPropertiesServiceで管理（ハードコード禁止）
- [ ] スプレッドシートに個人情報を入れない

---

## 6. 2週間ロードマップ（8時間/日）

### Week 1 ── 公開・実績を揃える

| 日 | 作業内容 | 完了目標 |
|----|---------|---------|
| Day 1 | ✅ GitHubリポジトリ作成・push → jimoty-alert README作成・Private化 → GitHub Pages有効化 | 完了 |
| Day 2 | ✅ RAINBOW HP 修正・GitHub Pages公開・⑤カード追加・スクショ追加・SNS無効化・ダミー化 | ⑤公開 完了 |
| Day 3 | ✅ スプレッドシート整理デモ作成（GAS生成）・共有リンク取得・②カード差し替え | ②公開 完了 |
| Day 4 | ✅ GASデモ（フォーム→LINE通知）作成・GitHub公開・③カード差し替え | ③公開 完了 |
| Day 5 | DXページ個人再制作（前半：構成・ヒーロー・3ステップ） | 前半完成 |
| Day 6 | DXページ個人再制作（後半：サービスカード・仕上げ）→ ①公開 | ①公開 |
| Day 7 | ④jimoty-alert スクリーンショット撮影・カード差し替え／予備日 | ④掲載 |

**Week 1終了時点：実績①②③⑤が揃い、④⑥はスクリーンショット掲載で暫定公開**

### Week 2 ── おんぷチャレンジ完成

| 日 | 作業内容 | 完了目標 |
|----|---------|---------|
| Day 8  | 著作権フリーシール素材の選定・差し替え → Web版フェーズ0（雛形・PWA設定・音声アセット配置） | 素材問題解決・雛形完成 |
| Day 9  | Web版フェーズ1前半：五線譜Canvas描画・音符出題ロジック | 譜面表示完成 |
| Day 10 | Web版フェーズ1後半：タッチボタン（ド〜シ）・採点・タイム・シール帳 | タッチ操作でフルプレイ可能 |
| Day 11 | Web版フェーズ2：音声入力（VAD・MFCC・SVM移植） | 音声認識動作 |
| Day 12 | Web版フェーズ3：PWA仕上げ・レスポンシブ調整・iOS Safari対応 | スマホ動作確認 |
| Day 13 | 全制作物セキュリティ最終チェック → おんぷチャレンジPrivate push → スクリーンショット撮影・ポートフォリオに⑥追加 | ⑥掲載 |
| Day 14 | ポートフォリオ全体の表示確認・文言調整・スクショ差し替え → **完成公開** | 🎉 完成 |

### リスク管理

| リスク | 対処 |
|--------|------|
| おんぷチャレンジ音声認識が重い | Day 11スキップ・タッチのみで完成としスクリーンショット撮影 |
| RAINBOW HPの修正が多い | Day 3を延長・GASデモをDay 6に後ろ倒し |
| Day 7までに①〜⑤完成しなかった | ①DXページを「準備中」のまま残してWeek 2に回す |

---

## 7. Day 1 完了タスク（2026年6月24日）

- [x] `rainbow-portfolio` GitHubリポジトリ作成（Public）
- [x] `C:\Users\81909\Desktop\works\` を push
- [x] GitHub Pages 有効化（https://wilier300227-oss.github.io/rainbow-portfolio/）
- [x] ④jimoty-alert 説明文「転売」→「リユース品価格調査ツール」修正
- [x] jimoty-alert README.md 作成
- [x] jimoty-alert GitHubにpush（Private）
- [x] jimoty-alert ログに投稿時刻（時：分）表示を追加

## 8. 次に着手するタスク（Day 2）

RAINBOW HPの整備：
1. `C:\Users\81909\Desktop\RAINBOW（HP）.zip` を解凍
2. 個人情報（本名・住所・電話番号・メールアドレス）がないか全ファイルを確認
3. JSファイルにAPIキー・パスワードがハードコードされていないか確認
4. 未完成箇所の洗い出し・修正
5. GitHub新リポジトリ（`rainbow-company-hp` 等）にpush・GitHub Pages公開
6. ポートフォリオの index.html に⑤RAINBOW HPカードを追加

---

## 9. 参照ファイル一覧

| ファイル | 場所 | 内容 |
|---------|------|------|
| 引き継ぎ文書（旧） | `C:\Users\81909\Downloads\portfolio_handoff.md` | 初期の制作方針 |
| 職務経歴・スキル | `C:\Users\81909\Downloads\経歴、スキルまとめ(自分).md` | About・自己PR素材 |
| ポートフォリオ骨格 | `C:\Users\81909\Desktop\works\` | index.html等（作成済み・GitHub push済み） |
| jimoty-alert | `C:\Users\81909\Desktop\jimoty-alert\` | 稼働中・Private push済み |
| RAINBOW HP | `C:\Users\81909\Desktop\RAINBOW（HP）.zip` | 個人制作会社サイト（Day 2で整備） |
| おんぷチャレンジ | `C:\Users\81909\OneDrive\piano.zip` | デスクトップ版+Web版設計書（Week 2で整備） |
| グループDXサイト | `C:\Users\81909\Desktop\custom_ec_site.zip` | 参考のみ・コード流用不可 |
