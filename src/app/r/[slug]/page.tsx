interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function TrackedResumePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;

  // Extract tracking metadata from query params
  const campaign = query.campaign || slug;
  const company = query.company || 'Unknown';
  const recipient = query.recipient || 'Hiring Manager';
  const resumeVersion = query.resumeVersion || 'v1';
  const source = query.source || 'direct_link';

  // Build the pixel URL to fire tracking on page load
  const pixelParams = new URLSearchParams({
    campaign,
    company,
    recipient,
    resumeVersion,
    source,
  }).toString();
  const pixelUrl = `/api/pixel?${pixelParams}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900">Resume</h1>
        <p className="mt-2 text-sm text-gray-500">
          {company} &middot; {campaign}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          For: {recipient} &middot; Version: {resumeVersion}
        </p>

        <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-6">
          <p className="text-sm text-gray-600">
            Resume document placeholder. In a production app, this would display
            or link to the actual resume PDF.
          </p>
        </div>

        <button
          className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Download Resume (Coming Soon)
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Shared via {source.replace('_', ' ')}
        </p>
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