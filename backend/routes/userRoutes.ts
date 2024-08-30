import { Router } from "express";
import { getUser, createUser, loginUser, deleteUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getUser);

userRoutes.post("/", createUser);

userRoutes.post("/login", loginUser);

userRoutes.delete("/delete", deleteUser);

export default userRoutes;
