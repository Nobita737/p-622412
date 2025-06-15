
-- Create tables for storing analytics data

-- Campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Active', 'Completed', 'Planning', 'Paused')),
  impressions BIGINT NOT NULL DEFAULT 0,
  engagements INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  spend_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  emv_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Performance trends table for time series data
CREATE TABLE public.performance_trends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  period_name TEXT NOT NULL,
  period_date DATE NOT NULL,
  impressions BIGINT NOT NULL DEFAULT 0,
  engagements INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Creator diversity data
CREATE TABLE public.creator_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tier_name TEXT NOT NULL,
  tier_range TEXT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  color_hex TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Content performance data
CREATE TABLE public.content_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type_name TEXT NOT NULL,
  engagement_rate DECIMAL(5,2) NOT NULL,
  content_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Heatmap data for optimal posting times
CREATE TABLE public.engagement_heatmap (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')),
  hour_of_day INTEGER NOT NULL CHECK (hour_of_day >= 0 AND hour_of_day <= 23),
  engagement_value INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- KPI metrics table
CREATE TABLE public.kpi_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  trend_value TEXT NOT NULL,
  trend_direction TEXT NOT NULL CHECK (trend_direction IN ('up', 'down', 'neutral')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample data for Indian brand campaigns
INSERT INTO public.campaigns (name, status, impressions, engagements, clicks, conversions, spend_amount, emv_amount, start_date, end_date) VALUES
('Diwali Festive Collection', 'Active', 3200000, 313600, 15800, 1250, 180000, 850000, '2024-10-01', '2024-11-15'),
('IPL Cricket Partnership', 'Completed', 5800000, 649600, 29500, 1950, 380000, 1230000, '2024-03-15', '2024-05-30'),
('Regional Language Series', 'Active', 2100000, 157500, 12200, 890, 150000, 680000, '2024-09-01', '2024-12-31'),
('Bollywood Celebrity Collab', 'Completed', 4500000, 400500, 22500, 1680, 420000, 1120000, '2024-06-01', '2024-08-15'),
('Sustainable Fashion Drive', 'Planning', 1800000, 122400, 9800, 720, 125000, 590000, '2024-12-01', '2025-02-28');

-- Insert performance trends data
INSERT INTO public.performance_trends (period_name, period_date, impressions, engagements, clicks, conversions) VALUES
('Jan', '2024-01-31', 2800000, 243600, 12400, 890),
('Feb', '2024-02-29', 3200000, 307200, 15800, 1250),
('Mar', '2024-03-31', 2950000, 295000, 14200, 1150),
('Apr', '2024-04-30', 4100000, 451000, 22500, 1680),
('May', '2024-05-31', 3800000, 418000, 19500, 1520),
('Jun', '2024-06-30', 4650000, 558000, 26200, 1950);

-- Insert creator diversity data
INSERT INTO public.creator_tiers (tier_name, tier_range, percentage, color_hex) VALUES
('Micro', '1K-100K', 52.0, '#0066CC'),
('Macro', '100K-1M', 33.0, '#3693ff'),
('Mega', '1M+', 15.0, '#7bb8ff');

-- Insert content type performance data
INSERT INTO public.content_types (type_name, engagement_rate, content_count) VALUES
('Reels', 88.0, 245),
('Stories', 72.0, 320),
('Video', 68.0, 180),
('Carousel', 55.0, 125),
('Image', 48.0, 95);

-- Insert heatmap data for Indian peak engagement times
INSERT INTO public.engagement_heatmap (day_of_week, hour_of_day, engagement_value) VALUES
('Mon', 9, 52), ('Mon', 13, 78), ('Mon', 20, 95),
('Tue', 10, 58), ('Tue', 14, 82), ('Tue', 21, 98),
('Wed', 8, 45), ('Wed', 13, 88), ('Wed', 19, 92),
('Thu', 11, 68), ('Thu', 15, 85), ('Thu', 20, 96),
('Fri', 9, 62), ('Fri', 17, 89), ('Fri', 22, 88),
('Sat', 11, 75), ('Sat', 16, 94), ('Sat', 21, 100),
('Sun', 12, 72), ('Sun', 18, 91), ('Sun', 20, 95);

-- Insert KPI metrics data
INSERT INTO public.kpi_metrics (metric_name, metric_value, trend_value, trend_direction, period_start, period_end) VALUES
('totalCampaigns', 5, '+25%', 'up', '2024-06-01', '2024-06-30'),
('avgRoi', 485, '+38%', 'up', '2024-06-01', '2024-06-30'),
('avgCpa', 18, '-28%', 'down', '2024-06-01', '2024-06-30'),
('avgEngagementRate', 8.7, '+42%', 'up', '2024-06-01', '2024-06-30'),
('totalEmv', 2850000, '+65%', 'up', '2024-06-01', '2024-06-30'),
('budgetUtilization', 92, '+12%', 'up', '2024-06-01', '2024-06-30');

-- Enable Row Level Security (optional - for now we'll keep it simple)
-- ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.performance_trends ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.creator_tiers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.content_types ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.engagement_heatmap ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.kpi_metrics ENABLE ROW LEVEL SECURITY;
