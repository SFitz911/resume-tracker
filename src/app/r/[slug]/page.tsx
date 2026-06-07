interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function TrackedResumePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;

  // Check if query params were provided (full URL mode vs short link mode)
  const hasQueryParams = Object.keys(query).length > 0;

  // Extract tracking metadata from query params, fall back to slug-based placeholders
  const campaign = query.campaign || slug;
  const company = query.company || (hasQueryParams ? 'Unknown' : '');
  const recipientName = query.recipientName || query.recipient || 'Hiring Manager';
  const recipientEmail = query.recipientEmail || '';
  const resumeVersion = query.resumeVersion || 'v1';
  const source = query.source || 'direct_link';
  const resumeFile = query.resumeFile || '';

  // Build the PDF download path from the resumeFile parameter
  const pdfPath = resumeFile ? `/resumes/${resumeFile}` : '';

  // Build the pixel URL to fire tracking on page load
  const pixelParams = new URLSearchParams({
    campaign,
    company: company || slug,
    recipientName,
    recipientEmail,
    resumeVersion,
    source,
  }).toString();
  const pixelUrl = `/api/pixel?${pixelParams}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900">Resume</h1>
        <p className="mt-1 text-xs font-mono text-gray-400">/r/{slug}</p>

        {company && (
          <p className="mt-2 text-sm text-gray-500">
            {company} &middot; {campaign}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          For: {recipientName}{recipientEmail ? ` (${recipientEmail})` : ''} &middot; Version: {resumeVersion}
        </p>

        {pdfPath ? (
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Download Resume
          </a>
        ) : (
          <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-6">
            <p className="text-sm text-gray-600">
              No resume file specified. Add a resumeFile parameter to the URL to enable the download button.
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Shared via {source.replace('_', ' ')}
        </p>

        {/* Show note when no query params are present (short link mode) */}
        {!hasQueryParams && (
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs text-amber-700">
              This page is using the short link slug &ldquo;{slug}&rdquo; without query parameters. In production, metadata will load from a database lookup.
            </p>
          </div>
        )}
      </div>

      {/* Invisible tracking pixel fires on page load */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pixelUrl}
        width={1}
        height={1}
        alt=""
        className="absolute opacity-0 pointer-events-none"
      />
    </div>
  );
}