import { sampleEvents } from '@/lib/sample-data';

export async function GET() {
  // TODO: Query from database when configured
  return Response.json({ events: sampleEvents });
}
