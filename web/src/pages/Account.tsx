import axios from "axios";
import { useState } from "react";

export default function Account() {

	async function handleDeleteClick() {

	}

	return (
		<div>
			<h2 className="text-3xl">Account Page</h2>
			<button
			type="submit"
			onClick={ handleDeleteClick }
			>
				Delete my account
			</button>
		</div>
	);
}
