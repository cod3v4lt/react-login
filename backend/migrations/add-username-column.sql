-- Add username column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);