import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertBanner } from '@/components/ui/alert-banner';
import { KpiRibbon } from '@/components/analytics/KpiRibbon';
import { FilterBar } from '@/components/analytics/FilterBar';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import { HeatmapChart } from '@/components/charts/HeatmapChart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { EnhancedTable } from '@/components/ui/enhanced-table';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { Clock, Calendar } from 'lucide-react';

const Analytics = () => {
  // State for filters
  const [dateRange, setDateRange] = useState('30d');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [creatorTier, setCreatorTier] = useState('all');
  const [region, setRegion] = useState('global');
  const [viewMode, setViewMode] = useState<'chart' | 'table' | 'grid'>('chart');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Mock data for KPIs
  const kpiData = {
    totalCampaigns: { value: 24, trend: { value: '+12%', direction: 'up' as const } },
    avgRoi: { value: 285, trend: { value: '+23%', direction: 'up' as const } },
    avgCpa: { value: 32, trend: { value: '-15%', direction: 'down' as const } },
    avgEngagementRate: { value: 5.2, trend: { value: '+8%', direction: 'up' as const } },
    totalEmv: { value: 215000, trend: { value: '+45%', direction: 'up' as const } },
    budgetUtilization: { value: 87, trend: { value: '+5%', direction: 'up' as const } }
  };

  // Mock data for charts
  const performanceTrends = [
    { name: 'Jan', impressions: 1200000, engagements: 62400, clicks: 3600, conversions: 180 },
    { name: 'Feb', impressions: 1800000, engagements: 108000, clicks: 5400, conversions: 270 },
    { name: 'Mar', impressions: 1500000, engagements: 82500, clicks: 4500, conversions: 225 },
    { name: 'Apr', impressions: 2200000, engagements: 154000, clicks: 6600, conversions: 330 },
    { name: 'May', impressions: 1900000, engagements: 133000, clicks: 5700, conversions: 285 },
    { name: 'Jun', impressions: 2500000, engagements: 200000, clicks: 7500, conversions: 375 },
  ];

  const funnelData = [
    { name: 'Impressions', value: 2500000, percentage: 100 },
    { name: 'Engagements', value: 200000, percentage: 8.0 },
    { name: 'Clicks', value: 7500, percentage: 3.8 },
    { name: 'Conversions', value: 375, percentage: 5.0 }
  ];

  const creatorDiversityData = [
    { name: 'Micro (1K-100K)', value: 45, color: '#0066CC' },
    { name: 'Macro (100K-1M)', value: 35, color: '#3693ff' },
    { name: 'Mega (1M+)', value: 20, color: '#7bb8ff' }
  ];

  const contentTypeData = [
    { type: 'Video', engagement: 65, count: 120 },
    { type: 'Image', engagement: 45, count: 89 },
    { type: 'Stories', engagement: 38, count: 156 },
    { type: 'Reels', engagement: 72, count: 78 },
    { type: 'Carousel', engagement: 52, count: 45 }
  ];

  const heatmapData = [
    { day: 'Mon', hour: 9, value: 45 }, { day: 'Mon', hour: 12, value: 72 }, { day: 'Mon', hour: 18, value: 89 },
    { day: 'Tue', hour: 10, value: 52 }, { day: 'Tue', hour: 14, value: 68 }, { day: 'Tue', hour: 19, value: 95 },
    { day: 'Wed', hour: 8, value: 38 }, { day: 'Wed', hour: 13, value: 75 }, { day: 'Wed', hour: 20, value: 82 },
    { day: 'Thu', hour: 11, value: 61 }, { day: 'Thu', hour: 15, value: 79 }, { day: 'Thu', hour: 17, value: 88 },
    { day: 'Fri', hour: 9, value: 48 }, { day: 'Fri', hour: 16, value: 85 }, { day: 'Fri', hour: 21, value: 76 },
    { day: 'Sat', hour: 10, value: 67 }, { day: 'Sat', hour: 14, value: 92 }, { day: 'Sat', hour: 20, value: 98 },
    { day: 'Sun', hour: 11, value: 58 }, { day: 'Sun', hour: 15, value: 73 }, { day: 'Sun', hour: 19, value: 86 }
  ];

  const campaignColumns = [
    { key: 'name', label: 'Campaign Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'impressions', label: 'Impressions', sortable: true },
    { key: 'engagement', label: 'Engagement Rate', sortable: true },
    { key: 'cpa', label: 'CPA', sortable: true },
    { key: 'roi', label: 'ROI', sortable: true }
  ];

  const campaignData = [
    { name: 'Summer Collection', status: 'Active', impressions: '2.5M', engagement: '5.2%', cpa: '$28', roi: '320%' },
    { name: 'Black Friday', status: 'Completed', impressions: '3.8M', engagement: '6.1%', cpa: '$22', roi: '425%' },
    { name: 'Influencer Collab', status: 'Active', impressions: '1.2M', engagement: '4.8%', cpa: '$35', roi: '280%' }
  ];

  const handleKpiClick = (metric: string) => {
    setSelectedMetric(metric);
    // Scroll to relevant section
    const element = document.getElementById(`${metric}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary-900">Analytics Dashboard</h1>
            <nav className="text-sm text-slate-500 mt-1">
              Home / Analytics / {selectedCampaigns.length > 0 ? selectedCampaigns[0] : 'All Campaigns'}
            </nav>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <AlertBanner
        type="warning"
        title="Budget Alert"
        description="Summer Collection campaign has exceeded 90% of allocated budget"
        actionLabel="Review Budget"
        onAction={() => console.log('Navigate to budget')}
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
        <Card id="performance-section" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                impressions: { label: 'Impressions', color: '#0066CC' },
                engagements: { label: 'Engagements', color: '#3693ff' },
                clicks: { label: 'Clicks', color: '#7bb8ff' },
                conversions: { label: 'Conversions', color: '#1A3E5C' }
              }}
              className="h-[400px]"
            >
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="impressions" stroke="#0066CC" strokeWidth={3} />
                <Line type="monotone" dataKey="engagements" stroke="#3693ff" strokeWidth={2} />
                <Line type="monotone" dataKey="clicks" stroke="#7bb8ff" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#1A3E5C" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <div id="funnel-section">
          <FunnelChart data={funnelData} />
        </div>

        {/* ROI Gauge */}
        <Card id="roi-section">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Average ROI Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <GaugeChart
              value={285}
              max={500}
              title="Return on Investment"
              unit="%"
            />
          </CardContent>
        </Card>

        {/* Creator Diversity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Creator Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                micro: { label: 'Micro', color: '#0066CC' },
                macro: { label: 'Macro', color: '#3693ff' },
                mega: { label: 'Mega', color: '#7bb8ff' }
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={creatorDiversityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {creatorDiversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Content Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Content Type Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                engagement: { label: 'Engagement Rate', color: '#0066CC' }
              }}
              className="h-[300px]"
            >
              <BarChart data={contentTypeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="type" type="category" stroke="#64748b" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="engagement" fill="#0066CC" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Optimal Posting Times Heatmap */}
      <div id="timing-section">
        <HeatmapChart
          data={heatmapData}
          title="Optimal Posting Times - Engagement Heatmap"
        />
      </div>

      {/* Campaign Performance Table */}
      <Card id="campaigns-section">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary-800">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedTable
            columns={campaignColumns}
            data={campaignData}
            searchable={true}
            filterable={true}
            stickyHeader={true}
            zebraStripes={true}
            renderActions={(row) => (
              <div className="flex space-x-1">
                <button className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded hover:bg-primary-100">
                  View
                </button>
                <button className="px-2 py-1 text-xs bg-slate-50 text-slate-700 rounded hover:bg-slate-100">
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
