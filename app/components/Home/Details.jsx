"use client";
import Home from "./Home";
import { useState, useEffect, use } from "react";
import { supabase } from "../../../supabase.js";
import Image from "next/image";

import misanoMap from "../img/misanoMap.png";
import monzaMap from "../img/monzaMap.png";

const Details = ({ eventID }) => {
  const [back, setBack] = useState(false);
  const [eventInfo, setEventInfo] = useState([]);
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    const eventData = async () => {
      //console.log(eventID, "eventID");
      const { data } = await supabase
        .from("reservation")
        .select("*")
        .eq("id", eventID);
      //console.log(data, "data");
      setEventInfo(data[0]);
    };
    eventData();
  }, []);

  useEffect(() => {
    if (eventInfo.circuit === "Misano") {
      setImgSrc(misanoMap);
    }
    if (eventInfo.circuit === "Monza") {
      setImgSrc(monzaMap);
    }
  }, [eventInfo]);

  if (back) {
    return <Home />;
  }
  return (
    <>
      <div className="grid grid-cols-3">
        <button
          onClick={(e) => {
            const back = true;
            setBack(back);
          }}
          className="flex justify-center items-center"
        >
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
        <h1 className="my-4 text-lg text-center">{eventInfo.circuit}</h1>
        <div className="flex justify-center items-center">
          <button className="btn btn-outline btn-primary">Iscriviti</button>
        </div>
      </div>
      <div className="bg-white my-4 mx-4 rounded-md">
        <Image src={imgSrc} />
      </div>
      <div className="grid grid-cols-2">
        <h1 className="flex justify-center">Data:</h1>
        <p className="flex justify-center">c</p>
        <h1 className="flex justify-center">Indirizzo</h1>
        <p className="flex justify-center">c</p>
        <h1 className="flex justify-center"></h1>
        <p className="flex justify-center">c</p>
        <h1 className="flex justify-center">Persone:</h1>
        <p className="flex justify-center"></p>
      </div>
    </>
  );
};
export default Details;
