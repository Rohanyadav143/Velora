import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Initialize Express
const app = express();

// Connect to MongoDB
try {
  await connectDB();
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}

// Middlewares
app.use(cors());

// ❗ MUST BE RAW FOR CLERK WEBHOOKS
app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  (req, res) => {
    clerkWebhooks(req, res);
  }
);

// After webhook: JSON parser
app.use(express.json());

// Sentry test
app.use((req, res, next) => {
  Sentry.captureMessage("Request received");
  next();
});

// Routes
app.get('/', (req, res) => res.send("API Working"));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

// Sentry error handler
app.use((err, req, res, next) => {
  console.error(err);
  Sentry.captureException(err);
  res.status(500).send({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
