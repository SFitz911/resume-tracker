// TODO: Authentication placeholder
// This file will be configured when an auth provider is selected.
// Options: NextAuth.js, Clerk, or simple API key auth

export async function isAuthenticated(): Promise<boolean> {
  // TODO: Implement authentication check
  // For MVP, the app is single-user and unprotected
  console.log('[Auth] Authentication not configured. Allowing access.');
  return true;
}

export async function getOwnerEmail(): Promise<string> {
  return process.env.OWNER_EMAIL || 'owner@example.com';
}

export function generateAuthSecret(): string {
  // TODO: Use proper secret generation
  return 'placeholder-secret-replace-in-production';
}