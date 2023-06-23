"use client";

import Search from "./Search.jsx";
//
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase.js";

const Reservation = ({ circuitID }) => {
  const [value, setValue] = useState(() => {
    let date = new Date();
    date.setHours(new Date().getHours() + 2);
    let localDate = date.toISOString().slice(0, 16);
    return localDate;
  });
  const [events, setEvents] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [id, setId] = useState(circuitID[0]);
  const [date, setDate] = useState([]);
  const [pushed, setPushed] = useState(false);
  const [error, setError] = useState(true);
  const [location, setLocation] = useState(circuitID[1]);
  const [partecipants, setPartecipants] = useState();

  //gets the dates events from the db
  useEffect(() => {
    console.log(circuitID, "circuitID");
    //console.log(id, "id");
    const getDates = async () => {
      const { data } = await supabase
        .from("reservation")
        .select("*")
        .eq("circuit", id);
      //.then((res) => console.log(res.data, "done"));
      setEvents(
        data.map((data) => {
          return data.date_event;
        })
      );
    };
    getDates();
  }, []);

  //gets the dates from the db and converts them to a readable format
  useEffect(() => {
    //console.log(events, "events");
    setDate(
      events.map((when) => {
        //console.log(when, "when");
        const newDate = new Date(when);
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
  }, [events, pushed]);

  //checks if the date is already in the db || if the date is empty
  useEffect(() => {
    setError(false);
    console.log(events, "events");
    events.map((date) => {
      console.log(date, "date");
      if (date.includes(value)) {
        setError(true);
        window.alert("Data non disponibile");
      }
    });
    if (value === "") {
      window.alert("Inserisci una data");
      setError(true);
    }
    if (partecipants === 0) {
      window.alert("Inserisci il numero di partecipanti");
      setError(true);
    }
  }, [value, partecipants]);

  //pushes the new date to the db
  useEffect(() => {
    if (pushed && !error) {
      const pushDate = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        //console.log(user.user_metadata.username, "user");
        const { error } = await supabase.from("reservation").insert([
          {
            username: user.user_metadata.username,
            circuit: id,
            date_event: value,
            location: location,
          },
        ]);
        const { data } = await supabase
          .from("reservation")
          .select("*")
          .eq("circuit", id);
        //.then((res) => console.log(res.data, "done"));
        setEvents(
          data.map((data) => {
            return data.date_event;
          })
        );
        //console.log(data, "db");
        window.alert("Prenotazione avvenuta con successo");
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
      <div className="flex justify-center flex-wrap">
        <input
          type="datetime-local"
          placeholder="Inserisci data e ora"
          className="input input-bordered input-primary w-full max-w-xs my-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <h2 className="flex justify-center my-4">Date non disponibili</h2>
      <div className="relative h-[350px] overflow-hidden">
        <section className="mx-2 max-h-[340px] overflow-auto my-2 flex justify-center">
          <div>
            {date.map((when, index) => (
              <p key={index}> {when}</p>
            ))}
          </div>
        </section>
      </div>
      <div className="fixed z-30 bottom-28 left-1/2 translate-x-[-50%] w-10/12">
        <button
          id="push"
          className="btn btn-primary w-full"
          onClick={click}
          disabled={error}
        >
          Avanti
        </button>
      </div>
    </>
  );
};

export default Reservation;
