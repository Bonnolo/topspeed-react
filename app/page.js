"use client";

import Header from "./components/Header.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../supabase.js";
import LoginHome from "./components/Login/Home.jsx";
import Footer from "./components/Footer.jsx";

export default function Home() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((data) => {
      setSession(data.data.session);
      console.log(data.data.session);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="container w-full h-full">
        <h1 className="flex justify-center">
          Ciao {session.user.user_metadata.username || "sconosciuto"}!
        </h1>
        {/*         <p>{user?.bio}</p>
        <p>{user?.website}</p>
        <button onClick={signOut}>SIGNOUT</button> */}
        {!session && <LoginHome />}
        {session && <h1>sei loggato</h1>}
        {/*         {session && user?.username && <TodoList />}
        {session && !user?.username && <UpdateProfile />} */}
      </main>
    </>
  );
}
