---
description: Project software factory - plan first, build with reviews, merge-gated cleanup.
---

# /factory

## Commands
- `/factory plan "<idea>"` - Start planning (PLANNING). Spawns planner (read-only). Creates plan-draft.md.
- `/factory status` - Show board.json state
- `/factory approve-plan <slug>` - Copy plan-draft.md to plan.md, set planApproved true, PLAN_APPROVED
- `/factory start <slug>` - Hard-block if no approved plan.md. Start loop: spec-writer -> builder -> reviews
- `/factory check-merge <slug>` - Check PR merge status via `gh pr view` if available
- `/factory merged <slug>` - Manually confirm merge, trigger cleanup
- `/factory resume <slug>` - Resume from CHANGES
- `/factory approve <slug>` - Resume from NEEDS_HUMAN

## Rules
- Orchestrator only writes factory/board.json
- Max 2 review rounds; else ESCALATE
- No auto-merge, always open PR
- Cleanup only after merge confirmed; if delete fails -> NEEDS_HUMAN
- Leave factory/<slug> branch until merged
- Prune DONE entries after cleanup
- plan.md is source of truth

## Planning from GitHub Issues
`/factory plan` can pull open issues:
1. If no idea given or `--issue` flag: fetch `gh issue list --state open`
2. Present issues for selection
3. Selected issue becomes the feature context
4. Board entry gets issueNumber/issueUrl

## Project Board Integration
Factory uses repo-specific GitHub Project (Kanban). Standard: Backlog, Ready, In Progress, In Review, Blocked, Done. Labels: type:*, priority:p0-p3, size:s|m|l

## Auto-project setup
When /factory plan is used with an issue and no project exists for the repo, create project + labels and add issue to Backlog.
