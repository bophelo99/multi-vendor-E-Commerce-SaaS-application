import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
//import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import axios from "axios";
import cookieParser from "cookie-parser";
import { error } from "console";
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  allowedHeaders: [ "Authorization", "Content-Type"],
  credentials: true,
}));

app.use(morgan("dev")); // HTTP request logger
app.use(express.json({ limit: "100mb" })); // Json data limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Urlencoded data limit, extended true for rich objects and arrays
app.use(cookieParser()); // Parse Cookie header and populate req.cookies
app.set("trust proxy", 1); // Trust first proxy

// Rate Limiter Setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req:any) => (req.user ? 1000 : 100), // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: true,
  //keyGenerator: (req: any) => req.ip,  //add limit based on IP address
  keyGenerator: (req: any) => ipKeyGenerator(req),  //add limit based on IP address, ensures proper IPv6 handling
});

app.use(limiter);

app.get("/gateway-health", (req, res) => {
  res.send({ message: "Welcome to api-gateway!" });
});

app.use("/", proxy("http://localhost:6001")); // Proxy to user-service

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
