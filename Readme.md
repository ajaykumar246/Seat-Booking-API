# Seat Booking System API

This repository contains the architecture, database schema, and API specifications for a Concert Seat Booking System.

##  System Flow

### Basic Booking Flow
1. **User** requests to book a seat.
2. **System** checks availability in the **Database**.
3. If available, the seat is booked. Otherwise, the booking fails.

### Request Lifecycle
When a request hits a route, it follows this execution path:
* **Route** * ➔ **Middleware** (Auth check)
    * ➔ **Controller** (Extracts data)
      * ➔ **Service** (Executes business logic)
        * ➔ **DB Layer** (Runs the query)
      * ➔ **Service** (Returns result)
    * ➔ **Controller** (Sends response)

---

## 🗄️ Database Schema

*Note: Dynamically creating a new table for each concert (e.g., `concert_db`) is an anti-pattern. The schema below uses a unified relational approach to store all concert data efficiently.*

### `users`
* `user_id` (Unique/Primary Key)
* `name`
* `email`
* `hashed_password`
* `role` (Admin, User)
* `created_at`

### `concerts`
* `concert_id` (Primary Key)
* `name`
* `description`
* `venue`
* `date`
* `created_at`
* `created_by` (Foreign Key -> `users.user_id` [Admin])

### `seats`
*(Bulk seat rows are created by default when a concert is created)*
* `seat_id` (Unique/Primary Key)
* `concert_id` (Foreign Key)
* `seat_no`
* `type` (Floor, Balcony, VIP)
* `price`
* `status` (Available, Held, Booked)
* `held_by` (Foreign Key -> `users.user_id`)

### `bookings`
* `booking_id` (Primary Key)
* `user_id`
* `seat_id`
* `concert_id`
* `booked_at`

### `payments`
* `payment_id` (Primary Key)
* `booking_id`
* `amount`
* `status`
* `created_at`

### 🔗 Relationships
* `concerts.created_by` ➔ `users.user_id`
* `bookings.concert_id` ➔ `concerts.concert_id`

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/register` | Register a new user |
| **POST** | `/login` | User login |
| **POST** | `/logout` | User logout |

### Concerts (Admin & Public)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/concerts` | Admin creates a new concert |
| **GET** | `/concerts` | List all concerts |
| **GET** | `/concerts/:id` | View single concert details |
| **PATCH** | `/concerts/:id` | Admin edits concert details |
| **DELETE** | `/concerts/:id` | Admin deletes a concert |

### Seats
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/concerts/:id/seats` | List seats for a specific concert |
| **DELETE** | `/seats/:id` | Admin deletes a specific seat |

### Bookings & Payments (Customer)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/bookings` | Customer holds a seat |
| **GET** | `/bookings` | Customer views their bookings |
| **POST** | `/bookings/:id/pay` | Customer pays for a held booking |

---

## 🛡️ Middlewares

* **`Authentication`**: Checks if the user is valid using a JWT (JSON Web Token).
* **`requireAdmin`**: Checks whether the authenticated user has Admin privileges before allowing access to restricted routes.