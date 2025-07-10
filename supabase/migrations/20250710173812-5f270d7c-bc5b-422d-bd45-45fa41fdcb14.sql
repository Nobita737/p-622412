-- Create creators table to store influencer data
CREATE TABLE public.creators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT NOT NULL,
  name TEXT NOT NULL,
  ig_handle TEXT,
  ig_followers INTEGER,
  category TEXT,
  subcategory TEXT,
  location TEXT,
  engagement_rate DECIMAL,
  consistency_score DECIMAL DEFAULT 0,
  audience_growth_rate DECIMAL DEFAULT 0,
  brand_collaborations_score DECIMAL DEFAULT 0,
  feedback_score DECIMAL DEFAULT 0,
  legitimacy_score DECIMAL DEFAULT 0,
  data_source TEXT NOT NULL, -- 'influencers', 'influencers_no_loc', 'meme_pages'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;

-- Create policies for public access since this is creator discovery
CREATE POLICY "Creators are viewable by everyone" 
ON public.creators 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Authenticated users can insert creators" 
ON public.creators 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update creators" 
ON public.creators 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create indexes for better search performance
CREATE INDEX idx_creators_name ON public.creators USING GIN(to_tsvector('english', name));
CREATE INDEX idx_creators_ig_handle ON public.creators(ig_handle);
CREATE INDEX idx_creators_category ON public.creators(category);
CREATE INDEX idx_creators_subcategory ON public.creators(subcategory);
CREATE INDEX idx_creators_location ON public.creators(location);
CREATE INDEX idx_creators_ig_followers ON public.creators(ig_followers);
CREATE INDEX idx_creators_legitimacy_score ON public.creators(legitimacy_score);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_creators_updated_at
BEFORE UPDATE ON public.creators
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();