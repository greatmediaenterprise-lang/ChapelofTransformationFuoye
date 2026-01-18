-- Drop existing restrictive SELECT policies on users table
DROP POLICY IF EXISTS "Users can only read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;

-- Create a proper permissive SELECT policy
CREATE POLICY "Users can only read their own data"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);