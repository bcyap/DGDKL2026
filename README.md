# TrackMyApplication

A calm, accessible, 4-page static website that lets job candidates check whether their application was received, see what stage it has reached (`Received` > `Under review` > `Interview` > `Decision` > `Outcome`), and know immediately whether any action is required from them.

## Tech Stack & Constraints
- **Plain HTML, CSS, and vanilla JavaScript only** (no frameworks, no external libraries, no build step, no backend, no CDN dependencies).
- Works both by opening `index.html` directly from your filesystem (`file://`) and on any static web host.
- Mobile-first responsive layout (`~360px` upward) and built to **WCAG 2.1 AA** accessibility standards.

## File Structure
```text
/index.html      Home: look up an application + quick-fill demo references
/status.html     Application status: stage tracker, next steps, activity history
/help.html       Help: plain-language guide to each stage + FAQ (<details>/<summary>)
/contact.html    Contact the hiring team with client-side validation
/css/styles.css  Shared mobile-first stylesheet
/js/data.js      Mock application data (5 sample applications)
/js/main.js      Shared behaviour (mobile nav toggle, lookup, status rendering, validation)
/README.md       Documentation and demo references
```

## How to Open the Site
1. **Directly in your browser (`file://`)**:
   Double-click `index.html` in Finder / File Explorer, or open `file:///Users/bcyap/Documents/myCCode/RMS2/index.html` in any browser.
2. **Or with any local static server (optional)**:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Demo References for Testing

You can click **Fill form** next to any demo application on `index.html`, or type these reference + email pairs directly:

| Reference | Email Address | Stage | Action Needed? | Scenario Tested |
| :--- | :--- | :--- | :--- | :--- |
| `APP-1042` | `alex.rivera@example.com` | **Interview** | **Yes** | Action needed: choose an interview slot by **18 November 2026 at 5:00 PM** |
| `APP-1015` | `priya.nair@example.com` | **Received** | **No** | Just received, no action needed, expected reply by **21 November 2026** |
| `APP-1029` | `marcus.chen@example.com` | **Under review** | **No** | Under review by team lead, no action needed, expected reply by **20 November 2026** |
| `APP-1064` | `samira.hassan@example.com` | **Decision** | **No** | Interview completed, panel finalizing decision by **17 November 2026** |
| `APP-1088` | `david.okafor@example.com` | **Outcome** | **No** | Outcome reached (unsuccessful, worded respectfully) |

## Where to Edit Data or Text
- **Mock Applications**: Edit `APPLICATIONS_DATA` in `js/data.js`.
- **Stage Descriptions & FAQs**: Edit `help.html`.
- **Colours, Typography & Layout**: Edit the CSS custom properties (`:root`) in `css/styles.css`.
