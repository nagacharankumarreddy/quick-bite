import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">
          About Quick Bite
        </h1>
        <p className="text-xl text-gray-700 mb-4 text-center">
          Welcome to Quick Bite, where we believe in "Bite taste love". We bring
          delicious, freshly prepared food right to your door.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to make online food ordering easy and enjoyable. We
          partner with top local restaurants to offer a wide variety of
          cuisines. Whether you crave a hearty meal, a light snack, or something
          sweet, we have it all.
        </p>
        <p className="text-gray-700 mb-4">
          We are committed to excellent customer service. Our team is here to
          help with any questions or feedback you have. Your satisfaction is our
          priority.
        </p>
        <p className="text-gray-700 mb-4">
          Thank you for choosing Quick Bite. We look forward to serving you.
          Remember, with Quick Bite, it's always about bite, taste, and love.
        </p>
        <p className="text-gray-700 text-center">Happy Eating!</p>
        <p className="text-gray-700 text-center mb-2">- The Quick Bite Team</p>
        <p className="text-gray-700 text-center">
          Contact us at:{" "}
          <a href="mailto:quickbite@gmail.com" className="text-blue-500">
            QuickBite
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
