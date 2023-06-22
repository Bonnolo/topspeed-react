"use client";
import Image from "next/image";
import misano from "../img/misano.png";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";

const Home = () => {
  const [raceTracks, setraceTracks] = useState([]);
  const [user, setUser] = useState("");
  const [usersEvents, setUsersEvents] = useState([]);

  //get circuits
  useEffect(() => {
    const getCircuit = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user.user_metadata.username);
      setUser(user.user_metadata.username);

      const { data: circuits } = await supabase.from("circuits").select("*");
      console.log(circuits);
      setraceTracks(circuits);
      console.log(usersEvents);
    };
    getCircuit();
  }, []);

  //get user events
  useEffect(() => {
    console.log(raceTracks);
    const temporanyEvents = [];
    raceTracks.map((circuit) => {
      circuit.next_events.map((event) => {
        if (event.username === user) {
          const newDate = new Date(event.event);
          const DD = newDate.getDate().toString().padStart(2, "0");
          const MM = newDate.getMonth() + 1;
          const MMstr = MM.toString().padStart(2, "0");
          const YYYY = newDate.getFullYear();
          const hh = newDate.getHours().toString().padStart(2, "0");
          const mm = newDate.getMinutes().toString().padStart(2, "0");
          const time = `${DD}/${MMstr}/${YYYY} ${hh}:${mm}`;
          temporanyEvents.push({
            event: time,
            circuit: circuit.circuit_name,
            location: circuit.address,
            distance: circuit.lenght,
          });
        }
      });
    });
    setUsersEvents(temporanyEvents);
  }, [raceTracks]);

  return (
    <>
      <h1 className="flex justify-center my-4 text-lg">Home</h1>
      <h3 className="flex justify-center my-4 text-lg">
        Prossimi eventi prenotati
      </h3>
      <div className="relative h-[63vh] overflow-hidden">
        <section className="mx-2 max-h-[63vh] overflow-auto">
          <div>
            {usersEvents.map((event, index) => (
              <div key={index} className="flex justify-center">
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                  <figure className="px-4">
                    <Image src={misano} alt="misano" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{event.circuit}</h2>
                    <p>
                      <strong>Indirizzo:</strong> {event.location} <br />
                      <strong>Prossimo evento: </strong>
                      {event.event} <br />
                      <strong>Lunghezza tracciato: </strong> {event.distance} m
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => console.log("xd")}
                      >
                        Visualizza partecipanti
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
