import axios from "axios";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [labelText, setLabelText] = useState<string>(""); // State to hold the label text
	const [labelVisible, setLabelVisible] = useState<boolean>(false); // Control label visibility
	const [labelColor, setLabelColor] = useState<string>("text-white"); // State for label color

	function successLabel() {
		setLabelText("Successfully created user, redirecting now!");
		setLabelColor("green-600");
		setLabelVisible(true);

		setEmail("");
		setName("");
		setPassword("");
	}

	function errorLabel(error: any) {
		console.error(error.code);
		setLabelText("Error, could not create user. See error code: " + error.code);
		setLabelColor("red-600");
		setLabelVisible(true);

		setTimeout(() => {
			setLabelVisible(false);
		}, 5000);
	}

	async function registerUser() {
		try {
			const User = { email: email, username: name, password: password };
			await axios.post("http://localhost:5000/api/user/", User);
			successLabel();
		} catch (error: any) {
			errorLabel(error);
		}
	}

	return (
		<div className="flex flex-col gap-4 mx-2">
			<h2 className="text-3xl">Home Page</h2>
			<label>Email: </label>
			<input
				type="email"
				name="emailInput"
				placeholder="Enter email"
				className="bg-black text-white w-96"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label>Username: </label>
			<input
				type="text"
				name="usernameInput"
				placeholder="Enter username"
				className="bg-black text-white w-96"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label>Password: </label>
			<input
				type="password"
				name="passwordInput"
				placeholder="Enter password"
				className="bg-black text-white w-96"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				className="bg-blue-500 text-white p-2 rounded w-24"
				onClick={registerUser}>
				Enter
			</button>
			{labelVisible && (
				<label className={`${labelColor} text-xl`}>{labelText}</label>
			)}
		</div>
	);
}
