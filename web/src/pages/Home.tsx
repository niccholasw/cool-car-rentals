import axios from "axios";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [labelVisible, setLabelVisible] = useState<boolean>(false); // Control visibility

	async function registerUser() {
		try {
			const User = { email: email, username: name, password: password };
			await axios.post("http://localhost:5000/api/user/", User);

			// Clear the text fields by resetting the state variables
			setEmail("");
			setName("");
			setPassword("");

			setLabelVisible(true);
		} catch (error: any) {
			console.error(error);
		}
	}

	return (
		<div className="flex flex-col gap-4 mx-2">
			<h2 className="text-3xl">Home Page</h2>
			<label>Email: </label>
			<input
				type="email"
				name="emailInput"
				className="bg-black text-white w-96"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label>Username: </label>
			<input
				type="text"
				name="usernameInput"
				className="bg-black text-white w-96"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label>Password: </label>
			<input
				type="password"
				name="passwordInput"
				className="bg-black text-white w-96"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				className="bg-blue-500 text-white p-2 rounded w-24"
				onClick={registerUser}>
				Enter
			</button>
			<label
				className="text-green-600"
				style={{ display: labelVisible ? "block" : "none" }}>
				Success, redirecting now!
			</label>
		</div>
	);
}
