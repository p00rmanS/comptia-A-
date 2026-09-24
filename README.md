# Core One — CompTIA A+ mentor

An independent Core 1 (220-1201 V15) study app with **47 guided lessons and 141 original questions**. Every lesson includes English and Taglish explanations, an analogy, learning goals, guided teaching, vocabulary, a worked paper lab, and three knowledge checks. No account or backend is required.

## Run

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use an HTTP server; opening index.html directly does not compile Tailwind or resolve package imports.

## Verify and build

```sh
npm run check
npm test
npm run build
npm run preview
```

The unit tests cover content integrity, question rotation, practice selection, search, resume behavior, persistence recovery, completion totals, port parsing, and local-calendar streaks.

The browser audit is `audit/browser-check.mjs`. Run a production preview first, then execute the audit with an installed Playwright runtime. It uses an isolated browser context and does not modify personal browser progress.

Optional environment variables:

- `PLAYWRIGHT_MODULE`: absolute path to Playwright’s index.mjs when it is not locally installed.
- `BROWSER_EXECUTABLE`: path to a compatible Chromium executable.
- `PREVIEW_URL`: preview address; defaults to http://127.0.0.1:4173/.

The audit renders all five sections of every lesson, completes all 141 checks, and exercises notes, bookmarks, search, ports, flashcards, practice, storage failure, mobile navigation, and dark mode.

## Learning features

- Course grouped by exam domain, with estimated study time and participation progress.
- Search across teaching, vocabulary, objective mappings, labs, diagrams, and question explanations.
- Five lesson sections: Understand, Visualize, Apply, Exam essentials, and Knowledge check.
- Direct question navigation and resume at the first unanswered check of the current attempt.
- Bookmarks, autosaved field notes, missed-question review, and JSON progress export.
- Flashcards with domain filters, a shuffled deck that visits every card before repeating, and manual self-ratings.
- Port recall accepts equivalent complete lists and ranges; port search opens the matching exercise.
- Randomized practice sessions of 5, 10, or 20 questions (limited by the available bank), with domain or missed-question selection.
- Desktop and mobile navigation, swipe controls, keyboard section navigation, light/dark themes, and reduced-motion support.

Press / outside an interactive control to focus search. Escape dismisses search and the mobile navigation. Arrow keys move between lesson sections or flashcards when focus is outside interactive controls.

## Source layout

- `src/app.js`: routes, rendering, inputs, and study interactions.
- `src/styles.css`: Tailwind import, layout, components, themes, and responsive rules.
- `src/data.js`: stable lesson IDs and ordering, domain metadata, protocol reference, and source links.
- `src/foundation-workshops.js`: guided expansions for the original 15 short lessons.
- `src/extended-lessons.js`: containers/VDI and managed mobile devices.
- `src/infrastructure-lessons.js`: PoE, wireless standards, UEFI, and cloud metering.
- Other `src/*lessons.js` and `src/*workshops.js`: original topic-specific teaching and scenarios.
- `src/checks.js`: three questions per lesson and stable answer rotation.
- `src/learning.js`: search, practice selection, check resume, and port matching.
- `src/storage.js`: saved-state validation, accuracy, and study streaks.
- `tests/core.test.js`: unit and curriculum integrity tests.
- `audit/`: browser verification script and dated audit records.

## Coverage and scoring

The course teaches selected concepts across all five Core 1 domains. It does not claim complete objective coverage. Study times are estimates, and labs are paper exercises with worked solutions. A full timed exam, interactive performance-based labs, and detailed visual hardware trainers are not included.

Completion records answering all three lesson checks, not necessarily answering correctly. Repeated answers count in practice accuracy. The app does not predict an official scaled score or exam readiness. Flashcard ratings are manual; scheduled spaced repetition is not implemented.

The named troubleshooting methodology is supporting practice, explicitly excluded as a formal V15 objective. Full A+ certification requires Core 1 and Core 2; this app focuses on Core 1.

## Data

Progress, notes, bookmarks, and ratings remain in this browser. Clearing site data removes them. JSON export is available; import and cross-device synchronization are not implemented. When storage writes fail, the app retains changes only for the current session and reports that they were not saved. Existing lesson IDs and question ordering remain stable when new lessons are appended.

## Sources

- [Official Core 1 V15 objectives, document version 3.0](https://assets.ctfassets.net/82ripq7fjls2/1oSdlyujpaX3GrM0rir6Ge/91afb2be72785281e8fb4c0d9a70c6f4/CompTIA-A-220-1201-Exam-Objectives-3.0.pdf)
- [Microsoft: containers and virtual machines](https://learn.microsoft.com/en-us/virtualization/windowscontainers/about/containers-vs-vm)
- [Microsoft: virtual desktop overview](https://learn.microsoft.com/en-us/azure/virtual-desktop/overview)
- [Microsoft: shared cloud responsibilities](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility)
- [Microsoft: endpoint and application management](https://learn.microsoft.com/en-us/intune/fundamentals/what-is-intune)
- [IETF: TCP specification, RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)
- [Professor Messer’s 220-1201 course](https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/), linked as a companion resource.

Teaching and practice questions are original. Core One is not affiliated with or endorsed by CompTIA or Professor Messer. Device-specific service work depends on the manufacturer’s documentation.

## September 23 expansion

Added four guided lessons and 12 original checks. Existing 43 lesson IDs and 129 questions retain their ordering. Practice now supports 5, 10, and 20 questions; Shuffle reorders the deck rather than jumping to a random card. See `audit/2026-09-23-audit.md` for sources and verification.
