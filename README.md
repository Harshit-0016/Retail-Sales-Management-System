### 🛒 Retail Sales Management System

A full-stack MERN application designed to manage and visualize large-scale retail sales data (7.8+ lakh records).
This system includes advanced Search, Multi-Filtering, Sorting, Pagination, and a clean professional UI based on Tailwind CSS.
Built to replicate production-grade engineering workflows, ensuring scalability, modularity, and clean code practices.

## 🚀 Tech Stack

# Frontend

- React (Vite)

- Tailwind CSS

- Reusable UI Components (Dropdowns, Table, Cards, Pagination)

- API Service Layer

# Backend

- Node.js + Express.js

- MongoDB (Mongoose)

- Aggregation Pipeline + allowDiskUse(true)

- Modular Architecture (Controllers, Services, Utils)

- Dev Tools

- Nodemon

- dotenv

# 🔍 Search Implementation Summary

# Search supports:

- Customer Name (case-insensitive)

- Phone Number

- Implementation:

- Frontend sends ?search=<term> to backend

- Backend applies case-insensitive regex using:

- { $regex: searchTerm, $options: "i" }

- Works seamlessly with sorting, filters, and pagination

- Optimized to avoid unnecessary queries

# 🎯 Filter Implementation Summary

**Filters include:**

- Customer Region (multi-select)

- Gender (multi-select)

- Age Range (min-max)

- Product Category (multi-select)

- Payment Method (multi-select)

- Tags (comma separated)

- Date Range (start-end)

**Implementation:**

- All filters passed as query params

- Centralized backend utility buildSalesQuery() merges them

- MongoDB $match created dynamically

- Filters combine correctly and independently

- No conflicts with search or sorting

# 🔄 Sorting Implementation Summary

**Sorting supports:**

- Date (Newest First)

- Quantity

- Customer Name (A–Z)

- Ascending / Descending

# Backend Implementation:


**📄 Pagination Implementation Summary**

- Pagination uses server-side logic:

- Default: 25 records per page

- Query params: ?page=1&limit=25

**Backend returns metadata:**

{
"page": 1,
"pageSize": 25,
"totalItems": 785000,
"totalPages": 31400
}

**Features:**

- Stable with filters, sorting, and search

- Frontend smooth scroll to top on page change

- Automatically handles out-of-range pages

- Table wrapped in scroll container to avoid layout breaking

# 🛠️ Setup Instructions
### 1️⃣ Clone the Repository
git clone https://github.com/<your-username>/Retail-Sales-Management-System.git

cd Retail-Sales-Management-System

### 2️⃣ Backend Setup
cd backend
npm install

Create .env file:

MONGODB_URI=your-mongodb-uri

Start backend:

npm run dev

### 3️⃣ Frontend Setup
cd ../frontend
npm install

Create .env:

VITE_API_BASE_URL=http://localhost:8080/api

Start frontend:

npm run dev

### 4️⃣ URLs
Service URL
Frontend http://localhost:5173

Backend Health http://localhost:8080/health

Sales API http://localhost:8080/api/sales

### 5️⃣ Deployment Build

**Frontend:**

- cd frontend

- npm run build

**Backend:**

- cd backend

- npm run build
