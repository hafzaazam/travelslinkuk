
-- Tighten anonymous bookings INSERT policy with input validation
DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;

CREATE POLICY "Anyone can submit a booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 120
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(email) <= 255
  AND (phone IS NULL OR length(phone) <= 40)
  AND (service IS NULL OR length(service) <= 200)
  AND (preferred_time IS NULL OR length(preferred_time) <= 40)
  AND (message IS NULL OR length(message) <= 5000)
  AND payment_method IN ('direct','bank_transfer')
  AND (transaction_reference IS NULL OR length(transaction_reference) <= 120)
  AND (currency IS NULL OR length(currency) <= 8)
  AND (amount IS NULL OR (amount >= 0 AND amount <= 1000000))
  AND payment_status IN ('pending','unpaid','paid')
  AND booking_status IN ('pending','new')
  AND admin_notes IS NULL
);

-- Split booking_settings public exposure: keep table admin-only for sensitive fields,
-- expose only safe fields to public via a view.
DROP POLICY IF EXISTS "Anyone can view booking settings" ON public.booking_settings;

CREATE POLICY "Admins can view booking settings"
ON public.booking_settings
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

-- Public-safe view (no bank details)
CREATE OR REPLACE VIEW public.booking_settings_public
WITH (security_invoker = true) AS
SELECT id, active, consultation_fee, currency, reference_prefix, payment_notes, updated_at
FROM public.booking_settings;

GRANT SELECT ON public.booking_settings_public TO anon, authenticated;

-- Secure function to expose bank details ONLY when booking system is active
CREATE OR REPLACE FUNCTION public.get_active_bank_details()
RETURNS TABLE (
  bank_name text,
  account_name text,
  account_number text,
  sort_code text,
  iban text,
  swift text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT bank_name, account_name, account_number, sort_code, iban, swift
  FROM public.booking_settings
  WHERE active = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_active_bank_details() TO anon, authenticated;
