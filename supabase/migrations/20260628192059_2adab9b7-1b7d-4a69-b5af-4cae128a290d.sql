
-- Restrict has_role execution to definer only (used by RLS, not directly)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

-- Tighten contact INSERT policy with basic validation
DROP POLICY "Anyone can submit a contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit a contact form"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 100
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(email) <= 255
    AND length(trim(message)) BETWEEN 1 AND 5000
    AND (phone IS NULL OR length(phone) <= 40)
    AND (subject IS NULL OR length(subject) <= 200)
    AND status = 'new'
  );

-- Tighten newsletter INSERT policy
DROP POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(email) <= 255
    AND unsubscribed = false
  );
