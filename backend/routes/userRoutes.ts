import { Router } from "express";
import { getUser, createUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getUser);

userRoutes.post("/", createUser);

export default userRoutes;