-- 1. Add missing UPDATE policies for admin-managed CMS tables
CREATE POLICY "Admins can update gallery_images"
  ON public.gallery_images FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update materials"
  ON public.materials FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 2. Lock down storage: only admins may upload/delete in gallery and materials buckets
DROP POLICY IF EXISTS "Authenticated users can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete from gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete from materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete materials" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload materials files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete materials files" ON storage.objects;

CREATE POLICY "Admins can upload gallery files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update gallery files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete gallery files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can upload materials files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'materials' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update materials files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'materials' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete materials files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'materials' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. Prevent privilege escalation on financial fields in users table.
-- Users may only update non-financial fields (full_name, email).
REVOKE UPDATE ON public.users FROM authenticated, anon;
GRANT UPDATE (full_name, email) ON public.users TO authenticated;

-- 4. Restrict EXECUTE on SECURITY DEFINER helper functions.
-- These are only intended to be called from RLS policies and triggers, not directly via the API.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;