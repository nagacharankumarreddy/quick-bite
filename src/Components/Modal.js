import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg overflow-hidden max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.414 6.586a2 2 0 00-2.828 0L10 7.172 8.414 5.586a2 2 0 10-2.828 2.828L7.172 10l-1.586 1.586a2 2 0 102.828 2.828L10 12.828l1.586 1.586a2 2 0 102.828-2.828L12.828 10l1.586-1.586a2 2 0 000-2.828z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure modal-root exists in your index.html
  );
};

export default Modal;
