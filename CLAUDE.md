# know-it-all-bird v2

## コマンド

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド（tsc + vite build）
npm run preview      # ビルドプレビュー
npm run typecheck    # 型チェック（tsc）
npm run lint         # Biome lint
npm run format       # Biome format（自動修正）
npm run format:check # Biome format（チェックのみ）
npm run check        # Biome lint + format + import整理（自動修正）
npm run check:ci     # CI用チェック（型チェック + Biome）
```

## 設計上の判断

### AIプロバイダー抽象化

`src/ai/types.ts` の `AIProvider` インターフェースを通じてAI機能を抽象化している。将来的にGemini API等のフォールバックプロバイダーを追加する想定。新しいプロバイダーを追加する場合は `AIProvider` を実装し、`src/ai/provider.ts` の `getAIProvider()` を拡張する。

### Chrome Built-in AI の制約

- Gemini Nanoは小型モデルのため、プロンプトは簡潔に保つ必要がある。複雑な指示は避けること
- Chrome 140以降で日本語入出力をサポート
- デスクトップ版Chromeのみ対応。非対応ブラウザにはフォールバックメッセージを表示

### 画面遷移

ルーティングライブラリは未使用。`pageAtom` のステートベース遷移で画面を切り替えている（SPA内の状態管理のみで完結するため）。
