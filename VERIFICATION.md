# Verification

Verification date: 2026-07-28

Scope: version 2 working tree before final publication.

## Build and static checks

- Pass: `node --check app.js` completed.
- Pass: `node --check build.mjs` completed.
- Pass: `node build.mjs` produced the PWA assets and `goal-tracker.html`.
- Pass: the project verifier confirmed the single-file flag, no external app asset references, matching inline script and style hashes, the Goal Tracker manifest name, and valid 192 by 192 and 512 by 512 PNG icons.
- Pass: the exact visible privacy statement is present in both outputs.
- Pass: the WHO-5 attribution and required self-awareness wording are present.

## Browser checks recorded

- Pass: the version 2 PWA loaded on a fresh local origin with no app console errors before data entry.
- Pass: data was entered and rendered for the charter, a commitment and its three plans, a renegotiation and plan update, a weekly review, journal, WHO-5, maintenance plan and reflection, accountability partner, notice and name, guided cards, and evidence.
- Pass: the sample WHO-5 raw total was 16 and its stored score was 64.
- Pass: grouped search returned the matching evidence record.
- Pass: the copied weekly summary included all five commitment status counts, renegotiation count, both weekly ratings, obstacle, latest wellbeing score and date, and the partner destination.
- Pass: both guided cards handled an empty charter without inserting generic material, and each completion was logged.
- Pass: Dark theme selection updated the app's computed theme variables.
- Pass: semantic theme colors are used for status details, including readable gold text against the dark gold surface.
- Pass: a populated version 2 export contained every app-data family and contained no PIN, PIN digits, or lock-record key.
- Pass: the populated export was restored after the forgotten-PIN wipe flow. The overwrite confirmation appeared before import, every data family rendered again, and the device lock remained disabled because lock data is not exported.
- Pass: a version 1 fixture migrated locally. Existing charter, commitment, review, journal, wellbeing, and maintenance-reflection data rendered after import; commitment plans, Tools records, partner card, maintenance plan, and theme used their version 2 defaults.
- Pass: the PIN gate hid the app shell before unlock, rejected an incorrect PIN with one generic message, accepted the correct PIN, and exposed the wipe-and-restore path only after explicit confirmation.
- Pass: every final PWA screen opened after migration with no browser console errors.

## 360px viewport checks recorded

- Pass: Today, Charter, Commitments, Weekly review, Journal, Wellbeing, Tools, and Settings were checked at 360 by 800 pixels in Dark theme.
- Pass: the same eight screens were checked at 360 by 800 pixels in Light theme.
- Pass: Maintenance was checked at 360 by 800 pixels in both themes, and a guided-card dialog was checked in Light theme.
- Pass: none of the checked screens or the dialog produced horizontal scrolling.
- Pass: no visible interactive target on the checked screens or dialog measured below 44 by 44 pixels. Checkbox and radio controls were measured by their clickable labels.

## Final privacy and wording scans

- Pass: the final whole-repository networking scan found only the service worker's same-origin app-shell request handler and its request call.
- Pass: the final whole-repository wording scan found none of the restricted terms or the em dash character.
- Pass: no remote script, stylesheet, image, or font reference is present.

## Self-contained file

- Pass: the current version 2 `goal-tracker.html` has the single-file flag, contains the exact current app script and styles by hash, has no external app asset reference, and uses a hash-based policy that blocks connections, workers, manifests, objects, frames, and forms.
- Pass: the file-only branch hides installation and service-worker setup while leaving the shared app feature code intact.
- Note: browser automation policy blocks direct local-file navigation, so a current-version manual local-file launch remains the only check that could not be rerun automatically. The earlier user-confirmed local-file test applied to the prior build.

## Documentation

- Pass: `README.md` covers static PWA deployment, GitHub Pages sharing, producing and sharing the single-file build, privacy, PIN behavior, themes, Tools, backup, restore, and version 1 migration.
