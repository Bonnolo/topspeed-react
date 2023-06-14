"use client";

import Header from "./components/Header.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../supabase.js";
import LoginHome from "./components/Login/Home.jsx";

export default function Home() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((data) => {
      setSession(data.data.session);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="container w-full h-full">
        <h1 className="flex justify-center">
          Ciao {user?.username || "sconosciuto"}!
        </h1>
        {/*         <p>{user?.bio}</p>
        <p>{user?.website}</p>
        <button onClick={signOut}>SIGNOUT</button> */}
        {!session && <LoginHome />}
        {/*         {session && user?.username && <TodoList />}
        {session && !user?.username && <UpdateProfile />} */}
      </main>
    </>
  );
}
