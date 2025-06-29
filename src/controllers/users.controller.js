import { usersService } from "../services/index.js";

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await usersService.create(userData);

    res.status(201).send({
      status: "success",
      message: "User created",
      payload: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error); // <--- IMPORTANTE
    res.status(500).send({
      status: "error",
      message: "Failed to create user",
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();
  res.send({ status: "success", payload: users });
};

const getUser = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  res.send({ status: "success", payload: user });
};

const updateUser = async (req, res) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  const result = await usersService.update(userId, updateBody);
  res.send({ status: "success", message: "User updated" });
};

const deleteUser = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  await usersService.delete(userId);
  res.send({ status: "success", message: "User deleted" });
};

export default {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
