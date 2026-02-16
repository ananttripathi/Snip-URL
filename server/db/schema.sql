CREATE TABLE IF NOT EXISTS urls (
  id          SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code  VARCHAR(20) UNIQUE NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW(),
  expires_at  TIMESTAMP
);
