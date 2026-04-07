# Mawquta — S3-T3 Claude Code Prompts
## Final Operational Handoff / README & Runbook

> **How to use this file:**
> Run each prompt in order, one at a time.
> Do NOT send the next prompt until Claude Code has finished the current one and you have reviewed the output.
> Each prompt is self-contained and scoped to exactly one deliverable.

---

---

# PROMPT 1 of 4
## Codebase Audit — Read Before Writing Anything

```
You are a professional deployment-readiness auditor working on the Mawquta project.

Your job in this step is READ ONLY. Do not create, edit, or delete any files.

## Project Overview
Mawquta is a Vanilla JS modular Arabic-first prayer times web app.
Architecture:
- `index.html` is a minimal shell only (no content, no static markup)
- All UI is rendered by JS renderers under `src/js/ui/`
- `src/js/app.js` is the orchestrator and refresh lifecycle manager
- `src/js/config/` (or `src/js/config.js`) holds CONFIG object
- Services live under `src/js/services/` or similar
- Active location is the single source of truth for all three sections (Prayer, Qibla, Ramadan)
- Storage key: `ms_location` in localStorage
- External API: AlAdhan-backed runtime data
- Serverless path: `/api/geocode` (NOT a direct GeoNames frontend call)
- Default fallback: `CONFIG.DEFAULT_LOCATION`

## Your Task
Audit the following files and answer each question precisely. Keep answers short and factual.

### Files to read:
1. `index.html` (or `src/index.html`)
2. `src/js/app.js`
3. `src/js/config.js` (or equivalent config file)
4. `src/js/services/location-search.service.js` (or equivalent)
5. `package.json` (if present)
6. `README.md` or `readme.md` (if present)
7. Any `/api/` folder if present (just list the files, do not read all contents)
8. `vercel.json` or `netlify.toml` or any deployment config file if present

### Questions to answer after reading:

**Entry Point**
- What is the exact HTML file path that serves as the app entry point?
- What JS file is loaded as the main script (type module or otherwise)?
- Is there a build step required, or is this a no-build static project?

**Config**
- What is `CONFIG.DEFAULT_LOCATION`? Show the exact value.
- What is `CONFIG.STORAGE_KEY`? Show the exact value.
- Are there any other environment-sensitive config values (API keys, usernames, base URLs)?
- Is there anything in config that should NOT be committed to a public repo?

**API Paths**
- List all `/api/...` paths referenced anywhere in the codebase.
- Are these paths assumed to be serverless functions? Where are they defined?
- Is `/api/geocode` present in source and in a `/api/` folder?

**Startup Sequence**
- What happens when a user opens the app for the first time (no localStorage)?
- What is the active location resolution order? (e.g. selected → stored → default)
- Which functions trigger on startup in `app.js`?

**localStorage**
- What key(s) does the app read/write in localStorage?
- Is there a guard for invalid or malformed stored data?

**Build / Dev**
- Is there a `package.json` with scripts? If yes, list the relevant scripts (dev, build, start, etc.)
- Is there a bundler (Vite, Webpack, Parcel, etc.)?
- Is there a `vercel.json` or deployment config already present?

**README current state**
- Does a README exist?
- Does it have a "How to run locally" section?
- Does it have a "How to deploy" section?
- Does it have a description of the `/api/geocode` serverless requirement?

After answering all questions, output a single short summary:
"READY FOR HANDOFF DOC: [YES / NEEDS CLARIFICATION]"
If NEEDS CLARIFICATION, list the specific gaps (max 5 bullet points).

Do not fix anything. Do not suggest changes. Read and report only.
```

---

---

# PROMPT 2 of 4
## Write the Operational Handoff Document

> Run this AFTER Prompt 1 is complete and you have reviewed the audit output.

