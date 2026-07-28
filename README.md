# Goal Tracker

Goal Tracker is a private, offline-first personal goal tracking app for a 12-week coaching program. Participants develop their material on paper, copy the key pieces into the app, and use their own words for daily practice.

> Everything you write stays on this device. Nothing is sent anywhere. Use Export to back up.

All app data stays in browser local storage on the current device. There is no account, server-side data, sync, analytics, telemetry, third-party script, external font, or remote runtime request.

## Files

The repository produces two outputs from one vanilla HTML, CSS, and JavaScript source:

- The installable PWA uses `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, and `icon-512.png`.
- `goal-tracker.html` is the self-contained file version. Its styles, script, icon, and content security policy are inline.

`build.mjs` is the only build script and uses standard Node modules.

## Deploy the PWA

1. Run `node build.mjs`.
2. Upload the PWA files listed above to the same folder on any static host.
3. Serve that folder from a secure site. Installation and service workers require a secure origin.
4. Open the deployed app once while online. The service worker caches only the app's own files for later offline use.

No database, environment variable, server function, or account setup is needed. Use a dedicated site or subdomain because browser storage is scoped to the site's origin.

### Share with GitHub Pages

1. Push the repository to GitHub.
2. Open repository **Settings**, then **Pages**.
3. Choose **Deploy from a branch**, select the release branch and root folder, then save.
4. After deployment finishes, share the Pages address in the form `ACCOUNT.github.io/goal-tracker/`.

For this repository, the public app address is `taylorbivenscoaching.github.io/goal-tracker/`. Pages publishes the release branch from its root. Rebuild, commit, and push future updates so Pages can publish the current app files.

Each person's entries remain only in that person's browser for that Pages address.

## Build and share the single file

Run:

```text
node build.mjs
```

Then share only `goal-tracker.html`. A person can save it to their device and open it directly from their files. Installation and the service worker are intentionally absent. The personal data saved by the person who built the file is never included.

The PWA and file version use separate browser storage. Moving or renaming the local HTML file can also change how a browser associates its storage. Export before changing browsers, devices, app versions, or file locations.

## Privacy and device lock

- A strict content security policy blocks remote app resources and connections.
- Goal Tracker asks for persistent browser storage on the first save and shows the result.
- The optional 4-digit screen-lock PIN is stored separately from app data and is not included in exports.
- The PIN cannot be recovered. The forgotten-PIN path wipes local Goal Tracker data, after which an exported backup can be restored.

A PIN limits casual access on the device. It does not encrypt browser storage.

## Themes and tools

Settings offers **Follow device**, **Light**, and **Dark** themes.

Tools contains private, local workflows for:

- an accountability partner card and scheduled check-in;
- notice and name entries;
- guided slip and unhook cards;
- dated evidence grouped under editable labels;
- grouped search across journal, notice and name, and evidence;
- a weekly summary that can be copied for the user to share manually.

The maintenance plan records high-risk situations, tripwires, recovery actions, supports, and a sustaining ritual. It appears alongside 30, 60, and 90 day reflections.

## Back up

1. Open **Settings**.
2. Select **Export all data**.
3. Keep the downloaded JSON file somewhere safe.

The export contains the complete versioned app-data record, including charter, commitment plans and history, reviews, journal, wellbeing, maintenance, partner, and Tools records. It does not contain the screen-lock PIN. Goal Tracker shows a reminder after seven days without an export.

Use **Print summary** for a paper or PDF view of the charter, partner card, commitment plans and history, weekly reviews, evidence, maintenance plan and reflections, and wellbeing trend.

## Restore

1. Open **Settings**.
2. Select **Import backup**.
3. Choose a JSON file previously exported by Goal Tracker.
4. Read the overwrite warning and confirm only when current app data should be replaced.

Import validates and migrates the backup before replacing current data. The device's current PIN setting is not imported or replaced.

## Data versions

Current exports use `schemaVersion: 2`. Valid version 1 data is migrated locally to version 2, with defaults added for the newer fields while existing records are preserved. A backup from a newer unsupported schema is rejected without changing current data.

Export before upgrading or importing so the current state can be recovered if needed.

## Reminders

Goal Tracker does not use push notifications because that would require a server.

The primary reminder option downloads a recurring calendar event for the user to add to a calendar app. The optional notification is best effort and works only while Goal Tracker remains open after permission is granted.

## Wellbeing attribution

WHO-5 Well-Being Index. © World Health Organization 2024. Licensed under CC BY-NC-SA 3.0 IGO.

The wellbeing check is presented as a self-awareness tool, not a diagnostic or screening instrument.
