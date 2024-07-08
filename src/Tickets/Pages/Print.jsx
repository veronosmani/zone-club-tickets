import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import ReactToPrint from 'react-to-print';
import printIcon from '../../assets/printIcon.png';
import PrintContent from '../Components/PrintContent';

const Print = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedEvent, inputM, inputF, dateTime } = location.state || {
    selectedEvent: { id: 1, name: "Event 1", date: "03/07", priceM: 10, priceF: 5 },
    inputM: "3",
    inputF: "2",
    dateTime: new Date().toISOString()
  };

  const printRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);
  const [printAttempted, setPrintAttempted] = useState(false);
  const [retry, setRetry] = useState(false);

  const handleBeforePrint = () => {
    setIsPrinting(true);
    setRetry(false);
  };

  const handleAfterPrint = () => {
    if (isPrinting) {
      setIsPrinting(false);
      navigate('/generate'); 
    }
  };

  const handlePrintError = () => {
    setIsPrinting(false);
    if (!retry) {
      setRetry(true);
    }
  };

  useEffect(() => {
    if (retry) {
      setPrintAttempted(false);
    }
  }, [retry]);

  useEffect(() => {
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [isPrinting, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center" style={{ backgroundColor: "#101010" }}>
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex flex-row w-[1000px] h-[50px] justify-between items-center px-5 bg-[#323232] rounded-md relative">
          <h1 className="text-static font-bold text-2xl poppins-bold">{selectedEvent.name} - {selectedEvent.date}</h1>
        </div>
      </div>
      <div className="flex flex-row mt-10 w-[1000px] h-[230px] justify-between items-start">
        <div>
          <h1 className="w-[425px] bg-[#323232] h-[50px] flex items-center justify-center rounded-t-md text-static text-4xl play-bold">
            M
          </h1>
          <div className="p-4 rounded-b-md w-[425px] h-[300px] flex flex-col items-center" style={{ backgroundColor: "#191919" }}>
            <input
              type="number"
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-static text-center custom-number-input play-bold"
              style={{ backgroundColor: "#191919" }}
              value={inputM}
              readOnly
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-static text-3xl text-center poppins-semibold">
              {inputM * selectedEvent.priceM}€
            </h1>
          </div>
        </div>
        <div>
          <h1 className="w-[425px] bg-[#323232] h-[50px] flex items-center justify-center rounded-t-md text-static text-4xl play-bold">
            F
          </h1>
          <div className="p-4 rounded-b-md w-[425px] h-[300px] flex flex-col items-center" style={{ backgroundColor: "#191919" }}>
            <input
              type="number"
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-static text-center custom-number-input play-bold"
              style={{ backgroundColor: "#191919" }}
              value={inputF}
              readOnly
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-static text-3xl text-center poppins-semibold">
              {inputF * selectedEvent.priceF}€
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full absolute bottom-10">
        <div className="w-[500px] h-[60px] text-white flex items-center justify-center text-xl rounded-t-md poppins-bold" style={{ backgroundColor: "#191919" }}>
          TOTAL: {(inputM * selectedEvent.priceM) + (inputF * selectedEvent.priceF)}€
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="w-[500px] h-[60px] bg-red-600 text-white text-xl rounded-b-md flex items-center justify-center poppins-bold">
              PRINT
              <img src={printIcon} style={{ marginLeft: '5px' }} alt="Print Icon" />
            </button>
          )}
          content={() => printRef.current}
          onBeforeGetContent={() => {
            setPrintAttempted(true);
            return Promise.resolve();
          }}
          onBeforePrint={handleBeforePrint}
          onPrintError={handlePrintError}
          onAfterPrint={handleAfterPrint}
        />
      </div>
      <div style={{ display: 'none' }}>
        <PrintContent ref={printRef} selectedEvent={selectedEvent} inputM={inputM} inputF={inputF} dateTime={dateTime} />
      </div>
    </div>
  );
};

export default Print;
