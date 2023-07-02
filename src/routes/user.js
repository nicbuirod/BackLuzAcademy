import express from "express";
import { create } from "../controllers/UserController.js";
import { login } from "../controllers/UserController.js";
import { generateToken } from "../controllers/UserController.js";
import { addCourse } from "../controllers/UserController.js";
import { getCoursesOfUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/", create);
router.post("/login", login, generateToken);
router.put("/:id", addCourse);
router.get("/:id", getCoursesOfUser);

export default router;
