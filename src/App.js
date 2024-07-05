import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generate from "./Tickets/Pages/Generate";
import Login from "./Tickets/Pages/Login";
import Print from "./Tickets/Pages/Print";  // Import the new page
import PrintContent from './Tickets/Components/PrintContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/print" element={<Print />} />  {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
