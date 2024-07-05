import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generate from "./Tickets/Pages/Generate";
import Login from "./Tickets/Pages/Login";
import Print from "./Tickets/Pages/Print";  
import Valid from './TickerScanner/Valid';
import Invalid from './TickerScanner/Invalid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/print" element={<Print />} />  
        <Route path='/valid' element={<Valid />} />
        <Route path='/invalid' element={<Invalid />} />
      </Routes>
    </Router>
  );
}

export default App;
