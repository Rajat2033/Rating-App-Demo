import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Stores from "./Stores";
import Dashboard from "./Dashboard";
import AddStore from "./addstore";
import OwnerDashboard from "./ownerDashboard"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/add-store" element={<AddStore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
