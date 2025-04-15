import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setphoneNumber]=useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleconfirmPasswordChange = (e) => setconfirmPassword(e.target.value);
  const handlephoneNumberChange=(e)=> setphoneNumber(e.target.value)


  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }

    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }



    setError(""); 
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = { username, password, name,confirmPassword,phoneNumber };

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        localStorage.setItem("name", name);
        navigate("/login"); 
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error occurred during signup:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-x-10">
       
        <div className="hidden lg:block w-1/2">

        </div>

    
        <div className="w-full sm:w-3/4 lg:w-1/2 sm:max-w-sm mt-20 sm:mt-24 lg:mt-28  sm:ml-10 lg:ml-20 translate-y-2">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={username}
                onChange={handleUsernameChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label
                htmlFor="phonenumber"
                className="block text-sm font-medium text-gray-900"
              >
                phoneNumber
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={phoneNumber}
                onChange={handlephoneNumberChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-900"
              >
                confirmPassword
              </label>
              <input
                id="role"
                name="role"
                type="password"
                value={confirmPassword}
                onChange={handleconfirmPasswordChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-green-600 py-1.5 text-white"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
