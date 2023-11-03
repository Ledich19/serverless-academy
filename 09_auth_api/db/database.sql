CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create TABLE person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  "passwordHash" VARCHAR(255) NOT NULL,
  "refreshToken" VARCHAR(255)
);