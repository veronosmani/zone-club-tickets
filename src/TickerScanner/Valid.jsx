import React from "react";
import validCircle from "../assets/validCircle.png";
import scanIcon from "../assets/scanIcon.png";

const Valid = () => {
  return (
    <div className="max-w-[400px] min-h-screen bg-black flex flex-col items-center mx-auto">
      <div className="flex flex-col mt-0 pb-0">
        <div className="flex mt-14 w-[270px] h-[40px] items-center justify-center mx-auto border border-gray-500 ">
          <h1 className="text-white poppins-light text-[12px] tracking-[0.4rem]">events name</h1>
        </div>
        <div className="flex w-[270px] h-[120px] items-center justify-center mx-auto border border-gray-500">
          <h1 className="poppins-bold text-white text-[24px]">Event name</h1>
        </div>
      </div>
      <div className="relative mt-10">
        <img src={validCircle} alt="Valid Circle" className="w-full" />
        <h1 className="absolute inset-0 flex text-[40px] items-center justify-center text-white poppins-black">
          PASS
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
