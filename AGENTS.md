# Repository Guidelines

## Project Structure & Module Organization
This Next.js 16 app uses the App Router under `app/`. The entry screen lives in `app/page.tsx` and imports reusable UI from `app/components/` (PDF viewer, Reveal.js embed, modal chrome). Presentation metadata and shared types are centralized in `app/lib/`, so extend `presentations.ts` when adding new decks. Keep slide files in `app/presentations/` for PDFs and host any Reveal.js builds under `/presentations/...` for static serving. Public assets that must resolve without routing logic belong in `public/`. Generated output such as `.next/` stays out of version control.

## Build, Test, and Development Commands
- `npm run dev` starts the local dev server with hot reload at `http://localhost:3000`.
- `npm run build` creates an optimized production bundle (failures catch type or lint issues).
- `npm run start` serves the built bundle; use it to rehearse production behavior.
- `npm run lint` runs ESLint with the Next.js Core Web Vitals rules.

## Coding Style & Naming Conventions
TypeScript is required for all React modules; export typed props and favor discriminated unions like `Presentation`. Components live in PascalCase files (`PresentationCard.tsx`), hooks and utilities use camelCase. Stick to Tailwind CSS utility classes and the Nord-derived tokens declared in `app/globals.css`; avoid ad-hoc hex values. Maintain ISO 8601 date strings, and keep static paths absolute from the app root.

## Testing Guidelines
Automated tests are not yet configured, so run `npm run lint` and verify key flows (PDF render, Reveal.js embed, modal navigation) before merging. When adding tests, co-locate component specs in `app/components/__tests__/` with React Testing Library, and target 100% coverage on new UI logic so regressions remain visible.

## Commit & Pull Request Guidelines
The current history lacks a stable convention—adopt imperative, lowercase subjects (`feat: add pdf viewer zoom`). Group related changes per commit, and include context on data additions in the body. PRs should link tracking issues, describe UI changes, and add screenshots or screen captures when modifying presentation rendering. Confirm lint passes and note any manual QA steps in the PR checklist.

## Asset & Content Management
Compress PDFs before committing and keep filenames human-readable; mirror IDs in `presentations.ts`. For Reveal.js decks, export static HTML and assets into `public/presentations/<id>/` so they deploy intact.
