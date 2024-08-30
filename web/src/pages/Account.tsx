import axios from "axios";
import { useState } from "react";

export default function Account() {
	const [userName, setUserName] = useState("");

	async function handleDeleteClick() {
		try {
			await axios.delete("http://localhost:5000/api/user/delete");
			alert("Account deleted.");
		} catch (error: any) {
			console.error(error.message);
			alert("Error deleting account.");
		}
	}

	return (
		<div>
			<h2 className="text-3xl">Account Page</h2>
			<div className="flex flex-col">
				<p className="text-lg">Welcome user, {userName}</p>
				<button
					className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					type="submit"
					onClick={handleDeleteClick}>
					Delete my account
				</button>
			</div>
		</div>
	);
}
