# RentLord 🏠

A **Property Management Backend API** built with Node.js and Express that allows landlords to manage properties, leases, tenants, and rent payments efficiently.

---

# Overview

RentLord is a backend service designed to simplify property management.
It enables property owners to manage tenants, track leases, generate monthly rent payments automatically, and send payment reminders.

The system includes authentication, role-based access control, scheduled payment generation, and email notifications.

---

# Features

### Authentication & Authorization

* JWT-based authentication
* Refresh token system
* Role-based access control (Admin, Owner, Tenant)

### Property Management

* Create and manage properties
* View property listings
* Property ownership control

### Lease Management

* Assign tenants to properties
* Track lease start and end dates
* Manage rental agreements

### Payment System

* Automatic monthly rent generation
* Payment tracking
* Payment status monitoring (paid/pending)

### Automated Jobs

* Monthly rent generation using scheduled jobs
* Email reminders for pending rent payments

---

# Tech Stack

Backend:

* Node.js
* Express.js

Database:

* MongoDB
* Mongoose

Authentication:

* JSON Web Tokens (JWT)
* Cookies

Validation:

* Zod

Utilities:

* node-cron (scheduled jobs)
* bcrypt (password hashing)
* nodemailer (email notifications)

---

# Project Structure

```
server/
│
├── Config/
│   ├── db.js
│   └── env_export.js
│
├── Controllers/
│   ├── user.controller.js
│   ├── property.controller.js
│   ├── lease.controller.js
│   └── payment.controller.js
│
├── Models/
│   ├── User.model.js
│   ├── Property.model.js
│   ├── Lease.model.js
│   └── Payment.model.js
│
├── Routes/
│   ├── user.route.js
│   ├── property.route.js
│   ├── lease.route.js
│   └── payment.route.js
│
├── Middlewares/
│   ├── auth.middleware.js
│   ├── errorHandle.middleware.js
│   └── reqFormat.middleware.js
│
├── utils/
│   ├── jwt.js
│   ├── sendmail.js
│   ├── paymentGenerator.js
│   └── paymentReminder.js
│
└── app.js
```

---

# Installation

Clone the repository

```
git clone https://github.com/soyabk04/rentlord.git
cd rentlord
```

Install dependencies

```
npm install
```

Create a `.env` file

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FROM_EMAIL=your_email
SENDBIRD_API=your_email_password
```

Start the server

```
npm start
```

The server will run on

```
http://localhost:3000
```

---

# API Endpoints

### Authentication

```
POST /users/signup
POST /users/login
POST /users/logout
```

### Properties

```
POST /property
GET /property
DELETE /property/:propertyId
```

### Leases

```
POST /lease
GET /lease
DELETE /lease/:leaseId
```

### Payments

```
GET /payment
POST /payment/pay
DELETE /payment/:paymentId
```

---

# Scheduled Jobs

RentLord uses scheduled background jobs to automate rent tracking.

Monthly Rent Generation
Automatically creates rent payments on the first day of every month.

Payment Reminder System
Sends reminder emails for pending payments.

---

# Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Role-based authorization
* Request validation with Zod
* Rate limiting middleware

---

# Future Improvements

* API documentation using Swagger
* Pagination for large datasets
* Unit and integration testing
* Deployment configuration
* Frontend dashboard integration

---

# Author

Soyab
Backend Developer

GitHub: https://github.com/soyabk04
LinkedIn: https://www.linkedin.com/in/ken002/

---

# License

This project is licensed under the MIT License.
