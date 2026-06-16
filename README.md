# 🍱 TiffinHub

A full-stack tiffin service platform connecting home cooks with customers looking for fresh, affordable, homemade meals.

## 🚀 Live Demo

https://tiffin-hub-omega.vercel.app/

## 📖 Overview

TiffinHub bridges the gap between customers seeking home-style food and local home cooks who want to grow their tiffin business.

Users can:

- Register and create accounts
- Login securely using JWT Authentication
- Select their role (Customer or Provider)
- Browse available tiffin services
- Create and manage tiffin listings
- Place food orders
- View order history

Providers can:

- Register as food providers
- Create tiffin services
- Manage listings
- Receive customer orders

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Shadcn UI
- Axios

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database

- PostgreSQL
- Prisma ORM

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality

### User Management

- Customer Accounts
- Provider Accounts
- Role Selection

### Tiffin Management

- Create Tiffin Listings
- Browse Tiffins
- View Provider Details

### Orders

- Place Orders
- View Order History

### Security

- Password Hashing (bcrypt)
- JWT Token Verification
- Protected APIs

---

## 📂 Project Structure

```bash
TiffinHub/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   │
│   ├── prisma/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <https://github.com/RaghavTiwari-7/Tiffin-hub.git>
cd Tiffin-hub
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

---

## 🗄 Database Schema

Core Tables:

- Users
- Providers
- Tiffins
- Orders

---

## 🔐 Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. JWT token generated
4. Token stored on client
5. Protected APIs verify token
6. User accesses authorized routes

---

## 🎯 Future Improvements

- Cloudinary Image Uploads
- Reviews & Ratings
- Search by Location
- Pagination
- Notifications
- Payment Gateway Integration
- Mobile App (React Native)
- Admin Analytics Dashboard

---

## 👨‍💻 Author

**Raghav Tiwari**

- GitHub: https://github.com/RaghavTiwari-7
- LinkedIn: https://www.linkedin.com/in/raghavtiwari07/

---

⭐ If you found this project helpful, consider giving it a star.
