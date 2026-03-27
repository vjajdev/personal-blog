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

-- 3. Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  author text DEFAULT 'Admin'
);

-- 4. Enabling Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 5. Public Read Policies
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view timeline" ON public.timeline_events FOR SELECT USING (true);
CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT USING (true);

-- 6. Authenticated Admin CRUD Policies
CREATE POLICY "Authenticated users can manage projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage timeline" ON public.timeline_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- Optional: Insert Initial Dummy Data
INSERT INTO public.projects (title, desc_text, mock_img, mock_tag) VALUES
('Azuki Collection', 'A collection of 10,000 avatars that give membership access to The Garden.', 'red-bg', 'NFT'),
('Design System', 'Creating a comprehensive UI kit for enterprise applications.', 'dark-bg', 'UI/UX'),
('Crypto Marketplace', 'Digital marketplace for crypto collections and non-fungible tokens.', 'cream-bg', 'Web3');

INSERT INTO public.timeline_events (year_range, title, desc_text) VALUES
('2023 - Present', 'Senior UX Designer', 'Leading design systems at TechCorp.'),
('2020 - 2023', 'Product Designer', 'Crafting Web3 experiences and NFT platforms.'),
('2018 - 2020', 'Computer Science Degree', 'Graduated with honors from State University.');

INSERT INTO public.blogs (title, excerpt, content) VALUES
('The Future of Web3', 'Exploring the next evolution of the internet and decentralized apps.', 'Full content about Web3...'),
('Modern UI Patterns', 'How to build accessible and beautiful interfaces in 2024.', 'Full content about UI...'),
('Career in Design', 'My journey from computer science to product design.', 'Full content about career...');

