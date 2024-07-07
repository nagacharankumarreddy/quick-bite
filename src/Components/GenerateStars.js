import React from "react";

const GenerateStars = ({ avgRating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(avgRating);
  const halfStar = avgRating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className="inline-flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-yellow-500 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 1l2.4 5.2 5.6.8-4 4.2.9 5.6-4.9-2.8-4.9 2.8.9-5.6-4-4.2 5.6-.8L10 1z"
          />
        </svg>
      ))}
      {halfStar === 1 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-yellow-500 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 1l2.4 5.2 5.6.8-4 4.2.9 5.6-4.9-2.8-4.9 2.8.9-5.6-4-4.2 5.6-.8L10 1z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 1l2.4 5.2 5.6.8-4 4.2.9 5.6-4.9-2.8-4.9 2.8.9-5.6-4-4.2 5.6-.8L10 1z"
          />
        </svg>
      ))}
    </div>
  );
};

export default GenerateStars;
