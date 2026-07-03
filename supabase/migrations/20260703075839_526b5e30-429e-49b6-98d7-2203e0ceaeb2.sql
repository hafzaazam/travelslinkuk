
CREATE TABLE public.contact_info (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE,
  address TEXT NOT NULL DEFAULT '',
  map_query TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone_display TEXT NOT NULL DEFAULT '',
  phone_e164 TEXT NOT NULL DEFAULT '',
  whatsapp_e164 TEXT NOT NULL DEFAULT '',
  hours TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT contact_info_singleton CHECK (id = TRUE)
);

GRANT SELECT ON public.contact_info TO anon, authenticated;
GRANT INSERT, UPDATE ON public.contact_info TO authenticated;
GRANT ALL ON public.contact_info TO service_role;

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact info"
  ON public.contact_info FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert contact info"
  ON public.contact_info FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update contact info"
  ON public.contact_info FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.touch_contact_info()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER contact_info_touch
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW EXECUTE FUNCTION public.touch_contact_info();

INSERT INTO public.contact_info (id, address, map_query, email, phone_display, phone_e164, whatsapp_e164, hours)
VALUES (
  TRUE,
  '138 Milton Street, Northampton, NN2 7DE',
  '138 Milton Street, Northampton, NN2 7DE',
  'contact@travellinks.uk',
  '+44 787 946 5341',
  '+447879465341',
  '447879465341',
  'Mon–Fri 9:00–18:00'
);
