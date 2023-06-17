"use client";
import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const Home = () => {
  const [page, setPage] = useState("");

  const click = (e) => {
    //console.log(e.target.name);
    setPage(e.target.name);
  };
  if (page === "register") {
    return <Register />;
  }
  if (page === "login") {
    return <Login />;
  }
  return (
    <div className="fixed top-2/3 flex flex-col justify-center w-full">
      <button
        name="register"
        className="btn btn-outline my-2 mx-4"
        onClick={click}
      >
        Registrati
      </button>
      <button
        name="login"
        className="btn btn-outline my-2 mx-4"
        onClick={click}
      >
        Accedi
      </button>
    </div>
  );
};

export default Home;
