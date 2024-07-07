import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/quickbite.png";
import { useFirebase } from "../firebase";

function Header() {
  const { currentUser, signOutUser } = useFirebase();

  return (
    <div className="bg-slate-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        <nav>
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
                  <span className="text-white">{currentUser.displayName}</span>
                </li>
                <li>
                  <button
                    onClick={() => signOutUser()}
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
      </div>
    </div>
  );
}

export default Header;
