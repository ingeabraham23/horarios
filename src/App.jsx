// eslint-disable-next-line no-unused-vars
import React from "react";
import Principal from "./components/Principal";
import { HashRouter, Routes, Route } from "react-router-dom";
import Secundaria from "./components/Secundaria";
import Navbar from "./components/Navbar";

function App() {
    return (
      <HashRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Principal />} />
              <Route path="/secundaria" element={<Secundaria />} />
            </Routes>
          </div>
      </HashRouter>
    );
}

export default App;
