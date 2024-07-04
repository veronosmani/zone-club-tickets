import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import dropdownArrow from "../../assets/dropdownArrow.png";
import printIcon from '../../assets/printIcon.png'

const Print = () => {
  const location = useLocation();
  const { selectedEvent, inputM, inputF } = location.state || {
    selectedEvent: { id: 1, name: "Event 1", priceM: 10, priceF: 5 },
    inputM: "3",
    inputF: "2"
  };

  const calculatePrice = (input, price) => {
    return input * price;
  };

  const totalPrice = calculatePrice(inputM, selectedEvent.priceM) + calculatePrice(inputF, selectedEvent.priceF);

  return (
    <div className="w-full min-h-screen flex flex-col items-center" style={{ backgroundColor: "#101010" }}>
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex flex-row w-[1000px] h-[50px] justify-between items-center px-5 bg-[#515151] rounded-md relative">
          <h1 className="text-white font-bold text-2xl">{selectedEvent.name}</h1>
          <button disabled>
            <img src={dropdownArrow} alt="Dropdown Arrow" />
          </button>
        </div>
      </div>
      <div className="flex flex-row mt-10 w-[1000px] h-[230px] justify-between items-start">
        <div>
          <h1 className="w-[425px] bg-[#515151] h-[50px] flex items-center justify-center rounded-t-md text-white text-4xl">
            M
          </h1>
          <div className="p-4 rounded-b-md w-[425px] h-[300px] flex flex-col items-center" style={{ backgroundColor: "#191919" }}>
            <input
              type="number"
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-white text-center custom-number-input"
              style={{ backgroundColor: "#191919" }}
              value={inputM}
              readOnly
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-white text-3xl text-center">
              {calculatePrice(inputM, selectedEvent.priceM)}€
            </h1>
          </div>
        </div>
        <div>
          <h1 className="w-[425px] bg-[#515151] h-[50px] flex items-center justify-center rounded-t-md text-white text-4xl">
            F
          </h1>
          <div className="p-4 rounded-b-md w-[425px] h-[300px] flex flex-col items-center" style={{ backgroundColor: "#191919" }}>
            <input
              type="number"
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-white text-center custom-number-input"
              style={{ backgroundColor: "#191919" }}
              value={inputF}
              readOnly
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-white text-3xl text-center">
              {calculatePrice(inputF, selectedEvent.priceF)}€
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full absolute bottom-10">
        <div className="w-[500px] h-[60px] text-white flex items-center justify-center text-xl rounded-t-md" style={{ backgroundColor: "#191919" }}>
          TOTAL: {totalPrice}€
        </div>
        <button className="w-[500px] h-[60px] bg-red-600 text-white text-xl rounded-b-md flex items-center justify-center">
          PRINT
          <img src={printIcon} style={{ marginLeft: '5px' }} />
        </button>
      </div>
    </div>
  );
};

export default Print;