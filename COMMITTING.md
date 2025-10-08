# Committing Changes

Follow these steps to commit your changes to the repository:

1. **Check the status of the repository**
   ```bash
   git status
   ```
   Review the output to see which files have been modified, added, or deleted.

2. **Stage the files you want to include in the commit**
   ```bash
   git add <path-to-file> ...
   ```
   Replace `<path-to-file>` with the paths to the files you want to stage. You can stage all tracked changes with `git add -u` and everything (including new files) with `git add -A`.

3. **Verify the staged changes**
   ```bash
   git status
   git diff --staged
   ```
   Confirm that only the intended changes are staged.

4. **Commit the changes with a descriptive message**
   ```bash
   git commit -m "Describe the change"
   ```

5. **Ensure a remote is configured**
   ```bash
   git remote -v
   ```
   If no remote is listed, add one that points to your GitHub repository:
   ```bash
   git remote add origin git@github.com:<username>/<repo>.git
   ```
   Replace `<username>` and `<repo>` with the correct values for your repository (you can also use the HTTPS URL).

6. **Push the commit to the remote repository**
   ```bash
   git push
   ```
   If this is your first push to a branch, specify the remote and branch name, e.g. `git push origin my-branch`.

## Using Codex (the OpenAI assistant) to run the workflow

When you are working inside a Codex-powered environment (such as GitHub Copilot Workspace or an OpenAI-provided
container), you can ask the assistant to run each of the commands above for you.

1. **Open a terminal with the repository**. If you are not already in the repository root, ask Codex to run `pwd`
   or `ls` and navigate there with `cd <path>`.
2. **Check status and stage files**. Ask Codex to run `git status` to review changes, then use `git add <file>` (or
   `git add -A`) to stage the desired files. Codex can execute these commands on your behalf.
3. **Review staged changes**. Request `git diff --staged` so you can confirm everything looks correct.
4. **Commit**. Provide a clear commit message and ask Codex to run `git commit -m "your message"`.
5. **Confirm the remote**. Ask Codex to run `git remote -v`. If no remote is configured, provide the GitHub URL and
   have Codex run `git remote add origin <url>` for you (replace `<url>` with your repository's clone URL).
6. **Push**. Finally, ask Codex to run `git push` (including the remote/branch name if needed). Codex will relay the
   output so you can verify the push succeeded.

By stepping through these prompts, you can rely on Codex to operate the Git commands while still keeping control over
what is staged, committed, and pushed to your repository.

These steps will create a commit containing your staged changes and upload it to the remote repository.
