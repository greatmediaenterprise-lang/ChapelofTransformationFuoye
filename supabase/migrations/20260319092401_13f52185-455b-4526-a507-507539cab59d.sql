
-- Replace all permissive write policies with admin-only

-- BRANCHES
DROP POLICY IF EXISTS "Authenticated can insert branches" ON public.branches;
DROP POLICY IF EXISTS "Authenticated can update branches" ON public.branches;
DROP POLICY IF EXISTS "Authenticated can delete branches" ON public.branches;
CREATE POLICY "Admins can insert branches" ON public.branches FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update branches" ON public.branches FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete branches" ON public.branches FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- EVENTS
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- GALLERY_IMAGES
DROP POLICY IF EXISTS "Authenticated users can insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON public.gallery_images;
CREATE POLICY "Admins can insert gallery_images" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery_images" ON public.gallery_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- LEADERS
DROP POLICY IF EXISTS "Authenticated can insert leaders" ON public.leaders;
DROP POLICY IF EXISTS "Authenticated can update leaders" ON public.leaders;
DROP POLICY IF EXISTS "Authenticated can delete leaders" ON public.leaders;
CREATE POLICY "Admins can insert leaders" ON public.leaders FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leaders" ON public.leaders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leaders" ON public.leaders FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- MATERIALS
DROP POLICY IF EXISTS "Authenticated users can insert materials" ON public.materials;
DROP POLICY IF EXISTS "Authenticated users can delete materials" ON public.materials;
CREATE POLICY "Admins can insert materials" ON public.materials FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete materials" ON public.materials FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SERVICE_TIMES
DROP POLICY IF EXISTS "Authenticated can insert service_times" ON public.service_times;
DROP POLICY IF EXISTS "Authenticated can update service_times" ON public.service_times;
DROP POLICY IF EXISTS "Authenticated can delete service_times" ON public.service_times;
CREATE POLICY "Admins can insert service_times" ON public.service_times FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update service_times" ON public.service_times FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete service_times" ON public.service_times FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SOCIAL_LINKS
DROP POLICY IF EXISTS "Authenticated can insert social_links" ON public.social_links;
DROP POLICY IF EXISTS "Authenticated can update social_links" ON public.social_links;
DROP POLICY IF EXISTS "Authenticated can delete social_links" ON public.social_links;
CREATE POLICY "Admins can insert social_links" ON public.social_links FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update social_links" ON public.social_links FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete social_links" ON public.social_links FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SITE_CONTENT
DROP POLICY IF EXISTS "Authenticated can insert site_content" ON public.site_content;
DROP POLICY IF EXISTS "Authenticated can update site_content" ON public.site_content;
DROP POLICY IF EXISTS "Authenticated can delete site_content" ON public.site_content;
CREATE POLICY "Admins can insert site_content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site_content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site_content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
