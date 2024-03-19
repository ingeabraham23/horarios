/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraAlt,
  faCameraRetro,
  faCircleInfo,
  faDownLong,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

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
  const tacopanFrecuenciaRef = useRef(null);
  const tacopanCerritoRef = useRef(null);

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

  function capturarTacopanFrecuencia() {
    const tabla = tacopanFrecuenciaRef.current;
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
  function capturarTacopanCerrito() {
    const tabla = tacopanCerritoRef.current;
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
            return (
              <tr key={index} style={{ backgroundColor: coloresFila[index] }}>
                <td style={{ width: "25%" }}>{rutas[index]}</td>
                <td colSpan={2}>{grupo.numeros.join(", ")}</td>
                <td style={{ width: "23%" }} className="celda-nombre">
                  {grupo.nombre}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#F54A4A" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
              El operador que se meta a una ruta diferente a la asignada,
              despues de las 7 de la mañana, sera acredor a un castigo de 5 días
              sin poder laborar.
            </td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#00BDFF" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Antes de las 7 de la mañana te puedes enrolar en otra ruta que no
              te corresponda y posteriormente estando en la base de teziutlan ya
              te diriges a la ruta que te corresponda.
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTabla} className="boton-capturar">
          Capturar Rol
          <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
        </button>
      </div>

      {/************************** Tabla San Miguel**************************************/}
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
            if (index === 7) {
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
                      Descansa y se va a <strong>donde guste.</strong>{" "}
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
                      Descansa y se va a <strong>donde guste.</strong>{" "}
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
            <td></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#F54A4A" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
              El operador que no cumpla con su horario de San Miguel sera
              acredor a 5 días de castigo.
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#F54A4A" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
              No se permite irse a una ruta y en la siguiente vuelta cambiar de
              ruta por que hay muchas unidades o por (x) motivo. Si incurres en
              esa falta, seras acredor a 5 dias de castigo.
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#00BDFF" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Manda la evidencia de tu salida de San Miguel en este grupo,
              puedes mandar una foto o un video.
            </td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#00BDFF" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Para las unidades que les toca descansar, al igual que las que
              suben de San Miguel, pueden irse a la ruta de su agrado excepto
              TACOPAN.
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTacopan} className="boton-capturar">
          Capturar San Miguel
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
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-tacopan-detalle">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:21</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">6:36</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">6:51</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:06</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">24 minutos</td>
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
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-tacopan-detalle">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:26</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:41</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">7:56</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:11</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">29 minutos</td>
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
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">🔻</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-tacopan-detalle">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:36</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">8:51</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:06</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">9:21</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">29 minutos</td>
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
                </React.Fragment>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              style={{ backgroundColor: "#F54A4A" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              ⚠ El tiempo que tienes para estar en la parada El Cerrito, a
              partir de tu salida del fondo de Tacopan, es de <strong>6</strong> minutos.
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTacopanDetalle} className="boton-capturar">
          Capturar Tacopan
          <FontAwesomeIcon icon={faCameraAlt}></FontAwesomeIcon>
        </button>
      </div>

      {/******************* * Tabla BASE - TACOPAN ****************************************/}
      <table align="center" ref={tacopanCerritoRef}>
        <thead>
          <tr>
            <th
              colSpan={9}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Tiempos para la ruta TACOPAN, desde la base despues de
              la 9 de la mañana.
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
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
                    <td>40 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
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
                    <td>6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-tacopan-detalle">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">10:06</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">10:31</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">10:56</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-tacopan-detalle">11:26</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td >34 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td>
                      <FontAwesomeIcon icon={faDownLong}></FontAwesomeIcon>
                    </td>
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
                </React.Fragment>
              );
            }
          })}
        </tbody>
        <tfoot>
        <tr>
            <td colSpan={9}></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#00BDFF" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              El tiempo que tienes para estar dando vuelta al fondo en TACOPAN, a partir de tu salida de TEZIUTLAN, es de <strong>40</strong> minutos.
            </td>
          </tr>
          <tr>
            <td colSpan={9}></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#F9EE00" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
              El tiempo que tienes para estar en la parada EL CERRITO, a
              partir de tu salida del fondo de TACOPAN,
              es de <strong>6</strong> MINUTOS.
            </td>
          </tr>
          <tr>
            <td colSpan={9}></td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#F54A4A" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
              Al compañero que sigas o que te siga lo debes de encontrar en el
              tramo que comprende desde LA PEDRERA a la CASETA DE COAHUIXCO.
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTacopanCerrito} className="boton-capturar">
          Capturar Base-Tacopan
          <FontAwesomeIcon icon={faCameraAlt}></FontAwesomeIcon>
        </button>
      </div>

      {/******************* * Tabla tacopan Frecuencia*****************************************/}
      <table align="center" ref={tacopanFrecuenciaRef}>
        <thead>
          <tr>
            <th
              colSpan={3}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
          <tr>
            <th
              colSpan={3}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Frecuencia tacopan: {grupos[3].nombre}
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      Unidad
                    </td>
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      Tacopan
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>Teziutlan</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">👇</td>
                    <td className="celda-flechas">👇</td>
                    <td className="celda-flechas">👇</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      6:30
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>7:00</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      6:45
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>7:15</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      7:00
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>7:30</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      7:15
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>7:45</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">🔻</td>
                    <td className="celda-tacopan">20 minutos</td>
                    <td className="celda-tacopan">25 minutos</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      7:35
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>8:10</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      7:50
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>8:25</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      8:05
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>8:40</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      8:20
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>8:55</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">🔻</td>
                    <td className="celda-tacopan">25 minutos</td>
                    <td className="celda-tacopan">25 minutos</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      8:45
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>9:20</td>
                  </tr>

                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      9:00
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>9:35</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      9:15
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>9:50</td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
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
                    <td style={{ backgroundColor: coloresFila[index] }}>
                      9:30
                    </td>
                    <td style={{ backgroundColor: "#29BFE8" }}>10:05</td>
                  </tr>
                </React.Fragment>
              );
            }
          })}
        </tbody>
      </table>
      <div className="contenedor-boton">
        <button onClick={capturarTacopanFrecuencia} className="boton-capturar">
          Capturar Frecuencia
          <FontAwesomeIcon icon={faCameraAlt}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default Tabla;
