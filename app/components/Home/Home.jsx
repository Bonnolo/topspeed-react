"use client";
import Image from "next/image";
import misano from "../img/misano.png";
import monzaParabolica from "../img/monzaParabolica.png";
import blankAvatar from "../img/blankAvatar.webp";
import Deatils from "./Details.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";

const Home = () => {
  const [raceTracks, setraceTracks] = useState([]);
  const [user, setUser] = useState("");
  const [usersEvents, setUsersEvents] = useState([]);
  const [page, setPage] = useState(null);
  const [eventInfo, setEventInfo] = useState(0);

  //get circuits
  useEffect(() => {
    const getCircuit = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //console.log(user.user_metadata.username);
      setUser(user.user_metadata.username);

      const { data } = await supabase.from("reservation").select("*");
      //console.log(data);
      setraceTracks(data);
      //console.log(usersEvents);
    };
    getCircuit();
  }, []);

  //get user events
  useEffect(() => {
    const temporanyEvents = [];
    raceTracks.map((event) => {
      //console.log(event);
      const newDate = new Date(event.date_event);
      const DD = newDate.getDate().toString().padStart(2, "0");
      const MM = newDate.getMonth() + 1;
      const MMstr = MM.toString().padStart(2, "0");
      const YYYY = newDate.getFullYear();
      const hh = newDate.getHours().toString().padStart(2, "0");
      const mm = newDate.getMinutes().toString().padStart(2, "0");
      const time = `${DD}/${MMstr}/${YYYY} ${hh}:${mm}`;
      temporanyEvents.push({
        id: event.id,
        event: time,
        circuit: event.circuit,
        patecipants: event.partecipants,
        location: event.location,
      });
    });
    setUsersEvents(temporanyEvents);
  }, [raceTracks]);

  if (page === "details") {
    return <Deatils eventID={eventInfo} />;
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <h1></h1>
        <h1 className="flex justify-center my-4 text-lg">Home</h1>
        <div className="avatar flex justify-center items-center">
          <div className="w-12 h-12 rounded-full">
            <button>
              <Image src={blankAvatar} />
            </button>
          </div>
        </div>
      </div>
      <h3 className="flex justify-center my-4 text-lg">Prossimi eventi</h3>
      <div className="relative h-[68vh] overflow-hidden">
        <section className="mx-2 max-h-[68vh] overflow-auto">
          <div>
            {usersEvents.map((event, index) => (
              <div key={index} className="flex justify-center">
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                  <figure className="mx-4">
                    <Image
                      className="rounded-2xl"
                      src={
                        event.circuit === "Misano" ? misano : monzaParabolica
                      }
                      alt={event.circuit}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{event.circuit}</h2>
                    <p>
                      <strong>Partecipanti: </strong>
                      {event.patecipants?.length || 0}
                      <br />
                      <strong>Prossimo evento: </strong>
                      {event.event} <br />
                      <strong>Luogo: </strong> {event.location}
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          const self = event.id;
                          //console.log(self);
                          setPage("details");
                          setEventInfo(self);
                        }}
                      >
                        Dettagli
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
