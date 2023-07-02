import classCourse from "../models/classCourse.js";
import Database from "../config/database.js";

export const createClass = async (req, res) => {
  try {
    const database = new Database();
    await database.connect();
    const courseClass = new classCourse(req.body);
    await courseClass.save();
    res.status(201).json(courseClass);
    database.disconnect();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllClass = async (req, res) => {
  const database = new Database();
  await database.connect();
  try {
    const courseClass = await classCourse.find().populate("course");
    await database.disconnect();
    if (courseClass) return res.json(courseClass);

    return res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getClassByCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const database = new Database();
    await database.connect();
    const courses = await classCourse.find({
      course: id,
    });
    if (!courses) return res.status(204);
    res.status(200).json(courses);
    database.disconnect();
  } catch (error) {
    res.status(500).json(error);
  }
};
