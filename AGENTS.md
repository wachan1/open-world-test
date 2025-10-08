# Repository Agent Instructions

This file provides high-level guidance for any automated agent contributing to this repository.

## Purpose
- Describe the intent of the project and any expectations for contributions.
- Document repository-specific conventions that might not be obvious from the code alone.
- Highlight testing or validation steps that should accompany changes.

## Project Overview
- This project hosts a simple static site served from `index.html` with supporting assets in `css/` and `js/`.
- Keep the site lightweight and accessible; avoid introducing heavy frameworks unless explicitly requested.

## Coding Conventions
- Prefer semantic HTML elements and descriptive class names.
- Use modern, standards-based CSS; avoid vendor-prefixed properties unless necessary for compatibility.
- Write JavaScript in ES6+ syntax and organize reusable logic into small functions.
- Maintain consistent indentation (2 spaces for HTML/CSS/JS) and keep lines under 100 characters where practical.

## Testing & Validation
- After modifying HTML, CSS, or JavaScript, open the page in a browser (or use automated checks if available) to confirm there are no console errors and that the UI renders as expected.
- Run any available linters or formatters relevant to the touched files.

## Documentation Expectations
- Update inline comments or README-style documentation when behavior changes or new features are added.
- Summarize user-visible changes in commit messages and PR descriptions.

Agents working within this repository should follow these instructions for any files within this directory tree. If more specific guidance is required for a subdirectory, add another `AGENTS.md` file inside that folder.
