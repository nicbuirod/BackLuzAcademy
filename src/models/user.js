import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    required: true,

    validate: [
      {
        validator: function (value) {
          return value.length >= 8;
        },
        message: "La contraseña debe tener al menos 8 caracteres.",
      },
      {
        validator: function (value) {
          return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value);
        },
        message: "La contraseña debe contener al menos una letra y un número.",
      },
    ],
  },
  admin: {
    type: Boolean,

    require: true,
  },
  course: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
