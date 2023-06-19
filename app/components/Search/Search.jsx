"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";

const Search = () => {
  const [circuit, setCircuit] = useState();

  // get circuits form db
  const getCircuits = async () => {
    const { data, error } = supabase.from("circuits").select("*");
    if (error) {
      console.log(error);
    } else {
      setCircuit(data);
      console.log(data);
    }
    useEffect(() => {
      getCircuits();
    }, []);
  };

  return (
    <>
      <h1 className="flex justify-center my-4 text-lg">Cerca</h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Cerca circuito . . ."
          className="input input-bordered input-primary w-full max-w-xs h-10"
        />
      </div>
    </>
  );
};

export default Search;
