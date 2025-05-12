import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    // Added missing parameter 'e'
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!name) {
      setError("Name is required");
      return; // Added return to stop further execution
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return; // Added return to stop further execution
    }

    if (!password) {
      setError("Password is required");
      return; // Added return to stop further execution
    }

    // If all validations pass, clear errors and proceed with signup
    setError("");
    // Add your signup logic here
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center min-h-[90vh] bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border-[1px] border-black/35">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Sign Up
          </h2>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john234@gmail.com"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
            >
              Register
            </button>

            <div className="text-sm text-center text-gray-600">
              Already Have Account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
