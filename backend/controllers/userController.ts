import { Request, Response } from "express";
import { UserModel } from "../models/userSchema";

const getUser = async (req: Request, res: Response) => {
	res.send("Hello from the user controller!");
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { email, username, password } = req.body;
		const user = new UserModel({ email, username, password });
		const userExists = await UserModel.findOne({ email: email });
		if (userExists) {
			res.status(400).send("Email already exists!");
			return;
		}
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

const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({
			username,
			password,
		});
		if (user) {
			res.status(200).send("Login successful!");
		} else {
			res.status(401).send("Invalid credentials");
		}
	} catch (error: any) {
		console.error("Error:", error);
		res.status(500).send("Internal server error");
	}
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.status(200).send("User successfully deleted!")
  } catch (error: any) {
    console.error("Error: " + error);
    res.send("Error.")
  }
}

export { getUser, createUser, loginUser, deleteUser };
