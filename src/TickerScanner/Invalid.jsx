import React from "react";
import invalidCircle from "../assets/invalidCircle.png";
import scanIcon from "../assets/scanIcon.png";

const Valid = () => {
  return (
    <div className="max-w-[400px] min-h-screen bg-black flex flex-col items-center mx-auto">
      <div className="relative mt-60">
        <img src={invalidCircle} alt="Valid Circle" className="w-full" />
        <h1 className="absolute inset-0 flex text-[35px] items-center justify-center text-white poppins-black">
          INVALID
        </h1>
      </div>
      <div className="absolute bottom-5 w-[350px] h-[140px] bg-red-600 mx-auto rounded-[5px]">
        <button className="flex w-[350px] h-[140px] items-center justify-center space-x-3">
          <img src={scanIcon} />
          <h1 className="poppins-bold text-[24px] text-white">SCAN</h1>
        </button>
      </div>
    </div>
  );
};

export default Valid;
