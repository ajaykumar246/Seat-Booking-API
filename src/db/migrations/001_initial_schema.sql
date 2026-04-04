CREATE TYPE user_role AS ENUM ('admin', 'customer');
CREATE TYPE seat_status AS ENUM ('available', 'held', 'booked');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

CREATE TABLE IF NOT EXISTS users (
  user_id         SERIAL PRIMARY KEY,
  name            VARCHAR(50) NOT NULL,
  email           VARCHAR(100) UNIQUE NOT NULL,
  hashed_password VARCHAR(300) NOT NULL,
  role            user_role NOT NULL DEFAULT 'customer',
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS concerts (
  concert_id  SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  venue       VARCHAR(100) NOT NULL,
  date        TIMESTAMP NOT NULL,
  created_by  INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seats (
  seat_id     SERIAL PRIMARY KEY,
  concert_id  INTEGER NOT NULL REFERENCES concerts(concert_id) ON DELETE CASCADE,
  seat_no     VARCHAR(10) NOT NULL,
  seat_type   VARCHAR(20) NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  status      seat_status NOT NULL DEFAULT 'available',
  held_by     INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  held_until  TIMESTAMP,
  UNIQUE(concert_id, seat_no)
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id  SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  seat_id     INTEGER NOT NULL REFERENCES seats(seat_id) ON DELETE RESTRICT,
  concert_id  INTEGER NOT NULL REFERENCES concerts(concert_id) ON DELETE RESTRICT,
  booked_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id  SERIAL PRIMARY KEY,
  booking_id  INTEGER NOT NULL REFERENCES bookings(booking_id) ON DELETE RESTRICT,
  amount      DECIMAL(10,2) NOT NULL,
  status      payment_status NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT NOW()
);