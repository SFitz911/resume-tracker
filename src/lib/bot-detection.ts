import { ClassificationType } from './types';

interface ClassificationResult {
  classification: ClassificationType;
  confidenceScore: number;
}

const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'facebot', 'ia_archiver', 'spider', 'crawler',
  'bot/', 'bot;', 'chatgpt', 'gptbot',
];

const SCANNER_USER_AGENTS = [
  'barracuda', 'proofpoint', 'mimecast', 'messagelabs',
  'forcepoint', 'fireeye', 'symantec', 'sophos',
  'mcafee', 'kaspersky', 'fortinet', 'zscaler',
];

const EMAIL_PROXY_USER_AGENTS = [
  'microsoft office', 'outlook', 'thunderbird',
  'apple mail', 'yahoo', 'mailchimp',
  'googleimageproxy', 'yahoo pipes', 'litmus',
];

const ATS_USER_AGENTS = [
  'greenhouse', 'lever', 'workday', 'icims', 'taleo',
  'bamboohr', 'jobvite', 'smartrecruiters', 'ashby',
  'recruitee', 'workable', 'jazz', 'ats',
];

const ATS_REFERRERS = [
  'greenhouse.io', 'lever.co', 'workday.com', 'icims.com',
  'taleo.net', 'bamboohr.com', 'jobvite.com', 'smartrecruiters.com',
  'ashbyhq.com', 'recruitee.com', 'workable.com', 'linkedin.com',
];

export function classifyRequest(
  userAgent: string,
  referrer: string,
  ip: string
): ClassificationResult {
  const ua = userAgent.toLowerCase();
  const ref = referrer.toLowerCase();

  // Check for known ATS/recruiting software
  if (ATS_USER_AGENTS.some((ats) => ua.includes(ats)) ||
      ATS_REFERRERS.some((ats) => ref.includes(ats))) {
    return { classification: 'ats_or_recruiting_software', confidenceScore: 0.92 };
  }

  // Check for known bots
  if (BOT_USER_AGENTS.some((bot) => ua.includes(bot))) {
    return { classification: 'likely_bot', confidenceScore: 0.95 };
  }

  // Check for email security scanners
  if (SCANNER_USER_AGENTS.some((scanner) => ua.includes(scanner))) {
    return { classification: 'likely_scanner', confidenceScore: 0.90 };
  }

  // Check for email proxies/clients
  if (EMAIL_PROXY_USER_AGENTS.some((proxy) => ua.includes(proxy))) {
    return { classification: 'email_proxy', confidenceScore: 0.88 };
  }

  // Check for missing or suspicious user agent
  if (!userAgent || userAgent.length < 20) {
    return { classification: 'likely_bot', confidenceScore: 0.70 };
  }

  // Check for common human browser patterns
  const hasModernBrowser = ua.includes('chrome') || ua.includes('firefox') ||
    ua.includes('safari') || ua.includes('edge');
  const hasOS = ua.includes('windows') || ua.includes('macintosh') ||
    ua.includes('linux') || ua.includes('iphone') || ua.includes('android');

  if (hasModernBrowser && hasOS) {
    return { classification: 'likely_human', confidenceScore: 0.75 };
  }

  return { classification: 'unknown', confidenceScore: 0.50 };
}