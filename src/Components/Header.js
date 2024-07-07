import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/quickbite.png";
import { useFirebase } from "../firebase";

function Header() {
  const { currentUser, signOutUser } = useFirebase();

  return (
    <div className="flex justify-between items-center m-4 bg-slate-700 p-4 rounded-lg shadow-lg">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-12" />
      </div>
      <div className="w-1/2 flex justify-end">
        <nav>
          <ul className="flex text-white text-md font-medium items-center space-x-4">
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
            {currentUser && (
              <>
                <li className="ml-4 flex items-center">
                  {currentUser.photoURL && (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-10 rounded-full"
                    />
                  )}
                  <span className="text-white ml-2">
                    {currentUser.displayName}
                  </span>
                  <button
                    onClick={() => signOutUser()}
                    className="ml-4 text-sm text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
            {!currentUser && (
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
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
