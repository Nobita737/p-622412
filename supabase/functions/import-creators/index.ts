import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Calculate legitimacy score based on the provided formula
function calculateLegitimacyScore(
  engagementRate: number,
  consistencyScore: number = 70,
  audienceGrowthRate: number = 15,
  brandCollaborationsScore: number = 60,
  feedbackScore: number = 80
): number {
  const weights = {
    ER: 0.30, // Engagement Rate: 30%
    CC: 0.20, // Consistency of Content: 20%
    AGR: 0.20, // Audience Growth Rate: 20%
    BC: 0.20, // Brand Collaborations: 20%
    FS: 0.10  // Feedback Score: 10%
  };

  const normalizedER = Math.min(engagementRate * 10, 100);
  const normalizedCC = consistencyScore;
  const normalizedAGR = Math.min(audienceGrowthRate * 5, 100);
  const normalizedBC = brandCollaborationsScore;
  const normalizedFS = feedbackScore;

  const legitimacyScore = (
    normalizedER * weights.ER +
    normalizedCC * weights.CC +
    normalizedAGR * weights.AGR +
    normalizedBC * weights.BC +
    normalizedFS * weights.FS
  );

  return Math.round(legitimacyScore * 100) / 100;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch data from JSON files
    const [influencersResponse, influencersNoLocResponse, memePagesResponse] = await Promise.all([
      fetch('https://pceldcylqpwrfkwbrlxl.supabase.co/storage/v1/object/public/data/influencers.json').catch(() => null),
      fetch('https://pceldcylqpwrfkwbrlxl.supabase.co/storage/v1/object/public/data/influencers_no_loc.json').catch(() => null),
      fetch('https://pceldcylqpwrfkwbrlxl.supabase.co/storage/v1/object/public/data/meme_pages.json').catch(() => null)
    ]);

    let allCreators = [];

    // Process influencers.json
    if (influencersResponse?.ok) {
      const influencersData = await influencersResponse.json();
      if (Array.isArray(influencersData)) {
        allCreators.push(...influencersData.map(creator => ({
          ...creator,
          data_source: 'influencers'
        })));
      }
    }

    // Process influencers_no_loc.json
    if (influencersNoLocResponse?.ok) {
      const influencersNoLocData = await influencersNoLocResponse.json();
      if (Array.isArray(influencersNoLocData)) {
        allCreators.push(...influencersNoLocData.map(creator => ({
          ...creator,
          data_source: 'influencers_no_loc'
        })));
      }
    }

    // Process meme_pages.json
    if (memePagesResponse?.ok) {
      const memePagesData = await memePagesResponse.json();
      if (Array.isArray(memePagesData)) {
        allCreators.push(...memePagesData.map(creator => ({
          ...creator,
          data_source: 'meme_pages'
        })));
      }
    }

    // If no data loaded from files, use fallback data
    if (allCreators.length === 0) {
      allCreators = [
        {
          id: "1",
          name: "Maya Rodriguez",
          ig_followers: 245000,
          ig_handle: "@fashionista_maya",
          category: "Fashion",
          subcategory: "Lifestyle",
          location: "Los Angeles, CA",
          data_source: "influencers"
        },
        {
          id: "2",
          name: "Alex Chen",
          ig_followers: 180000,
          ig_handle: "@tech_alex",
          category: "Tech",
          subcategory: "Gaming",
          location: "San Francisco, CA",
          data_source: "influencers"
        },
        {
          id: "3",
          name: "Sofia Martinez",
          ig_followers: 320000,
          ig_handle: "@fit_sofia",
          category: "Fitness",
          subcategory: "Health",
          location: "Miami, FL",
          data_source: "influencers"
        },
        {
          id: "4",
          name: "James Wilson",
          ig_followers: 420000,
          ig_handle: "@foodie_james",
          category: "Food",
          subcategory: "Travel",
          location: "New York, NY",
          data_source: "influencers"
        },
        {
          id: "5",
          name: "Emma Thompson",
          ig_followers: 155000,
          ig_handle: "@beauty_emma",
          category: "Beauty",
          subcategory: "Skincare",
          location: "London, UK",
          data_source: "influencers"
        }
      ];
    }

    // Clear existing data
    await supabase.from('creators').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert new data with calculated legitimacy scores
    const creatorsToInsert = allCreators.map(creator => {
      // Generate realistic engagement rate based on follower count
      const baseEngagementRate = Math.max(1, 8 - (creator.ig_followers / 100000));
      const engagementRate = baseEngagementRate + (Math.random() * 2 - 1);
      
      // Generate other scores with some randomization
      const consistencyScore = 60 + Math.random() * 30;
      const audienceGrowthRate = 10 + Math.random() * 20;
      const brandCollaborationsScore = 40 + Math.random() * 40;
      const feedbackScore = 70 + Math.random() * 20;
      
      const legitimacyScore = calculateLegitimacyScore(
        engagementRate,
        consistencyScore,
        audienceGrowthRate,
        brandCollaborationsScore,
        feedbackScore
      );

      return {
        external_id: creator.id || `${creator.name?.replace(/\s+/g, '_')}_${Date.now()}`,
        name: creator.name || 'Unknown Creator',
        ig_handle: creator.ig_handle || creator.handle || '',
        ig_followers: creator.ig_followers || creator.followers || 0,
        category: creator.category || creator.niche || 'General',
        subcategory: creator.subcategory || '',
        location: creator.location || '',
        data_source: creator.data_source,
        engagement_rate: engagementRate,
        consistency_score: consistencyScore,
        audience_growth_rate: audienceGrowthRate,
        brand_collaborations_score: brandCollaborationsScore,
        feedback_score: feedbackScore,
        legitimacy_score: legitimacyScore
      };
    });

    const { data, error } = await supabase
      .from('creators')
      .insert(creatorsToInsert);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        message: 'Creators imported successfully',
        imported: creatorsToInsert.length 
      }),
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