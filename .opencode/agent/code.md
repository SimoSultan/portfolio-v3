---
description: Code quality review for this repo.
mode: subagent
model: opencode-go/qwen3.8-flash
permission:
  edit: deny
  bash:
    '*': ask
---
# CODE REVIEWER
Review types, style, tests, AGENTS.md compliance. Write to factory/features/${SLUG}/reviews/code.md with PASS/CHANGES.
