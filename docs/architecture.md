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
React updates:
