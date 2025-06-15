
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

  // Enhanced KPIs for Indian brand context
  const kpiData = {
    totalCampaigns: { value: 5, trend: { value: '+25%', direction: 'up' as const } },
    avgRoi: { value: 485, trend: { value: '+38%', direction: 'up' as const } },
    avgCpa: { value: 18, trend: { value: '-28%', direction: 'down' as const } },
    avgEngagementRate: { value: 8.7, trend: { value: '+42%', direction: 'up' as const } },
    totalEmv: { value: 2850000, trend: { value: '+65%', direction: 'up' as const } },
    budgetUtilization: { value: 92, trend: { value: '+12%', direction: 'up' as const } }
  };

  // Enhanced performance trends with Indian market data
  const performanceTrends = [
    { name: 'Jan', impressions: 2800000, engagements: 243600, clicks: 12400, conversions: 890 },
    { name: 'Feb', impressions: 3200000, engagements: 307200, clicks: 15800, conversions: 1250 },
    { name: 'Mar', impressions: 2950000, engagements: 295000, clicks: 14200, conversions: 1150 },
    { name: 'Apr', impressions: 4100000, engagements: 451000, clicks: 22500, conversions: 1680 },
    { name: 'May', impressions: 3800000, engagements: 418000, clicks: 19500, conversions: 1520 },
    { name: 'Jun', impressions: 4650000, engagements: 558000, clicks: 26200, conversions: 1950 },
  ];

  const funnelData = [
    { name: 'Impressions', value: 4650000, percentage: 100 },
    { name: 'Engagements', value: 558000, percentage: 12.0 },
    { name: 'Clicks', value: 26200, percentage: 4.7 },
    { name: 'Conversions', value: 1950, percentage: 7.4 }
  ];

  // Indian creator landscape
  const creatorDiversityData = [
    { name: 'Micro (1K-100K)', value: 52, color: '#0066CC' },
    { name: 'Macro (100K-1M)', value: 33, color: '#3693ff' },
    { name: 'Mega (1M+)', value: 15, color: '#7bb8ff' }
  ];

  // Indian content preferences
  const contentTypeData = [
    { type: 'Reels', engagement: 88, count: 245 },
    { type: 'Stories', engagement: 72, count: 320 },
    { type: 'Video', engagement: 68, count: 180 },
    { type: 'Carousel', engagement: 55, count: 125 },
    { type: 'Image', engagement: 48, count: 95 }
  ];

  // Indian peak times heatmap
  const heatmapData = [
    { day: 'Mon', hour: 9, value: 52 }, { day: 'Mon', hour: 13, value: 78 }, { day: 'Mon', hour: 20, value: 95 },
    { day: 'Tue', hour: 10, value: 58 }, { day: 'Tue', hour: 14, value: 82 }, { day: 'Tue', hour: 21, value: 98 },
    { day: 'Wed', hour: 8, value: 45 }, { day: 'Wed', hour: 13, value: 88 }, { day: 'Wed', hour: 19, value: 92 },
    { day: 'Thu', hour: 11, value: 68 }, { day: 'Thu', hour: 15, value: 85 }, { day: 'Thu', hour: 20, value: 96 },
    { day: 'Fri', hour: 9, value: 62 }, { day: 'Fri', hour: 17, value: 89 }, { day: 'Fri', hour: 22, value: 88 },
    { day: 'Sat', hour: 11, value: 75 }, { day: 'Sat', hour: 16, value: 94 }, { day: 'Sat', hour: 21, value: 100 },
    { day: 'Sun', hour: 12, value: 72 }, { day: 'Sun', hour: 18, value: 91 }, { day: 'Sun', hour: 20, value: 95 }
  ];

  const campaignColumns = [
    { key: 'name', label: 'Campaign Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'impressions', label: 'Impressions', sortable: true },
    { key: 'engagement', label: 'Engagement Rate', sortable: true },
    { key: 'cpa', label: 'CPA', sortable: true },
    { key: 'roi', label: 'ROI', sortable: true },
    { key: 'emv', label: 'EMV', sortable: true }
  ];

  // Indian brand campaigns with great ROI
  const campaignData = [
    { 
      name: 'Diwali Festive Collection', 
      status: 'Active', 
      impressions: '3.2M', 
      engagement: '9.8%', 
      cpa: '₹12', 
      roi: '650%',
      emv: '₹8.5L'
    },
    { 
      name: 'IPL Cricket Partnership', 
      status: 'Completed', 
      impressions: '5.8M', 
      engagement: '11.2%', 
      cpa: '₹15', 
      roi: '520%',
      emv: '₹12.3L'
    },
    { 
      name: 'Regional Language Series', 
      status: 'Active', 
      impressions: '2.1M', 
      engagement: '7.5%', 
      cpa: '₹18', 
      roi: '425%',
      emv: '₹6.8L'
    },
    { 
      name: 'Bollywood Celebrity Collab', 
      status: 'Completed', 
      impressions: '4.5M', 
      engagement: '8.9%', 
      cpa: '₹22', 
      roi: '380%',
      emv: '₹11.2L'
    },
    { 
      name: 'Sustainable Fashion Drive', 
      status: 'Planning', 
      impressions: '1.8M', 
      engagement: '6.8%', 
      cpa: '₹16', 
      roi: '445%',
      emv: '₹5.9L'
    }
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
        type="success"
        title="Campaign Performance Alert"
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
        <Card id="performance-section" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Campaign Performance Trends - Indian Market</CardTitle>
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
              value={485}
              max={700}
              title="Return on Investment"
              unit="%"
            />
          </CardContent>
        </Card>

        {/* Creator Diversity - Indian Market */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Indian Creator Diversity</CardTitle>
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

        {/* Content Performance - Indian Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary-800">Content Type Performance (Indian Market)</CardTitle>
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

      {/* Optimal Posting Times Heatmap - Indian Time Zones */}
      <div id="timing-section">
        <HeatmapChart
          data={heatmapData}
          title="Optimal Posting Times - Indian Audience Engagement Heatmap"
        />
      </div>

      {/* Campaign Performance Table - Indian Brand Campaigns */}
      <Card id="campaigns-section">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary-800">Indian Brand Campaign Performance</CardTitle>
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
