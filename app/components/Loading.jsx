import Image from "next/image";
import fullLogo from "./img/logocompleto.png";

const Loading = () => {
  return (
    <>
      <div className="bg-black absolute z-10 h-screen w-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <Image className="w-[50vw]" src={fullLogo} alt="Logo" />
          <span className="loading loading-spinner text-primary mx-auto mt-20"></span>
        </div>
      </div>
    </>
  );
};

export default Loading;
