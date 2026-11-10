/* eslint-disable react/prop-types */

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import { OPCIONES_FECHA, COLORES_FILA, RUTAS } from "./tablaDatos";

function TablaTacopan({ grupos, fecha, capturarTabla }) {
  const tacopanRef = useRef(null);

  const grupo = grupos[3];

  if (!grupo) return null;

  return (
    <>
      <table align="center" ref={tacopanRef}>
        <thead>
          <tr>
            <th
              colSpan={9}
              style={{
                backgroundColor: "#B4B4B2",
                letterSpacing: "2px",
              }}
            >
              {fecha.toLocaleDateString("es-MX", OPCIONES_FECHA)}
            </th>
          </tr>

          <tr>
            <th
              colSpan={9}
              style={{
                backgroundColor: "#FFFB00",
                letterSpacing: "2px",
              }}
            >
              Rol Tacopan: {grupo.nombre}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr style={{ backgroundColor: COLORES_FILA[3] }}>
            <td style={{ backgroundColor: "#98F009" }}>Unidad:</td>
            <td style={{ backgroundColor: "#000000" }}></td>

            {[0, 1, 2, 3].map((numero) => (
              <>
                <td
                  style={{ backgroundColor: "#98F009" }}
                  className="celda-tacopan-unidad"
                >
                  {grupo.numeros[numero] === 0 ? (
                    " "
                  ) : (
                    <strong>{grupo.numeros[numero]}</strong>
                  )}
                </td>

                {numero !== 3 && (
                  <td style={{ backgroundColor: "#000000" }}></td>
                )}
              </>
            ))}
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

          <tr style={{ backgroundColor: COLORES_FILA[3] }}>
            <td className="celda-tacopan-detalle">{RUTAS[3]}</td>
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

          <tr style={{ backgroundColor: COLORES_FILA[3] }}>
            <td className="celda-tacopan-detalle">{RUTAS[3]}</td>
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

          <tr style={{ backgroundColor: COLORES_FILA[3] }}>
            <td className="celda-tacopan-detalle">{RUTAS[3]}</td>
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

          {[4, 5].map((numero) => (
            <tr key={numero}>
              <td colSpan={7}>
                Descansa y se va a <strong>Coahuixco</strong>.
              </td>

              <td
                style={{ backgroundColor: "#98F009" }}
                className="celda-tacopan-unidad"
                colSpan={2}
              >
                {grupo.numeros[numero] === 0 ? (
                  " "
                ) : (
                  <strong>{grupo.numeros[numero]}</strong>
                )}
              </td>
            </tr>
          ))}
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
    </>
  );
}

export default TablaTacopan;
