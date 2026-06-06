# Resume Tracker

A personal resume tracking web application. Embed a tiny invisible tracking pixel in your resume emails or hosted resume pages. Every time someone opens the email or views the page, the pixel fires and the app records metadata about the open event.

## What It Tracks

- **Timestamp** of each open event
- **Campaign** (which job application triggered the open)
- **Company / Recipient** (who you sent the resume to)
- **Resume Version** (which version of your resume was viewed)
- **User Agent** (browser/client that loaded the pixel)
- **Referrer** (where the request came from)
- **IP Address** (anonymised, last octet masked)
- **Device Hints** (OS, browser, mobile/desktop)
- **Classification** (likely human, bot, scanner, email proxy, ATS, or unknown)
- **Confidence Score** (how certain the classification is)

## Important Limitations

Tracking pixel opens are **signals, not proof** that a human read your resume. False positives come from:

- Email security scanners (Barracuda, Proofpoint, Mimecast, etc.)
- Email client prefetching / image proxies (Gmail, Apple Mail, Outlook)
- ATS systems previewing attachments (Greenhouse, Lever, Workday)
- Corporate firewalls and link scanners
- Search engine crawlers (Googlebot, Bingbot)
- Browser extensions and privacy tools
- VPN exit nodes triggering geo-inaccuracy
- Shared devices or multiple tabs

Always treat data as approximate. Never make hiring decisions or confrontational assumptions based on open signals alone.

## Planned Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Deployment | Vercel (Hobby plan, free) |
| Database | TBD (Vercel Postgres / Supabase / Neon) |
| Auth | TBD (NextAuth.js / Clerk) |

## MVP Features

- [x] Tracking pixel API endpoint (returns 1x1 transparent GIF)
- [x] Bot/scanner detection with six classification categories
- [x] Dashboard with 9 KPI cards
- [x] Campaign management with generated pixel URLs
- [x] Company/recipient tracking table
- [x] Full event log with classification badges
- [x] Resume version comparison
- [x] Settings page with configuration placeholders
- [x] Placeholder login page (auth not yet wired)
- [ ] Database persistence (currently using sample data)
- [ ] Authentication and access control
- [ ] Email notifications on human opens
- [ ] Real API key / webhook support for campaigns

## How the Tracking Pixel Works

```
1. You create a campaign for a job application
2. The app generates a unique pixel URL:
   https://your-app.vercel.app/api/pixel?campaign=X&company=Y&resumeVersion=Z
3. You embed this URL as an <img> tag in your resume email or hosted page
4. When the recipient opens the email/page, their client requests the image
5. The API route:
   - Extracts metadata (user agent, referrer, IP, timestamps)
   - Classifies the request (human, bot, scanner, etc.)
   - Logs the event (console for now, database later)
   - Returns a 1x1 transparent GIF with no-cache headers
6. You view the data on your dashboard
```

## Dashboard and GUI

The app includes a full SaaS-style dashboard:

- **Home** - Welcome page with quick-start instructions
- **Dashboard** - 9 KPI cards + recent events table
- **Campaigns** - Create/manage campaigns with generated pixel URLs
- **Companies** - Track opens by company and recruiter
- **Events** - Full event log with filtering by classification
- **Resumes** - Compare resume version performance
- **Settings** - Configuration placeholders (owner email, app URL, notifications, privacy, DB status)
- **Login** - Placeholder auth page (non-functional)

## Bot / Scanner Detection

Classification uses heuristic user-agent and referrer matching:

| Category | Examples |
|----------|----------|
| `likely_human` | Modern browser + OS combination, realistic user agent |
| `likely_bot` | Googlebot, Bingbot, GPTBot, short/missing UA |
| `likely_scanner` | Barracuda, Proofpoint, Mimecast, Fortinet |
| `email_proxy` | Microsoft Office, Outlook, Gmail Image Proxy |
| `ats_or_recruiting_software` | Greenhouse, Lever, Workday, iCIMS |
| `unknown` | Does not match any known pattern |

Confidence scores range from 0.50 (unknown) to 0.99 (high-confidence bot match).

## Project Structure

```
Resume-Tracker/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── pixel/route.ts      # Tracking pixel endpoint
│   │   │   ├── campaigns/route.ts  # Campaigns API
│   │   │   └── events/route.ts     # Events API
│   │   ├── dashboard/page.tsx      # Dashboard page
│   │   ├── campaigns/page.tsx      # Campaigns page
│   │   ├── companies/page.tsx      # Companies page
│   │   ├── events/page.tsx         # Events page
│   │   ├── resumes/page.tsx        # Resume versions page
│   │   ├── settings/page.tsx       # Settings page
│   │   ├── login/page.tsx          # Login placeholder
│   │   ├── page.tsx                # Home page
│   │   ├── layout.tsx              # Root layout with sidebar
│   │   └── globals.css             # Tailwind CSS import
│   ├── components/
│   │   ├── dashboard/KPICards.tsx   # KPI card grid
│   │   ├── layout/Sidebar.tsx      # Navigation sidebar
│   │   └── ui/
│   │       ├── Badge.tsx           # Classification badges
│   │       └── Card.tsx            # Reusable KPI card
│   └── lib/
│       ├── types.ts                # TypeScript interfaces
│       ├── sample-data.ts          # Realistic sample data
│       ├── bot-detection.ts        # Request classifier
│       ├── tracking.ts             # Event processing
│       ├── analytics.ts            # KPI computation
│       ├── db.ts                   # Database placeholder
│       └── auth.ts                 # Auth placeholder
├── README.md
├── package.json
└── tsconfig.json
```

## Local Development

```bash
# Clone the repository
git clone https://github.com/SFitz911/Resume-Tracker.git
cd Resume-Tracker

# Install dependencies
npm install

# Start the development server
npm run dev

# Open in your browser
# http://localhost:3000
```

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New** > **Project**
4. Import the `Resume-Tracker` repository
5. Vercel auto-detects Next.js - use default settings
6. Click **Deploy**
7. Your app will be live at `https://your-project.vercel.app`

Automatic deployments are enabled: every push to `main` triggers a new production build.

## Privacy and Ethics

- IP addresses are masked (last octet replaced with `x`) to limit personally identifiable information.
- No cookies are set by the tracking pixel.
- Data is only accessible to the app owner (single-user design).
- This tool is intended for personal job search analytics only.
- Do not use this to track people without their awareness in contexts where consent is required.
- Comply with your local privacy regulations (GDPR, CCPA, etc.) if you extend this tool.

## Roadmap

1. **Database integration** - Persist events to Vercel Postgres or Supabase
2. **Authentication** - Protect the dashboard with NextAuth.js or Clerk
3. **Notifications** - Email alerts on human opens
4. **Campaign creation UI** - Form to create new campaigns from the dashboard
5. **Export** - CSV/JSON export of event data
6. **Webhooks** - Real-time notifications to Slack or Discord
7. **Advanced analytics** - Time-of-day patterns, geographic estimates, repeat-open tracking
