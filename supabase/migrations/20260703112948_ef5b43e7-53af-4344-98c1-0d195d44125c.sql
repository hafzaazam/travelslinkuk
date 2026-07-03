
CREATE POLICY "Admins manage blog-images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'blog-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Anyone can read blog-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'blog-images');
