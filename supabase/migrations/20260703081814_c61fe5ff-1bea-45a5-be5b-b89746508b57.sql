
CREATE TABLE public.booking_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  active BOOLEAN NOT NULL DEFAULT false,
  consultation_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'GBP',
  bank_name TEXT,
  account_name TEXT,
  account_number TEXT,
  sort_code TEXT,
  iban TEXT,
  swift TEXT,
  reference_prefix TEXT DEFAULT 'TL',
  payment_notes TEXT,
  singleton BOOLEAN NOT NULL DEFAULT true UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.booking_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.booking_settings TO authenticated;
GRANT ALL ON public.booking_settings TO service_role;
ALTER TABLE public.booking_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view booking settings" ON public.booking_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert booking settings" ON public.booking_settings FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update booking settings" ON public.booking_settings FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete booking settings" ON public.booking_settings FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  message TEXT,
  payment_method TEXT NOT NULL DEFAULT 'direct' CHECK (payment_method IN ('direct','bank_transfer')),
  transaction_reference TEXT,
  transaction_date DATE,
  amount NUMERIC(10,2),
  currency TEXT DEFAULT 'GBP',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','verified','rejected','not_required')),
  booking_status TEXT NOT NULL DEFAULT 'new' CHECK (booking_status IN ('new','confirmed','cancelled','completed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view bookings" ON public.bookings FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update bookings" ON public.bookings FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete bookings" ON public.bookings FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.touch_bookings()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER trg_booking_settings_touch BEFORE UPDATE ON public.booking_settings FOR EACH ROW EXECUTE FUNCTION public.touch_bookings();
CREATE TRIGGER trg_bookings_touch BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.touch_bookings();

INSERT INTO public.booking_settings (active, consultation_fee, currency, reference_prefix)
VALUES (false, 50, 'GBP', 'TL') ON CONFLICT DO NOTHING;
