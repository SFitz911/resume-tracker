import { TrackingEvent, ClassificationType } from './types';
import { classifyRequest } from './bot-detection';

interface TrackingParams {
  campaign?: string;
  company?: string;
  recipient?: string;
  resumeVersion?: string;
  source?: string;
}

interface RequestMetadata {
  userAgent: string;
  referrer: string;
  ip: string;
  deviceHints: string;
}

export function processTrackingEvent(
  params: TrackingParams,
  metadata: RequestMetadata
): TrackingEvent {
  const { classification, confidenceScore } = classifyRequest(
    metadata.userAgent,
    metadata.referrer,
    metadata.ip
  );

  const now = new Date().toISOString();

  const event: TrackingEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    timestamp: now,
    campaignId: params.campaign || 'unknown',
    campaignName: params.campaign || 'Unknown Campaign',
    company: params.company || 'Unknown',
    recipient: params.recipient || 'Unknown',
    resumeVersion: params.resumeVersion || 'unknown',
    visitorIp: metadata.ip,
    userAgent: metadata.userAgent,
    referrer: metadata.referrer,
    deviceHints: metadata.deviceHints,
    classification,
    confidenceScore,
    firstOpenTime: now,
    lastOpenTime: now,
    totalOpenCount: 1,
  };

  return event;
}

export function extractDeviceHints(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  const parts: string[] = [];

  if (ua.includes('iphone')) parts.push('iOS');
  else if (ua.includes('android')) parts.push('Android');
  else if (ua.includes('macintosh')) parts.push('macOS');
  else if (ua.includes('windows')) parts.push('Windows');
  else if (ua.includes('linux')) parts.push('Linux');

  if (ua.includes('chrome') && !ua.includes('edg')) parts.push('Chrome');
  else if (ua.includes('firefox')) parts.push('Firefox');
  else if (ua.includes('safari') && !ua.includes('chrome')) parts.push('Safari');
  else if (ua.includes('edg')) parts.push('Edge');

  if (ua.includes('mobile')) parts.push('Mobile');
  else parts.push('Desktop');

  return parts.join(', ') || 'Unknown';
}