```
You are a professional technical writer working on the Mawquta project.

Your job is to create one operational handoff document:
`docs/HANDOFF.md`

This document is for: another developer, a future AI agent, or a hosting service engineer
who needs to understand, run, and deploy this project without asking questions.

## Strict Rules
- Do NOT add new features
- Do NOT refactor any code
- Do NOT touch app.js, config.js, or any source file
- Only create `docs/HANDOFF.md`
- Keep the document concise and actionable. No marketing language. No fluff.
- Write in English
- Use proper Markdown formatting

## Document Structure
Write `docs/HANDOFF.md` with exactly these sections, in this order:

---

### 1. Project Summary (5–8 lines max)
What the app does. Stack (Vanilla JS, no framework, HTML/CSS). Three main sections (Prayer, Qibla, Ramadan). Arabic-first RTL UI. Modular renderer architecture.

### 2. Repository Structure
Show the top-level directory tree (2 levels deep max).
After the tree, add a short table with 3 columns: Path | Role | Notes
Cover: index.html, src/js/app.js, src/js/config.js (or equivalent), src/js/ui/, src/js/services/, /api/ folder (if present), docs/.

### 3. How to Run Locally

#### 3a. Prerequisites
List: Node.js version (if required), any global tools.
If it is a no-build project served with a simple static server, say so clearly.

#### 3b. Install
Exact commands, copy-paste ready.

#### 3c. Start (dev mode)
Exact commands.
Note whether Live Reload is available (e.g. via `vercel dev` or a static server).
State clearly: "If you need to test /api/geocode locally, use `vercel dev`."

### 4. Environment & Config

#### 4a. CONFIG object
Show the CONFIG object fields and their current values (copy from config.js).
Flag any field that must be changed before deploying (e.g. DEFAULT_LOCATION, any API key or username).

#### 4b. API paths
List every `/api/...` path the app calls.
For each: what it does, what it expects, what it returns.
State clearly: "These are serverless functions. They must exist in the /api/ folder and be deployed to a platform that supports serverless functions (e.g. Vercel)."

#### 4c. localStorage
List every key the app reads or writes.
State what happens on first load (no stored data) and what happens with invalid stored data.

### 5. Architecture — Key Concepts (10 lines max)
Explain in plain language:
- index.html is a shell only
- All UI is rendered by JS renderers
- app.js is the orchestrator
- Active location is single source of truth
- Refresh flow: location resolved → all three sections refresh
- Resilience: every section has a fallback state if data is unavailable

### 6. How to Deploy

Write numbered steps (1 through N, max 12 steps).
Target platform: Vercel (recommended because /api/ serverless functions).
Include:
1. Clone the repo
2. Install Vercel CLI (if needed)
3. Run `vercel` or `vercel deploy`
4. Confirm /api/geocode is picked up as a serverless function
5. Confirm environment variables if any
6. Smoke test checklist (see Section 7)

Also add a brief note: "Other platforms (Netlify, Cloudflare Pages) can also work if serverless function support is configured separately."

### 7. Smoke Test Checklist
A checkbox list (use `- [ ]`) of 8–10 things to verify after deployment:

Examples:
- [ ] App loads without console errors
- [ ] Default location is shown correctly on first load
- [ ] Prayer times display correctly
- [ ] Countdown to next prayer is live and ticking
- [ ] Weekly prayer table is populated
- [ ] Qibla direction displays correctly
- [ ] Ramadan section displays correct imsak/iftar times (during Ramadan) or appropriate message (outside Ramadan)
- [ ] City search works and changes all sections
- [ ] Location persists after page refresh
- [ ] Fallback states show correctly when offline or API unavailable

### 8. Known Limitations & Edge Cases
A bullet list (max 8 items). Be honest and specific. Examples:
- Qibla requires coords. If location has no coords, a fallback message is shown.
- Ramadan times are derived from the week data. Outside Ramadan, a note is shown.
- /api/geocode must be available. If it fails, city search will show a safe error state.
- CONFIG.DEFAULT_LOCATION is a hardcoded fallback. Change it to the most appropriate default before launch.
- Add any others found during the Prompt 1 audit.

### 9. Branch & Workflow
- Development branch: `dev`
- Production branch: `main` (deploy from here)
- PR from dev → main before deploying
- No automated CI/CD configured (as of this document)

---

## After writing the file:
1. Confirm the file was created at `docs/HANDOFF.md`
2. Print the full file content so it can be reviewed
3. Do not touch any other file

Output at the end:
"S3-T3 Part 2 complete. docs/HANDOFF.md created."
```

---

---

# PROMPT 3 of 4
## Update README.md — Deployment & Handoff Section

> Run this AFTER Prompt 2 is complete and docs/HANDOFF.md has been reviewed.

