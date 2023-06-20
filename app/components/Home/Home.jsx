"use client";
import Image from "next/image";
import misano from "../img/misano.png";

const Home = () => {
  return (
    <>
      <h1 className="flex justify-center my-4 text-lg">Home</h1>
      <div className="flex justify-center">
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure className="px-4">
            <Image src={misano} alt="misano" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Misano</h2>
            <p>
              <strong>Indirizzo:</strong> Via Daijiro Kato, 10 -<br /> 47843
              Misano Adriatico (RN) <br /> <strong>Prossimo evento:</strong> Gio
              29 Giu | 15:30 <br />
              <strong>Record della pista:</strong> 1:31:100
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
    </>
  );
};

export default Home;
