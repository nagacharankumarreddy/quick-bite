import About from "../Components/About";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import Contact from "../Components/Contact";
import ForgotPassword from "../Components/ForgotPassword";
import Home from "../Components/Home";
import Login from "../Components/Login";
import RestaurantMenu from "../Components/RestaurantMenu";
import SignUp from "../Components/SignUp";

const routes = [
  {
    path: "/",
    element: <Home />,
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
  },
  {
    path: "/restaurant/:id",
    element: <RestaurantMenu />,
  },
  {
    path: "/confirmation",
    element: <Checkout />,
    protected: true,
  },
];

export default routes;
