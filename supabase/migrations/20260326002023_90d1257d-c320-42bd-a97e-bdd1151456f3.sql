CREATE POLICY "Anon can read active careers"
ON public.careers
FOR SELECT
TO anon
USING (is_active = true);