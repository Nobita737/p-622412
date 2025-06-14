
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Play, Pause, Copy, Plus } from "lucide-react";

const campaignsData = [
  {
    id: 1,
    name: "Summer Fashion 2024",
    status: "Live",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budgetUsed: 68,
    totalReach: "2.4M",
    engagementRate: "4.2%"
  },
  {
    id: 2,
    name: "Tech Product Launch",
    status: "Paused",
    startDate: "2024-05-15",
    endDate: "2024-07-15",
    budgetUsed: 45,
    totalReach: "1.8M",
    engagementRate: "3.8%"
  },
  {
    id: 3,
    name: "Fitness Challenge",
    status: "Live",
    startDate: "2024-06-10",
    endDate: "2024-09-10",
    budgetUsed: 23,
    totalReach: "980K",
    engagementRate: "5.1%"
  },
  {
    id: 4,
    name: "Food & Lifestyle",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-05-31",
    budgetUsed: 100,
    totalReach: "3.2M",
    engagementRate: "6.3%"
  }
];

const getStatusBadge = (status: string) => {
  const statusColors = {
    Live: "bg-green-100 text-green-800",
    Paused: "bg-yellow-100 text-yellow-800",
    Completed: "bg-blue-100 text-blue-800"
  };
  return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
};

const Campaigns = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-600 mt-1">Manage and monitor all your influencer campaigns</p>
        </div>
        <Button className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          <span>Create Campaign</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">12</div>
            <p className="text-sm text-slate-600">Active Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">$142K</div>
            <p className="text-sm text-slate-600">Total Spend</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">8.4M</div>
            <p className="text-sm text-slate-600">Total Reach</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">4.8%</div>
            <p className="text-sm text-slate-600">Avg Engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Budget Used</TableHead>
                <TableHead>Total Reach</TableHead>
                <TableHead>Engagement Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsData.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.startDate} - {campaign.endDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={campaign.budgetUsed} className="w-16" />
                      <span className="text-sm">{campaign.budgetUsed}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.totalReach}</TableCell>
                  <TableCell>{campaign.engagementRate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {campaign.status === "Live" ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;
