# Both-course expansion — October 6, 2026

Core 1 adds Ethernet link diagnosis and transfer-speed reasoning: 67 workshops and 201 checks. Core 2 adds log-based diagnosis and update planning: 30 workshops and 90 checks. All four workshops include English/Taglish teaching, vocabulary, four guided steps, a worked paper lab, and three original questions with explanations.

New batches append after existing content. Compatibility digests protect all earlier 65 Core 1 and 28 Core 2 lesson IDs, numbering, question text, and rotated choices. Unit checks also verify search and domain practice integration, worked transfer arithmetic, related links, and complete learning sequences.

The commit includes earlier Core 2 lessons, independent course storage, and persistent navigation. Lesson completion still requires three answers, while browsing another lesson is unrestricted. Keyboard section arrows and Alt + arrows for lessons leave note editing alone. Mobile controls sit above the bottom menu.

## Teaching references

- Core 1 [CompTIA objectives version 3.0](https://assets.ctfassets.net/82ripq7fjls2/1oSdlyujpaX3GrM0rir6Ge/91afb2be72785281e8fb4c0d9a70c6f4/CompTIA-A-220-1201-Exam-Objectives-3.0.pdf): slow and intermittent networking, objective 5.5. Transfer arithmetic and duplex behavior are supporting diagnostic context.
- Core 2 [CompTIA-authored objectives version 2.0 hosted by ONLC](https://www.onlc.com/comptia/comptia-a-220-1202-exam-objectives.pdf): Windows tools and symptoms, 1.4/3.1; update settings and workstation protection, 1.6/2.7. This hosted revision is not represented as the latest.
- [Cisco Ethernet negotiation and diagnostics](https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.html): endpoint settings and error evidence.
- [Microsoft security event logs](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/view-the-security-event-log) and [stop-error diagnosis](https://learn.microsoft.com/en-us/windows/client-management/troubleshoot-stop-errors): relevant log context.
- [CISA software update guidance](https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Software-Updates-Tip-Sheet.pdf): patching security weaknesses.

Content is original and remains selected coverage. Labs are paper exercises. No system commands or updates run from the app.

## Verification

All 29 unit tests pass, including both full prior-course compatibility digests.

JavaScript syntax checks and the production build pass. The combined bundle produces Vite’s size advisory (528.29 kB minified; 173.43 kB gzip).

The production Core 1 audit passes 335 sections and 201 checks, lab reveals, notes, search, bookmarks, flashcards, practice, port recall, storage failure, and desktop/mobile layouts. Core 2 passes 150 sections and 90 checks, its study flows, mobile overflow checks, course switching, and storage isolation. Both capture zero console/runtime errors. The navigation audit passes mouse, keyboard, mobile positioning, note-editing protection, and completion integrity. Tests use isolated browser profiles.

Screenshots are retained under October 6 names for Core 1; Core 2 and navigation audits use their existing named output files. Git whitespace checks pass.
