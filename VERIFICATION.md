# Verification

Verification date: 2026-07-27

## Build and static checks

- Pass: `node build.mjs` completed and produced both PWA icons and `goal-tracker.html`.
- Pass: syntax checks completed for the app, service worker, and build script.
- Pass: the single-file build contains inline CSS and JavaScript, no manifest link, and no external app asset references.
- Pass: the single-file CSP hashes match its actual inline CSS and JavaScript.
- Pass: the generated icons are valid PNG files at 192 by 192 and 512 by 512 pixels.
- Pass: the manifest names the app Goal Tracker and declares the generated icons.

## Privacy checks

- Pass: a whole-repository scan for every prohibited networking primitive and web-address literal from the specification found only the two expected service-worker matches.
- Pass: the service worker handles only its explicit app-shell allowlist.
- Pass: the hosted CSP sets remote connections to none. The single-file CSP also sets remote connections, workers, and manifests to none.
- Pass: no external scripts, stylesheets, fonts, analytics, telemetry, or remote assets are present.
- Pass: the exact visible privacy statement appears in the app.

## UI text checks

- Pass: a case-insensitive repository scan found none of the four prohibited terms from the specification.
- Pass: no em dash character is present.
- Pass: the app name is Goal Tracker in the page title, manifest, header, printable summary, and generated calendar event.

## Browser checks

- Pass: the PWA loaded without app console errors.
- Pass: Today, Charter, Commitments, Weekly review, Journal, Wellbeing, Maintenance, and Settings each opened without app console errors.
- Pass: a complete populated backup was imported into a fresh local-storage origin after the overwrite confirmation.
- Pass: the restored charter, greeting, commitments, weekly reviews, journal entries, wellbeing checks, maintenance data, and settings were re-exported byte-for-byte identically at the section level.
- Pass: restored records appeared on every relevant screen. The sample wellbeing score was 84, from a raw total of 21.
- Pass: the printable summary contained Charter, Commitment history, Weekly reviews, and Wellbeing trend.
- Pass: the PWA reloaded with its restored data after the temporary server was stopped.
- Pass: the self-contained file loaded over a fresh local test origin, exposed every screen, hid installation, had no manifest or external app assets, and produced no app console errors.
- Manual confirmation pending: direct local-file navigation was blocked by the browser automation security policy. Opening the generated file directly, saving one entry, and exporting once must be confirmed manually.

## 360px viewport

- Pass: all eight screens were checked at 360 by 800 pixels.
- Pass: no screen produced horizontal scrolling.
- Pass: no visible interactive target measured below 44 by 44 pixels. Wrapped checkbox, radio, and file-input controls were measured by their clickable labels.

## Feature checks

- Pass: charter entry and same-day greeting rotation used the user's own charter text.
- Pass: commitment completion, renegotiation detail and count, stuck support text, and the weekly status pattern were exercised.
- Pass: weekly review ratings and the canvas trend chart rendered.
- Pass: journal entry creation and editable prompts were exercised.
- Pass: WHO-5 raw and 0 to 100 scoring, history, attribution, disclaimer, and canvas chart rendered.
- Pass: 30, 60, and 90 day maintenance marks were calculated and a due reflection was saved.
- Pass: the recurring daily calendar file downloaded with a daily recurrence rule and alarm.
- Pass: storage persistence was requested on first save and the granted or not-granted result was surfaced.
- Pass: JSON export, validated import, overwrite confirmation, and backup reminder state were exercised.

## Documentation

- Pass: `README.md` covers static PWA deployment, producing and sharing the single-file build, backup, restore, storage persistence, and reminder limits.
