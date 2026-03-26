ALTER TABLE public.careers
  ADD COLUMN IF NOT EXISTS is_manually_edited boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_deleted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS pending_sync_data jsonb DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sync_approval_status text DEFAULT NULL;