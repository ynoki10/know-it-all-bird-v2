# ことわざにくわしい文鳥さん v2

架空のことわざを入力すると、AIが創作の意味と由来をフランクな口調で説明するWebアプリ。

## 技術スタック

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** （スタイリング）
- **Jotai** （状態管理）
- **Chrome Built-in AI** （Prompt API / Gemini Nano によるローカルLLM推論）

## セットアップ

```bash
npm install
npm run dev
```

## AI推論の前提条件

このアプリは Chrome Built-in AI（LanguageModel API）を使用します。

- Chrome 140 以降（デスクトップ版）が必要
- `chrome://flags/#optimization-guide-on-device-model` を Enabled に設定
- `chrome://flags/#prompt-api-for-gemini-nano` を Enabled に設定
- 初回利用時はモデルのダウンロードが必要（`chrome://components` → Optimization Guide On Device Model）

対応していないブラウザではフォールバックメッセージが表示されます。

## 画面フロー

```
Top → Input → Thinking → Result → Input（ループ）
```

- **Top**: アプリの説明とスタートボタン
- **Input**: ことわざのプリセット選択（ランダム4択 × 2列）または自由入力（4〜12文字）
- **Thinking**: AI生成中のローディングアニメーション
- **Result**: AIの回答 + ランダム文鳥画像（7パターン）

## ビルド

```bash
npm run build    # dist/ に静的ファイルを出力
npm run preview  # ビルド成果物のプレビュー
```

出力は静的ファイルのみ。任意の静的サイトホスティング（Vercel, Cloudflare Pages, GitHub Pages 等）にデプロイ可能。

