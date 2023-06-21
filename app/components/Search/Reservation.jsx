"use client";

import Search from "./Search.jsx";
//
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";
import { set } from "date-fns";

const Reservation = ({ circuitID }) => {
  const [value, setValue] = useState(() => {
    let date = new Date();
    date.setHours(new Date().getHours() + 2);
    let localDate = date.toISOString().slice(0, 16);
    return localDate;
  });
  const [events, setEvents] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [id, setId] = useState(circuitID);
  const [date, setDate] = useState([]);
  const [pushed, setPushed] = useState(false);

  //gets the dates events from the db
  useEffect(() => {
    //console.log(id, "id");
    const getDates = async () => {
      const db = await supabase
        .from("circuits")
        .select("next_events")
        .eq("circuit_name", id);
      //.then((res) => console.log(res.data, "done"));
      setEvents(db.data[0].next_events);
      //console.log(events.data, "data");
    };
    getDates();
  }, []);

  //gets the dates from the db and converts them to a readable format
  useEffect(() => {
    //console.log(events, "events");
    setDate(
      events.map((when) => {
        //console.log(when, "when");
        const newDate = new Date(when.event);
        const DD = newDate.getDate().toString().padStart(2, "0");
        const MM = newDate.getMonth() + 1;
        const MMstr = MM.toString().padStart(2, "0");
        const YYYY = newDate.getFullYear();
        const hh = newDate.getHours().toString().padStart(2, "0");
        const mm = newDate.getMinutes().toString().padStart(2, "0");
        return `${DD}/${MMstr}/${YYYY} ${hh}:${mm}`;
      })
    );
    //console.log(date, "date");
  }, [events]);

  //pushes the new date to the db
  useEffect(() => {
    if (pushed) {
      const pushDate = async () => {
        const db = await supabase
          .from("circuits")
          .update({ next_events: [...events, { event: value }] })
          .eq("circuit_name", id);
      };
      pushDate();
    }
  }, [pushed]);

  const click = (e) => {
    if (e.target.id === "push") {
      setPushed(true);
    }
    //console.log(e);
    setClicked(e.target.id);
  };
  if (clicked === "back") {
    return <Search />;
  }
  //console.log(value);
  //2023-06-22T18:13
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
        <h1 className="my-4 text-lg text-center">{id}</h1>
      </div>
      <h2 className="flex justify-center my-4">Inserisci data e ora qui</h2>
      <div className="flex justify-center">
        <input
          type="datetime-local"
          placeholder="Inserisci data e ora"
          className="input input-bordered input-primary w-full max-w-xs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex justify-center my-4">
        <h2>Date non disponibili</h2>
      </div>
      {date.map((when, index) => (
        <section key={index} className="mx-2 my-2 flex justify-center">
          <p>Data: {when}</p>
        </section>
      ))}
      <div className="fixed z-30 bottom-28 left-1/2 translate-x-[-50%] w-10/12">
        <button id="push" className="btn btn-primary w-full" onClick={click}>
          Avanti
        </button>
      </div>
    </>
  );
};

export default Reservation;
