"use client";

import Header from "./components/Header.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../supabase.js";
import LoginHome from "./components/Login/Home.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import Loading from "./components/Loading.jsx";
import Search from "./components/Search/Search.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then((data) => {
      setSession(data.data.session);
      //console.log(data.data.session);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Header />
      <main className="container w-full h-full">
        {!session && <LoginHome />}
        {session && <Home />}
      </main>
    </>
  );
}
