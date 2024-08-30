import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [errorLabelText, setErrorLabelText] = useState("");
	const [errorLabel, setErrorLabel] = useState(false);
	const [errorLabelColor, setErrorLabelColor] = useState("text-white");
	const navigate = useNavigate();

	function successLabel() {
		setErrorLabelText("Successfully created user, redirecting now!");
		setErrorLabelColor("text-green-600");
		setErrorLabel(true);
		setName("");
		setPassword("");
		navigate("/account");
	}

	function changeErrorLabel(error: Error) {
		console.error(error.message);
		setErrorLabelText("Error, could not login user, " + error.message);
		setErrorLabelColor("text-red-600");
		setErrorLabel(true);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			const User = { username: name, password: password };
			await axios.post("http://localhost:5000/api/user/login", User);
			successLabel();
		} catch (error: any) {
			changeErrorLabel(error.message);
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Login Page
					</h2>
				</div>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">
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
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Submit
						</button>
                        <button
							onClick={() => navigate("/")}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Switch to signup
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
