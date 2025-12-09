# Retail Sales Management System – Backend (Node + Express)

This backend powers the Retail Sales Management System.  
It provides REST APIs for managing sales data, connecting to MongoDB with Mongoose, and handling CORS for both local development and production (Vercel + Render).

Built with:

- [Express](https://expressjs.com/) – HTTP server & routing
- [Mongoose](https://mongoosejs.com/) – MongoDB ODM
- [cors](https://github.com/expressjs/cors) – CORS handling
- [dotenv](https://github.com/motdotla/dotenv) – environment variables

---

## Features

- Sales CRUD APIs (`/api/sales`)
- MongoDB integration with Mongoose
- Environment-based configuration
- CORS configured for:
  - Local frontend (`http://localhost:5173`)
  - Deployed frontend (Vercel)
- Health check endpoint (`/health`) for monitoring / deployment checks

---
