import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in-down">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
          🚢 Ship Maintenance Login
        </h2>

        <form onSubmit={SubmitHandler} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-blue-800 text-lg font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 border border-blue-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-blue-800 text-lg font-semibold mb-2">
              Role
            </label>
            <div className="flex gap-4">
              {["admin", "inspector", "engineer"].map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2 text-blue-700 p-2 px-3 rounded-xl border ${
                    role === r
                      ? "bg-blue-100 border-blue-500 ring-1 ring-blue-300"
                      : "border-gray-300"
                  } cursor-pointer transition-all`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-blue-600"
                  />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-blue-800 text-lg font-semibold"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-blue-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="you@example.com"
            />
            <p className="text-sm text-gray-500 mt-1">
              We'll never share your email.
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-blue-800 text-lg font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-blue-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-900 transition-all font-semibold shadow-md ${
              !email || !password ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={!email || !password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
