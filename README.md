# Goal Tracker

Goal Tracker is a private, offline-first personal goal tracking app for a 12-week coaching program. Participants build their material on paper, copy the key pieces into the app, and use their own words for daily practice.

Everything is stored in the browser on the current device. There is no account, server-side data, sync, analytics, telemetry, third-party script, external font, or remote runtime request.

## Files

The repository contains two outputs from the same source:

- The PWA uses `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, and `icon-512.png`.
- `goal-tracker.html` is the self-contained file version. It includes its script, styles, icon, and a hash-based content security policy.

`build.mjs` is the only build script. It uses only standard Node modules.

## Deploy the PWA

1. Run `node build.mjs` so the icons and self-contained file match the current source.
2. Upload the PWA files listed above to the root of any static host.
3. Serve the site over HTTPS. A secure origin is required for installation and service workers.
4. Use a dedicated origin or subdomain for Goal Tracker. Browser storage belongs to an origin, so sharing an origin with unrelated pages can make local data management less predictable.
5. Open the deployed `index.html` once while online. The service worker caches only the app's own files, and later loads work offline.

No database, environment variable, server function, or account setup is needed.

## Build and share the single file

Run:

```text
node build.mjs
```

Then share only `goal-tracker.html`. A person can save it to their device and open it directly from their files. Installation and the service worker are intentionally absent in this version. All other app features remain available.

Sharing the HTML file shares the app only. It never includes anyone's saved Goal Tracker data.

The PWA and file version use separate browser storage. Moving or renaming the local HTML file can also affect how a browser associates its storage. Export before moving between versions, devices, browsers, or file locations.

## Back up

1. Open Settings.
2. Select **Export all data**.
3. Keep the downloaded JSON file somewhere safe.

The export contains the complete versioned local data record. Goal Tracker shows a reminder when seven days have passed without an export.

The printable summary is also in Settings. It covers the charter, commitment history, weekly reviews, and wellbeing trend.

## Restore

1. Open Settings.
2. Select **Import backup**.
3. Choose a JSON file previously exported by Goal Tracker.
4. Read the overwrite warning and confirm only when you want to replace all Goal Tracker data on that device.

Import validates and migrates the backup before replacing current data. Backups from a newer unsupported schema are rejected without changing current data.

## Storage persistence

On the first successful save, Goal Tracker asks the browser for persistent storage and shows whether the request was granted. Persistent storage reduces the chance of automatic clearing, but it does not protect against device loss, browser resets, or manual deletion. Export remains the dependable backup.

## Reminders

Goal Tracker does not use push notifications because that would require a server.

The primary reminder option downloads a recurring calendar event. The optional notification works only while Goal Tracker remains open and only after the user grants notification permission.

## Wellbeing attribution

WHO-5 Well-Being Index. © World Health Organization 2024. Licensed under CC BY-NC-SA 3.0 IGO.

The wellbeing check is presented as a self-awareness tool, not a diagnostic or screening instrument.
