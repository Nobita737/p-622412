
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/ui/kpi-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { QuickActionsToolbar } from "@/components/ui/quick-actions-toolbar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, Users, DollarSign, Target, Info, Zap, Play, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import React from "react";

const kpiData = [
  {
    title: "Active Campaigns",
    value: 12,
    description: "Currently running campaigns",
    trend: { value: "+25%", direction: "up" as const },
    sparklineData: [8, 9, 11, 10, 12],
    icon: Target,
    tooltip: "Number of campaigns currently running with active content creation",
    formatValue: (value: string | number) => value.toString(),
  },
  {
    title: "Budget Utilization", 
    value: "68%",
    description: "$142K of $210K allocated",
    trend: { value: "+8%", direction: "up" as const },
    sparklineData: [45, 52, 58, 63, 68],
    icon: DollarSign,
    tooltip: "Percentage of allocated budget spent across all active campaigns",
  },
  {
    title: "Campaign ROI",
    value: "280%",
    description: "Average return on investment",
    trend: { value: "+15%", direction: "up" as const },
    sparklineData: [240, 255, 265, 275, 280],
    icon: TrendingUp,
    tooltip: "Return on investment calculated from engagement value and campaign spend",
    formatValue: (value: string | number) => `${value}`,
  },
  {
    title: "Active Creators",
    value: 87,
    description: "Creators with active content",
    trend: { value: "+16%", direction: "up" as const },
    sparklineData: [75, 78, 82, 85, 87],
    icon: Users,
    tooltip: "Active creators across all campaigns with content delivered or scheduled",
    formatValue: (value: string | number) => value.toString(),
  }
];

const spendEngagementData = [
  { date: 'Jan 1', spend: 12000, engagement: 45000 },
  { date: 'Jan 7', spend: 18000, engagement: 62000 },
  { date: 'Jan 14', spend: 25000, engagement: 78000 },
  { date: 'Jan 21', spend: 32000, engagement: 95000 },
  { date: 'Jan 28', spend: 28000, engagement: 88000 },
];

const dailyMetricsData = [
  { day: 'Mon', impressions: 120000, clicks: 3200, conversions: 145 },
  { day: 'Tue', impressions: 145000, clicks: 3800, conversions: 167 },
  { day: 'Wed', impressions: 132000, clicks: 3500, conversions: 152 },
  { day: 'Thu', impressions: 158000, clicks: 4200, conversions: 189 },
  { day: 'Fri', impressions: 167000, clicks: 4400, conversions: 201 },
  { day: 'Sat', impressions: 142000, clicks: 3700, conversions: 156 },
  { day: 'Sun', impressions: 138000, clicks: 3600, conversions: 148 },
];

