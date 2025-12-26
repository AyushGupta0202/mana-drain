# 🤖 Automation Setup Documentation

This document describes all automated workflows and configurations in the Mana Drain repository.

## 📋 Overview

This repository uses GitHub Actions, Dependabot, and various automation tools to maintain code quality, visibility, and repository health.

## 🔄 Workflows

### 1. **CI Pipeline** (`.github/workflows/ci.yml`)
- **Triggers:** Push to main, Pull Requests
- **Purpose:** Lint and build verification
- **Runs:** ESLint, Build check

### 2. **Metadata Sync** (`.github/workflows/metadata-sync.yml`)
- **Triggers:** Push to main, Manual dispatch
- **Purpose:** Automatically syncs repository description and topics
- **Updates:** Description, 14 canonical topics

### 3. **Topic Enforcer** (`.github/workflows/topic-enforcer.yml`)
- **Triggers:** Push to main, Manual dispatch
- **Purpose:** Ensures repository topics match canonical list
- **Prevents:** Topic drift

### 4. **Release Drafter** (`.github/workflows/release-drafter.yml`)
- **Triggers:** Push to main, PR events
- **Purpose:** Automatically drafts release notes
- **Config:** `.github/release-drafter.yml`

### 5. **README Lint** (`.github/workflows/readme-lint.yml`)
- **Triggers:** README.md changes, Manual dispatch
- **Purpose:** Validates README structure and quality
- **Checks:** Required sections, links, length

### 6. **Badge Update** (`.github/workflows/badge-update.yml`)
- **Triggers:** Weekly schedule, Manual dispatch
- **Purpose:** Validates and updates README badges
- **Frequency:** Weekly

### 7. **Auto Label** (`.github/workflows/auto-label.yml`)
- **Triggers:** PR opened/updated
- **Purpose:** Automatically labels PRs based on commits
- **Uses:** actions/label-commits

### 8. **Stale Issues/PRs** (`.github/workflows/stale.yml`)
- **Triggers:** Daily schedule, Manual dispatch
- **Purpose:** Marks stale issues/PRs after inactivity
- **Settings:** 60 days stale, 7 days before close

### 9. **Dependency Review** (`.github/workflows/dependency-review.yml`)
- **Triggers:** PR with package.json changes
- **Purpose:** Reviews dependency changes for security
- **Uses:** GitHub's dependency review action

## 🔧 Configurations

### Dependabot (`.github/dependabot.yml`)
- **Ecosystem:** npm
- **Schedule:** Weekly (Mondays, 9 AM)
- **Grouping:** Production, Development, Patch updates
- **Limits:** Max 5 open PRs
- **Ignores:** Major updates for Next.js, React, React-DOM

### Release Drafter (`.github/release-drafter.yml`)
- **Categories:** Features, Bug Fixes, UI/UX, Performance, Docs, Maintenance, Testing, Security
- **Versioning:** Semantic versioning (major/minor/patch)
- **Auto-labeling:** Based on file patterns

## 📝 Templates

### Issue Templates
- **Bug Report:** `.github/ISSUE_TEMPLATE/bug_report.md`
- **Feature Request:** `.github/ISSUE_TEMPLATE/feature_request.md`
- **Config:** `.github/ISSUE_TEMPLATE/config.yml`

### Pull Request Template
- **Location:** `.github/PULL_REQUEST_TEMPLATE.md`
- **Includes:** Description, type, checklist, related issues

## 🎯 Canonical Topics

The repository maintains these topics automatically:
- finance
- budget-tracker
- rpg
- nextjs
- typescript
- tailwindcss
- framer-motion
- zustand
- recharts
- gamification
- personal-finance
- web-app
- react
- game-mechanics

## 🚀 Getting Started

All workflows are automatically enabled. To manually trigger:

1. Go to **Actions** tab
2. Select workflow
3. Click **Run workflow**

## 📊 Monitoring

- Check workflow runs in the **Actions** tab
- View Dependabot alerts in **Security** → **Dependabot**
- Review release drafts in **Releases** → **Drafts**

## 🔒 Permissions

All workflows use minimal required permissions:
- `contents: read` - Read repository content
- `contents: write` - Update repository (metadata sync)
- `metadata: write` - Update repository metadata
- `pull-requests: write` - Label PRs
- `issues: write` - Manage stale issues

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Release Drafter](https://github.com/release-drafter/release-drafter)

