CREATE TABLE IF NOT EXISTS payment_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Business + contact
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  website_url text NOT NULL,

  -- Payment processor preference
  processor text NOT NULL,

  -- Free-text application
  why_choose text NOT NULL,

  -- Meta
  source_url text,
  user_agent text,

  created_at timestamptz DEFAULT now()
);

-- Enable RLS but allow inserts from anon (public promo form)
ALTER TABLE payment_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON payment_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON payment_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
