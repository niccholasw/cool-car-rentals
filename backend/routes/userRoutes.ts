import { Router } from "express";
import { getUser, createUser, loginUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getUser);

userRoutes.post("/", createUser);

userRoutes.post("/login", loginUser);

export default userRoutes;
