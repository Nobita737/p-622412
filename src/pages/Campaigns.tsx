
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Edit, Play, Pause, Copy, Plus, Filter, Search, MoreHorizontal, AlertTriangle, Info, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const campaignsData = [
  {
    id: 1,
    name: "Summer Fashion 2024",
    status: "Live",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budgetUsed: 68,
    totalBudget: "$25,000",
    totalReach: "2.4M",
    engagementRate: "4.2%",
    creators: 8,
    contentPieces: 24,
    roi: "285%"
  },
  {
    id: 2,
    name: "Tech Product Launch",
    status: "Paused",
    startDate: "2024-05-15",
    endDate: "2024-07-15",
    budgetUsed: 45,
    totalBudget: "$35,000",
    totalReach: "1.8M",
    engagementRate: "3.8%",
    creators: 6,
    contentPieces: 18,
    roi: "220%"
  },
  {
    id: 3,
    name: "Fitness Challenge",
    status: "Live",
    startDate: "2024-06-10",
    endDate: "2024-09-10",
    budgetUsed: 23,
    totalBudget: "$40,000",
    totalReach: "980K",
    engagementRate: "5.1%",
    creators: 12,
    contentPieces: 36,
    roi: "310%"
  },
  {
    id: 4,
    name: "Food & Lifestyle",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-05-31",
    budgetUsed: 100,
    totalBudget: "$30,000",
    totalReach: "3.2M",
    engagementRate: "6.3%",
    creators: 10,
    contentPieces: 42,
    roi: "425%"
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    Live: { bg: "bg-green-100", text: "text-green-800", icon: "🟢" },
    Paused: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⏸️" },
    Completed: { bg: "bg-blue-100", text: "text-blue-800", icon: "✅" }
  };
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Live;
  
  return (
    <Badge className={`${config.bg} ${config.text} border-0`}>
      <span className="mr-1">{config.icon}</span>
      {status}
    </Badge>
  );
};

const CampaignRow = ({ campaign }: { campaign: typeof campaignsData[0] }) => (
  <TableRow className="hover:bg-primary-25 group">
    <TableCell className="font-medium">
      <div className="flex items-center space-x-3">
        <div>
          <div className="font-semibold text-slate-900">{campaign.name}</div>
          <div className="text-xs text-slate-500">
            {campaign.creators} creators • {campaign.contentPieces} content pieces
          </div>
        </div>
        {campaign.budgetUsed > 90 && (
          <Tooltip>
            <TooltipTrigger>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Budget nearly exhausted</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TableCell>
    
    <TableCell>
      {getStatusBadge(campaign.status)}
    </TableCell>
    
    <TableCell>
      <div className="text-sm">
        <div>{campaign.startDate}</div>
        <div className="text-slate-500">to {campaign.endDate}</div>
      </div>
    </TableCell>
    
    <TableCell>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>{campaign.budgetUsed}%</span>
          <span className="text-slate-500">{campaign.totalBudget}</span>
        </div>
        <Progress 
          value={campaign.budgetUsed} 
          className={`w-20 h-2 ${campaign.budgetUsed > 90 ? 'bg-red-100' : 'bg-primary-50'}`}
        />
      </div>
    </TableCell>
    
    <TableCell>
      <div className="font-medium">{campaign.totalReach}</div>
      <div className="text-xs text-slate-500">Total impressions</div>
    </TableCell>
    
    <TableCell>
      <div className="flex items-center space-x-2">
        <span className="font-medium">{campaign.engagementRate}</span>
        <Badge variant="outline" className="text-xs bg-primary-50 text-primary-700 border-primary-200">
          ROI: {campaign.roi}
        </Badge>
      </div>
    </TableCell>
    
    <TableCell>
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-25">
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>View details</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-25">
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Edit campaign</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-25">
              {campaign.status === "Live" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{campaign.status === "Live" ? "Pause campaign" : "Resume campaign"}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-25">
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Duplicate campaign</p></TooltipContent>
        </Tooltip>
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-25">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

const Campaigns = () => {
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
              Campaigns
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-slate-400 ml-2" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage and monitor all your influencer campaigns</p>
                </TooltipContent>
              </Tooltip>
            </h1>
            <p className="text-slate-600 mt-1">Manage and monitor all your influencer campaigns</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
              <Zap className="h-3 w-3 mr-1" />
              4 Active
            </Badge>
            <Button variant="outline" size="sm" className="hover:bg-primary-25">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-primary hover:bg-primary-600 shadow-card"
              onClick={() => navigate('/create-campaign')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="clean-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Status</option>
                  <option>Live</option>
                  <option>Paused</option>
                  <option>Completed</option>
                </select>
                <select className="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Categories</option>
                  <option>Fashion</option>
                  <option>Tech</option>
                  <option>Fitness</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="clean-card hover-scale">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">12</div>
              <p className="text-sm text-slate-600">Active Campaigns</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-primary-50 text-primary-700">
                +3 this month
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="clean-card hover-scale">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">$142K</div>
              <p className="text-sm text-slate-600">Total Spend</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-primary-50 text-primary-700">
                68% of budget
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="clean-card hover-scale">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">8.4M</div>
              <p className="text-sm text-slate-600">Total Reach</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-primary-50 text-primary-700">
                +1.2M this week
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="clean-card hover-scale">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">4.8%</div>
              <p className="text-sm text-slate-600">Avg Engagement</p>
              <Badge variant="secondary" className="mt-1 text-xs bg-primary-50 text-primary-700">
                +0.3% vs last month
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Campaigns Table */}
        <Card className="clean-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Campaigns</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="hover:bg-primary-25">
                  Export
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-primary-25">
                  Bulk Actions
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-primary-25">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Campaign Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                    <TableHead className="font-semibold text-slate-700">Budget Used</TableHead>
                    <TableHead className="font-semibold text-slate-700">Total Reach</TableHead>
                    <TableHead className="font-semibold text-slate-700">Performance</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignsData.map((campaign) => (
                    <CampaignRow key={campaign.id} campaign={campaign} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Card View (Hidden on Desktop) */}
        <div className="lg:hidden space-y-4">
          {campaignsData.map((campaign) => (
            <Card key={campaign.id} className="clean-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                    <p className="text-sm text-slate-600">{campaign.creators} creators • {campaign.contentPieces} pieces</p>
                  </div>
                  {getStatusBadge(campaign.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-600">Budget Used</div>
                    <div className="font-medium">{campaign.budgetUsed}%</div>
                    <Progress value={campaign.budgetUsed} className="mt-1" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Engagement</div>
                    <div className="font-medium">{campaign.engagementRate}</div>
                    <div className="text-xs text-primary-600">ROI: {campaign.roi}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-primary-25">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-primary-25">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-primary-25">
                    {campaign.status === "Live" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Campaigns;
