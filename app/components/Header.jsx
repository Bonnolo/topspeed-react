import Image from "next/image";
import logo from "./img/imagetopspeed.png";

const Header = () => {
  return (
    <header className="flex justify-center my-6">
      <Image src={logo} alt="logo" />
    </header>
  );
};

export default Header;
