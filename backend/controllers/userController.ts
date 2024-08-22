import { Request, Response } from "express";
import { UserModel } from "../models/userSchema";

const getUser = async (req: Request, res: Response) => {
	res.send("Hello from the user controller!");
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { email, username, password } = req.body;
		const user = new UserModel({ email, username, password });
		await user.save();
		res.status(201).send("User created!");
	} catch (error: any) {
		if (error.code === 11000) {
			res.status(400).send("Username already exists!");
		} else {
			console.error("Error:", error);
			res.status(500).send("Internal server error");
		}
	}
};

export { getUser, createUser };
