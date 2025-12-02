import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
// ❌ REMOVE clerkMiddleware import

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const app = express();

// Connect DB
await connectDB();
await connectCloudinary();

// CORS
app.use(cors());

// Clerk webhook (only here — raw body required)
app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/company", companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("API Working"));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  Sentry.captureException(err);
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
