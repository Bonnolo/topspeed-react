import Image from "next/image";
import logo from "./img/imagetopspeed.png";

const Header = () => {
  return (
    <header className="flex justify-center">
      <Image src={logo} alt="logo" />
    </header>
  );
};

export default Header;
