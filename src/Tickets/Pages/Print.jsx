import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import zoneLogo from '../../assets/ZoneLogo.png';
import QRCode from "qrcode.react";
import dropdownArrow from "../../assets/dropdownArrow.png";
import printIcon from '../../assets/printIcon.png';

const Print = () => {
  const location = useLocation();
  const { selectedEvent, inputM, inputF, dateTime } = location.state || {
    selectedEvent: { id: 1, name: "Event 1", date: "03/07", priceM: 10, priceF: 5 },
    inputM: "3",
    inputF: "2",
    dateTime: new Date().toISOString()
  };

  useEffect(() => {
    handlePrint();
  }, []);

  const handlePrint = () => {
    const qrCodesContainer = document.getElementById('qrCodesContainer');
    qrCodesContainer.innerHTML = ''; // Clear any existing QR codes

    const data = [
      { value: inputM, type: 'M' },
      { value: inputF, type: 'F' }
    ];

    data.forEach((item) => {
      for (let i = 0; i < item.value; i++) {
        const qrCodeDiv = document.createElement('div');
        qrCodeDiv.classList.add('qrCode');
        qrCodeDiv.style.pageBreakAfter = 'always';
        qrCodeDiv.style.display = 'flex';
        qrCodeDiv.style.flexDirection = 'column';
        qrCodeDiv.style.alignItems = 'center';
        qrCodeDiv.style.justifyContent = 'center';
        qrCodeDiv.style.width = '100vw';
        qrCodeDiv.style.height = '100vh';

        const headerDiv = document.createElement('div');
        headerDiv.style.width = '100%';
        headerDiv.style.display = 'flex';
        headerDiv.style.justifyContent = 'space-between';
        headerDiv.style.alignItems = 'center';
        headerDiv.style.padding = '1rem';
        headerDiv.style.backgroundColor = item.type === 'M' ? 'black' : 'white';
        headerDiv.style.color = item.type === 'M' ? 'white' : 'black';

        const logoImg = document.createElement('img');
        logoImg.src = zoneLogo;
        logoImg.style.width = '150px';

        const eventInfoDiv = document.createElement('div');
        eventInfoDiv.style.textAlign = 'right';
        eventInfoDiv.innerHTML = `<h1>${selectedEvent.date} / ${new Date(dateTime).toLocaleTimeString()}</h1><h1>${selectedEvent.name}</h1>`;

        headerDiv.appendChild(logoImg);
        headerDiv.appendChild(eventInfoDiv);
        qrCodeDiv.appendChild(headerDiv);

        const qrCode = document.createElement('div');
        qrCode.style.margin = '20px';
        const qrText = `Event: ${selectedEvent.name} - ${item.type} Tickets\nDate: ${new Date(dateTime).toLocaleString()}`;
        new QRCode(qrCode, {
          text: qrText,
          width: 256,
          height: 256,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
        qrCodeDiv.appendChild(qrCode);

        qrCodesContainer.appendChild(qrCodeDiv);
      }
    });

    window.print();
  };

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
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-white text-center"
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
              className="w-full h-[200px] p-2 mb-4 outline-none text-[120px] text-white text-center"
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
        <button 
          onClick={handlePrint} 
          className="w-[500px] h-[60px] bg-red-600 text-white text-xl rounded-b-md flex items-center justify-center"
        >
          PRINT
          <img src={printIcon} style={{ marginLeft: '5px' }} />
        </button>
      </div>

      <div 
        id="qrCodesContainer" 
        className="hidden"
      ></div>
    </div>
  );
};

export default Print;
