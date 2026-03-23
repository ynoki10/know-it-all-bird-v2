#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# ファイルパスが空なら許可
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# ファイルのディレクトリでブランチを確認
FILE_DIR=$(dirname "$FILE_PATH")
BRANCH=$(git -C "$FILE_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null)

# gitリポジトリ外なら許可
if [ -z "$BRANCH" ]; then
  exit 0
fi

# main以外なら許可
if [ "$BRANCH" != "main" ]; then
  exit 0
fi

# .claude/ やCLAUDE.md等の設定ファイルは許可
REPO_ROOT=$(git -C "$FILE_DIR" rev-parse --show-toplevel 2>/dev/null)
case "$FILE_PATH" in
  "$REPO_ROOT/.claude/"*|"$REPO_ROOT/CLAUDE.md") exit 0 ;;
esac

# mainブランチでのソースコード編集をブロック
echo "mainブランチ上でのファイル編集は禁止です。worktree + featureブランチを作成してください。" >&2
exit 2
