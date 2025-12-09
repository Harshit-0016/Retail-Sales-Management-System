import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import salesRoutes from "./routes/salesRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ read frontend origin from env (Render)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",   // local dev
  FRONTEND_ORIGIN           // production frontend (Vercel)
].filter(Boolean);           // remove undefined if env not set

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman, curl, etc. (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

app.use(express.json());

//  check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/sales", salesRoutes);

// DB + Server start
const startServer = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(MONGODB_URI);
    console.log(" DATABASE Connected!!");

    app.listen(PORT, () =>
      console.log(` Server is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
