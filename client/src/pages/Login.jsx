import React, { useState } from "react";
import Input from "../components/ui/input";  
import Button from "../components/ui/button";  

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
     
const res = await fetch("http://localhost:8001/auth/login", { 
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      console.log("Login successful, navigating to /dashboard");

    
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
