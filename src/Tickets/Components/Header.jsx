import React from "react";
import zoneLogo from "../../assets/ZoneLogo.png";
import NavbarButton from "../../assets/Navbar-button.png";

const Header = () => {
  return (
    <div className="bg-black w-full h-20 flex items-center justify-between px-[120px] relative mb-5">
      <img 
        src={zoneLogo} 
        alt="Zone Logo" 
        className="absolute top-0 h-[52px]" 
      />
      <button 
        className="absolute right-[120px] w-10 h-10 bg-transparent flex items-center justify-center"
      >
        <img 
          src={NavbarButton} 
          alt="Navbar Button" 
          className="w-10 h-10" 
        />
      </button>
    </div>
  );
};

export default Header;
