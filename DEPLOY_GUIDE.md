# Okuma UI Designs — Repo Setup & Deploy Guide

How to configure your machine once, then push design assets to GitHub using the Claude deploy agent.

---

## Prerequisites

| Requirement | Why |
|---|---|
| [Git](https://git-scm.com/downloads) installed | The deploy agent runs git commands |
| [Claude Code](https://claude.ai/code) (CLI or VS Code extension) | Hosts the deploy agent |
| GitHub access to `OkumaUI/Okuma_UI_Designs` | Push permission required |

---

## One-Time Repo Setup

### 1. Confirm Git is installed

Open a terminal and run:

```
git --version
```

Expected output: `git version 2.x.x` or higher. If not installed, download from https://git-scm.com/downloads.

### 2. Clone the repository

If you do not already have the folder on your machine, clone it:

```
git clone https://github.com/OkumaUI/Okuma_UI_Designs.git
```

This creates an `Okuma_UI_Designs` folder with the full repo history. Skip this step if the folder already exists locally.

### 3. Verify the local folder is a Git repo

Open a terminal in the `Okuma_UI_Designs` folder and run:

```
git status
```

- If you see file status output → the repo is already initialised, you are ready.
- If you see `fatal: not a git repository` → the deploy agent will initialise it automatically on first run (Step 1a in the agent logic).

---

## How to Run the Deploy Agent

The deploy agent is a Claude Code custom agent. It handles branching, committing, conflict checking, and merging automatically.

### Step 1 — Open the project in Claude Code

Open the `Okuma_UI_Designs` folder in VS Code with the Claude Code extension active, **or** run `claude` from a terminal in that folder.

### Step 2 — Trigger the agent

Type any of the following prompts in the Claude Code chat:

```
deploy ui designs
```

```
push the latest UI designs to GitHub
```

```
sync ui designs
```

You can add a custom commit message:

```
deploy ui designs — added dealer dashboard mobile screens
```

### Step 3 — What happens automatically

| Step | Action |
|---|---|
| 1 | Checks git status; initialises repo if needed |
| 2 | Verifies remote is `https://github.com/OkumaUI/Okuma_UI_Designs.git` |
| 3 | Checks out `main`, pulls latest, creates a timestamped branch (`ui-sync/YYYYMMDD-HHMMSS`) |
| 4 | Stages all changes (`git add -A`) |
| 5 | Commits with your message or the default `sync UI design assets` |
| 6 | Pushes the feature branch to remote |
| 7 | Pulls latest `main` again |
| 8 | Dry-run merge to check for conflicts — **stops and reports** if any are found |
| 9 | Merges into `main` and pushes — no PR required |
| 10 | Reports: branch name, commit hash, files changed, GitHub URL |

### Step 4 — Handle conflicts (if any)

If the agent stops at Step 8 and lists conflicting files:

1. Review the listed files
2. Tell Claude how to resolve (e.g. "keep our version" / "accept incoming for `styles.css`")
3. The agent will apply the resolution and continue

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Permission denied` on push | Check your GitHub token has `repo` scope; re-authenticate via `git credential reject` then retry |
| `remote: Repository not found` | Confirm you have been granted access to `OkumaUI/Okuma_UI_Designs` on GitHub |
| `Nothing to commit — repo is up to date` | No local changes detected; make edits first, then re-run |
| Agent initialises a new repo but push fails | Run `git remote -v` to confirm the remote URL, then re-trigger the agent |

---

## Repository Reference

- **GitHub repo:** https://github.com/OkumaUI/Okuma_UI_Designs
- **Default branch:** `main`
- **Deploy agent definition:** `.claude/agents/deploy-ui-designs.md`
