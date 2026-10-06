# Core One — CompTIA A+ mentor

## Core 2 starter course

Select **Core 2** in the sidebar (open the menu on mobile), or open `?core=2#dashboard`. Core 1 remains the default. Each exam keeps separate browser progress, notes, bookmarks, flashcard ratings, and practice history.

Core 2 (220-1202) contains **30 guided English/Taglish workshops and 90 original checks**. Each lesson has vocabulary, an analogy, a concept flow, a worked paper lab, and explanations for all choices. Flashcards, search, practice, review, and progress export use the selected course.

The October expansion adds OS installation, filesystems, Windows tools and commands, Linux basics, share/NTFS permissions, phishing, malware response, Windows recovery, mobile app troubleshooting, backup restore chains, and change management. The Resources page links four learning sequences and the teaching references. This course covers selected concepts across all four Core 2 domains; it does not claim full objective coverage. The October 4 batch adds Windows editions/settings, client networking, macOS, cloud productivity, wireless/browser security, encryption, browser diagnosis, remote support, evidence/privacy, and scripting. Hardware safety, environmental procedures, and further troubleshooting scenarios remain to expand. Core 1’s ports trainer remains in Core 1.

Core 2 content lives in `src/core2-data.js` and the seven `src/core2-*-lessons.js` modules; `src/course.js` selects the course. New content is appended to keep existing question identities and answer rotation stable. `tests/core2.test.js` validates content, search/practice integration, compatibility, and storage isolation. `audit/core2-browser.mjs` checks desktop/mobile flows with an isolated Edge browser; set `PLAYWRIGHT_MODULE` and optionally `PREVIEW_URL` before running it.

An independent Core 1 (220-1201 V15) study app with **67 guided lessons and 201 original questions**. Every lesson includes English and Taglish explanations, an analogy, learning goals, guided teaching, vocabulary, a worked paper lab, and three knowledge checks. No account or backend is required.

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

The audit renders all five sections of every lesson, completes all 201 checks, and exercises notes, bookmarks, search, ports, flashcards, practice, storage failure, mobile navigation, and dark mode.

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
- `src/deep-lessons.js` and `src/deep-*.js`: 18 additional mobile, networking, hardware, cloud, and diagnostic workshops.
- Other `src/*lessons.js` and `src/*workshops.js`: original topic-specific teaching and scenarios.
- `src/checks.js`: three questions per lesson and stable answer rotation.
- `src/learning.js`: search, practice selection, check resume, and port matching.
- `src/storage.js`: saved-state validation, accuracy, and study streaks.
- `tests/core.test.js`: unit and curriculum integrity tests.
- `audit/`: browser verification script and dated audit records.

## Coverage and scoring

The course teaches selected concepts across all five Core 1 domains. It does not claim complete objective coverage. Study times are estimates, and labs are paper exercises with worked solutions. A full timed exam, interactive performance-based labs, and detailed visual hardware trainers are not included.

Completion records answering all three lesson checks, not necessarily answering correctly. Repeated answers count in practice accuracy. The app does not predict an official scaled score or exam readiness. Flashcard ratings are manual; scheduled spaced repetition is not implemented.

The named troubleshooting methodology is supporting practice, explicitly excluded as a formal V15 objective. Full A+ certification requires Core 1 and Core 2; this app includes separate courses for both exams.

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

## September 24 teaching expansion

Added 18 guided workshops and 54 questions. Start with these sequences:

- Network reasoning: IPv4 → Subnet lab → NAT/PAT → Email DNS → Network appliances → Time, logs and AAA → Cable faults.
- Hardware diagnosis: RAM compatibility → RAM fault lab → Slow PC lab → Display connections → Display artifacts.
- Storage and printing: RAID → RAID capacity math → Laser process → Printer technologies.
- Mobile and cloud: SIM/eSIM → Location services → Camera/microphone → Virtual networking → Sync versus backup.

Every new lesson contains a worked paper exercise and three original questions with explanations. Existing question identities and answer order are checked against the pre-expansion course to preserve saved progress. See audit/2026-09-24-audit.md for scope and sources.

## October 6 expansion

Added Ethernet link diagnosis and transfer-speed reasoning to Core 1, plus event-log diagnosis and update planning to Core 2. Each includes a worked paper lab and three original questions. Existing question identities and rotated choices are preserved for all previous 65 Core 1 and 28 Core 2 lessons. Lesson navigation stays visible while reading, with previous/next lesson links and Alt + arrow keyboard shortcuts. See audit/2026-10-06-expansion.md for verification.
