import Home from "../Components/Home";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import ForgotPassword from "../Components/ForgotPassword";
import Cart from "../Components/Cart";
import RestaurantMenu from "../Components/RestaurantMenu";

const routes = [
  {
    path: "/",
    element: <Home />,
    protected: true,
    exact: true,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/cart",
    element: <Cart />,
    protected: true,
  },
  {
    path: "/restaurant/:id",
    element: <RestaurantMenu />,
    protected: true,
  },
];

export default routes;
