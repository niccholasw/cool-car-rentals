import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Account from "./pages/Account";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Signup />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/about",
		element: <About />,
	},
	{
		path: "/account",
		element: <Account />,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
