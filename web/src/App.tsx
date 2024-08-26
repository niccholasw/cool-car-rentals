import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Account";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
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
