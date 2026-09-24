CREATE TABLE public.invitation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event_type text NOT NULL,
  template text NOT NULL,
  event_name text NOT NULL,
  host_name text NOT NULL,
  event_date date NOT NULL,
  event_time text NOT NULL,
  venue text NOT NULL,
  address text,
  maps_url text,
  dress_code text,
  description text,
  schedule text,
  media_paths jsonb NOT NULL DEFAULT '{}'::jsonb,
  rsvp_settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  package text NOT NULL,
  client_name text NOT NULL,
  client_phone text NOT NULL,
  client_email text NOT NULL,
  status text NOT NULL DEFAULT 'new'
);
GRANT ALL ON public.invitation_requests TO service_role;
ALTER TABLE public.invitation_requests ENABLE ROW LEVEL SECURITY;