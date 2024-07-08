import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zoneLogo from "../../assets/ZoneLogo.png";
import emailIcon from "../../assets/emailIcon.png";
import passwordIcon from "../../assets/passwordIcon.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" || email === "door@gmail.com") {
      sessionStorage.setItem("userEmail", email);
      sessionStorage.removeItem("selectedEvent");
      navigate("/generate");
    } else {
      setError("Invalid user. Please enter a valid email address.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#101010" }}
    >
      <div
        className="px-8 rounded-md"
        style={{
          width: "555px",
          height: "475px",
          backgroundColor: "#191919",
          boxShadow: "0 -4px 10px -2px #404040",
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src={zoneLogo}
            alt="zone logo"
            className="w-[210px] h-auto mb-8"
            style={{ marginTop: "0px" }}
          />
          <h1
            className="text-white text-2xl pt-4 mb-8"
            style={{ fontFamily: "Play, sans-serif" }}
          >
            Welcome Back!
          </h1>
        </div>
        <div className="flex flex-col space-y-6 w-full px-4">
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 pl-10 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              style={{
                backgroundImage: `url(${emailIcon})`,
                backgroundSize: "20px",
                backgroundPosition: "10px center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 pl-10 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              style={{
                backgroundImage: `url(${passwordIcon})`,
                backgroundSize: "20px",
                backgroundPosition: "10px center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
