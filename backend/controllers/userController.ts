import { Request, Response } from "express";
import { UserModel } from "../models/userSchema";

const getUser = async (req: Request, res: Response) => {
  res.send("Hello from the user controller!");
}

const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = new UserModel({ username, password });
  await user.save();
  res.send("User created!");
}

export { getUser, createUser };