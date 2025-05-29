import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <h1 className="text-4xl font-extrabold text-red-600 mb-4">Restricted Area</h1>
      <p className="text-gray-700 mb-6">
        Looks like you’ve reached a restricted section. Please check your permissions.
      </p>
      <Link
        to="/"
        className="bg-violet-600 text-white px-5 py-2 rounded-lg shadow hover:bg-violet-700 transition"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
