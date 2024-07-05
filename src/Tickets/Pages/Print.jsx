import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import ReactToPrint from 'react-to-print';
import printIcon from '../../assets/printIcon.png';
import PrintContent from '../Components/PrintContent';

const Print = () => {
  const location = useLocation();
  const { selectedEvent, inputM, inputF, dateTime } = location.state || {
    selectedEvent: { id: 1, name: "Event 1", priceM: 10, priceF: 5 },
    inputM: "3",
    inputF: "2",
    dateTime: new Date().toISOString()
  };

  const printRef = useRef();

  return (
    <div className="w-full min-h-screen flex flex-col items-center" style={{ backgroundColor: "#101010" }}>
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex flex-row w-[1000px] h-[50px] justify-between items-center px-5 bg-[#515151] rounded-md relative">
          <h1 className="text-white font-bold text-2xl">{selectedEvent.name}</h1>
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
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-white text-center"
              style={{ backgroundColor: "#191919" }}
              value={inputM}
              readOnly
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-white text-3xl text-center">
              {inputM * selectedEvent.priceM}€
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
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-white text-center"
              style={{ backgroundColor: "#191919" }}
              value={inputF}
              readOnly
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-white text-3xl text-center">
              {inputF * selectedEvent.priceF}€
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full absolute bottom-10">
        <div className="w-[500px] h-[60px] text-white flex items-center justify-center text-xl rounded-t-md" style={{ backgroundColor: "#191919" }}>
          TOTAL: {(inputM * selectedEvent.priceM) + (inputF * selectedEvent.priceF)}€
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="w-[500px] h-[60px] bg-red-600 text-white text-xl rounded-b-md flex items-center justify-center">
              PRINT
              <img src={printIcon} style={{ marginLeft: '5px' }} />
            </button>
          )}
          content={() => printRef.current}
          onBeforePrint={() => {
            console.log('Preparing content for printing...');
          }}
          onAfterPrint={() => {
            console.log('Print completed.');
          }}
        />
      </div>
      {/* Render PrintContent but keep it hidden on screen */}
      <div className="printable-content">
        <PrintContent ref={printRef} selectedEvent={selectedEvent} inputM={inputM} inputF={inputF} dateTime={dateTime} />
      </div>
    </div>
  );
};

export default Print;
