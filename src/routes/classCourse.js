import express from "express";
import {
  createClass,
  getAllClass,
  getClassByCourse,
} from "../controllers/ClassCourseController.js";

const router = express.Router();

router.post("/", createClass);
router.get("/", getAllClass);
router.get("/:id", getClassByCourse);

export default router;
