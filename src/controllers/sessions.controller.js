import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/User.dto.js";

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    const exists = await usersService.getUserByEmail(email);
    if (exists)
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    const hashedPassword = await createHash(password);
    const user = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    let result = await usersService.create(user);
    console.log(result);
    res.send({ status: "success", payload: result._id });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: "Error creating user",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  const user = await usersService.getUserByEmail(email);
  if (!user)
    return res
      .status(404)
      .send({ status: "error", error: "User doesn't exist" });
  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword)
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect password" });
  const userDto = UserDTO.getUserTokenFrom(user);
  const token = jwt.sign(userDto, "tokenSecretJWT", { expiresIn: "1h" });
  res
    .cookie("coderCookie", token, {
      httpOnly: true, // 🔐 la protege del acceso JS
      secure: false, // 🔐 poner en true si usás HTTPS
      sameSite: "lax", // 🔄 controla envío automático (usa "none" si usás HTTPS y dominios distintos)
      maxAge: 3600000,
    })
    .send({ status: "success", message: "Logged in" });
};

const current = async (req, res) => {
  try {
    const cookie = req.cookies["coderCookie"];

    if (!cookie) {
      return res
        .status(401)
        .send({ status: "error", error: "No token provided" });
    }

    const user = jwt.verify(cookie, "tokenSecretJWT");

    res.send({ status: "success", payload: user });
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).send({ status: "error", error: "Unauthorized" });
  }
};

const unprotectedLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  const user = await usersService.getUserByEmail(email);
  if (!user)
    return res
      .status(404)
      .send({ status: "error", error: "User doesn't exist" });
  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword)
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect password" });

  const userData = user.toObject ? user.toObject() : user;
  const payload = {
    _id: userData._id,
    email: userData.email,
  };

  const token = jwt.sign(payload, "tokenSecretJWT", { expiresIn: "1h" });
  res
    .cookie("unprotectedCookie", token, { maxAge: 3600000 })
    .send({ status: "success", message: "Unprotected Logged in" });
};
const unprotectedCurrent = async (req, res) => {
  try {
    const cookie = req.cookies["unprotectedCookie"];

    if (!cookie) {
      return res
        .status(401)
        .send({ status: "error", error: "No token provided" });
    }

    const user = jwt.verify(cookie, "tokenSecretJWT");
    res.send({ status: "success", payload: user });
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).send({ status: "error", error: "Unauthorized" });
  }
};

export default {
  current,
  login,
  register,
  current,
  unprotectedLogin,
  unprotectedCurrent,
};
