import Course from "../models/course.js";
import Database from "../config/database.js";

export const create = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
    database.disconnect();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAll = async (req, res) => {
  const database = new Database();
  await database.connect();
  try {
    const courses = await Course.find();

    if (courses) return res.json(courses);
    await database.disconnect();
    return res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// http://localhost:3001/recipe/:key/:value
export const getOneById = async (req, res) => {
  console.log("base conectada");
  const { id } = req.params;
  try {
    const database = new Database();
    await database.connect();
    const courses = await Course.findById(id);
    if (!courses) return res.status(204);
    res.status(200).json(courses);
    // database.disconnect();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const database = new Database();
    await database.connect();
    let course = await Course.findById(id);
    course = Object.assign(course, req.body);
    const newCourse = await course.save();
    res.json(newCourse);
    database.disconnect();
  } catch (error) {
    res.status(400).json({ error: "Curso no encontrado" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const database = new Database();
    await database.connect();
    let course = await Course.findById(id);

    const deleted = await course.deleteOne();
    res.json(deleted);
    database.disconnect();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
