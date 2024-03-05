/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faCameraRetro } from "@fortawesome/free-solid-svg-icons";

function Tabla({ grupos, fecha }) {
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const coloresFila = [
    "#EA17FC",
    "#1668E8",
    "#4AEC09",
    "#F6F90C",
    "#B4B4B2",
    "#4AEC09",
    "#F9AA01",
    "#EE4040",
  ];
  const rutas = [
    "Sosa",
    "Calicapan",
    "Coahuixco",
    "Tacopan",
    "San Isidro",
    "Coahuixco",
    "Tezotepec",
    "San Miguel",
  ];
  const tablaRef = useRef(null);
  const tacopanRef = useRef(null);
  const tacopanDetalleRef = useRef(null);

  function capturarTabla() {
    const tabla = tablaRef.current;
    html2canvas(tabla).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = fecha.toLocaleDateString("es-MX", opciones);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }
  function capturarTacopan() {
    const tabla = tacopanRef.current;
    html2canvas(tabla).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = fecha.toLocaleDateString("es-MX", opciones);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }
  function capturarTacopanDetalle() {
    const tabla = tacopanDetalleRef.current;
    html2canvas(tabla).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = fecha.toLocaleDateString("es-MX", opciones);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  return (
    <div>
      <table align="center" ref={tablaRef}>
        <thead>
          <tr>
            <th
              colSpan={4}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:15, 8:20, 9:30</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[0] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[0]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">6:30, 7:35, 8:45</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[1] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[1]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">6:45, 7:50, 9:00</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[2] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[2]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:00, 8:05, 9:15</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[3] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[3]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco. </strong>
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[4]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco. </strong>
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[5] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[5]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                </React.Fragment>
              );
            } else if (index === 7) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:05</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[0] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[0]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:15</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[1] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[1]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:25</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[2] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[2]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:35</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[3] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[3]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco. </strong>
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[4]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco. </strong>
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[5] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[5]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                </React.Fragment>
              );
            } else {
              return (
                <tr key={index} style={{ backgroundColor: coloresFila[index] }}>
                  <td style={{ width: "25%" }}>{rutas[index]}</td>
                  <td colSpan={2}>{grupo.numeros.join(", ")}</td>
                  <td style={{ width: "23%" }} className="celda-nombre">
                    {grupo.nombre}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              className="celda-pie"
              colSpan={4}
              style={{ letterSpacing: "1px" }}
            >
              El operador que no cumpla con su horario de San Miguel sera
              acredor a 5 días de castigo. Se recomienda mandar evidencia a
              algun grupo o tener la evidencia en caso de que se le acuse de no
              haber cumplido con su horario y ruta.
            </td>
          </tr>
          <tr>
            <td
              className="celda-pie"
              colSpan={4}
              style={{ letterSpacing: "1px" }}
            >
              El operador que se meta a una ruta diferente a la asignada sera
              acredor a un castigo.
            </td>
          </tr>
          <tr>
            <td
              className="celda-pie"
              colSpan={4}
              style={{ letterSpacing: "1px" }}
            >
              Si no tienes tu nota por perdida, por que no trabajaste o por (x)
              motivo, mandame un Whatsapp y con gusto te envio la ruta asignada
              que tiene la unidad que vas a operar.
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTabla} className="boton-capturar">
          Capturar tabla
          <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
        </button>
      </div>
      {/* Tabla tacopan y san miguel*/}
      <table align="center" ref={tacopanRef}>
        <thead>
          <tr>
            <th
              colSpan={4}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:15, 8:20, 9:30</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[0] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[0]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">6:30, 7:35, 8:45</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[1] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[1]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">6:45, 7:50, 9:00</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[2] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[2]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:00, 8:05, 9:15</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[3] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[3]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco.</strong>{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[4]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco.</strong>{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[5] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[5]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                </React.Fragment>
              );
            } else if (index === 7) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:05</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[0] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[0]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:15</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[1] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[1]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:25</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[2] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[2]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td className="celda-tacopan">7:35</td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[3] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[3]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco.</strong>{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[4]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td
                      colSpan={2}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco.</strong>{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[5] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[5]}</strong>
                      )}
                    </td>
                    <td className="celda-nombre">{grupo.nombre}</td>
                  </tr>
                </React.Fragment>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              className="celda-pie"
              colSpan={4}
              style={{ letterSpacing: "1px" }}
            >
              El operador que no cumpla con su horario de San Miguel sera
              acredor a 5 días de castigo. Se recomienda mandar evidencia a
              algun grupo o tener la evidencia en caso de que se le acuse de no
              haber cumplido con su horario y ruta.
            </td>
          </tr>
          <tr>
            <td
              className="celda-pie"
              colSpan={4}
              style={{ letterSpacing: "1px" }}
            >
              El operador que se meta a una ruta diferente a la asignada sera
              acredor a un castigo.
            </td>
          </tr>
          <tr>
            <td
              className="celda-pie"
              colSpan={4}
              style={{ letterSpacing: "1px" }}
            >
              Si no tienes tu nota por perdida, por que no trabajaste o por (x)
              motivo, mandame un Whatsapp y con gusto te envio la ruta asignada
              que tiene la unidad que vas a operar.
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTacopan} className="boton-capturar">
          Capturar Tacopan
          <FontAwesomeIcon icon={faCameraAlt}></FontAwesomeIcon>
        </button>
      </div>
      {/******************* * Tabla tacopan*****************************************/}
      <table align="center" ref={tacopanDetalleRef}>
        <thead>
          <tr>
            <th
              colSpan={9}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
          <tr>
            <th
              colSpan={9}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Rol tacopan: {grupos[3].nombre}
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td style={{ backgroundColor: "#98F009" }}>Unidad:</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td
                      style={{ backgroundColor: "#98F009" }}
                      className="celda-tacopan-unidad"
                    >
                      {grupos[index].numeros[0] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[0]}</strong>
                      )}
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td
                      style={{ backgroundColor: "#98F009" }}
                      className="celda-tacopan-unidad"
                    >
                      {grupos[index].numeros[1] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[1]}</strong>
                      )}
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td
                      style={{ backgroundColor: "#98F009" }}
                      className="celda-tacopan-unidad"
                    >
                      {grupos[index].numeros[2] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[2]}</strong>
                      )}
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td
                      style={{ backgroundColor: "#98F009" }}
                      className="celda-tacopan-unidad"
                    >
                      {grupos[index].numeros[3] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[3]}</strong>
                      )}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-tacopan"></td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan">👇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan">👇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan">👇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan">👇</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan-detalle">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">6:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">6:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:00</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">30 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-tacopan-detalle">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:30</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">35 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan-detalle">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:20</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:35</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:50</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:05</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">35 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-tacopan-detalle">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:55</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:10</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:25</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:40</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">35 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan-detalle">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:15</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">35 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-tacopan-detalle">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">10:05</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:20</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:35</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:50</td>
                  </tr>
                  <tr style={{ backgroundColor: "#EF65F1" }}>
                    <td
                      colSpan={6}
                      className="celda-tacopan"
                      style={{ letterSpacing: "0.5px" }}
                    >
                      Descansa y se va a: <strong>Coahuixco.</strong>{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[4]}</strong>
                      )}
                    </td>
                    <td></td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[5] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[5]}</strong>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              );
            }
          })}
        </tbody>
        <tfoot>
        <tr>
            <td colSpan={9}>◼
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFFB00" }} className="celda-tacopan-detalle" colSpan={9}>
              Tiempos para la ruta tacopan, enrolados desde la base despues de la 9 de la
              mañana.
            </td>
          </tr>
          <tr style={{ backgroundColor: "#7DF4ED" }}>
            <td className="celda-tacopan-detalle">Teziutlan</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">9:20</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">9:45</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">10:10</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">10:40</td>
          </tr>
          <tr style={{ backgroundColor: "white" }}>
            <td className="celda-flechas">40 minutos</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
          </tr>
          <tr style={{ backgroundColor: "#CDF47D" }}>
            <td className="celda-tacopan-detalle">Tacopan</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">10:00</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">10:25</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">10:50</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">11:20</td>
          </tr>
          <tr style={{ backgroundColor: "white" }}>
            <td className="celda-flechas">40 minutos</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-flechas">🔻</td>
          </tr>
          <tr style={{ backgroundColor: "#7DF4ED" }}>
            <td className="celda-tacopan-detalle">Teziutlan</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">10:40</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">11:05</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">11:30</td>
            <td style={{ backgroundColor: "#000000" }}></td>
            <td className="celda-tacopan-detalle">12:00</td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTacopanDetalle} className="boton-capturar">
          Capturar Tacopan
          <FontAwesomeIcon icon={faCameraAlt}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default Tabla;
