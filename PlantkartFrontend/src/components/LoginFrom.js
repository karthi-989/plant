import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [loginType, setLoginType] = useState("email"); // Default is email
  const [username, setUsername] = useState(""); // For email or phone (depending on loginType)
  const [phoneNumber, setPhoneNumber] = useState(""); // Specifically for phone number
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Handle username (email or phone) change
  const handleUsernameChange = (e) => {
    if (loginType === "email") {
      setUsername(e.target.value); // If loginType is email, update username state
    } else {
      setPhoneNumber(e.target.value); // If loginType is phone, update phoneNumber state
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload will be based on login type (email or phone number)
    const payload =
      loginType === "email"
        ? { username, password }
        : { phoneNumber, password };

    try {
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        sessionStorage.clear();
        sessionStorage.setItem("role", data.role); // Role fetched from DB
        navigate("/home", { state: { username } }); // Pass username to the dashboard
      } else {
        setErrorMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-250 flex items-center justify-center">
      <div className="flex w-full max-w-7xl gap-x-10">
        {/* Left Image Section */}
        <div className="hidden lg:block w-1/2">
          <img
            src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp"
            alt="Sign In Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sign-In Form Section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 lg:px-16">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
            <h1 className="text-3xl font-bold text-indigo-600">
              Knowledge Sharing Platform
            </h1>
            <p className="mt-4 text-gray-600">
              Connect, collaborate, and share knowledge with peers and experts.
              Join our platform to access valuable insights, contribute to
              discussions, and grow your professional network.
            </p>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errorMessage && (
              <div className="mb-4 text-center text-sm text-red-500">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  {loginType === "email" ? "Email" : "Phone Number"}
                </label>
                <input
                  id="username"
                  name="username"
                  value={loginType === "email" ? username : phoneNumber}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                  onChange={handleUsernameChange}
                  placeholder={
                    loginType === "email"
                      ? "Enter your email"
                      : "Enter your phone number"
                  }
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                  onChange={handlePasswordChange}
                />
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 py-1.5 text-white"
              >
                Sign in
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <button
                onClick={() => navigate("/")}
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Sign Up
              </button>
            </p>

            {/* Toggle Login Type */}
            <div className="mt-4 text-center">
              <button
                onClick={() =>
                  setLoginType(loginType === "email" ? "phone" : "email")
                }
                className="text-sm font-semibold text-green-600 hover:text-green-500"
              >
                Login with {loginType === "email" ? "Phone Number" : "Email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
