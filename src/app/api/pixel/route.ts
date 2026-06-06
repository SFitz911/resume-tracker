import { type NextRequest } from 'next/server';
import { processTrackingEvent, extractDeviceHints } from '@/lib/tracking';

// 1x1 transparent GIF (43 bytes)
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = {
    campaign: searchParams.get('campaign') || undefined,
    company: searchParams.get('company') || undefined,
    recipient: searchParams.get('recipient') || undefined,
    resumeVersion: searchParams.get('resumeVersion') || undefined,
    source: searchParams.get('source') || undefined,
  };

  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || '';
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim() || 'unknown';

  const metadata = {
    userAgent,
    referrer,
    ip,
    deviceHints: extractDeviceHints(userAgent),
  };

  const event = processTrackingEvent(params, metadata);

  // TODO: Save to database when configured
  // await saveTrackingEvent(event);
  console.log('[Pixel] Tracking event recorded:', JSON.stringify({
    timestamp: event.timestamp,
    campaign: event.campaignId,
    company: event.company,
    classification: event.classification,
    confidence: event.confidenceScore,
    userAgent: event.userAgent.substring(0, 80),
  }, null, 2));

  return new Response(TRANSPARENT_GIF, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': TRANSPARENT_GIF.length.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}