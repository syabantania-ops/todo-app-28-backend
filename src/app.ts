import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Route utama — cek apakah server berjalan
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Todo Praktikum Berjalan Mulus!",
  });
});

// Daftarkan semua route dengan prefix /api
app.use("/api", routes);

// 404 Handler — dipanggil jika tidak ada route yang cocok
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} tidak ditemukan!`,
  });
});

// Global Error Handler — menangkap error yang tidak tertangani
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Terjadi error:", err.message);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
);

export default app;