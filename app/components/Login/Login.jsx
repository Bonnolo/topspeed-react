"use client";
import { useState, useEffect } from "react";
import Demo from "../Home/Home.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <div className="fixed top-1/3 flex justify-center w-full">
      <form className="flex flex-col justify-center w-full">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered input-primary my-2 mx-4"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered input-primary my-2 mx-4"
        />
        <button type="submit" className="btn btn-outline my-2 mx-4">
          Accedi
        </button>
      </form>
    </div>
  );
};
export default Login;
