import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceManagement from "./pages/Services";
import IncidentsPage from "./pages/Incidents";
import Teams from "./pages/Teams"; // ✅ Import Teams page
import PublicStatusPage from "./pages/PublicStatusPage"; 
function App() {
  console.log("App rendered");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<ServiceManagement />} />
       <Route path="/incidents" element={<IncidentsPage />} />
         <Route path="/teams" element={<Teams />} /> {/* ✅ New route */}
      <Route path="/status" element={<PublicStatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;

