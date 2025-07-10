
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SearchFilterBar from "@/components/explore-creators/SearchFilterBar";
import CreatorCard from "@/components/explore-creators/CreatorCard";
import CreatorModal from "@/components/explore-creators/CreatorModal";
import { Compass, Users, Star, TrendingUp } from "lucide-react";

// Mock data for creators
const mockCreators = [
  {
    id: 1,
    name: "Maya Rodriguez",
    handle: "@fashionista_maya",
    avatar: "MR",
    followers: "245K",
    engagementRate: "5.2%",
    rating: 4.8,
    niche: ["Fashion", "Lifestyle"],
    platforms: ["Instagram", "YouTube"],
    bio: "Fashion influencer and style consultant helping women discover their personal style. Love sustainable fashion and affordable finds.",
    location: "Los Angeles, CA"
  },
  {
    id: 2,
    name: "Alex Chen",
    handle: "@tech_alex",
    avatar: "AC",
    followers: "180K",
    engagementRate: "6.1%",
    rating: 4.6,
    niche: ["Tech", "Gaming"],
    platforms: ["YouTube", "TikTok"],
    bio: "Tech reviewer and gaming enthusiast. Bringing you honest reviews of the latest gadgets and gaming gear.",
    location: "San Francisco, CA"
  },
  {
    id: 3,
    name: "Sofia Martinez",
    handle: "@fit_sofia",
    avatar: "SM",
    followers: "320K",
    engagementRate: "7.3%",
    rating: 4.9,
    niche: ["Fitness", "Health"],
    platforms: ["Instagram"],
    bio: "Certified personal trainer and nutrition coach. Helping you achieve your fitness goals with sustainable workouts and healthy recipes.",
    location: "Miami, FL"
  },
  {
    id: 4,
    name: "James Wilson",
    handle: "@foodie_james",
    avatar: "JW",
    followers: "420K",
    engagementRate: "4.8%",
    rating: 4.4,
    niche: ["Food", "Travel"],
    platforms: ["Instagram", "YouTube"],
    bio: "Food blogger and travel enthusiast exploring cuisines around the world. Join me on delicious adventures!",
    location: "New York, NY"
  },
  {
    id: 5,
    name: "Emma Thompson",
    handle: "@beauty_emma",
    avatar: "ET",
    followers: "155K",
    engagementRate: "8.2%",
    rating: 4.7,
    niche: ["Beauty", "Skincare"],
    platforms: ["Instagram", "TikTok"],
    bio: "Beauty enthusiast sharing skincare tips, makeup tutorials, and product reviews for all skin types.",
    location: "London, UK"
  },
  {
    id: 6,
    name: "David Kim",
    handle: "@travel_david",
    avatar: "DK",
    followers: "290K",
    engagementRate: "5.9%",
    rating: 4.5,
    niche: ["Travel", "Photography"],
    platforms: ["Instagram", "YouTube"],
    bio: "Professional photographer and travel blogger capturing the world's most beautiful destinations.",
    location: "Seoul, South Korea"
  }
];

const ExploreCreators = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("followers-desc");
  const [filters, setFilters] = useState({
    niche: [],
    followerRange: "",
    engagementRange: "",
    ratingRange: "All",
    platform: [],
    location: ""
  });

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      niche: [],
      followerRange: "",
      engagementRange: "",
      ratingRange: "All",
      platform: [],
      location: ""
    });
    setSearchTerm("");
  };

  const handleViewProfile = (creator: any) => {
    setSelectedCreator(creator);
    setIsModalOpen(true);
  };

  const filteredAndSortedCreators = useMemo(() => {
    let filtered = mockCreators.filter(creator => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.niche.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()));

      // Niche filter
      const matchesNiche = filters.niche.length === 0 || 
        filters.niche.some(n => creator.niche.includes(n));

      // Rating filter
      const matchesRating = filters.ratingRange === "All" ||
        (filters.ratingRange === "4+ Stars" && creator.rating >= 4) ||
        (filters.ratingRange === "4.5+ Stars" && creator.rating >= 4.5);

      // Platform filter
      const matchesPlatform = filters.platform.length === 0 ||
        filters.platform.some(p => creator.platforms.includes(p));

      return matchesSearch && matchesNiche && matchesRating && matchesPlatform;
    });

    // Sort creators
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "followers-desc":
          return parseInt(b.followers.replace(/\D/g, '')) - parseInt(a.followers.replace(/\D/g, ''));
        case "followers-asc":
          return parseInt(a.followers.replace(/\D/g, '')) - parseInt(b.followers.replace(/\D/g, ''));
        case "engagement-desc":
          return parseFloat(b.engagementRate) - parseFloat(a.engagementRate);
        case "rating-desc":
          return b.rating - a.rating;
        case "recent":
          return a.id - b.id; // Mock: newer IDs = more recent
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy]);

  const totalCreators = mockCreators.length;
  const avgRating = (mockCreators.reduce((sum, creator) => sum + creator.rating, 0) / totalCreators).toFixed(1);
  const topNiches = ["Fashion", "Tech", "Fitness", "Food"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Compass className="h-8 w-8 text-primary mr-3" />
            Explore Creators
          </h1>
          <p className="text-slate-600 mt-1">Discover and connect with top-performing creators for your campaigns</p>
        </div>
        <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
          {filteredAndSortedCreators.length} of {totalCreators} creators
        </Badge>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalCreators}</div>
            <p className="text-xs text-muted-foreground">Available for collaboration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Niches</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {topNiches.map(niche => (
                <Badge key={niche} variant="secondary" className="text-xs">
                  {niche}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Most popular categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">6.2%</div>
            <p className="text-xs text-muted-foreground">Above industry standard</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedCreators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedCreators.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No creators found</h3>
          <p className="text-slate-600 mb-4">Try adjusting your search terms or filters</p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Creator Detail Modal */}
      <CreatorModal
        creator={selectedCreator}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ExploreCreators;
