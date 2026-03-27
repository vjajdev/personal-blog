-- Execute this SQL in your Supabase SQL Editor

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  desc_text text,
  mock_img text NOT NULL,
  mock_tag text NOT NULL
);

-- 2. Create Timeline Table
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  year_range text NOT NULL,
  title text NOT NULL,
  desc_text text
);

-- 3. Enabling Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Policies
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view timeline" ON public.timeline_events FOR SELECT USING (true);

-- 5. Authenticated Admin CRUD Policies
CREATE POLICY "Authenticated users can manage projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage timeline" ON public.timeline_events FOR ALL USING (auth.role() = 'authenticated');

-- Optional: Insert Initial Dummy Data
INSERT INTO public.projects (title, desc_text, mock_img, mock_tag) VALUES
('Azuki Collection', 'A collection of 10,000 avatars that give membership access to The Garden.', 'red-bg', 'NFT'),
('Design System', 'Creating a comprehensive UI kit for enterprise applications.', 'dark-bg', 'UI/UX'),
('Crypto Marketplace', 'Digital marketplace for crypto collections and non-fungible tokens.', 'cream-bg', 'Web3');

INSERT INTO public.timeline_events (year_range, title, desc_text) VALUES
('2023 - Present', 'Senior UX Designer', 'Leading design systems at TechCorp.'),
('2020 - 2023', 'Product Designer', 'Crafting Web3 experiences and NFT platforms.'),
('2018 - 2020', 'Computer Science Degree', 'Graduated with honors from State University.');
