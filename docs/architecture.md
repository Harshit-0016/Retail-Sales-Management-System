# 🏗️ System Architecture Documentation

**Retail Sales Management System — Full-Stack MERN Application**

---

## 📌 1. **Backend Architecture**

The backend follows a **modular, service-oriented architecture** designed for scalability and clean separation of responsibilities.

### **Key Backend Principles**

- **Express.js REST API**
- **MongoDB Aggregation Pipeline** for high-performance queries
- **allowDiskUse(true)** to handle large dataset sorting
- **Centralized query builder** to merge search, filters, sort, and pagination
- **Separate layers**: controllers, services, models, utils
- **Environment-based configuration** using `.env`

---

## **Backend Layers**

### **1. Routes Layer**
- Defines REST API endpoints  
- Parses query parameters  
- Forwards requests to controllers  
- Contains zero business logic  

### **2. Controllers Layer**
- Receives requests from routes  
- Calls service layer functions  
- Handles API-level error responses  
- Returns clean JSON responses  

### **3. Services Layer**
- Core business logic for sales retrieval  
- Implements:
  - Search  
  - Multi-select filters  
  - Sorting  
  - Pagination  
- Uses **MongoDB Aggregation Pipeline** with `allowDiskUse(true)`
- Ensures stable queries even on 7.8+ lakh records  

### **4. Models Layer**
- Defines MongoDB schema using Mongoose  
- Adds indexes for performance:
  - `Date`
  - `Quantity`
  - `Customer Name`  

### **5. Utils Layer**
- Utility helpers  
- `buildSalesQuery()` merges:
  - Search  
  - Filters  
  - Sorting  
  - Pagination  
into a unified MongoDB query object  

---

## 🎨 2. **Frontend Architecture**

The frontend uses **React + Vite + Tailwind CSS**, optimized for reusability, scalable layout, and clean code.

### **Key Frontend Principles**

- Component-based architecture  
- Tailwind CSS for responsive UI  
- API service abstraction layer  
- Dropdown-based filter system  
- Controlled components for reliable state  
- Table wrapped with scroll behavior to avoid layout breaking  

---

## **Main Frontend Components**

- **SearchBar** → Search by name/phone  
- **FiltersToolbar** → Multi-filters & date range  
- **SortDropdown** → Sorting UI  
- **SalesTable** → Scrollable table view  
- **Pagination** → Server-side pagination  
- **SummaryCards** → Page insights (quantity, amount)  
- **Sidebar** → Navigation layout  
- **Topbar** → Profile/notifications  
- **Loader** → For asynchronous loads  

---

## 🔁 3. **Data Flow**

### **1. User Interaction**
User triggers:
- Search  
- Filters  
- Sort  
- Pagination  

### **2. Frontend State Updates**
- React state updates:

- search, filters, sort, page

### **3. API Request**

- Frontend builds the URL using:

- GET /api/sales?search=...&page=...&limit=25&regions=...&sortBy=...

### **4. Backend Request Handling**

- Express route receives request

- Controller forwards to service

- Service calls:

- buildSalesQuery() which returns:

- MongoDB filters

- sort object

- pagination values

### **5. MongoDB Processing**

- Sales data fetched using:

- Sale.aggregate(pipeline).allowDiskUse(true)


**Pipeline applies:**

- $match (filters + search)

- $sort

- $skip

- $limit

### **6. Response Returned**

**Backend returns:**

{
  "items": [...],
  "meta": {
    "page": 1,
    "pageSize": 25,
    "totalItems": 785000,
    "totalPages": 31400
  }
}

### **7. UI Rendering**

**React updates:**

- Table

- Summary Cards

- Pagination UI

- Data remains consistent with filters, search, and sorting.

# 📁 4. Folder Structure
root/ 

│ ├── backend/ # Backend service (Node.js/Express)

     ├── src/ 

      │ ├── controllers/ # Route handlers and request controllers │
      
      │ ├── services/ # Business logic and reusable service functions │ 
      │ ├── utils/ # Helper utilities and common functions │ 
      │├── models/ # Database models (e.g., Mongoose/Sequelize) │ 
      │└── index.js # Entry point for backend server │
      ├── package.json # Backend dependencies and scripts │ 
      └── README.md # Backend-specific documentation │ 
  ├── frontend/ # Frontend service (React/Vite or CRA) │
  
     ├── src/ │ 
     │ ├── components/ # Reusable UI components │
     │ ├── pages/ # Page-level components (routes) │ 
     │ ├── services/ # API calls and external integrations │
     │ ├── utils/ # Helper functions for frontend │
     │ ├── hooks/ # Custom React hooks │ 
     │ ├── styles/ # Global and modular stylesheets │ 
     │ └── main.jsx # Frontend entry point │
     ├── public/ # Static assets (images, icons, etc.) │
     ├── package.json # Frontend dependencies and scripts │ 
     └── README.md # Frontend-specific documentation │ 
   ├── docs/ # Documentation| 
    
    └── architecture.md # System architecture and design notes
