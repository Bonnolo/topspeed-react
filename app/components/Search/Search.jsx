"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";
import Image from "next/image";
import misano from "../img/misano.png";

const Search = () => {
  const [circuits, setCircuits] = useState([]);
  const [user, setUser] = useState();
  const [query, setQuery] = useState("");
  const [display, setDisplay] = useState("");

  //get circuits
  useEffect(() => {
    const getCircuit = async () => {
      const { data: circuits } = await supabase.from("circuits").select("*");
      setCircuits(circuits);
      //console.log(circuits);
    };
    getCircuit();
  }, []);

  //filter circuits based on query
  useEffect(() => {
    const lngth = circuits.length;
    setDisplay(null);
    for (let i = 0; i < lngth; i++) {
      if (
        circuits[i].circuit_name.toLowerCase().includes(query.toLowerCase())
      ) {
        setDisplay(circuits[i].circuit_name);
      }
      console.log(display);
      switch (display) {
        case "Misano":
          document.getElementById("misano").classList.remove("hidden");
          document.getElementById("monza").classList.add("hidden");
          break;
        case "Monza":
          document.getElementById("monza").classList.remove("hidden");
          document.getElementById("misano").classList.add("hidden");
          break;
        case null:
          document.getElementById("misano").classList.add("hidden");
          document.getElementById("monza").classList.add("hidden");
      }
    }
  }, [query]);

  return (
    <>
      <div>
        <h1 className="flex justify-center my-4 text-lg">Cerca</h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Cerca circuito . . ."
            className="input input-bordered input-primary w-full max-w-xs h-10 my-4"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <section id="misano" className="hidden flex justify-center my-1">
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <Image src={misano} alt="Misano" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{circuits[0]?.circuit_name}</h2>
              <p>
                <strong>Indirizzo:</strong> {circuits[0]?.address} <br />
                <strong>Prossimo evento: </strong>
                {circuits[0]?.next_event} <br />
                <strong>Lunghezza del tracciato:</strong> {circuits[0]?.lenght}{" "}
                m
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Prenota Sessione</button>
              </div>
            </div>
          </div>
        </section>
        <section id="monza" className="hidden flex justify-center my-1">
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <Image src={misano} alt="Misano" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{circuits[1]?.circuit_name}</h2>
              <p>
                <strong>Indirizzo:</strong> {circuits[1]?.address} <br />
                <strong>Prossimo evento: </strong>
                {circuits[1]?.next_event} <br />
                <strong>Lunghezza del tracciato:</strong> {circuits[1]?.lenght}m
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Prenota Sessione</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Search;
