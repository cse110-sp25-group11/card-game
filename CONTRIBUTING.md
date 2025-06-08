# Contributing Guide

Welcome to the Campus Swipe repository!  
This guide explains how to write and push code to this repo using best practices.

---

## 1. **Create a New Branch**

Always create a new branch for your work.  
**Do not commit directly to `main`.**

```sh
git checkout main
git pull origin main
git checkout -b your-feature-branch
```

---

## 2. **Make Your Changes**

- Edit or add files as needed for your feature, bugfix, or documentation.
- Save your work frequently.

---

## 3. **Stage and Commit Your Changes**

```sh
git add .
git commit -m "feat: short description of your change"
```
Use clear, descriptive commit messages.

---

## 4. **Pull Latest Main (to avoid conflicts)**

```sh
git fetch origin
git rebase origin/main
```
or, if you prefer merge:
```sh
git merge origin/main
```

---

## 5. **Push Your Branch**

```sh
git push origin your-feature-branch
```

---

## 6. **Open a Pull Request (PR)**

- Go to GitHub and open a PR from your branch to `main`.
- Fill in the PR template:
  - **What you changed**
  - **Why you changed it**
  - **Any special notes for reviewers**

---

## 7. **CI/CD & Code Quality**

- The CI/CD pipeline will run automatically on your PR.
- Fix any issues reported by Qlty or other checks before requesting review.

---

## 8. **Review & Merge**

- Request review from teammates.
- Address feedback and push updates as needed.
- Once approved and all checks pass, your PR can be merged.

---

## 9. **Sync Your Local Main**

After your PR is merged:

```sh
git checkout main
git pull origin main
```

---

## **Tips**

- Commit often and keep changes focused.
- Use feature branches for all work.
- Ask questions in PRs or team chat if unsure.

---

Thank you for contributing!