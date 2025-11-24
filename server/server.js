import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN, // optional, set in Vercel if needed
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
app.use(express.json());

// Sentry request handler
app.use(Sentry.Handlers.requestHandler());

// Routes
app.get('/', (req, res) => res.send("API Working"));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Clerk Webhook route
app.post('/webhooks', (req, res) => {
  const signature = req.headers['clerk-signature'];
  if (signature !== process.env.CLERK_WEBHOOK_SECRET) {
    return res.status(401).send("Unauthorized");
  }
  clerkWebhooks(req, res);
});

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
