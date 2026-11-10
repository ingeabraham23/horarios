// eslint-disable-next-line no-unused-vars
import React from "react";
import Principal from "./components/Principal";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import USBPublicidad from "./components/USBPublicidad";
import Invitacion from "./components/Invitacion";
import GeneradorPDF from "./components/GeneradorPDF";

function App() {
    return (
      <HashRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Principal />} />
              <Route path="/publicidad" element={<USBPublicidad />} />
              <Route path="/invitacion" element={<Invitacion />} />
              <Route path="/pdf" element={<GeneradorPDF />} />
            </Routes>
          </div>
      </HashRouter>
    );
}

export default App;
