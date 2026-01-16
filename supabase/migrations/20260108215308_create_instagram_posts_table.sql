/*
  # Instagram Posts Table
  
  1. New Tables
    - `instagram_posts`
      - `id` (uuid, primary key) - Unique identifier for the post record
      - `instagram_id` (text, unique) - Instagram post ID
      - `media_type` (text) - Type of media (IMAGE, VIDEO, CAROUSEL_ALBUM)
      - `media_url` (text) - URL to the media file
      - `thumbnail_url` (text, nullable) - Thumbnail URL for videos
      - `permalink` (text) - Permanent link to the Instagram post
      - `caption` (text, nullable) - Post caption
      - `timestamp` (timestamptz) - When the post was published on Instagram
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated
  
  2. Security
    - Enable RLS on `instagram_posts` table
    - Add policy for public read access (social feed is public)
    
  3. Indexes
    - Index on `timestamp` for efficient sorting
    - Index on `instagram_id` for fast lookups
*/

CREATE TABLE IF NOT EXISTS instagram_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_id text UNIQUE NOT NULL,
  media_type text NOT NULL,
  media_url text NOT NULL,
  thumbnail_url text,
  permalink text NOT NULL,
  caption text,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access (social feed is meant to be public)
CREATE POLICY "Anyone can view Instagram posts"
  ON instagram_posts
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_instagram_posts_timestamp ON instagram_posts(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_instagram_id ON instagram_posts(instagram_id);
