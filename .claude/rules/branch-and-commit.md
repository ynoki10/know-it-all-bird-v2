---
description: コード変更前に必ず確認 — feature ブランチ + worktree で作業すること（main 直接編集禁止）
---

## ブランチ戦略（GitHub Flow）

新しい作業は必ず feature ブランチで行い、PR 経由で main にマージする。
（main への直 push はブランチ保護により禁止）

Claude が新しい作業を始める場合は worktree を使用すること（詳細は `worktree-lifecycle.md` 参照）。

```
main          ← 常にリリース可能な状態
feat/xxx      ← 機能追加
fix/xxx       ← バグ修正
docs/xxx      ← ドキュメントのみの変更
chore/xxx     ← 設定変更・依存更新
refactor/xxx  ← リファクタリング
style/xxx     ← UI・スタイル変更
```

## コミットメッセージ規約（Conventional Commits）

subject は日本語で記述する。1行目は72文字以内。

```
feat: 新機能
fix: バグ修正
docs: ドキュメントのみ
chore: ビルド・設定・依存関係の変更
test: テストのみ
refactor: リファクタリング
style: UI・スタイル変更
```

例: `feat: Gemini APIフォールバックプロバイダーを追加`

## マージとブランチの削除

- マージ方式: Squash merge
- GitHub の「Automatically delete head branches」が有効化済み。PR マージ時にリモートブランチは自動削除される
- PR マージ後、ローカルブランチも削除する:
  ```
  git branch -d <branch-name>
  ```
- worktree 内で作業していた場合は worktree も先に削除する（`worktree-lifecycle.md` 参照）
