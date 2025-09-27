-- Enable Row Level Security on all public tables to fix security warnings
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_heatmap ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_types ENABLE ROW LEVEL SECURITY;

-- Create basic policies for public access (adjust as needed for your app)
CREATE POLICY "Allow public read access" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.engagement_heatmap FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.kpi_metrics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.creator_tiers FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.performance_trends FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.content_types FOR SELECT USING (true);