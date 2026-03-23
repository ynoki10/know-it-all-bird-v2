#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# git commit コマンドのみインターセプト
if echo "$COMMAND" | grep -qE '^git\s+commit'; then
  # 型チェック
  if ! npx tsc -b --noEmit 2>&1; then
    echo "型チェックエラー: コミット前に修正してください" >&2
    exit 2
  fi

  # Biome lint + format チェック（書き換えなし）
  if ! npx @biomejs/biome check . 2>&1; then
    echo "Biomeチェックエラー: コミット前に修正してください" >&2
    exit 2
  fi
fi

exit 0
