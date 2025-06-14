
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, DollarSign, Target, Download, Plus } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpiData = [
  {
    title: "Active Campaigns",
    value: "12",
    icon: Target,
    trend: "+3 this month",
    color: "text-blue-600"
  },
  {
    title: "Total Spend vs Budget",
    value: "68%",
    icon: DollarSign,
    trend: "$142K of $210K",
    color: "text-green-600"
  },
  {
    title: "Estimated ROI",
    value: "280%",
    icon: TrendingUp,
    trend: "+15% vs last month",
    color: "text-teal-600"
  },
  {
    title: "Total Creators",
    value: "87",
    icon: Users,
    trend: "+12 this month",
    color: "text-purple-600"
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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Monitor your campaign performance and ROI in real-time</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4" />
            <span>Launch Campaign</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {kpi.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
                <p className="text-xs text-slate-600 mt-1">{kpi.trend}</p>
                {kpi.title === "Total Spend vs Budget" && (
                  <Progress value={68} className="mt-3" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend vs Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Spend vs Engagement (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis dataKey="date" className="text-slate-600" />
                  <YAxis className="text-slate-600" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="spend" 
                    stroke="#0d9488" 
                    strokeWidth={3}
                    name="Spend ($)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Engagement"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Metrics */}
        <Card>
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
                  <Tooltip />
                  <Bar dataKey="impressions" fill="#8b5cf6" name="Impressions" />
                  <Bar dataKey="clicks" fill="#0d9488" name="Clicks" />
                  <Bar dataKey="conversions" fill="#f59e0b" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaign Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { campaign: "Summer Fashion 2024", creator: "@fashionista_maya", action: "Posted content", time: "2 hours ago", status: "success" },
              { campaign: "Tech Product Launch", creator: "@tech_reviewer_joe", action: "Content approved", time: "4 hours ago", status: "pending" },
              { campaign: "Fitness Challenge", creator: "@gym_guru_sara", action: "Milestone reached", time: "6 hours ago", status: "success" },
              { campaign: "Food & Lifestyle", creator: "@foodie_adventures", action: "Content delivered", time: "8 hours ago", status: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="font-medium text-slate-900">{activity.campaign}</p>
                    <p className="text-sm text-slate-600">{activity.creator} • {activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
