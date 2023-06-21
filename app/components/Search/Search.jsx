"use client";
import { useState, useEffect, use } from "react";
import { supabase } from "../../../supabase.js";
import Image from "next/image";
import misano from "../img/misano.png";
import Reservation from "./Reservation.jsx";

const Search = () => {
  const [circuits, setCircuits] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredCircuits, setFilteredCircuits] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [id, setId] = useState("");

  //get circuits
  useEffect(() => {
    const getCircuit = async () => {
      const { data: circuits } = await supabase.from("circuits").select("*");
      setCircuits(circuits);
      //console.log(circuits);
    };
    getCircuit();
  }, []);

  //filter circuits based on searchquery
  useEffect(() => {
    setFilteredCircuits(
      circuits.filter((circuit) =>
        circuit.circuit_name.toLowerCase().includes(query.toLowerCase())
      )
    );

    if (query === "") {
      setFilteredCircuits([]);
    }
    //console.log(filteredCircuits);
  }, [query]);

  const click = (e) => {
    setId(e.target.id);
    //console.log(e.target.id);
    setClicked(e.target.name);
  };
  if (clicked === "prenotaSessione") {
    return <Reservation circuitID={id} />;
  }

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
        {filteredCircuits.map((circuit, index) => (
          <section key={index} className="flex justify-center my-1">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <Image src={misano} alt="Misano" className="w-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{circuit?.circuit_name}</h2>
                <p>
                  <strong>Indirizzo:</strong> {circuit?.address} <br />
                  <strong>Prossimo evento:</strong>
                  {circuit?.next_events[0].event} <br />
                  <strong>Lunghezza del tracciato:</strong> {circuit?.lenght} m
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    id={circuit?.circuit_name}
                    name="prenotaSessione"
                    onClick={click}
                  >
                    Prenota Sessione
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Search;
