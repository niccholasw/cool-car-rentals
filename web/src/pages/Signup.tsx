import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorLabelText, setErrorLabelText] = useState("");
	const [errorLabel, setErrorLabel] = useState(false);
	const [errorLabelColor, setErrorLabelColor] = useState("text-white");
	const navigate = useNavigate();

	function successLabel() {
		setErrorLabelText("Successfully created user, redirecting now!");
		setErrorLabelColor("text-green-600");
		setErrorLabel(true);
		setEmail("");
		setName("");
		setPassword("");
		setConfirmPassword("");

		setTimeout(() => {
			navigate("/account");
		}, 3000);
	}

	function changeErrorLabel(error: any) {
		console.error(error.message);

		if (error.response) {
			if (error.response.status === 400) {
				setErrorLabelText(error.response.data);
			} else {
				setErrorLabelText("Unknown error.");
			}
		} else if (error.request) {
			setErrorLabelText("Could not connect to server.");
		} else {
			setErrorLabelText(error.message);
		}

		setErrorLabelColor("text-red-600");
		setErrorLabel(true);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				throw new Error("Passwords do not match!");
			}
			const User = { email: email, username: name, password: password };
			await axios.post("http://localhost:5000/api/user/", User);
			successLabel();
		} catch (error: any) {
			changeErrorLabel(error);
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Signup Page
					</h2>
				</div>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								autoComplete="username"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="confirm-password" className="sr-only">
								Confirm Password
							</label>
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Submit
						</button>
						<button
							onClick={() => navigate("/login")}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Switch to login
						</button>
					</div>
				</form>
				{errorLabel && (
					<div className={`mt-4 text-center ${errorLabelColor}`}>
						{errorLabelText}
					</div>
				)}
			</div>
		</div>
	);
}
