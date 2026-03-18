
-- Leaders table
CREATE TABLE public.leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  description text,
  image_url text,
  display_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view leaders" ON public.leaders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert leaders" ON public.leaders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update leaders" ON public.leaders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete leaders" ON public.leaders FOR DELETE TO authenticated USING (true);

-- Branches table
CREATE TABLE public.branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  service_time text,
  phone text,
  is_main boolean DEFAULT false,
  display_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view branches" ON public.branches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert branches" ON public.branches FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update branches" ON public.branches FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete branches" ON public.branches FOR DELETE TO authenticated USING (true);

-- Service times table
CREATE TABLE public.service_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  day text NOT NULL,
  time text NOT NULL,
  description text,
  display_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.service_times ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view service_times" ON public.service_times FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert service_times" ON public.service_times FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update service_times" ON public.service_times FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete service_times" ON public.service_times FOR DELETE TO authenticated USING (true);

-- Social links table
CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  description text,
  display_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view social_links" ON public.social_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert social_links" ON public.social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update social_links" ON public.social_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete social_links" ON public.social_links FOR DELETE TO authenticated USING (true);

-- Site content key-value table for editable text blocks
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(section, key)
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site_content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can insert site_content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update site_content" ON public.site_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete site_content" ON public.site_content FOR DELETE TO authenticated USING (true);

-- Seed default site content
INSERT INTO public.site_content (section, key, value) VALUES
  ('hero', 'subtitle', 'An interdenominational Christian body at Federal University Oye Ekiti, dedicated to the propagation of the kingdom and perfecting holiness in the fear of God.'),
  ('hero', 'cta_link', 'https://linktr.ee/cotfuoye'),
  ('hero', 'phone', '08082513103'),
  ('about', 'description', 'We are an interdenominational Christian body for the propagation of the kingdom. Perfecting holiness in the fear of God.'),
  ('about', 'mission_1', 'Since 2012, Chapel of Transformation has been a beacon of faith at Federal University Oye Ekiti. As a university chapel, we serve the academic community with a heart for spiritual growth and transformation.'),
  ('about', 'mission_2', 'Our interdenominational approach welcomes believers from all Christian backgrounds, fostering unity in diversity as we pursue holiness and spiritual maturity together.'),
  ('contact', 'location', 'Phase One, Main Auditorium'),
  ('contact', 'location_subtitle', 'Federal University Oye Ekiti'),
  ('contact', 'email', 'info@cotfuoye.org'),
  ('contact', 'phone', '08082513103, 08118361206'),
  ('contact', 'phone_2', '07041128142'),
  ('contact', 'whatsapp', '2348118361206'),
  ('services', 'video_url', 'https://www.facebook.com/share/v/16jXBxWpMJ/');

-- Seed leaders
INSERT INTO public.leaders (name, position, description, image_url, display_order) VALUES
  ('Daddy Agu', 'Council', 'Leading with wisdom and spiritual insight, Daddy Agu serves as our Council, guiding the chapel with dedication and love for God''s people.', '/lovable-uploads/9e3dd2a8-3f58-4614-a163-6471441dd79c.png', 1),
  ('Daddy Osamaka', 'Chaplain', 'Our beloved Chaplain, Daddy Osamaka, shepherds the congregation with pastoral care and teaches with power and authority from God''s Word.', '/lovable-uploads/57c095bd-1e50-443f-8680-f414f5cb9b9a.png', 2);

-- Seed branches
INSERT INTO public.branches (name, location, service_time, phone, is_main, display_order) VALUES
  ('COT FUOYE — Oye Ekiti (Main Campus)', 'Phase One, Main Auditorium, Federal University Oye Ekiti', 'Sunday: 8:00 AM - 11:30 AM', '08082513103, 08118361206', true, 1),
  ('COT FUOYE — Ikole Ekiti Campus', 'Federal University Oye Ekiti, Ikole Campus', 'Sunday Service', '07041128142', false, 2);

-- Seed service times
INSERT INTO public.service_times (title, day, time, description, display_order) VALUES
  ('Sunday Service', 'Every Sunday', '8:00 AM - 11:30 AM', 'Join us for worship, fellowship, and the Word', 1),
  ('Bible Study', 'Every Wednesday', '5:30 PM - 6:30 PM', 'Deep dive into God''s Word', 2),
  ('Prayer Meeting', 'Every Friday', '5:30 PM - 6:30 PM', 'Corporate prayer and intercession', 3);

-- Seed social links
INSERT INTO public.social_links (platform, url, description, display_order) VALUES
  ('Facebook', 'https://www.facebook.com/cotfuoye/', 'Follow us for updates, live services, and community posts.', 1),
  ('YouTube', 'https://www.youtube.com/@chapeloftransformation', 'Watch sermons, worship sessions, and special programs.', 2),
  ('Instagram', 'https://www.instagram.com/cot.fuoye/', 'See our highlights, stories, and behind-the-scenes moments.', 3),
  ('Linktree', 'https://linktr.ee/cotfuoye', 'Access all our links and resources in one place.', 4);
