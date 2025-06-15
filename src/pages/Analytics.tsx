
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertBanner } from '@/components/ui/alert-banner';
import { KpiRibbon } from '@/components/analytics/KpiRibbon';
import { FilterBar } from '@/components/analytics/FilterBar';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { EnhancedAreaChart } from '@/components/charts/EnhancedAreaChart';
import { EnhancedPieChart } from '@/components/charts/EnhancedPieChart';
import { EnhancedBarChart } from '@/components/charts/EnhancedBarChart';
import { EnhancedHeatmapChart } from '@/components/charts/EnhancedHeatmapChart';
import { EnhancedTable } from '@/components/ui/enhanced-table';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import { Clock, TrendingUp, Users, Target, DollarSign, Zap } from 'lucide-react';

const Analytics = () => {
  // State for filters
  const [dateRange, setDateRange] = useState('30d');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [creatorTier, setCreatorTier] = useState('all');
  const [region, setRegion] = useState('global');
  const [viewMode, setViewMode] = useState<'chart' | 'table' | 'grid'>('chart');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Fetch data from Supabase
  const { 
    campaigns, 
    performanceTrends, 
    creatorTiers, 
    contentTypes, 
    engagementHeatmap, 
    kpiMetrics, 
    isLoading, 
    error 
  } = useAnalyticsData();

  // Transform KPI data
  const kpiData = kpiMetrics.reduce((acc, metric) => {
    acc[metric.metric_name] = {
      value: metric.metric_value,
      trend: {
        value: metric.trend_value,
        direction: metric.trend_direction as 'up' | 'down'
      }
    };
    return acc;
  }, {} as any);

  // Transform funnel data
  const funnelData = performanceTrends.length > 0 ? [
    { name: 'Impressions', value: performanceTrends[performanceTrends.length - 1]?.impressions || 0, percentage: 100 },
    { name: 'Engagements', value: performanceTrends[performanceTrends.length - 1]?.engagements || 0, percentage: 12.0 },
    { name: 'Clicks', value: performanceTrends[performanceTrends.length - 1]?.clicks || 0, percentage: 4.7 },
    { name: 'Conversions', value: performanceTrends[performanceTrends.length - 1]?.conversions || 0, percentage: 7.4 }
  ] : [];

  // Transform campaign data for table
  const campaignTableData = campaigns.map(campaign => ({
    name: campaign.name,
    status: campaign.status,
    impressions: (campaign.impressions / 1000000).toFixed(1) + 'M',
    engagement: ((campaign.engagements / campaign.impressions) * 100).toFixed(1) + '%',
    cpa: '₹' + (campaign.spend_amount / campaign.conversions).toFixed(0),
    roi: ((campaign.emv_amount / campaign.spend_amount) * 100).toFixed(0) + '%',
    emv: '₹' + (campaign.emv_amount / 100000).toFixed(1) + 'L'
  }));

  const campaignColumns = [
    { key: 'name', label: 'Campaign Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'impressions', label: 'Impressions', sortable: true },
    { key: 'engagement', label: 'Engagement Rate', sortable: true },
    { key: 'cpa', label: 'CPA', sortable: true },
    { key: 'roi', label: 'ROI', sortable: true },
    { key: 'emv', label: 'EMV', sortable: true }
  ];

  const handleKpiClick = (metric: string) => {
    setSelectedMetric(metric);
    const element = document.getElementById(`${metric}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading analytics data</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-6">
      {/* Page Header */}
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <nav className="text-sm text-slate-500 mt-1">
              Home / Analytics / {selectedCampaigns.length > 0 ? selectedCampaigns[0] : 'All Campaigns'}
            </nav>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Clock className="h-4 w-4 text-primary-500" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <AlertBanner
        type="success"
        title="🎉 Campaign Performance Alert"
        description="Diwali Festive Collection has achieved 650% ROI - highest performing campaign this quarter!"
        actionLabel="View Details"
        onAction={() => console.log('Navigate to campaign details')}
        onDismiss={() => console.log('Dismiss alert')}
      />

      {/* Filter Bar */}
      <FilterBar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedCampaigns={selectedCampaigns}
        onCampaignChange={setSelectedCampaigns}
        creatorTier={creatorTier}
        onCreatorTierChange={setCreatorTier}
        region={region}
        onRegionChange={setRegion}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        compareMode={compareMode}
        onCompareModeToggle={() => setCompareMode(!compareMode)}
      />

      {/* KPI Ribbon */}
      <KpiRibbon
        data={kpiData}
        onCardClick={handleKpiClick}
      />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trends */}
        <div className="lg:col-span-2" id="performance-section">
          <EnhancedAreaChart
            data={performanceTrends}
            title="📈 Campaign Performance Trends - Indian Market"
            config={{
              impressions: { label: 'Impressions', color: '#0066CC' },
              engagements: { label: 'Engagements', color: '#3693ff' },
              clicks: { label: 'Clicks', color: '#7bb8ff' },
              conversions: { label: 'Conversions', color: '#1A3E5C' }
            }}
          />
        </div>

        {/* Conversion Funnel */}
        <div id="funnel-section">
          <FunnelChart data={funnelData} />
        </div>

        {/* ROI Gauge */}
        <Card id="roi-section" className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
              🎯 Average ROI Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <GaugeChart
              value={kpiData.avgRoi?.value || 485}
              max={700}
              title="Return on Investment"
              unit="%"
            />
          </CardContent>
        </Card>

        {/* Creator Diversity */}
        <EnhancedPieChart
          data={creatorTiers}
          title="👥 Indian Creator Diversity"
          dataKey="percentage"
          nameKey="tier_name"
          colorKey="color_hex"
        />

        {/* Content Performance */}
        <EnhancedBarChart
          data={contentTypes}
          title="📱 Content Type Performance"
          dataKey="engagement_rate"
          xAxisKey="type_name"
          horizontal={true}
          color="#0066CC"
        />
      </div>

      {/* Optimal Posting Times Heatmap */}
      <div id="timing-section">
        <EnhancedHeatmapChart
          data={engagementHeatmap}
          title="🕐 Optimal Posting Times - Indian Audience Engagement Heatmap"
        />
      </div>

      {/* Campaign Performance Table */}
      <Card id="campaigns-section" className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
            🚀 Indian Brand Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedTable
            columns={campaignColumns}
            data={campaignTableData}
            searchable={true}
            filterable={true}
            stickyHeader={true}
            zebraStripes={true}
            renderActions={(row) => (
              <div className="flex space-x-1">
                <button className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors font-medium">
                  View
                </button>
                <button className="px-3 py-1 text-xs bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition-colors font-medium">
                  Edit
                </button>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
