export type ClassificationType =
  | 'likely_human'
  | 'likely_scanner'
  | 'likely_bot'
  | 'email_proxy'
  | 'ats_or_recruiting_software'
  | 'unknown';

export interface TrackingEvent {
  id: string;
  timestamp: string;
  campaignId: string;
  campaignName: string;
  company: string;
  recipient: string;
  resumeVersion: string;
  visitorIp: string;
  userAgent: string;
  referrer: string;
  deviceHints: string;
  classification: ClassificationType;
  confidenceScore: number;
  firstOpenTime: string;
  lastOpenTime: string;
  totalOpenCount: number;
}

export interface Campaign {
  id: string;
  name: string;
  company: string;
  recipient: string;
  resumeVersion: string;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  totalOpens: number;
  humanOpens: number;
  botOpens: number;
  lastOpenAt: string | null;
  pixelUrl: string;
}

export interface Company {
  id: string;
  name: string;
  recruiterName: string;
  jobTitle: string;
  lastActivity: string;
  totalOpens: number;
  humanOpens: number;
  botOpens: number;
  campaigns: string[];
}

export interface ResumeVersion {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  campaignCount: number;
  totalOpens: number;
  humanOpens: number;
}

export interface KPIData {
  totalOpens: number;
  humanOpens: number;
  scannerBotOpens: number;
  unknownOpens: number;
  activeCampaigns: number;
  companiesTracked: number;
  mostViewedVersion: string;
  latestOpen: string;
  followUpOpportunities: number;
}
