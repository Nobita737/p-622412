
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, Eye } from "lucide-react";

const creatorsData = [
  {
    id: 1,
    name: "Maya Rodriguez",
    handle: "@fashionista_maya",
    avatar: "MR",
    followers: "245K",
    avgEngagement: "5.2%",
    cpe: "$0.12",
    category: "Fashion",
    campaigns: 3
  },
  {
    id: 2,
    name: "Joe Chen",
    handle: "@tech_reviewer_joe",
    avatar: "JC",
    followers: "180K",
    avgEngagement: "4.8%",
    cpe: "$0.15",
    category: "Technology",
    campaigns: 2
  },
  {
    id: 3,
    name: "Sara Williams",
    handle: "@gym_guru_sara",
    avatar: "SW",
    followers: "320K",
    avgEngagement: "6.1%",
    cpe: "$0.09",
    category: "Fitness",
    campaigns: 4
  },
  {
    id: 4,
    name: "Alex Thompson",
    handle: "@foodie_adventures",
    avatar: "AT",
    followers: "420K",
    avgEngagement: "7.3%",
    cpe: "$0.08",
    category: "Food",
    campaigns: 5
  }
];

const Creators = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Creator Performance</h1>
          <p className="text-slate-600 mt-1">Monitor and analyze your top-performing creators</p>
        </div>
      </div>

      {/* Top Performers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creatorsData.map((creator) => (
          <Card key={creator.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {creator.avatar}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900">{creator.name}</h3>
                <p className="text-sm text-slate-600">{creator.handle}</p>
                <Badge variant="secondary" className="text-xs">
                  {creator.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Followers</span>
                <span className="font-medium">{creator.followers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Avg Engagement</span>
                <span className="font-medium">{creator.avgEngagement}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">CPE</span>
                <span className="font-medium">{creator.cpe}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Campaigns</span>
                <span className="font-medium">{creator.campaigns}</span>
              </div>
              <div className="pt-2 flex justify-center">
                <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Top Performer
            </CardTitle>
            <Star className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">Alex Thompson</div>
            <p className="text-xs text-slate-600 mt-1">7.3% avg engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Reach
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1.2M</div>
            <p className="text-xs text-slate-600 mt-1">Combined follower count</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg CPE
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">$0.11</div>
            <p className="text-xs text-slate-600 mt-1">Cost per engagement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Creators;
