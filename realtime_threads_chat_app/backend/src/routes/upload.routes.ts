import { Request, Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export const uploadRouter = Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

uploadRouter.post(
  "/image-upload",
  upload.single("file"),
  async (req: Request, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const url = `/uploads/${req.file.filename}`;

      return res.status(200).json({
        url,
        width: 800, // Default values since we're not processing images
        height: 600,
      });
    } catch (err) {
      next(err);
    }
  }
);
