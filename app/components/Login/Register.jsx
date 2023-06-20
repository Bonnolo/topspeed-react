"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";
import LoginHome from "./Home.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [cantSubmit, setCantSubmit] = useState(false);
  const [back, setBack] = useState(false);

  // ON SUBMIT REGISTER FUNCTION IS CALLED
  const submitRegister = async (event) => {
    event.preventDefault();

    try {
      if (password !== repeatPassword) {
        setError("Le password non coincidono");
      } else if (password.length < 8) {
        setError("La password deve essere lunga almeno 8 caratteri");
      } else if (error) {
        return;
      } else {
        //console.log("pushing data");
        const { dberror } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
            },
          },
        });
        if (dberror) {
          //console.log(dberror, "1");
          window.alert(dberror);
        }
        window.alert(
          "Registrazione avvenuta con successo! Controlla la tua email per confermare l'account"
        );
      }
    } catch (error) {
      setError(error);
      //console.log(error, "2");
    }
    //console.log(username, email, password, repeatPassword, error);
  };

  // if error state changes and is not null, alert the user
  useEffect(() => {
    if (error) {
      window.alert(error);
      setError(null);
    }
  }, [error]);

  // if all fields are filled, enable submit button
  // disable property is set to false by default (intentionally used "Can't")
  useEffect(() => {
    if (username && email && password && repeatPassword) {
      setCantSubmit(false);
    } else {
      setCantSubmit(true);
    }
  }, [username, email, password, repeatPassword]);

  //go back to Home
  const click = (e) => {
    setBack(true);
  };

  if (back) {
    return <LoginHome />;
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <button onClick={click} className="flex justify-center items-center">
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7.49577C0 7.64257 0.0265226 7.77809 0.0795678 7.90232C0.138507 8.02654 0.226916 8.14512 0.344794 8.25805L7.23183 14.712C7.43222 14.904 7.67387 15 7.95678 15C8.15128 15 8.32515 14.9548 8.47839 14.8645C8.63752 14.7798 8.76424 14.6612 8.85855 14.5088C8.95285 14.3619 9 14.1982 9 14.0175C9 13.7465 8.89096 13.5065 8.67289 13.2976L2.4666 7.49577L8.67289 1.69396C8.89096 1.48504 9 1.24788 9 0.982496C9 0.79616 8.95285 0.629588 8.85855 0.482778C8.76424 0.335968 8.63752 0.220215 8.47839 0.135517C8.32515 0.0451722 8.15128 0 7.95678 0C7.67387 0 7.43222 0.0931677 7.23183 0.279503L0.344794 6.73348C0.226916 6.84641 0.138507 6.96499 0.0795678 7.08922C0.0265226 7.21344 0 7.34896 0 7.49577Z"
              fill="white"
            />
          </svg>
          <h1 id="back" className="my-4 mx-2 text-lg">
            indietro
          </h1>
        </button>
        <h1 className="my-4 text-lg text-center">Registrati</h1>
      </div>
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
            disabled={cantSubmit}
          >
            Registrati
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