```
You are a developer working on the Mawquta project.

Your job is to make a small, focused update to the existing README.md.

## Strict Rules
- Do NOT rewrite the README from scratch
- Do NOT change the project description, existing sections, or any code examples
- Do NOT touch any source file
- Only edit README.md
- All changes must be additive or clearly replacing outdated deployment-related text

## What to do

1. Open README.md and read it in full.

2. Check if any of the following sections already exist:
   - "How to Deploy" or "Deployment"
   - "Serverless Functions" or "API"
   - "Environment Variables" or "Config"

3. If a deployment section already exists and is accurate: add a one-line reference at the top of that section:
   > See also: [docs/HANDOFF.md](docs/HANDOFF.md) for the full operational runbook.

4. If a deployment section does NOT exist, append the following block at the bottom of README.md (before any license section if present):

---

## Deployment

This project is designed to be deployed on Vercel or any platform that supports serverless functions.

The `/api/geocode` endpoint must be available as a serverless function.

**Quick start:**
```bash
npm i -g vercel
vercel
```

For the full deployment guide, smoke test checklist, and known limitations, see:
👉 [docs/HANDOFF.md](docs/HANDOFF.md)

---

5. If README.md contains any comment like "TODO: add deployment instructions" or "deployment TBD" — remove that line only.

6. Do not change anything else.

## After editing:
1. Print a diff or show exactly what was added/changed
2. Confirm README.md was the only file touched

Output at the end:
"S3-T3 Part 3 complete. README.md updated."
```

---

---

# PROMPT 4 of 4
## Final Verification Pass

> Run this AFTER Prompts 1–3 are complete.

```
You are a deployment-readiness reviewer doing a final verification pass on the Mawquta project.

This is the last step of S3-T3 — Final Operational Handoff.

## Your Job
Verify that all deliverables from S3-T3 are in place and correct.
Do NOT make any changes unless a specific, small correction is explicitly justified below.

## Verification Checklist

### docs/HANDOFF.md
- [ ] File exists at `docs/HANDOFF.md`
- [ ] Section 1 (Project Summary) is present and accurate
- [ ] Section 2 (Repository Structure) tree matches the actual directory structure
- [ ] Section 3 (How to Run Locally) has correct commands (test them mentally against package.json)
- [ ] Section 4a (CONFIG) shows the actual CONFIG values from config.js — not placeholders
- [ ] Section 4b (API paths) lists the correct /api/... paths that exist in the codebase
- [ ] Section 4c (localStorage) correctly describes ms_location and the fallback behavior
- [ ] Section 6 (How to Deploy) steps are numbered, complete, and correct for Vercel
- [ ] Section 7 (Smoke Test) has at least 8 checkboxes
- [ ] Section 8 (Known Limitations) is honest and specific

### README.md
- [ ] README.md was not broken or rewritten
- [ ] A link to docs/HANDOFF.md is present somewhere in README.md
- [ ] No stale TODO comments about deployment remain

### Source files
- [ ] No source file was modified during S3-T3 (app.js, config.js, renderers, services must be untouched)
- [ ] The only new file is docs/HANDOFF.md
- [ ] The only edited file is README.md

## Allowed Corrections (if needed)
If you find any of these specific issues, fix them:
- A CONFIG value in HANDOFF.md does not match the actual value in config.js → correct it
- A /api/ path listed in HANDOFF.md does not actually exist in the codebase → remove it or mark it as "planned"
- A command in the "How to Run Locally" section is incorrect → fix it

Do NOT:
- Rewrite sections that are merely imperfect but accurate
- Add new sections not in the original structure
- Touch any source file
- Change the project description or architecture decisions

## Output Format
After the verification:

1. Print the checklist with [x] or [ ] for each item
2. List any corrections made (or "No corrections needed")
3. Print this exact closing statement:

---
S3-T3 — Final Operational Handoff: COMPLETE

Deliverables:
- docs/HANDOFF.md ✓
- README.md updated ✓
- No source files modified ✓

The project is now ready for Deployment Execution (next step: actual hosting on Vercel or equivalent).
---
```

---

---

## Summary — Execution Order

| # | Prompt | Output | Gate |
|---|--------|--------|------|
| 1 | Codebase Audit | Answers to all audit questions | Review answers before continuing |
| 2 | Write HANDOFF.md | `docs/HANDOFF.md` created | Review the full file before continuing |
| 3 | Update README.md | README.md updated with link to HANDOFF | Review the diff before continuing |
| 4 | Final Verification | Checklist + closing statement | Confirm all items pass |

**After all 4 prompts pass → S3-T3 is closed → proceed to Deployment Execution.**
