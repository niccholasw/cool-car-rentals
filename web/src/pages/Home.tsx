import axios from "axios";
import { useState } from "react";

export default function Home() {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function registerUser() {
		try {
			const User = { username: name, password: password };
			await axios.post("http://localhost:5000/api/user/", User);

		} catch (error: any) {
			console.error(error);
		}
	};



	return (
		<div className="flex flex-col gap-4 mx-2">
			<h1>Home Page</h1>
			<p>Username: </p>
			<input 
				type="text" 
				name="usernameInput" 
				className="bg-black text-white w-96"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<p>Password: </p>
			<input 
				type="password" 
				name="passwordInput" 
				className="bg-black text-white w-96"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button 
				className="bg-blue-500 text-white p-2 rounded w-52"
				onClick={registerUser}/>
		</div>
	);
}
