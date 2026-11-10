/* eslint-disable react/prop-types */

import { useRef } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { OPCIONES_FECHA, COLORES_FILA, RUTAS } from "./tablaDatos";

function TablaSanMiguel({ grupos, fecha }) {
  const sanMiguelRef = useRef(null);

  const capturarTabla = async () => {
    if (!sanMiguelRef.current) return;

    const canvas = await html2canvas(sanMiguelRef.current, {
      scale: 6,
    });

    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");

    const fechaNombre = fecha.toLocaleDateString(
      "es-MX",
      OPCIONES_FECHA
    );

    enlace.download = [fechaNombre, "San Miguel"].join(", ");
    enlace.click();
  };

  return (
    <>
      <table align="center" ref={sanMiguelRef}>
        <thead>
          <tr>
            <th
              colSpan={3}
              style={{ backgroundColor: "#B4B4B2", letterSpacing: "2px" }}
            >
              {fecha.toLocaleDateString("es-MX", OPCIONES_FECHA)}
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
                <FragmentoSanMiguel
                  key={index}
                  grupo={grupo}
                  index={index}
                />
              );
            }

            return null;
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
              <FontAwesomeIcon icon={faTriangleExclamation} />
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
              <FontAwesomeIcon icon={faTriangleExclamation} />
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
              <FontAwesomeIcon icon={faCircleInfo} />
              Los días Sabado y Domingo no hay servicio a San Miguel, por lo
              tanto puedes trabajar la ruta de tu agrado, excepto TACOPAN,
              TEPEPAN Y HUAPALTEPEC.
            </td>
          </tr>

          <tr>
            <td className="celda-sanmiguelgrande-detalle" colSpan={9}>
              <FontAwesomeIcon icon={faCircleInfo} />
              Manda la evidencia (foto) de tu salida de San Miguel a este grupo.
            </td>
          </tr>

          <tr>
            <td className="celda-sanmiguelgrande-detalle" colSpan={9}>
              <FontAwesomeIcon icon={faCircleInfo} />
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
              <FontAwesomeIcon icon={faCircleInfo} />
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
        <button onClick={capturarTabla} className="boton-capturar">
          Capturar San Miguel
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>
      </div>
    </>
  );
}

function FragmentoSanMiguel({ grupo, index }) {
  const horarios = ["7:05", "7:15", "7:25", "7:35"];

  return (
    <>
      {horarios.map((hora, i) => (
        <tr key={hora} style={{ backgroundColor: COLORES_FILA[index] }}>
          <td className="celda-sanmiguel">{RUTAS[index]}</td>
          <td className="celda-sanmiguel">{hora}</td>
          <td className="celda-sanmiguel">
            {grupo.numeros[i] === 0 ? (
              " "
            ) : (
              <strong>{grupo.numeros[i]}</strong>
            )}
          </td>
        </tr>
      ))}

      {[4, 5].map((numero) => (
        <tr
          key={numero}
          style={{ backgroundColor: COLORES_FILA[index] }}
        >
          <td
            colSpan={2}
            className="celda-tacopan"
            style={{ letterSpacing: "0.5px" }}
          >
            Descansa y se va a <strong>donde guste.</strong>{" "}
          </td>

          <td className="celda-tacopan">
            {grupo.numeros[numero] === 0 ? (
              " "
            ) : (
              <strong>{grupo.numeros[numero]}</strong>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}

export default TablaSanMiguel;
