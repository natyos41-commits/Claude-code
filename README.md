# יומן אימונים — Workout Log

A Hebrew, offline-first workout log with a built-in A/B/C program, progress tracking and Excel export.
It installs on Android and iPhone as a home-screen app (PWA) — no app store needed.

## Install on your phone

The app must be served over HTTPS. The easiest free way is GitHub Pages:

1. In this repository on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
2. Choose the branch that holds these files and the folder **`/ (root)`**, then **Save**.
3. After a minute the app is live at `https://<your-github-user>.github.io/<repo-name>/`.

Then on the phone, open that link:

- **iPhone (Safari):** tap the Share button (square with an arrow) → **Add to Home Screen** → **Add**.
- **Android (Chrome):** tap the **⋮** menu → **Install app** (or **Add to Home screen**). The app also shows an
  **התקן על המסך הראשי** button in the עריכה tab when Chrome allows it.

After that the app opens full-screen from its icon and works without internet.

## Excel

In the **עריכה** tab, tap **ייצוא לאקסל (.xlsx)**. The share sheet opens so you can save the file to Files / Google Drive
or send it on WhatsApp. The workbook has three sheets:

| Sheet | Contents |
|---|---|
| **סטים** | one row per set: date, profile, workout (A/B/C), exercise, set #, kg, reps, RIR, volume, estimated 1RM |
| **אימונים** | one row per workout: date, profile, workout, exercises, sets, tonnage |
| **תוכנית** | the current A/B/C program for both profiles |

The Excel file is a readable export, not a backup: it cannot be imported back. Use **ייצוא קובץ** (JSON) for backups
you can restore with **ייבוא קובץ**.

## Where the data lives

Everything is stored in the browser storage of the phone the app is installed on. Clearing the browser's site data
deletes it, so export a JSON backup now and then (the app reminds you after 8 un-backed-up workouts).

## Files

- `index.html` — the whole app
- `manifest.webmanifest`, `sw.js`, `icons/` — what makes it installable and offline-capable
- `vendor/xlsx.full.min.js` — SheetJS Community Edition 0.18.5 (Apache-2.0), bundled so Excel export works offline
