import express from "express";
import {
  create,
  deleteCourse,
  getAll,
  getOneById,
  updateCourse,
} from "../controllers/CourseController.js";

import { verifyToken } from "../controllers/UserController.js";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOneById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
