import React from 'react';
import TicketLogoM from '../../assets/TicketLogoM.png';
import TicketLogoW from '../../assets/TicketLogoW.png';
import QRCode from 'qrcode.react';

const PrintContent = React.forwardRef(({ selectedEvent, inputM, inputF, dateTime }, ref) => {
  const generateTicketPages = () => {
    const pages = [];
    const qrCodeSize = 650; // Set a specific size for QR code to prevent issues

    const formattedDate = new Date(dateTime).toLocaleDateString();
    const formattedTime = new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    for (let i = 0; i < inputM; i++) {
      pages.push(
        <div className="w-full min-h-screen border-4 border-black" key={`m-${i}`} style={{ backgroundColor: "#323232" }}>
          <div className="bg-white text-black flex justify-between items-center p-5">
            <img src={TicketLogoM} alt="M Ticket Logo" className="w-36" />
            <div className="text-right">
              <h1>{formattedDate} - {formattedTime}</h1>
              <h1>{selectedEvent.name}</h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5" style={{ height: 'calc(100vh - 200px)' }}>
            {dateTime && (
              <QRCode
                value={`Event: ${selectedEvent.name} - M Tickets\nDate: ${new Date(dateTime).toLocaleString()}`}
                size={qrCodeSize}
                level={"H"}
              />
            )}
          </div>
        </div>
      );
    }
    for (let i = 0; i < inputF; i++) {
      pages.push(
        <div className="w-full min-h-screen border-4 border-black bg-white" key={`f-${i}`}>
          <div className="bg-black text-white flex justify-between items-center p-5">
            <img src={TicketLogoW} alt="W Ticket Logo" className="w-36" />
            <div className="text-right">
              <h1>{formattedDate} - {formattedTime}</h1>
              <h1>{selectedEvent.name}</h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5 bg-white" style={{ height: 'calc(100vh - 200px)' }}>
            {dateTime && (
              <QRCode
                value={`Event: ${selectedEvent.name} - F Tickets\nDate: ${new Date(dateTime).toLocaleString()}`}
                size={qrCodeSize}
                level={"H"}
              />
            )}
          </div>
        </div>
      );
    }
    return pages;
  };

  return (
    <div ref={ref} className="printable-content">
      {generateTicketPages()}
    </div>
  );
});

export default PrintContent;
