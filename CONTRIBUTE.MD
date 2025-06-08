# How to Contribute Code to This Repository

Welcome! Follow these steps to write and push code to the repository.

---

## 1. Create a New Branch

Always work on a new branch format - name/feature
**Do not commit directly to `main`.**

```sh
git checkout main
git pull origin main
git checkout -b your-feature-branch
```

---

## 2. Make Your Changes

- Edit or add files as needed for your feature, bugfix, or documentation.
- Save your work frequently.

---

## 3. Stage and Commit Your Changes

```sh
git add .
git commit -m "feat: short description of your change"
```
Use clear, descriptive commit messages.

---

## 4. Update Your Branch with Latest Main

```sh
git fetch origin
git rebase origin/main
```
*(Or use `git merge origin/main` if you prefer merging.)*

---

## 5. Push Your Branch

```sh
git push origin your-feature-branch
```

---

## 6. Open a Pull Request (PR)

- Go to GitHub and open a PR from your branch to `main`.
- Fill in the PR description (what you changed, why, any notes for reviewers).

---

## 7. Wait for CI/CD Checks

- The pipeline will run automatically.
- Fix any issues if the checks fail.

---

## 8. Review & Merge

- Request 2 reviews from teammates.
- Address feedback and push updates as needed.
- Once approved and all checks pass, your PR can be merged.

---

## 9. Sync Your Local Main

After your PR is merged:

```sh
git checkout main
git pull origin main
```

---

Thank you for contributing!