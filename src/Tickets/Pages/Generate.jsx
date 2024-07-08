import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import dropdownArrow from "../../assets/dropdownArrow.png";
import generateIcon from "../../assets/Generate.png";

const Generate = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [priceM, setPriceM] = useState(0);
  const [priceF, setPriceF] = useState(0);
  const [inputM, setInputM] = useState("");
  const [inputF, setInputF] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [eventName, setEventName] = useState("Event name");
  const [dateTime, setDateTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [extraDropdownOpen, setExtraDropdownOpen] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState(null);

  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchedEvents = [
      { id: 1, name: "Wednesday Night", date: "03/07", priceM: 10, priceF: 5 },
      { id: 2, name: "Friday Night", date: "05/07", priceM: 15, priceF: 10 },
      { id: 3, name: "Saturday Night", date: "06/07", priceM: 20, priceF: 10 },
    ];
    setEvents(fetchedEvents);

    const storedEvent = sessionStorage.getItem("selectedEvent");
    const storedExtra = sessionStorage.getItem("selectedExtra");
    let event = null;

    if (storedEvent) {
      event = JSON.parse(storedEvent);
      setSelectedEvent(event);
      setEventName(event.name);
      setEventDate(event.date);
    }

    if (storedExtra) {
      setSelectedExtra(storedExtra);
    }

    if (userEmail === "admin@gmail.com") {
      setPriceM(0);
      setPriceF(0);
    } else if (event) {
      setPriceM(event.priceM);
      setPriceF(event.priceF);
    }
  }, [userEmail]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setEventName(event.name);
    setEventDate(event.date);
    setDropdownOpen(false);
    sessionStorage.setItem("selectedEvent", JSON.stringify(event));

    if (userEmail === "admin@gmail.com") {
      setPriceM(0);
      setPriceF(0);
    } else {
      setPriceM(event.priceM);
      setPriceF(event.priceF);
    }
  };

  const handleExtraSelect = (extra) => {
    setSelectedExtra(extra);
    setExtraDropdownOpen(false);
    sessionStorage.setItem("selectedExtra", extra);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleExtraDropdown = () => {
    setExtraDropdownOpen(!extraDropdownOpen);
  };

  const handleInputChangeM = (e) => {
    setInputM(e.target.value.replace(/^0+/, ""));
  };

  const handleInputChangeF = (e) => {
    setInputF(e.target.value.replace(/^0+/, ""));
  };

  const calculatePrice = (input, price) => {
    return input * price;
  };

  const totalPrice = calculatePrice(inputM, priceM) + calculatePrice(inputF, priceF);

  const handleGenerate = () => {
    const now = new Date();
    const tickets = {
      selectedEvent,
      inputM,
      inputF,
      dateTime: now.toISOString(),
      selectedExtra,
    };
    setDateTime(tickets.dateTime);
    navigate("/print", { state: tickets });
  };

  const isGenerateDisabled = !selectedEvent || (!inputM && !inputF) || (userEmail === "admin@gmail.com" && !selectedExtra);

  const inputHeightClass = userEmail === "admin@gmail.com" ? "h-[150px]" : "h-[200px]";
  const inputDivHeightClass = userEmail === "admin@gmail.com" ? "h-[250px]" : "h-[300px]";

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center"
      style={{ backgroundColor: "#101010" }}
    >
      <Header />
      <div className="flex justify-center w-full">
        <div className="flex flex-row w-[1000px] h-[50px] justify-between items-center px-5 bg-red-600 rounded-md relative">
          <button
            onClick={toggleDropdown}
            className="flex flex-row justify-between items-center w-full"
          >
            <h1 className="text-white font-bold text-2xl poppins-bold">
              {eventName} {eventDate && ` - ${eventDate}`}
            </h1>
            <img src={dropdownArrow} alt="Dropdown Arrow" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full right-0 bg-white w-full rounded-md shadow-lg z-10">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleEventSelect(event)}
                >
                  {event.name} - {event.date}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {userEmail === "admin@gmail.com" && (
        <div className="flex justify-center w-full mt-4 -mb-4">
          <div className="flex flex-row w-[1000px] h-[50px] justify-between items-center px-5 bg-red-600 rounded-md relative">
            <button
              onClick={toggleExtraDropdown}
              className="flex flex-row justify-between items-center w-full"
            >
              <h1 className="text-white font-bold text-2xl poppins-bold">
                {selectedExtra ? selectedExtra : "Select Admin"}
              </h1>
              <img src={dropdownArrow} alt="Dropdown Arrow" />
            </button>
            {extraDropdownOpen && (
              <div className="absolute top-full right-0 bg-white w-full rounded-md shadow-lg z-10">
                {["Admin 1", "Admin 2", "Admin 3"].map((extra) => (
                  <div
                    key={extra}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleExtraSelect(extra)}
                  >
                    {extra}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-row mt-10 w-[1000px] justify-between items-start">
        <div className={`w-[425px] ${inputDivHeightClass}`}>
          <h1 className="w-full bg-red-600 h-[50px] flex items-center justify-center rounded-t-md text-white text-4xl play-bold">
            M
          </h1>
          <div
            className={`p-4 rounded-b-md w-full flex flex-col items-center ${inputDivHeightClass}`}
            style={{ backgroundColor: "#191919" }}
          >
            <input
              type="number"
              className={`w-full ${inputHeightClass} p-2 mb-4 outline-none text-[120px] text-white text-center custom-number-input play-bold`}
              style={{ backgroundColor: "#191919" }}
              onWheel={(e) => e.target.blur()}
              value={inputM}
              onChange={handleInputChangeM}
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-white text-3xl text-center poppins-semibold">
              {calculatePrice(inputM, priceM)}€
            </h1>
          </div>
        </div>
        <div className={`w-[425px] ${inputDivHeightClass}`}>
          <h1 className="w-full bg-red-600 h-[50px] flex items-center justify-center rounded-t-md text-white text-4xl play-bold">
            F
          </h1>
          <div
            className={`p-4 rounded-b-md w-full flex flex-col items-center ${inputDivHeightClass}`}
            style={{ backgroundColor: "#191919" }}
          >
            <input
              type="number"
              className={`w-full ${inputHeightClass} p-2 mb-4 outline-none text-[120px] text-white text-center custom-number-input play-bold`}
              style={{ backgroundColor: "#191919" }}
              onWheel={(e) => e.target.blur()}
              value={inputF}
              onChange={handleInputChangeF}
            />
            <div className="w-full h-[1px] bg-gray-600 mb-4"></div>
            <h1 className="text-white text-3xl text-center poppins-semibold">
              {calculatePrice(inputF, priceF)}€
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full absolute bottom-10">
        <div
          className="w-[500px] h-[60px] text-white flex items-center justify-center text-xl rounded-t-md poppins-bold"
          style={{ backgroundColor: "#191919" }}
        >
          TOTAL: {totalPrice}€
        </div>
        <button
          onClick={handleGenerate}
          className={`w-[500px] h-[60px] text-white text-xl rounded-b-md flex items-center justify-center poppins-bold ${
            isGenerateDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={isGenerateDisabled}
        >
          GENERATE
          <img src={generateIcon} alt="Generate Icon" style={{ marginLeft: "10px" }} />
        </button>
      </div>
    </div>
  );
};

export default Generate;
