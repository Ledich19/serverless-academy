create TABLE links (
  id serial PRIMARY KEY,
  "shortLink" VARCHAR(255) NOT NULL,
  "longLink" TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);