const recentActivities = [
  { 
    campaign: "Summer Fashion 2024", 
    creator: "@fashionista_maya", 
    action: "Posted content", 
    time: "2 hours ago", 
    status: "success",
    metrics: { engagement: "+12%", reach: "45K" }
  },
  { 
    campaign: "Tech Product Launch", 
    creator: "@tech_reviewer_joe", 
    action: "Content approved", 
    time: "4 hours ago", 
    status: "pending",
    metrics: { engagement: "+8%", reach: "32K" }
  },
  { 
    campaign: "Fitness Challenge", 
    creator: "@gym_guru_sara", 
    action: "Milestone reached", 
    time: "6 hours ago", 
    status: "success",
    metrics: { engagement: "+15%", reach: "67K" }
  },
  { 
    campaign: "Food & Lifestyle", 
    creator: "@foodie_adventures", 
    action: "Content delivered", 
    time: "8 hours ago", 
    status: "success",
    metrics: { engagement: "+20%", reach: "89K" }
  },
];

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState("30d");

  const handleKpiClick = (title: string) => {
    console.log(`Expanding KPI: ${title}`);
    // TODO: Implement KPI expansion modal
  };

  const handleFilterByChart = (data: any) => {
    console.log("Filtering dashboard by chart data:", data);
    // TODO: Implement chart click filtering
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-primary-100 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 flex items-center">
                Dashboard Overview
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-5 w-5 text-slate-400 ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Real-time overview of all your campaign performance metrics</p>
                  </TooltipContent>
                </Tooltip>
              </h1>
              <p className="text-slate-600 mt-1">Monitor your campaign performance and ROI in real-time</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Zap className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Alert Banners */}
          <div className="space-y-4">
            <AlertBanner
              type="warning"
              title="Budget Alert"
              description="3 campaigns are nearing their budget limits and may pause soon."
              actionLabel="Review Budgets"
              onAction={() => console.log("Navigate to budget management")}
              onDismiss={() => console.log("Dismiss alert")}
            />
            
            <AlertBanner
              type="error"
              title="Payment Failed"
              description="1 creator payment failed due to insufficient funds. Retry payment to avoid campaign delays."
              actionLabel="Process Payment"
              onAction={() => console.log("Navigate to payments")}
              onDismiss={() => console.log("Dismiss alert")}
            />
          </div>

          {/* Overview Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary-800 border-b border-primary-200 pb-2">
                Performance Overview
              </h2>
              <Button variant="outline" className="text-primary-700 border-primary-200 hover:bg-primary-50">
                View Details
              </Button>
            </div>
            
            {/* Enhanced KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi) => (
                <KpiCard
                  key={kpi.title}
                  title={kpi.title}
                  value={kpi.value}
                  description={kpi.description}
                  trend={kpi.trend}
                  sparklineData={kpi.sparklineData}
                  icon={kpi.icon}
                  tooltip={kpi.tooltip}
                  formatValue={kpi.formatValue}
                  onClick={() => handleKpiClick(kpi.title)}
                />
              ))}
            </div>
          </div>

          {/* Campaign Status Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary-800 border-b border-primary-200 pb-2">
              Campaign Performance
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Spend vs Engagement Chart */}
              <Card className="shadow-card hover:shadow-card-hover transition-shadow bg-white border-primary-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary-800">
                    Spend vs Engagement Trend
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-slate-400 ml-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click on data points to filter other dashboard sections</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={spendEngagementData} onClick={handleFilterByChart}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-primary-100" />
                        <XAxis dataKey="date" className="text-slate-600" />
                        <YAxis className="text-slate-600" />
                        <RechartsTooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(26, 62, 92, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="spend" 
                          stroke="#0066CC" 
                          strokeWidth={3}
                          name="Spend ($)"
                          dot={{ fill: '#0066CC', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#0066CC', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="engagement" 
                          stroke="#1A3E5C" 
                          strokeWidth={3}
                          name="Engagement"
                          dot={{ fill: '#1A3E5C', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#1A3E5C', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Daily Metrics */}
              <Card className="shadow-card hover:shadow-card-hover transition-shadow bg-white border-primary-100">
                <CardHeader>
                  <CardTitle className="text-primary-800">Weekly Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyMetricsData} onClick={handleFilterByChart}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-primary-100" />
                        <XAxis dataKey="day" className="text-slate-600" />
                        <YAxis className="text-slate-600" />
                        <RechartsTooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(26, 62, 92, 0.1)'
                          }}
                        />
                        <Bar dataKey="impressions" fill="#0066CC" name="Impressions" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="clicks" fill="#1A3E5C" name="Clicks" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="conversions" fill="#059669" name="Conversions" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity with Enhanced Styling */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary-800 border-b border-primary-200 pb-2">
              Recent Activity
            </h2>
            
            <Card className="shadow-card hover:shadow-card-hover transition-shadow bg-white border-primary-100">
              <CardHeader>
                <CardTitle className="text-primary-800">Latest Campaign Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-primary-25 transition-colors border border-transparent hover:border-primary-100 group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse-blue`} />
                        <div className="flex-1">
                          <p className="font-medium text-primary-900">{activity.campaign}</p>
                          <p className="text-sm text-slate-600">{activity.creator} • {activity.action}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-green-600">Engagement: {activity.metrics.engagement}</span>
                            <span className="text-xs text-blue-600">Reach: {activity.metrics.reach}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-slate-500">{activity.time}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant={activity.status === 'success' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {activity.status}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 text-xs"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Toolbar */}
          <QuickActionsToolbar 
            onLaunchCampaign={() => console.log("Launch new campaign")}
            onExportReport={() => console.log("Export report")}
            onAddFunds={() => console.log("Add funds")}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
