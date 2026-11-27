REVOKE ALL PRIVILEGES ON TABLE public.contact_submissions FROM anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE public.contact_submissions TO service_role;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING ((SELECT public.has_role((SELECT auth.uid()), 'admin'::public.app_role)));