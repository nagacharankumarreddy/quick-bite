import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/quickbite.png";
import { useFirebase } from "../firebase";

function Header() {
  const { currentUser, signOutUser } = useFirebase();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <div className="bg-slate-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        <nav className="hidden md:flex">
          <ul className="flex text-white text-md font-medium items-center space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="flex items-center space-x-2">
                  {currentUser.photoURL && (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-10 rounded-full"
                    />
                  )}
                  <span className="text-white">{`${
                    currentUser.displayName.split(" ")[0] +
                    " " +
                    currentUser.displayName.split(" ")[1]
                  }`}</span>
                </li>
                <li>
                  <button
                    onClick={() => signOutUser()}
                    className="text-sm text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="relative text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="md:hidden flex items-center">
          {currentUser && (
            <span className="text-white text-sm mr-4">{`Hello, ${
              currentUser.displayName.split(" ")[0]
            }!`}</span>
          )}
          <Link
            to="/cart"
            className="relative text-white hover:text-yellow-400 transition-colors duration-200 mr-4"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cartItemCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            className="text-white hover:text-yellow-400 transition-colors duration-200 focus:outline-none"
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="md:hidden hidden bg-slate-700">
        <ul className="text-white text-md font-medium p-4 space-y-4">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition-colors duration-200"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-yellow-400 transition-colors duration-200"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-yellow-400 transition-colors duration-200"
              onClick={() =>
                document.getElementById("mobile-menu").classList.add("hidden")
              }
            >
              Contact Us
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="flex items-center space-x-2">
                {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="h-10 rounded-full"
                  />
                )}
                <span className="text-white">{`${
                  currentUser.displayName.split(" ")[0] +
                  " " +
                  currentUser.displayName.split(" ")[1]
                }`}</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOutUser();
                    document
                      .getElementById("mobile-menu")
                      .classList.add("hidden");
                  }}
                  className="text-sm text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-yellow-400 transition-colors duration-200"
                  onClick={() =>
                    document
                      .getElementById("mobile-menu")
                      .classList.add("hidden")
                  }
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-yellow-400 transition-colors duration-200"
                  onClick={() =>
                    document
                      .getElementById("mobile-menu")
                      .classList.add("hidden")
                  }
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
