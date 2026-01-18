-- Drop existing restrictive SELECT policy on transactions table
DROP POLICY IF EXISTS "Users can read own transactions" ON public.transactions;

-- Create a proper permissive SELECT policy
CREATE POLICY "Users can read own transactions"
ON public.transactions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);