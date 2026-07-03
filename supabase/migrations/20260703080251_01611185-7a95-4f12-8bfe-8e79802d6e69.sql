
CREATE TABLE public.site_popups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT,
  image_url TEXT,
  cta_label TEXT,
  cta_url TEXT,
  placement TEXT NOT NULL DEFAULT 'center',
  active BOOLEAN NOT NULL DEFAULT true,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  frequency TEXT NOT NULL DEFAULT 'session',
  dismissible BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_popups TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_popups TO authenticated;
GRANT ALL ON public.site_popups TO service_role;

ALTER TABLE public.site_popups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active popups"
  ON public.site_popups FOR SELECT
  USING (
    active = true
    AND (start_at IS NULL OR start_at <= now())
    AND (end_at IS NULL OR end_at >= now())
  );

CREATE POLICY "Admins can view all popups"
  ON public.site_popups FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert popups"
  ON public.site_popups FOR INSERT
  TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update popups"
  ON public.site_popups FOR UPDATE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete popups"
  ON public.site_popups FOR DELETE
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER site_popups_touch
  BEFORE UPDATE ON public.site_popups
  FOR EACH ROW EXECUTE FUNCTION public.touch_contact_info();
