import mongoose, { Schema } from "mongoose";

const classCourseSchema = new Schema({
  number: {
    type: Number,

    require: true,
  },
  title: {
    type: String,

    require: true,
  },
  video: {
    type: String,
  },
  description: {
    type: String,
  },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
});

const classCourse = mongoose.model("classCourse", classCourseSchema);

export default classCourse;
