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

export default function GeneratorPage() {
  // Form state
  const [campaign, setCampaign] = useState('');
  const [company, setCompany] = useState('');
  const [recipient, setRecipient] = useState('');
  const [resumeVersion, setResumeVersion] = useState('');
  const [source, setSource] = useState('email');
  const [copied, setCopied] = useState<string | null>(null);

  // Derive the app base URL from the browser or fallback
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://your-app.vercel.app';

  // Build query params from form inputs
  const params = new URLSearchParams({
    campaign: campaign || 'untitled',
    company: company || 'unknown',
    recipient: recipient || 'unknown',
    resumeVersion: resumeVersion || 'v1',
    source,
  }).toString();

  // Generate a URL-safe slug from campaign + company
  const slug = [campaign, company]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'my-resume';

  // Four generated outputs
  const pixelUrl = `${baseUrl}/api/pixel?${params}`;
  const htmlSnippet = `<img src="${pixelUrl}" width="1" height="1" alt="" style="display:none" />`;
  const trackedPageUrl = `${baseUrl}/r/${slug}?${params}`;
  const shareLink = trackedPageUrl;

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
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient</label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Jane Smith (Recruiter)"
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
          <div className="sm:col-span-2">
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
        </div>
      </div>

      {/* Generated outputs */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Generated Links</h2>

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

        {/* Tracked Resume Page URL */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Tracked Resume Page URL</p>
            <button
              onClick={() => copyToClipboard(trackedPageUrl, 'page')}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              {copied === 'page' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="block rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 break-all">
            {trackedPageUrl}
          </code>
        </div>

        {/* Plain Share Link */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Plain Share Link</p>
            <button
              onClick={() => copyToClipboard(shareLink, 'share')}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              {copied === 'share' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="block rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 break-all">
            {shareLink}
          </code>
        </div>
      </div>

      {/* Usage guidance */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold text-amber-900">How to use these links</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-amber-800">
          <li><strong>Best option:</strong> Share the Tracked Resume Page URL. When a recruiter visits, the page fires the pixel automatically and shows your resume.</li>
          <li><strong>Email option:</strong> Paste the HTML snippet into an HTML email body. The invisible 1x1 image fires when the email is opened.</li>
          <li><strong>PDF/Word warning:</strong> Embedding a pixel inside a PDF or Word document is unreliable. Most viewers block remote images.</li>
          <li><strong>Accuracy note:</strong> Email clients may preload, cache, or scan images. Treat opens as signals, not proof that a human read your resume.</li>
        </ul>
      </div>
    </div>
  );
}