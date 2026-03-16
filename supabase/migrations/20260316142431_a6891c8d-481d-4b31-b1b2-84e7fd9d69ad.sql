
-- Create storage buckets for gallery and materials
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('materials', 'materials', true);

-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Materials table (academic + spiritual)
CREATE TABLE public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'academic', -- 'academic' or 'spiritual'
  file_url TEXT NOT NULL,
  file_type TEXT, -- pdf, doc, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery and materials
CREATE POLICY "Anyone can view gallery images" ON public.gallery_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can view materials" ON public.materials FOR SELECT TO anon, authenticated USING (true);

-- Authenticated users can upload
CREATE POLICY "Authenticated users can insert gallery images" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert materials" ON public.materials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete gallery images" ON public.gallery_images FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete materials" ON public.materials FOR DELETE TO authenticated USING (true);

-- Storage policies for gallery bucket
CREATE POLICY "Anyone can view gallery files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated can upload gallery files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');
CREATE POLICY "Authenticated can delete gallery files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery');

-- Storage policies for materials bucket
CREATE POLICY "Anyone can view material files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'materials');
CREATE POLICY "Authenticated can upload material files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'materials');
CREATE POLICY "Authenticated can delete material files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'materials');
