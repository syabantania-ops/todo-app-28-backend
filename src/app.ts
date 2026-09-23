import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { randomUUID } from "crypto";
import { sendSuccess, sendError } from "./utils/response.js";

const app = express();

app.use(cors({ exposedHeaders: ["X-Request-Id"] }));
app.use(express.json());

app.use((req, res, next) => {
  const requestId = randomUUID();
  res.locals.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
});

app.use((req, res, next) => {
  console.log(`[${res.locals.requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  sendSuccess(res, "Backend Todo Praktikum Berjalan Mulus!");
});

app.use("/api", routes);

app.use((req: Request, res: Response) => {
  sendError(res, `Route ${req.method} ${req.url} tidak ditemukan!`, 404);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Terjadi error:", err.message);
  sendError(res, "Terjadi kesalahan pada server.", 500);
});

export default app;