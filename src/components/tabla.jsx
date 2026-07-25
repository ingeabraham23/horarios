/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import "./tabla.css";
import usb from "/usb.png";
import musica from "/musica.png";

function Tabla({ grupos, fecha }) {
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const coloresFila = [
    "#F7A8FF", // Rosa/Magenta claro
    "#9CC9FF", // Azul claro
    "#B9F7A3", // Verde claro
    "#FFF9A8", // Amarillo claro
    "#E6E6E6", // Gris claro
    "#B9F7A3", // Verde claro
    "#FFD89A", // Naranja claro
    "#FFB3B3", // Rojo claro
  ];
  const rutas = [
    "Sosa Escuela",
    "Calicapan",
    "Coahuixco",
    "Tacopan",
    "San Isidro",
    "Coahuixco",
    "Tezotepec",
    "San Miguel",
  ];
  const tablaRef = useRef(null);
  const sanMiguelRef = useRef(null);
  const tacopanRef = useRef(null);
  const tacopanFrecuenciaRef = useRef(null);
  const tacopan715 = useRef(null);
  const tacopan630 = useRef(null);
  const tacopan645 = useRef(null);
  const tacopan700 = useRef(null);
  const tablaJarocha = useRef(null);

  const capturarTabla = async (ref, nombre = "") => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, { scale: 6 });

    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");

    const fechaNombre = fecha.toLocaleDateString("es-MX", opciones);
    enlace.download = [fechaNombre, nombre].filter(Boolean).join(", ");

    enlace.click();
  };

  return (
    <div>
      <br></br>
      <table className="tabla-rol" align="center" ref={tablaRef}>
        <thead>
          <tr>
            <th colSpan={4} className="titulo-fecha">
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
        </thead>

        <tbody>
          {grupos.map((grupo, index) => (
            <tr
              key={index}
              className="fila-ruta"
              style={{ backgroundColor: coloresFila[index] }}
            >
              <td className="col-ruta">{rutas[index]}</td>

              <td colSpan={2} className="col-unidades">
                {grupo.numeros.filter((n) => n !== 0).join(", ")}
              </td>

              <td className="col-operador">{grupo.nombre}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
          </tr>

          <tr className="aviso-rojo">
            <td colSpan={9} className="titulo-aviso">
              <FontAwesomeIcon icon={faTriangleExclamation} /> Precaución
            </td>
          </tr>

          <tr className="detalle-rojo">
            <td colSpan={9}>
              El operador que se meta a una ruta diferente a la asignada,
              después de las 7 de la mañana, será acreedor a un castigo de 5
              días sin poder laborar.
            </td>
          </tr>

          <tr className="aviso-azul">
            <td colSpan={9} className="titulo-aviso">
              <FontAwesomeIcon icon={faCircleInfo} /> Información
            </td>
          </tr>

          <tr className="detalle-azul">
            <td colSpan={9}>
              Antes de las 7 de la mañana te puedes enrolar en otra ruta que no
              te corresponda y posteriormente, estando en la base de Teziutlán,
              ya te diriges a la ruta que te corresponda.
            </td>
          </tr>

          <tr>
            <td colSpan={9} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tablaRef)}
          className="boton-capturar"
        >
          Capturar Rol
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/************************** Tabla San Miguel**************************************/}
      <table align="center" ref={sanMiguelRef}>
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
              colSpan={9}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Rol San Miguel: {grupos[7].nombre}
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 7) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-sanmiguel">{rutas[index]}</td>
                    <td className="celda-sanmiguel">7:05</td>
                    <td className="celda-sanmiguel">
                      {grupos[index].numeros[0] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[0]}</strong>
                      )}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-sanmiguel">{rutas[index]}</td>
                    <td className="celda-sanmiguel">7:15</td>
                    <td className="celda-sanmiguel">
                      {grupos[index].numeros[1] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[1]}</strong>
                      )}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-sanmiguel">{rutas[index]}</td>
                    <td className="celda-sanmiguel">7:25</td>
                    <td className="celda-sanmiguel">
                      {grupos[index].numeros[2] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[2]}</strong>
                      )}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-sanmiguel">{rutas[index]}</td>
                    <td className="celda-sanmiguel">7:35</td>
                    <td className="celda-sanmiguel">
                      {grupos[index].numeros[3] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[3]}</strong>
                      )}
                    </td>
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
              className="celda-sanmiguelchica-detalle"
              colSpan={3}
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
              className="celda-sanmiguelchica-detalle"
              colSpan={3}
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
              className="celda-sanmiguelchica-detalle"
              colSpan={3}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Los días Sabado y Domingo no hay servicio a San Miguel, por lo
              tanto puedes trabajar la ruta de tu agrado, excepto TACOPAN,
              TEPEPAN Y HUAPALTEPEC.
            </td>
          </tr>
          <tr>
            <td className="celda-sanmiguelgrande-detalle" colSpan={9}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Manda la evidencia (foto) de tu salida de San Miguel a este grupo.
            </td>
          </tr>
          <tr>
            <td className="celda-sanmiguelgrande-detalle" colSpan={9}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Reporta a este grupo o al checador si la unidad que sigues o que
              te sigue no la encontraste.
            </td>
          </tr>
          <tr>
            <td
              style={{ backgroundColor: "#00BDFF" }}
              className="celda-sanmiguelchica-detalle"
              colSpan={3}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Para las unidades que les toca descansar, al igual que las que
              suben de San Miguel, pueden irse a la ruta de su agrado excepto
              TACOPAN, TEPEPAN Y HUAPALTEPEC.
            </td>
          </tr>
          <tr>
            <td colSpan={9} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(sanMiguelRef, "San Miguel")}
          className="boton-capturar"
        >
          Capturar San Miguel
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/******************* * Tabla tacopan*****************************************/}
      <table align="center" ref={tacopanRef}>
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
              Rol Tacopan: {grupos[3].nombre}
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
                  <tr>
                    <td colSpan={7}>
                      Descansa y se va a <strong>Coahuixco</strong>.
                    </td>
                    <td
                      style={{ backgroundColor: "#98F009" }}
                      className="celda-tacopan-unidad"
                      colSpan={2}
                    >
                      {grupos[index].numeros[4] === 0 ? (
                        " "
                      ) : (
                        <strong>{grupos[index].numeros[4]}</strong>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7}>
                      Descansa y se va a <strong>Coahuixco</strong>.
                    </td>
                    <td
                      style={{ backgroundColor: "#98F009" }}
                      className="celda-tacopan-unidad"
                      colSpan={2}
                    >
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
            <td
              style={{ backgroundColor: "#F54A4A" }}
              className="celda-tacopan-detalle"
              colSpan={9}
            >
              ⚠ El tiempo que tienes para estar en la parada El Cerrito, a
              partir de tu salida del fondo de Tacopan, es de <strong>6</strong>{" "}
              minutos.
            </td>
          </tr>
          <tr>
            <td colSpan={9} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tacopanRef, "Tacopan")}
          className="boton-capturar"
        >
          Capturar Tacopan
          <FontAwesomeIcon icon={faCameraRetro} />
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
          <tr>
            <td colSpan={3} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tbody>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tacopanFrecuenciaRef, "Frecuencia")}
          className="boton-capturar"
        >
          Capturar Frecuencia
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/******************* *          Tabla tacopan 7:15              *****************************************/}
      <table className="tabla-unidad-tacopan" align="center" ref={tacopan715}>
        <thead>
          <tr>
            <th
              colSpan={7}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
          <tr>
            <th
              colSpan={6}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Itinerario para la unidad
            </th>
            <th className="unidad-itinerario">{grupos[3].numeros[0]}</th>
          </tr>
          <tr>
            <th colSpan={7}></th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-principal">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">7:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">8:20</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">9:30</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:21</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:26</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:36</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">4 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">EL PUERTO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:25</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:40</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:28</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:33</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:43</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LINDA TARDE</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:31</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:36</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:46</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">
                      14 minutos en la primera vuelta y 19 minutos en las
                      siguientes 2 vueltas.
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-principal-teziutlan">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">7:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">8:55</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">10:05</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">10 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr>
                    <td className="celda-secundaria">RETORNO BIMBO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:55</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:05</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LOS ARCOS</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:10</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:05</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CALIFORNIA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:10</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:20</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
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
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Por favor, recuerde la importancia de cumplir con el itinerario.
              Esto garantiza la puntualidad para los pasajeros y evita afectar
              la operación de los demas compañeros. Su compromiso es fundamental
              para mantener la reputación y confianza en nuestro sistema de
              transporte y evitar cualquier tipo de castigo para el operador.
            </td>
          </tr>
          <tr>
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              En caso de que experimente retrasos en su itinerario, le
              recordamos que tiene la opción de utilizar las vías alternativas
              disponibles, como el Arco Francia o el Libramiento, para ajustar
              sus horarios. Le recomendamos hacerlo con la debida precaución y
              considerando la seguridad de todos los involucrados.
            </td>
          </tr>
          <tr>
            <td colSpan={7} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tacopan715, "Tacopan 715")}
          className="boton-capturar"
        >
          Capturar Tacopan 715
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/******************* *          Tabla tacopan 6:30              *****************************************/}
      <table className="tabla-unidad-tacopan" align="center" ref={tacopan630}>
        <thead>
          <tr>
            <th
              colSpan={7}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
          <tr>
            <th
              colSpan={6}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Itinerario para la unidad
            </th>
            <th className="unidad-itinerario">{grupos[3].numeros[1]}</th>
          </tr>
          <tr>
            <th colSpan={7}></th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-principal">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">6:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">7:35</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">8:45</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:36</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:41</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:51</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">4 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">EL PUERTO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:40</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:55</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:43</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:48</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:58</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LINDA TARDE</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:46</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:51</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:01</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">
                      14 minutos en la primera vuelta y 19 minutos en las
                      siguientes 2 vueltas.
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-principal-teziutlan">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">7:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">8:10</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">9:20</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">10 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr>
                    <td className="celda-secundaria">RETORNO BIMBO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:10</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:20</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LOS ARCOS</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:25</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:20</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CALIFORNIA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:25</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:35</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
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
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Por favor, recuerde la importancia de cumplir con el itinerario.
              Esto garantiza la puntualidad para los pasajeros y evita afectar
              la operación de los demas compañeros. Su compromiso es fundamental
              para mantener la reputación y confianza en nuestro sistema de
              transporte y evitar cualquier tipo de castigo para el operador.
            </td>
          </tr>
          <tr>
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              En caso de que experimente retrasos en su itinerario, le
              recordamos que tiene la opción de utilizar las vías alternativas
              disponibles, como el Arco Francia o el Libramiento, para ajustar
              sus horarios. Le recomendamos hacerlo con la debida precaución y
              considerando la seguridad de todos los involucrados.
            </td>
          </tr>
          <tr>
            <td colSpan={7} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tacopan630, "Tacopan 630")}
          className="boton-capturar"
        >
          Capturar Tacopan 630
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/******************* *          Tabla tacopan 6:45              *****************************************/}
      <table className="tabla-unidad-tacopan" align="center" ref={tacopan645}>
        <thead>
          <tr>
            <th
              colSpan={7}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
          <tr>
            <th
              colSpan={6}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Itinerario para la unidad
            </th>
            <th className="unidad-itinerario">{grupos[3].numeros[2]}</th>
          </tr>
          <tr>
            <th colSpan={7}></th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-principal">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">6:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">7:50</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">9:00</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:51</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:56</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:06</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">4 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">EL PUERTO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:55</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:10</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">6:58</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:03</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:13</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LINDA TARDE</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:01</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:06</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:16</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">
                      14 minutos en la primera vuelta y 19 minutos en las
                      siguientes 2 vueltas.
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-principal-teziutlan">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">7:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">8:25</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">9:35</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">10 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr>
                    <td className="celda-secundaria">RETORNO BIMBO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:25</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:35</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LOS ARCOS</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:40</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:35</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CALIFORNIA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:40</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:50</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
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
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Por favor, recuerde la importancia de cumplir con el itinerario.
              Esto garantiza la puntualidad para los pasajeros y evita afectar
              la operación de los demas compañeros. Su compromiso es fundamental
              para mantener la reputación y confianza en nuestro sistema de
              transporte y evitar cualquier tipo de castigo para el operador.
            </td>
          </tr>
          <tr>
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              En caso de que experimente retrasos en su itinerario, le
              recordamos que tiene la opción de utilizar las vías alternativas
              disponibles, como el Arco Francia o el Libramiento, para ajustar
              sus horarios. Le recomendamos hacerlo con la debida precaución y
              considerando la seguridad de todos los involucrados.
            </td>
          </tr>
          <tr>
            <td colSpan={7} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tacopan645, "Tacopan 645")}
          className="boton-capturar"
        >
          Capturar Tacopan 645
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/******************* *          Tabla tacopan 6:45              *****************************************/}
      <table className="tabla-unidad-tacopan" align="center" ref={tacopan700}>
        <thead>
          <tr>
            <th
              colSpan={7}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", opciones)}
            </th>
          </tr>
          <tr>
            <th
              colSpan={6}
              style={{ backgroundColor: "#FFFB00", letterSpacing: "2px" }}
            >
              Itinerario para la unidad
            </th>
            <th className="unidad-itinerario">{grupos[3].numeros[3]}</th>
          </tr>
          <tr>
            <th colSpan={7}></th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => {
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-principal">{rutas[index]}</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">7:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">8:05</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal">9:15</td>
                  </tr>
                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">6 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CERRITO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:06</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:11</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:21</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">4 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">EL PUERTO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:10</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:15</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:25</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:13</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:18</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:28</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">3 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LINDA TARDE</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:16</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:21</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:31</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">
                      14 minutos en la primera vuelta y 19 minutos en las
                      siguientes 2 vueltas.
                    </td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                  </tr>
                  <tr style={{ backgroundColor: "#29BFE8" }}>
                    <td className="celda-principal-teziutlan">Teziutlan</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">7:30</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">8:40</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-principal-teziutlan">9:50</td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">10 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr>
                    <td className="celda-secundaria">RETORNO BIMBO</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:40</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:50</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LOS ARCOS</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:45</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">8:55</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">LA JAROCHA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:50</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:00</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
                  </tr>

                  <tr style={{ backgroundColor: "white" }}>
                    <td className="celda-flechas">5 minutos</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas">⬇</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-flechas"></td>
                  </tr>
                  <tr style={{ backgroundColor: "#F19136" }}>
                    <td className="celda-secundaria">CALIFORNIA</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">7:55</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria">9:05</td>
                    <td style={{ backgroundColor: "#000000" }}></td>
                    <td className="celda-secundaria"></td>
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
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              Por favor, recuerde la importancia de cumplir con el itinerario.
              Esto garantiza la puntualidad para los pasajeros y evita afectar
              la operación de los demas compañeros. Su compromiso es fundamental
              para mantener la reputación y confianza en nuestro sistema de
              transporte y evitar cualquier tipo de castigo para el operador.
            </td>
          </tr>
          <tr>
            <td className="pie-tacopan-unidad" colSpan={7}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              En caso de que experimente retrasos en su itinerario, le
              recordamos que tiene la opción de utilizar las vías alternativas
              disponibles, como el Arco Francia o el Libramiento, para ajustar
              sus horarios. Le recomendamos hacerlo con la debida precaución y
              considerando la seguridad de todos los involucrados.
            </td>
          </tr>
          <tr>
            <td colSpan={7} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tacopan700, "Tacopan 700")}
          className="boton-capturar"
        >
          Capturar Tacopan 700
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>

      {/* TABLA JAROCHA  TABLA JAROCHA  TABLA JAROCHA  TABLA JAROCHA  TABLA JAROCHA  TABLA JAROCHA */}

      <table className="tabla-jarocha" ref={tablaJarocha}>
        <thead>
          <tr>
            <th colSpan={3}>Tabla jarocha</th>
          </tr>
          <tr>
            <th>Tacopan</th>
            <th>jarocha</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="celda-tacopan-jarocha">6:30</td>
            <td className="celda-jarocha-jarocha">6:43</td>
            <td className="unidad-itinerario">{grupos[3].numeros[1]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">6:45</td>
            <td className="celda-jarocha-jarocha">6:58</td>
            <td className="unidad-itinerario">{grupos[3].numeros[2]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">7:00</td>
            <td className="celda-jarocha-jarocha">7:13</td>
            <td className="unidad-itinerario">{grupos[3].numeros[3]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">7:15</td>
            <td className="celda-jarocha-jarocha">7:28</td>
            <td className="unidad-itinerario">{grupos[3].numeros[0]}</td>
          </tr>
          <tr>
            <td colSpan={3}>20 minutos</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">7:35</td>
            <td className="celda-jarocha-jarocha">7:48</td>
            <td className="unidad-itinerario">{grupos[3].numeros[1]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">7:50</td>
            <td className="celda-jarocha-jarocha">8:03</td>
            <td className="unidad-itinerario">{grupos[3].numeros[2]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">8:05</td>
            <td className="celda-jarocha-jarocha">8:18</td>
            <td className="unidad-itinerario">{grupos[3].numeros[3]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">8:20</td>
            <td className="celda-jarocha-jarocha">8:33</td>
            <td className="unidad-itinerario">{grupos[3].numeros[0]}</td>
          </tr>
          <td colSpan={3}>25 minutos</td>
          <tr>
            <td className="celda-tacopan-jarocha">8:45</td>
            <td className="celda-jarocha-jarocha">8:58</td>
            <td className="unidad-itinerario">{grupos[3].numeros[1]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">9:00</td>
            <td className="celda-jarocha-jarocha">9:13</td>
            <td className="unidad-itinerario">{grupos[3].numeros[2]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">9:15</td>
            <td className="celda-jarocha-jarocha">9:28</td>
            <td className="unidad-itinerario">{grupos[3].numeros[3]}</td>
          </tr>
          <tr>
            <td className="celda-tacopan-jarocha">9:30</td>
            <td className="celda-jarocha-jarocha">9:43</td>
            <td className="unidad-itinerario">{grupos[3].numeros[0]}</td>
          </tr>
          <tr>
            <td colSpan={3} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tbody>
      </table>
      <div className="contenedor-boton">
        <button
          onClick={() => capturarTabla(tablaJarocha, "Jarocha")}
          className="boton-capturar"
        >
          Capturar Jarocha
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>



      <div className="banner-usb">

      <div className="banner-header">
        <div className="titulo">
          MEMORIAS USB
        </div>

        <div className="subtitulo">
          LOS MEJORES ÉXITOS 2026
        </div>
      </div>

      <div className="banner-body">

        <div className="col-imagen">

          <img
            src={usb}
            className="imagen-usb"
            alt=""
          />

          <img
            src={musica}
            className="imagen-musica"
            alt=""
          />

        </div>

        <div className="col-centro">

          <div className="titulo-lista">
            Incluye música de:
          </div>

          <ul>

            <li>✓ Corridos 2026</li>

            <li>✓ Banda</li>

            <li>✓ Cumbias</li>

            <li>✓ Pop Español</li>

            <li>✓ Rock en Español</li>

            <li>✓ Norteñas</li>

            <li>✓ Baladas</li>

            <li>✓ Miles de canciones</li>

          </ul>

        </div>

        <div className="col-derecha">

          <div className="precio">

            $150

          </div>

          <div className="precio-texto">

            PESOS

          </div>

          <div className="whatsapp">

            📱 231 123 4567

          </div>

        </div>

      </div>

      <div className="banner-footer">

        Compatible con Auto • PC • Pantallas • Estéreos • Android

      </div>

    </div>

    </div>
  );
}

export default Tabla;
