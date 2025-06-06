import React, { useState, useEffect } from "react";
import es from "date-fns/locale/es";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tabla from "../components/tabla";
import "../estilos.css";
import EditableTabla from "../components/tablaEditable";
import {faFileDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
registerLocale("es", es);

function Principal() {
  const fechaActual = new Date(); // Obtiene la fecha actual
  const diaCero = new Date(2023, 3, 26); // Fecha inicial para rotar los grupos
  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaActual); // Estado para la fecha seleccionada en el DatePicker, se inicializa con la fecha en que se esta ejecutando la aplicación

  const [grupos, setGrupos] = useState([
    { nombre: "GRUPO 7", numeros: [7, 18, 37, 42, 8, 15, 0] },
    { nombre: "GRUPO 6", numeros: [6, 14, 22, 29, 41, 0] },
    { nombre: "GRUPO 5", numeros: [13, 19, 33, 47, 5, 0] },
    { nombre: "GRUPO 4", numeros: [4, 12, 20, 31, 0] },
    { nombre: "GRUPO 3", numeros: [11, 28, 38, 39, 3, 0] },
    { nombre: "GRUPO 2", numeros: [10, 27, 34, 40, 2, 0] },
    { nombre: "GRUPO 1", numeros: [1, 9, 25, 36, 46, 30, 0] },
    { nombre: "GRUPO 8", numeros: [16, 21, 24, 35, 43, 0] },
  ]); // Estado para los grupos de Unidades

  const gruposRotados = rotarGrupos();

  function obtenerDiasDeDiferencia(fechaSeleccionada, fechaDiaCero) {
    const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día: 86,400,000
    const diffEnMilisegundos = fechaSeleccionada - fechaDiaCero; //Diferencia de 2 Fechas en Milisegundos
    const dias = Math.floor(diffEnMilisegundos / unDia); //Diferencia de 2 fechas en Días, Usando Math.floor para redondear al piso, es decir, si el resultado es 8.36 se redondea a 8 ya que la fecha diaCero esta inicializada a las 0 horas y si yo hago el calculo a las 9 horas ya habra una diferencia de 9 horas
    return dias;
  } // Obtiene el número de días entre dos fechas

  function rotarGrupos() {
    const diasTranscurridos = obtenerDiasDeDiferencia(
      fechaSeleccionada,
      diaCero
    );
    const rotaciones = diasTranscurridos % grupos.length; //Se obtiene el numero de rotaciones:Obteniendo el Modulo de: dias transcurridos, entre en tamaño del array grupos.
    const gruposRotados = [
      ...grupos.slice(-rotaciones),
      ...grupos.slice(0, -rotaciones),
    ];
    return gruposRotados;
  }

  function manejarFechaSeleccionada(fecha) {
    setFechaSeleccionada(fecha);
  }

  function manejarCambioEnGrupos(nuevosGrupos) {
    setGrupos(nuevosGrupos);
  }

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
      {isReadyForInstall && (
        <button className="button-app" onClick={downloadApp}>Instalar <FontAwesomeIcon icon={faFileDownload} /> </button>
      )}
      <EditableTabla
        grupos={grupos}
        onGruposChange={manejarCambioEnGrupos}
      ></EditableTabla>
      <DatePicker
        showIcon
        withPortal
        selected={fechaSeleccionada}
        onChange={manejarFechaSeleccionada}
        dateFormat="EEEE, d 'de' MMMM 'de' y"
        locale="es"
        onFocus={(e) => {
          e.target.readOnly = true;
          e.target.blur();
        }}
      />
      <Tabla grupos={gruposRotados} fecha={fechaSeleccionada} />
    </div>
  );
}

export default Principal;
