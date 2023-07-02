import User from "../models/user.js";
import Database from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  const { email, password, admin } = req.body;
  try {
    const database = new Database();
    await database.connect();

    const hash = bcrypt.hashSync(password, 12);
    const user = new User({ email, password: hash, admin });

    await user.save();
    res.status(201).json(user);
    database.disconnect();
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email
    ) {
      res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado." });
    } else {
      res.status(500).json({ error: "Error de servidor" });
    }
  }
};

// generate token
export const generateToken = (req, res) => {
  try {
    const user = req.user;

    const objectId = user._id;
    const code = objectId.toString();

    const payload = { ...user };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token, admin: user.admin, code });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//middleware login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const database = new Database();
    await database.connect();

    const user = await User.findOne({ email: email }).select("+admin");

    if (!user) {
      return res.status(401).json("User or password is not valid");
    }

    const isValidUser = bcrypt.compareSync(password, user.password);
    if (isValidUser) {
      req.user = user;
      next();
    } else {
      res.status(401).json("user o password is not valid");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//middleware verify token
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    const { exp: expDate } = decoded;
    //expired?
    if (Date.now() / 1000 > expDate) {
      console.log("expired");
      res.status(401).send();
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send();
  }
};

//add course to user

export const addCourse = async (req, res) => {
  const { id } = req.params;
  const newCourse = req.body.course;
  console.log(id);
  console.log(newCourse);

  try {
    const database = new Database();
    await database.connect();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { course: newCourse } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(updatedUser);
    database.disconnect();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el curso del usuario" });
  }
};

//get courses of user

export const getCoursesOfUser = async (req, res) => {
  const { id } = req.params;
  try {
    const database = new Database();
    await database.connect();
    const user = await User.findById(id);
    if (!user) return res.status(204);
    res.status(200).json(user.course);
    //database.disconnect();
  } catch (error) {
    res.status(500).json(error);
  }
};
