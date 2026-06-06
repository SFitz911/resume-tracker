import { KPIData, TrackingEvent, Campaign } from './types';
import { sampleEvents, sampleCampaigns, sampleCompanies } from './sample-data';

export function computeKPIs(
  events: TrackingEvent[] = sampleEvents,
  campaigns: Campaign[] = sampleCampaigns
): KPIData {
  const totalOpens = events.length;
  const humanOpens = events.filter((e) => e.classification === 'likely_human').length;
  const scannerBotOpens = events.filter(
    (e) => e.classification === 'likely_bot' || e.classification === 'likely_scanner'
  ).length;
  const unknownOpens = events.filter((e) => e.classification === 'unknown').length;
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const companiesTracked = sampleCompanies.length;

  // Find most viewed resume version
  const versionCounts: Record<string, number> = {};
  events.forEach((e) => {
    versionCounts[e.resumeVersion] = (versionCounts[e.resumeVersion] || 0) + 1;
  });
  const mostViewedVersion = Object.entries(versionCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

  // Latest open
  const latestOpen = events.length > 0
    ? new Date(events[0].timestamp).toLocaleString()
    : 'No opens yet';

  // Follow-up opportunities: human opens in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const followUpOpportunities = events.filter(
    (e) => e.classification === 'likely_human' && new Date(e.timestamp) > sevenDaysAgo
  ).length;

  return {
    totalOpens,
    humanOpens,
    scannerBotOpens,
    unknownOpens,
    activeCampaigns,
    companiesTracked,
    mostViewedVersion,
    latestOpen,
    followUpOpportunities,
  };
}