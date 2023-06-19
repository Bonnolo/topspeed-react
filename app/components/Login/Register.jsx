"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const submitRegister = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      if (password !== repeatPassword) {
        setError("Le password non coincidono");
      } else if (password.length < 8) {
        setError("La password deve essere lunga almeno 8 caratteri");
      } else {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
            },
          },
        });
      }

      if (error) {
        setError(error.msg);
        window.alert(error.msg);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.msg);
      window.alert(error.msg);
    } finally {
    }
    //console.log(username, email, password, repeatPassword, error);
  };

  useEffect(() => {
    if (username && email && password && repeatPassword) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [username, email, password, repeatPassword]);

  return (
    <>
      {clicked && (
        <h1 className="flex justify-center">
          Controlla l'email per conferma dell'account
        </h1>
      )}
      <div className="fixed top-1/3 flex justify-center w-full">
        <form
          className="flex flex-col justify-center w-full"
          onSubmit={submitRegister}
        >
          <input
            type="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered input-primary my-2 mx-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-primary my-2 mx-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-primary my-2 mx-4"
            required
          />
          <input
            type="password"
            placeholder="Ripeti password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="input input-bordered input-primary my-2 mx-4"
            required
          />
          <button
            type="submit"
            className="btn btn-outline my-2 mx-4"
            disabled={canSubmit}
            onClick={() => setClicked(true)}
          >
            Registrati
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
