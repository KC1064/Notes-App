import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError("Name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      console.log("Signup response:", response.data);

      if (response.data && response.data.accssToken) {
        localStorage.setItem("token", response.data.accssToken);
        console.log("Navigating to dashboard...");
        navigate("/dashboard");
        console.log("Navigation triggered");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center min-h-[90vh] bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border border-black/35">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Sign Up
          </h2>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john234@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
            <div className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
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
