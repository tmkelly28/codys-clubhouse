CREATE TABLE invites(
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  party TEXT NOT NULL,
  going BOOLEAN NOT NULL,
  message TEXT
)
