/*
  # Bookings and Contact Messages Tables
  
  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier
      - `from_location` (text) - Departure location
      - `to_location` (text) - Destination location
      - `date` (date) - Travel date
      - `time` (text) - Preferred travel time
      - `passengers` (text) - Number of passengers
      - `customer_name` (text) - Customer full name
      - `customer_email` (text) - Customer email address
      - `customer_phone` (text) - Customer phone number
      - `customer_whatsapp` (text, nullable) - Customer WhatsApp number
      - `notes` (text, nullable) - Additional notes or requests
      - `status` (text) - Booking status (pending, confirmed, completed, cancelled)
      - `created_at` (timestamptz) - When the booking was created
      - `updated_at` (timestamptz) - When the booking was last updated
    
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Sender name
      - `email` (text) - Sender email
      - `message` (text) - Message content
      - `status` (text) - Message status (unread, read, replied)
      - `created_at` (timestamptz) - When the message was created
      - `updated_at` (timestamptz) - When the message was last updated
  
  2. Security
    - Enable RLS on both tables
    - No public read access (admin only)
    - No public write access (only through edge functions using service role)
    
  3. Indexes
    - Index on `created_at` for efficient sorting
    - Index on `status` for filtering
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_location text NOT NULL,
  to_location text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  passengers text NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_whatsapp text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to bookings"
  ON bookings
  FOR ALL
  TO public
  USING (false);

CREATE POLICY "No public access to contact messages"
  ON contact_messages
  FOR ALL
  TO public
  USING (false);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
