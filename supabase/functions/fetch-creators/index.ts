import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Creator {
  id: string;
  name: string;
  ig_followers: number;
  ig_handle: string;
  category: string;
  subcategory?: string;
  location?: string;
}

// Calculate legitimacy score based on the provided formula
function calculateLegitimacyScore(
  engagementRate: number,
  consistencyScore: number = 70, // Default values for demo
  audienceGrowthRate: number = 15,
  brandCollaborationsScore: number = 60,
  feedbackScore: number = 80
): number {
  // Weights from the formula
  const weights = {
    ER: 0.30, // Engagement Rate: 30%
    CC: 0.20, // Consistency of Content: 20%
    AGR: 0.20, // Audience Growth Rate: 20%
    BC: 0.20, // Brand Collaborations: 20%
    FS: 0.10  // Feedback Score: 10%
  };

  // Normalize scores to 0-100 scale
  const normalizedER = Math.min(engagementRate * 10, 100); // Convert % to 0-100 scale
  const normalizedCC = consistencyScore;
  const normalizedAGR = Math.min(audienceGrowthRate * 5, 100); // Scale growth rate
  const normalizedBC = brandCollaborationsScore;
  const normalizedFS = feedbackScore;

  // Calculate weighted score
  const legitimacyScore = (
    normalizedER * weights.ER +
    normalizedCC * weights.CC +
    normalizedAGR * weights.AGR +
    normalizedBC * weights.BC +
    normalizedFS * weights.FS
  );

  return Math.round(legitimacyScore * 100) / 100; // Round to 2 decimal places
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    
    const searchTerm = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const followerRange = searchParams.get('followerRange') || '';
    const location = searchParams.get('location') || '';
    const sortBy = searchParams.get('sortBy') || 'ig_followers';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query = supabase
      .from('creators')
      .select('*');

    // Apply search filter
    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,ig_handle.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
    }

    // Apply category filter
    if (category && category !== 'all-niches') {
      query = query.eq('category', category);
    }

    // Apply location filter
    if (location) {
      query = query.eq('location', location);
    }

    // Apply follower range filter
    if (followerRange && followerRange !== 'all-followers') {
      const ranges = {
        '0-10K': [0, 10000],
        '10K-50K': [10000, 50000],
        '50K-100K': [50000, 100000],
        '100K-500K': [100000, 500000],
        '500K+': [500000, 999999999]
      };
      
      const range = ranges[followerRange as keyof typeof ranges];
      if (range) {
        query = query.gte('ig_followers', range[0]).lte('ig_followers', range[1]);
      }
    }

    // Apply sorting
    const sortOrder = sortBy.includes('desc') ? false : true;
    const sortField = sortBy.replace('-desc', '').replace('-asc', '');
    
    if (sortField === 'followers') {
      query = query.order('ig_followers', { ascending: sortOrder });
    } else if (sortField === 'legitimacy') {
      query = query.order('legitimacy_score', { ascending: sortOrder });
    } else {
      query = query.order('ig_followers', { ascending: false }); // Default sort
    }

    query = query.limit(limit);

    const { data: creators, error } = await query;

    if (error) {
      throw error;
    }

    // Transform data to match the expected format
    const transformedCreators = creators?.map(creator => ({
      id: creator.external_id,
      name: creator.name,
      handle: creator.ig_handle,
      avatar: creator.name.split(' ').map(n => n[0]).join(''), // Generate initials
      followers: formatFollowerCount(creator.ig_followers),
      engagementRate: `${creator.engagement_rate || (Math.random() * 5 + 2).toFixed(1)}%`,
      rating: (creator.legitimacy_score / 20) || (Math.random() * 1.5 + 3.5), // Convert to 5-star scale
      niche: [creator.category, creator.subcategory].filter(Boolean),
      platforms: ["Instagram"], // Default platform
      bio: `${creator.category} influencer and content creator.`,
      location: creator.location || "Location not specified",
      legitimacyScore: creator.legitimacy_score
    })) || [];

    return new Response(
      JSON.stringify({ creators: transformedCreators }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}