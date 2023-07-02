import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
