import React from 'react';
import zoneLogo from '../../assets/ZoneLogo.png';
import QRCode from 'qrcode.react';

const PrintContent = React.forwardRef(({ selectedEvent, inputM, inputF, dateTime }, ref) => {
  const generateTicketPages = () => {
    const pages = [];
    for (let i = 0; i < inputM; i++) {
      pages.push(
        <div className="ticket-page" key={`m-${i}`}>
          <div className="ticket-header bg-white text-black">
            <img src={zoneLogo} alt="Zone Logo" style={{ width: '150px' }} />
            <div className='items-end '>
              <h1>{new Date(dateTime).toLocaleTimeString()}</h1>
              <h1>{selectedEvent.name}</h1>
            </div>
          </div>
          <div className="qr-code-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <QRCode
              value={`Event: ${selectedEvent.name} - M Tickets\nDate: ${new Date(dateTime).toLocaleString()}`}
              size={256}
              level={"H"}
            />
          </div>
        </div>
      );
    }
    for (let i = 0; i < inputF; i++) {
      pages.push(
        <div className="ticket-page" key={`f-${i}`}>
          <div className="ticket-header bg-black text-white" >
            <img src={zoneLogo} alt="Zone Logo" style={{ width: '150px' }} />
            <div style={{ textAlign: 'right' }}>
              <h1>{selectedEvent.date} / {new Date(dateTime).toLocaleTimeString()}</h1>
              <h1>{selectedEvent.name}</h1>
            </div>
          </div>
          <div className="qr-code-container bg-white" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <QRCode
              value={`Event: ${selectedEvent.name} - F Tickets\nDate: ${new Date(dateTime).toLocaleString()}`}
              size={256}
              level={"H"}
            />
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
