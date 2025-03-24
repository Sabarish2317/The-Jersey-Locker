# The Jersey Locker ⚽

## Overview
The Jersey Locker is an e-commerce platform for football enthusiasts to **browse, buy, and manage jerseys** based on **clubs, national teams, or players**. It features an **admin panel** for managing inventory and uses **Supabase** for authentication and database management.

## Features
### 🛍️ User Features
- Browse jerseys by **clubs, nations, or players**
- **Secure authentication** with OTP login
- Add jerseys to **cart and wishlist**
- Seamless **checkout & order tracking**
- User profile for order history & preferences

### 🛠️ Admin Features
- **Add, delete, or modify jerseys** (price, stock, images, etc.)
- Manage orders & customer queries
- Role-based access control (Admin/User)

### 🔧 Tech Stack
- **Frontend:** React (TypeScript), Tailwind CSS
- **Backend:** Express.js (TypeScript)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (OTP, Google, etc.)
- **File Storage:** GitHub (for assets like images, jersey designs)

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sabarish2317/The-Jersey-Locker.git
cd The-Jersey-Locker
```

### 2️⃣ Install Dependencies
#### **Frontend**
```bash
cd frontend
npm install
```

#### **Backend**
```bash
cd backend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in both `frontend/` and `backend/` directories and add your **Supabase API keys** and other secrets.

#### Backend (`backend/.env`):
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Development Server
#### **Frontend**
```bash
npm run dev
```
#### **Backend**
```bash
npm run dev
```

API Endpoints

Auth

POST /auth/signup - Register a new user

POST /auth/login - User login

POST /auth/otp-verify - OTP authentication

Jerseys

GET /jerseys - Fetch all jerseys

GET /jerseys/:id - Fetch a jersey by ID

POST /jerseys - Add a new jersey (Admin only)

PUT /jerseys/:id - Update jersey details (Admin only)

DELETE /jerseys/:id - Remove a jersey (Admin only)

Orders

POST /orders - Create an order

GET /orders/:userId - Get user orders

Admin

GET /admin/orders - View all orders (Admin only)

GET /admin/users - View all users (Admin only)

### 5️⃣ Deploying
- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render / Supabase Edge Functions

## 🛠️ Contributing
Feel free to submit pull requests or open issues. Contributions are welcome! 🏆

## 📜 License
This project is licensed under the **MIT License**.

