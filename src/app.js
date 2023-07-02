import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import CourseRouter from "./routes/course.js";
import ClassCourseRouter from "./routes/classCourse.js";
import UserRouter from "./routes/user.js";
// import VideosRouter from "./routes/videos.js";
import multer from "multer";
import mimeTypes from "mime-types";
//FTP
import FTPClient from "ftp";
import fs from "fs";

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "Hello API prisma" });
});

//Middleware
app.use(express.json());

app.use("/course", CourseRouter);
app.use("/class", ClassCourseRouter);
app.use("/user", UserRouter);

//videos
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const filename = Date.now() + "." + mimeTypes.extension(file.mimetype);
    cb(null, filename);
    //cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
    req.filename = filename;
  },
});

const upload = multer({
  storage: storage,
});

app.post("/videos", upload.single("file"), (req, res) => {
  const filename = req.filename;
  const ftp = new FTPClient();

  ftp.on("ready", () => {
    ftp.put(req.file.path, "/public_html/videos/" + filename, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al subir el archivo");
      } else {
        fs.unlinkSync(req.file.path); // Elimina el archivo temporal después

        res.send(filename);
      }
      ftp.end(); // Cierra la conexión FTP después de la subida del archivo
    });
  });
  ftp.connect({
    host: "31.170.161.113",
    port: 21, // Puerto estándar de FTP
    user: "u938646764.luz.academy",
    password: "Nic0las31",
  });
});

export default app;
