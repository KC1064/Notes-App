import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please Enter the Password");
    }

    setError("");
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center min-h-[90vh] bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border-[1px] border-black/35">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Login
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john234@gmail.com"
                className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className=" text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="text-sm text-center text-gray-600">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
