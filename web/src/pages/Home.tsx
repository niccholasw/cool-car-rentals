import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorLabelText, setErrorLabelText] = useState<string>(""); // State to hold the label text
	const [errorLabel, setErrorLabel] = useState<boolean>(false); // Control label visibility
	const [errorLabelColor, setErrorLabelColor] = useState<string>("text-white"); // State for label color
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const navigate = useNavigate();

	function successLabel() {
		setErrorLabelText("Successfully created user, redirecting now!");
		setErrorLabelColor("green-600");
		setErrorLabel(true);

		setEmail("");
		setName("");
		setPassword("");
		setTimeout(() => {
			setErrorLabel(false);
			navigate("/account");
		}, 3000);
	}

	function changeErrorLabel(error: any) {
		console.error(error.code);
		setErrorLabelText(
			"Error, could not create user. See error code: " + error.code
		);
		setErrorLabelColor("red-600");
		setErrorLabel(true);

		setTimeout(() => {
			setErrorLabel(false);
		}, 3000);
	}

	async function handleSubmit() {
		try {
			if (password !== confirmPassword) {
				throw new Error("Passwords do not match");
			}
			const User = { email: email, username: name, password: password };
			await axios.post("http://localhost:5000/api/user/", User);
			successLabel();
		} catch (error: any) {
			changeErrorLabel(error);
		}
	}

	return (
		<div className="flex flex-col gap-4 mx-2">
			<h2 className="text-3xl">Home Page</h2>
			<form onSubmit={handleSubmit} className="flex-col justify-evenly">
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
				<label>Confirm Password: </label>
				<input
					type="password"
					name="confirmPasswordInput"
					placeholder="Enter password again"
					className="bg-black text-white w-96"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded w-24"
					onClick={changeErrorLabel}>
					Submit
				</button>
				{errorLabel && (
					<label className={`${errorLabelColor} text-xl`}>
						{errorLabelText}
					</label>
				)}
			</form>
		</div>
	);
}
