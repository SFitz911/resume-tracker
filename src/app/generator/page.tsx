'use client';

import { useState } from 'react';

// Source options for how the resume is being shared
const sourceOptions = [
  { value: 'email', label: 'Email' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'job_board', label: 'Job Board' },
  { value: 'direct_link', label: 'Direct Link' },
  { value: 'other', label: 'Other' },
];

// Sanitize a slug: lowercase, replace spaces with hyphens, remove special chars
function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function GeneratorPage() {
  // Form state
  const [campaign, setCampaign] = useState('');
  const [company, setCompany] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [resumeVersion, setResumeVersion] = useState('');
  const [resumeFile, setResumeFile] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [source, setSource] = useState('email');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Derive the app base URL from the browser or fallback
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://your-app.vercel.app';

  // Sanitize the custom slug in real time
  const slug = sanitizeSlug(customSlug) || 'my-resume';

  // Build query params from form inputs
  const params = new URLSearchParams({
    campaign: campaign || 'untitled',
    company: company || 'unknown',
    recipientName: recipientName || 'unknown',
    recipientEmail: recipientEmail || '',
    resumeVersion: resumeVersion || 'v1',
    source,
    ...(resumeFile ? { resumeFile } : {}),
  }).toString();

  // Generated outputs
  const pixelUrl = `${baseUrl}/api/pixel?${params}`;
  const htmlSnippet = `<img src="${pixelUrl}" width="1" height="1" alt="" style="display:none" />`;
  const shortLink = `${baseUrl}/r/${slug}`;
  const fullLink = `${baseUrl}/r/${slug}?${params}`;

  // Copy to clipboard with visual feedback
  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tracking Link Generator</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate tracking URLs and snippets for your next resume send
        </p>
      </div>

      {/* Form inputs */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Custom slug - prominent at the top */}
          <div className="sm:col-span-2">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700">Custom Link Slug</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-400">/r/</span>
              <input
                id="customSlug"
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="sean-resume-v2"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            {customSlug && customSlug !== slug && (
              <p className="mt-1 text-xs text-gray-400">Sanitized to: {slug}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">Letters, numbers, and hyphens only. This becomes your short shareable link.</p>
          </div>
          <div>
            <label htmlFor="campaign" className="block text-sm font-medium text-gray-700">Campaign Name</label>
            <input
              id="campaign"
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="Frontend Role Q1"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Corp"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">Recipient Name</label>
            <input
              id="recipientName"
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Jane Smith"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">Recipient Email</label>
            <input
              id="recipientEmail"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="jane@acmecorp.com"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Senior Frontend Developer"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label htmlFor="resumeVersion" className="block text-sm font-medium text-gray-700">Resume Version</label>
            <input
              id="resumeVersion"
              type="text"
              value={resumeVersion}
              onChange={(e) => setResumeVersion(e.target.value)}
              placeholder="v2.1-frontend"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700">Resume PDF Filename</label>
            <input
              id="resumeFile"
              type="text"
              value={resumeFile}
              onChange={(e) => setResumeFile(e.target.value)}
              placeholder="sean-resume.pdf"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <p className="mt-1 text-xs text-gray-400">File must exist in public/resumes/</p>
          </div>
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
            <select
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              {sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (for your reference only)</label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Referral from LinkedIn, follow up in 1 week"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Generated outputs */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Generated Links</h2>

        {/* Short tracked resume link - primary output */}
        <div className="rounded-xl border-2 border-gray-900 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-900">Short Tracked Resume Link (share this)</p>
            <button
              onClick={() => copyToClipboard(shortLink, 'short')}
              className="rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-gray-800"
            >
              {copied === 'short' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="block rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-900 font-medium break-all">
            {shortLink}
          </code>
        </div>

        {/* Tracking Pixel URL */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Tracking Pixel URL</p>
            <button
              onClick={() => copyToClipboard(pixelUrl, 'pixel')}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              {copied === 'pixel' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="block rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 break-all">
            {pixelUrl}
          </code>
        </div>

        {/* HTML Snippet */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">HTML Tracking Pixel Snippet</p>
            <button
              onClick={() => copyToClipboard(htmlSnippet, 'html')}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              {copied === 'html' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="block rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 break-all">
            {htmlSnippet}
          </code>
        </div>

        {/* Advanced: full link with query params */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced: Full URL with query params
            </button>
            {showAdvanced && (
              <button
                onClick={() => copyToClipboard(fullLink, 'full')}
                className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
              >
                {copied === 'full' ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          {showAdvanced && (
            <code className="block rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 break-all">
              {fullLink}
            </code>
          )}
        </div>
      </div>

      {/* Short link explanation */}
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="text-sm font-semibold text-blue-900">About short tracked resume links</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-blue-800">
          <li><strong>Short links are easier to share.</strong> Send /r/sean-resume-v2 instead of a long URL with query parameters.</li>
          <li><strong>MVP mode:</strong> The slug and query params can work together. If you use the full URL, params populate the page. If you use the short link alone, the page shows placeholder data from the slug.</li>
          <li><strong>Production mode:</strong> The slug should map to a saved database record so the page can load all metadata without query params.</li>
        </ul>
      </div>

      {/* Usage guidance */}
      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold text-amber-900">How to use these links</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-amber-800">
          <li><strong>Best option:</strong> Share the Short Tracked Resume Link. When a recruiter visits, the page fires the pixel automatically and provides a PDF download.</li>
          <li><strong>Email option:</strong> Paste the HTML snippet into an HTML email body. The invisible 1x1 image fires when the email is opened.</li>
          <li><strong>PDF/Word warning:</strong> Embedding a pixel inside a PDF or Word document is unreliable. Most viewers block remote images.</li>
          <li><strong>Accuracy note:</strong> Email clients may preload, cache, or scan images. Treat opens as signals, not proof that a human read your resume.</li>
        </ul>
      </div>

      {/* Privacy warning about email in URLs */}
      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <h3 className="text-sm font-semibold text-red-900">Privacy note: email addresses in URLs</h3>
        <p className="mt-1 text-sm text-red-800">
          Including recipientEmail in query parameters is acceptable for MVP testing on a private tracker. In production, replace this with a generated tracking ID that maps to the recipient in your database. Never expose recipient email addresses in URLs shared publicly.
        </p>
      </div>
    </div>
  );
}