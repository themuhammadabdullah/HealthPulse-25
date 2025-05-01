import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-2">We encountered an unexpected error</p>
        <p className="text-gray-500 text-sm">
          {error.statusText || error.message}
        </p>
        <button
          onClick={() => (window.location = "/")}
          className="mt-6 px-4 py-2 bg-[#34568B] text-white rounded hover:bg-[#2a456c]"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
