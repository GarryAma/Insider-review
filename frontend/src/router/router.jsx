import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";
import About from "../pages/About.jsx";
import Privacy from "../pages/Privacy.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import SingleBlogPage from "../pages/singleBlogPage/SingleBlogPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-me",
        element: <About />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "/contact-me",
        element: <Contact />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlogPage />,
      },
    ],
  },
]);

export default router;
