-- Insert the demo Zaydn sneaker campaign with all specified metrics
INSERT INTO public.campaigns (
  name,
  status,
  start_date,
  end_date,
  spend_amount,
  emv_amount,
  impressions,
  engagements,
  clicks,
  conversions
) VALUES (
  '[DEMO] Zaydn Ash Grey & Black Sneaker Launch',
  'Active',
  '2025-10-01',
  '2025-11-15',
  275000,
  750000,
  2800000,
  315000,
  15500,
  1550
);