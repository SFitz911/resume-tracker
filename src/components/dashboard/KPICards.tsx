import { Card } from '@/components/ui/Card';
import { KPIData } from '@/lib/types';

interface KPICardsProps {
  data: KPIData;
}

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        title="Total Opens"
        value={data.totalOpens}
        subtitle="All tracked events"
      />
      <Card
        title="Likely Human Opens"
        value={data.humanOpens}
        subtitle="Probable real views"
        color="text-green-600"
      />
      <Card
        title="Scanner/Bot Opens"
        value={data.scannerBotOpens}
        subtitle="Automated requests"
        color="text-red-600"
      />
      <Card
        title="Unknown Opens"
        value={data.unknownOpens}
        subtitle="Unclassified"
        color="text-gray-500"
      />
      <Card
        title="Active Campaigns"
        value={data.activeCampaigns}
        subtitle="Currently tracking"
        color="text-blue-600"
      />
      <Card
        title="Companies Tracked"
        value={data.companiesTracked}
        subtitle="Unique recipients"
        color="text-purple-600"
      />
      <Card
        title="Most Viewed Version"
        value={data.mostViewedVersion}
        subtitle="Resume version"
      />
      <Card
        title="Latest Open"
        value={data.latestOpen}
        subtitle="Most recent event"
      />
      <Card
        title="Follow-up Opportunities"
        value={data.followUpOpportunities}
        subtitle="Human opens (7 days)"
        color="text-orange-600"
      />
    </div>
  );
}