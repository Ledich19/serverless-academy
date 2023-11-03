create TABLE person (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  refreshToken VARCHAR(255)
);