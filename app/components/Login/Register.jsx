"use client";
import { useState, useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const submitRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // const { error } = await supabaseClient.auth.signInWithOtp({
      //   email,
      // });

      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      // const { error } = await supabaseClient.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      if (error) {
        setError(error.msg);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-1/3 flex justify-center w-full">
      <form className="flex flex-col justify-center w-full">
        <input
          type="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered input-primary my-2 mx-4"
        />
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
        <input
          type="password"
          placeholder="Ripeti password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="input input-bordered input-primary my-2 mx-4"
        />
        <button type="submit" className="btn btn-outline my-2 mx-4">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Register;
