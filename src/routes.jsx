import App from "./App";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import ErrorPage from "./ErrorPage";
import Blog from "./Components/Blog/Blog.jsx";
import Home from "./Components/Home/Home.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/posts/:id",
                element: <Blog />
            }
        ],
        errorElement: <ErrorPage />,
    }, 
];

export default routes;