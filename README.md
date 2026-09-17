# Core One — CompTIA A+ mentor

A local study app with separate HTML, CSS, JavaScript modules, Tailwind CSS, Vite, and npm configuration. No account or backend is required.

## Run

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run check
npm test
npm run build
npm run preview
```

Serve the application through Vite or another HTTP server; opening `index.html` directly does not compile Tailwind or resolve npm imports.

## Files

- `index.html`: document shell and entry point
- `src/styles.css`: Tailwind import, design tokens, custom components, dark theme, responsive layouts
- `src/app.js`: navigation and study interactions
- `src/data.js`: 38 original lessons, 14 protocol entries, domain metadata and sources
- `src/checks.js`: three knowledge checks per lesson, 114 original questions total
- `src/storage.js`: persistence, accuracy and local-calendar streak calculations
- `tests/core.test.js`: content integrity, scoring, storage recovery, and date-boundary checks
- `vite.config.js`: Vite and Tailwind plugin
- `package.json` / `package-lock.json`: npm commands and dependencies

## Interactions

Desktop sidebar and mobile bottom navigation; searchable lesson and port content; domain filters; five lesson sections; English, Taglish, and technician explanations; original analogies; concept flow diagrams; three scenario/concept checks per lesson with explanations; bookmarks; autosaved personal notes; flashcard reveal, domain selection, shuffle and self-ratings; ports recall; randomized five-question scenario sessions; missed-topic review; progress export; light/dark theme.

Swipe left/right on the lesson content panel or flashcard. Visible Previous/Next buttons provide the same navigation. Arrow keys also work when focus is not in a control. Vertical scrolling remains available. Press `/` outside a control to focus search; Escape dismisses search/navigation. Reduced-motion preferences are respected.

## Learning and scoring boundaries

This is a **starter study course**, not full coverage of the entire certification. Lesson completion requires answering all three checks, not getting every answer correct. Answers and explanations remain available. Repeated answers are included in practice accuracy and clearly described as such. No official exam-score or readiness prediction is calculated. Flashcard ratings are manual; this release does not implement scheduled spaced repetition.

Full objective coverage, a full-length timed exam simulator, performance-based labs, and detailed cable/motherboard visual trainers remain future work. No inactive navigation entries advertise these as finished features.

Progress, notes, ratings and bookmarks are stored in this browser. Clearing site storage removes them. JSON export is available; import and cross-device synchronization are not implemented. If browser storage is unavailable, the app warns and keeps a temporary in-memory session.

## Accuracy audit

Primary source: [CompTIA A+ 220-1201 V15 objectives, version 3.0](https://assets.ctfassets.net/82ripq7fjls2/1oSdlyujpaX3GrM0rir6Ge/91afb2be72785281e8fb4c0d9a70c6f4/CompTIA-A-220-1201-Exam-Objectives-3.0.pdf).

- Corrected the supplied brief's methodology claim: the named method is supporting practice, explicitly not a formal V15 objective. Planning/implementation is one of six steps.
- Included NetBIOS 137–139 in the objective 2.1 ports reference; the brief omitted it.
- Passing score is 675 on a 100–900 scale, not a raw percentage.
- Distinguished M.2 shape, SATA/PCIe interfaces, and NVMe protocol.
- Qualified DNS diagnosis: reachable IP plus failed name lookup is a clue, not proof every internet service works.
- Clarified TCP does not itself encrypt and UDP is not categorically faster.
- Included transport nuance for DNS, RDP, and HTTP/3.
- Marked US-specific 2.4 GHz channel guidance and qualified band-performance claims.
- Included safe handling of swollen batteries and power supplies; modular PSU cables require explicit compatibility.
- CPU socket fit alone is not sufficient compatibility; USB-C shape does not guarantee video.

[Professor Messer's official 220-1201 course](https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/) is linked as a companion resource. No scripts, paid notes, or exam questions were copied. This app has no affiliation with or endorsement by CompTIA or Professor Messer.

## Guided course expansion

Five additional guided lessons cover mobile synchronization, VLANs and VPNs, RAID, cloud deployment, and display diagnosis. Each includes learning goals, four teaching steps, vocabulary, common confusions, a paper mini lab with a revealable worked solution, and three original checks. Labs use the existing autosaved field notes. These are text lessons, not recorded video lessons or a complete exam-preparation course.

Four further guided lessons cover networking tools (2.8), cable selection (3.2), printer installation (3.7), and printer troubleshooting and maintenance (5.6 / 3.8). Content lives in `src/practical-lessons.js` and joins the same lesson, flashcard, practice, search, and progress flows. 

Three further guided lessons cover network host services (2.3), internet and network types (2.7), and storage troubleshooting (5.2). Content is in `src/service-lessons.js`. The course now includes 23 guided lessons and 15 concise foundation lessons, with 114 checks total.

## Expanded networking workshops

DHCP, DNS, IPv4, and switching now have extended original instruction, worked examples, recap lists, and related-lesson links. Existing lesson IDs and saved progress are preserved. The course index groups lessons into expandable domain sections with estimated study time and completion counts. Each lesson also provides an expandable list of other lessons in its domain. Content is in `src/networking-workshops.js`.

## Expanded hardware workshops

Motherboard, CPU, and RAM lessons now include six teaching steps each, learning goals, vocabulary, worked paper labs, common confusions, recaps, and related lessons. Content is in src/hardware-workshops.js. The course has 38 lessons: 23 guided and 15 concise foundation lessons, with 114 checks. Existing lesson IDs and saved progress are preserved.

## Essential lessons and bug audit

Four additional guided lessons in `src/essential-lessons.js` cover IPv6 (2.6), display technologies (3.1), mobile-device troubleshooting (5.4), and Wi-Fi diagnosis (5.5 / 2.2). Each includes original English and Taglish explanations, vocabulary, a concept flow, a worked paper lab, a recap, related lessons, and three checks.

Port recall accepts equivalent complete lists and ranges, including `137,138,139` for NetBIOS. Missing or extra ports remain incorrect. Notes report failed browser writes accurately. Completion totals ignore obsolete lesson IDs without deleting saved history.

The reproducible browser audit is `audit/browser-check.mjs`. Run a production preview first, then use an installed Playwright module. Optional environment variables are `PLAYWRIGHT_MODULE` (absolute path to its `index.mjs`), `BROWSER_EXECUTABLE` (installed compatible Chromium), and `PREVIEW_URL` (defaults to `http://127.0.0.1:4173/`). It uses an isolated browser context and does not modify personal browser progress.



## Component lesson expansion — September 12

Added cooling, expansion-card installation, and USB/docking lessons in `src/component-lessons.js`. Each contains guided teaching, vocabulary, a worked paper lab, recap, related lessons, and three original knowledge checks. Current totals: 41 lessons, 26 guided workshops, and 123 questions. Existing IDs and saved progress remain compatible.
