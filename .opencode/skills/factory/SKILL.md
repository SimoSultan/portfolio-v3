---
name: factory
description: Run project factory loop with planning, reviews, and merge-gated cleanup.
---

# Factory (project)

Orchestrator runs loop. Only orchestrator writes factory/board.json.

## Flow
1. plan -> plan-draft.md -> approve-plan -> plan.md
2. start -> spec-writer -> builder (factory/<slug>) -> security/ux/ui-design/code (parallel) -> wait all
3. if CHANGES and rounds < 2 -> builder again. else approver
4. APPROVE -> open PR. PR_OPENED waiting for merge confirmation.
5. merge confirmed (gh or /factory merged) -> cleanup features/<slug>/, prune board, mark DONE

## Enforcement
- Hard-block without approved plan.md
- Max 2 rounds
- Merge-gated cleanup
- If cleanup fails -> NEEDS_HUMAN

## Issue-aware planning
When /factory plan called:
- Check if in git repo with remote
- If user wants issue-based planning: `gh issue list --state open --limit 50`
- Present selection, fetch details with `gh issue view`
- Use issue title/body as idea, store issueNumber/issueUrl in board

## Auto-project setup
On issue-based planning:
- if no project for repo: run todo-to-issues/scripts/setup_project.sh <owner> <repo> "<repo> Roadmap"
- add issue to project: gh project item-add <number> --owner <owner> --url <issue-url>
- set status to Backlog

## Column enforcement
After creating or finding project, run sync_project_columns.sh to enforce standard columns (preserve existing issues).

## Column setup
Create project if missing, add issue to project. User can configure Status columns in UI to Backlog/Ready/In Progress/In Review/Blocked/Done.

## Existing projects
Ensure all repo projects use standard columns; update via UI if needed. Preserve existing issues.
