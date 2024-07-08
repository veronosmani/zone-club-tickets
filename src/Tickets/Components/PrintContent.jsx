import React from "react";
import TicketLogoM from "../../assets/TicketLogoM.png";
import TicketLogoW from "../../assets/TicketLogoW.png";
import { QRCode } from "react-qrcode-logo";
import ZoneQr from "../../assets/ZoneQr.svg";

const PrintContent = React.forwardRef(
  ({ selectedEvent, inputM, inputF, dateTime }, ref) => {
    const generateTicketPages = () => {
      const pages = [];
      const qrCodeSize = 175;

      const formattedDate = new Date(dateTime).toLocaleDateString();
      const formattedTime = new Date(dateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      for (let i = 0; i < inputM; i++) {
        const uniqueValue = `${
          selectedEvent.name
        }-M-${formattedDate}-${formattedTime}-${i}-${Math.random()
          .toString(36)
          .substring(7)}`;
        pages.push(
          <div
            className="w-[288px] h-[288px] m-2 border-2 border-black"
            key={`m-${i}`}
            style={{ backgroundColor: "#323232" }}
          >
            <div className="bg-white text-black flex justify-between items-center p-2.5 h-[70px]">
              <img src={TicketLogoM} alt="M Ticket Logo" className="w-14 h-8" />
              <div className="text-right poppins-semibold text-[13px]">
                <h1>
                  {formattedDate} - {formattedTime}
                </h1>
                <h1>{selectedEvent.name}</h1>
              </div>
            </div>
            <div
              className="flex justify-center items-center"
              style={{ height: "calc(288px - 74px)" }}
            >
              {dateTime && (
                <QRCode
                  value={`Event: ${
                    selectedEvent.name
                  } - M Tickets\nDate: ${new Date(
                    dateTime
                  ).toLocaleString()}\nUnique: ${uniqueValue}`}
                  size={qrCodeSize}
                  bgColor="#323232"
                  fgColor="white"
                  logoImage={ZoneQr}
                  logoWidth={30}
                  logoHeight={30}
                  logoOpacity={1}
                  qrStyle="squares"
                  removeQrCodeBehindLogo={true}
                />
              )}
            </div>
          </div>
        );
      }
      for (let i = 0; i < inputF; i++) {
        const uniqueValue = `${
          selectedEvent.name
        }-F-${formattedDate}-${formattedTime}-${i}-${Math.random()
          .toString(36)
          .substring(7)}`;
        pages.push(
          <div
            className="w-[288px] h-[288px] m-2 border-2 border-black"
            key={`f-${i}`}
            style={{ backgroundColor: "#323232" }}
          >
            <div className="text-white flex justify-between items-center p-2.5 h-[70px] bg-[#323232]">
              <img src={TicketLogoW} alt="W Ticket Logo" className="w-14 h-8" />
              <div className="text-right poppins-semibold text-[13px]">
                <h1>
                  {formattedDate} - {formattedTime}
                </h1>
                <h1>{selectedEvent.name}</h1>
              </div>
            </div>
            <div
              className="flex justify-center items-center bg-white"
              style={{ height: "calc(288px - 74px)" }}
            >
              {dateTime && (
                <QRCode
                  value={`Event: ${
                    selectedEvent.name
                  } - F Tickets\nDate: ${new Date(
                    dateTime
                  ).toLocaleString()}\nUnique: ${uniqueValue}`}
                  size={qrCodeSize}
                  bgColor="white"
                  fgColor="#323232"
                  logoImage={ZoneQr}
                  logoWidth={30}
                  logoHeight={30}
                  logoOpacity={1}
                  qrStyle="squares"
                  removeQrCodeBehindLogo={true}
                />
              )}
            </div>
          </div>
        );
      }
      return pages;
    };

    return (
      <div ref={ref} className="printable-content flex flex-wrap">
        {generateTicketPages()}
      </div>
    );
  }
);

export default PrintContent;
