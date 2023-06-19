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

  //get Supabase session
  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then((data) => {
      setSession(data.data.session);
      //console.log(data.data.session);
      setLoading(false);
    });
  }, []);

  //navigation on navbar touch
  useEffect(() => {
    const btm = document.querySelector(".btm-nav");
    //console.log(btm);
    btm?.addEventListener("click", (e) => {
      if (e.target.parentElement.id === "home") {
        setPage("home");
      }
      if (e.target.parentElement.id === "search") {
        setPage("search");
      }
    });
  }, [session]);

  return (
    <>
      {loading && <Loading />}
      <Header />
      <main className="container w-full h-full">
        {!session && <LoginHome />}
        {session && page === "home" && <Home />}
        {session && page === "search" && <Search />}
      </main>
      {session && <Footer activePage={page} />}
    </>
  );
}

// {!session && <LoginHome />} case session is null, renders LoginHome component
// {loading && <Loading />} case loading is true, renders Loading component and covers everything on the page
// {session && page === "home" && <Home />} case session and page equals {home}, renders Home component (same for search)
