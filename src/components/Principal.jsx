/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useMemo } from "react";
import es from "date-fns/locale/es";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Tabla from "../components/tabla";
import EditableTabla from "../components/tablaEditable";

import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../estilos.css";

registerLocale("es", es);

// Fecha inicial para la rotación de grupos
const DIA_CERO = new Date(2023, 3, 26);

// Grupos iniciales
const GRUPOS_INICIALES = [
  { nombre: "GRUPO 7", numeros: [6, 15, 18, 37, 5, 8, 0] },
  { nombre: "GRUPO 6", numeros: [14, 22, 29, 41, 42, 0] },
  { nombre: "GRUPO 5", numeros: [7, 13, 19, 33, 47, 0] },
  { nombre: "GRUPO 4", numeros: [4, 10, 27, 31, 0] },
  { nombre: "GRUPO 3", numeros: [11, 28, 34, 38, 39, 3, 0] },
  { nombre: "GRUPO 2", numeros: [12, 20, 40, 48, 17, 2, 0] },
  { nombre: "GRUPO 1", numeros: [1, 9, 25, 36, 46, 30, 0] },
  { nombre: "GRUPO 8", numeros: [16, 21, 24, 35, 43, 0] },
];

function Principal() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    () => new Date()
  );

  const [grupos, setGrupos] = useState(GRUPOS_INICIALES);

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  // Rotación automática de grupos según la fecha
  const gruposRotados = useMemo(() => {
    if (!fechaSeleccionada || grupos.length === 0) {
      return grupos;
    }

    const dia = 24 * 60 * 60 * 1000;

    const fechaInicio = Date.UTC(
      DIA_CERO.getFullYear(),
      DIA_CERO.getMonth(),
      DIA_CERO.getDate()
    );

    const fechaFin = Date.UTC(
      fechaSeleccionada.getFullYear(),
      fechaSeleccionada.getMonth(),
      fechaSeleccionada.getDate()
    );

    const diasTranscurridos = Math.round(
      (fechaFin - fechaInicio) / dia
    );

    const rotaciones =
      ((diasTranscurridos % grupos.length) + grupos.length) %
      grupos.length;

    if (rotaciones === 0) {
      return grupos;
    }

    return [
      ...grupos.slice(-rotaciones),
      ...grupos.slice(0, -rotaciones),
    ];
  }, [fechaSeleccionada, grupos]);

  // Eventos de instalación PWA
  useEffect(() => {
    const manejarInstalacion = (event) => {
      event.preventDefault();

      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    };

    const manejarAppInstalada = () => {
      window.deferredPrompt = null;
      setIsReadyForInstall(false);
    };

    window.addEventListener(
      "beforeinstallprompt",
      manejarInstalacion
    );

    window.addEventListener(
      "appinstalled",
      manejarAppInstalada
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        manejarInstalacion
      );

      window.removeEventListener(
        "appinstalled",
        manejarAppInstalada
      );
    };
  }, []);

  // Mostrar el aviso de instalación
  async function downloadApp() {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      setIsReadyForInstall(false);
      return;
    }

    promptEvent.prompt();

    await promptEvent.userChoice;

    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return (
    <div>
      <hr />
      <hr />
      <hr />
      <hr />

      {isReadyForInstall && (
        <button
          className="button-app"
          onClick={downloadApp}
        >
          Instalar{" "}
          <FontAwesomeIcon icon={faFileDownload} />
        </button>
      )}

      <br />

      <EditableTabla
        grupos={grupos}
        onGruposChange={setGrupos}
      />

      <br />

      <DatePicker
        showIcon
        withPortal
        selected={fechaSeleccionada}
        onChange={(fecha) => {
          if (fecha) {
            setFechaSeleccionada(fecha);
          }
        }}
        dateFormat="EEEE, d 'de' MMMM 'de' y"
        locale="es"
        onFocus={(e) => {
          e.target.readOnly = true;
          e.target.blur();
        }}
      />

      <Tabla
        grupos={gruposRotados}
        fecha={fechaSeleccionada}
      />
    </div>
  );
}

export default Principal;
