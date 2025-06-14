
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, Users, DollarSign, Target, Download, Plus, AlertTriangle, Info, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const kpiData = [
  {
    title: "Active Campaigns",
    value: "12",
    icon: Target,
    trend: "+3 this month",
    change: "+25%",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    sparklineData: [8, 9, 11, 10, 12],
    tooltip: "Number of campaigns currently running with active content creation"
  },
  {
    title: "Total Spend vs Budget", 
    value: "68%",
    icon: DollarSign,
    trend: "$142K of $210K",
    change: "+8%",
    color: "text-green-600",
    bgColor: "bg-green-50",
    sparklineData: [45, 52, 58, 63, 68],
    tooltip: "Percentage of allocated budget spent across all active campaigns"
  },
  {
    title: "Estimated ROI",
    value: "280%",
    icon: TrendingUp,
    trend: "+15% vs last month",
    change: "+15%",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    sparklineData: [240, 255, 265, 275, 280],
    tooltip: "Return on investment calculated from engagement value and campaign spend"
  },
  {
    title: "Total Creators",
    value: "87",
    icon: Users,
    trend: "+12 this month",
    change: "+16%",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    sparklineData: [75, 78, 82, 85, 87],
    tooltip: "Active creators across all campaigns with content delivered or scheduled"
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

const MiniSparkline = ({ data }: { data: number[] }) => (
  <div className="h-8 w-16">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((value, index) => ({ value, index }))}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#0d9488" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const QuickActionsToolbar = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <div className="bg-white rounded-lg shadow-lg border p-2 flex space-x-2">
      <Button className="bg-teal-600 hover:bg-teal-700">
        <Plus className="h-4 w-4 mr-2" />
        Launch Campaign
      </Button>
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
      <Button variant="outline">
        <DollarSign className="h-4 w-4 mr-2" />
        Add Funds
      </Button>
    </div>
  </div>
);

const AlertBanner = () => (
  <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
    <div className="flex items-center">
      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
      <div className="flex-1">
        <p className="text-sm text-yellow-800">
          <strong>Budget Alert:</strong> 3 campaigns are nearing their budget limits. 
          <button className="ml-2 text-yellow-900 underline hover:text-yellow-700">
            Review budgets
          </button>
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
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
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Zap className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Alert Banner */}
        <AlertBanner />

        {/* Overview Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
            Overview
          </h2>
          
          {/* Enhanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <Tooltip key={kpi.title}>
                  <TooltipTrigger asChild>
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 border-l-teal-500">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                          {kpi.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${kpi.bgColor}`}>
                          <Icon className={`h-5 w-5 ${kpi.color}`} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
                            <div className="flex items-center mt-2">
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                {kpi.change}
                              </Badge>
                              <span className="text-xs text-slate-600 ml-2">{kpi.trend}</span>
                            </div>
                          </div>
                          <MiniSparkline data={kpi.sparklineData} />
                        </div>
                        {kpi.title === "Total Spend vs Budget" && (
                          <Progress value={68} className="mt-4 h-2" />
                        )}
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{kpi.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Campaign Status Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
            Campaign Status
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Spend vs Engagement Chart */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Spend vs Engagement (Last 30 Days)
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
                    <LineChart data={spendEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                      <XAxis dataKey="date" className="text-slate-600" />
                      <YAxis className="text-slate-600" />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="spend" 
                        stroke="#0d9488" 
                        strokeWidth={3}
                        name="Spend ($)"
                        dot={{ fill: '#0d9488', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#0d9488', strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Engagement"
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Daily Metrics */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Weekly Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyMetricsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                      <XAxis dataKey="day" className="text-slate-600" />
                      <YAxis className="text-slate-600" />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="impressions" fill="#8b5cf6" name="Impressions" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="clicks" fill="#0d9488" name="Clicks" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="conversions" fill="#f59e0b" name="Conversions" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity with Enhanced Styling */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
            Recent Activity
          </h2>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Latest Campaign Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { campaign: "Summer Fashion 2024", creator: "@fashionista_maya", action: "Posted content", time: "2 hours ago", status: "success" },
                  { campaign: "Tech Product Launch", creator: "@tech_reviewer_joe", action: "Content approved", time: "4 hours ago", status: "pending" },
                  { campaign: "Fitness Challenge", creator: "@gym_guru_sara", action: "Milestone reached", time: "6 hours ago", status: "success" },
                  { campaign: "Food & Lifestyle", creator: "@foodie_adventures", action: "Content delivered", time: "8 hours ago", status: "success" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                      <div>
                        <p className="font-medium text-slate-900">{activity.campaign}</p>
                        <p className="text-sm text-slate-600">{activity.creator} • {activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-slate-500">{activity.time}</span>
                      <Badge 
                        variant={activity.status === 'success' ? 'default' : 'secondary'}
                        className="ml-2 text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Toolbar */}
        <QuickActionsToolbar />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
