/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import { OPCIONES_FECHA, HORARIOS_TACOPAN } from "./tablaDatos";

function TablaTacopanNuevo({ grupos, fecha, capturarTabla, descargarPDF }) {
  const tacopan14Ref = useRef(null);

  const grupo = grupos[3];

  if (!grupo) return null;

  return (
    <>
      <table ref={tacopan14Ref} className="tabla-tacopan">
        <thead>
          <tr>
            <th colSpan={6} className="tacopan-fecha">
              {fecha.toLocaleDateString("es-MX", OPCIONES_FECHA)}
            </th>
          </tr>

          <tr>
            <th colSpan={6} className="tacopan-titulo">
              Rol Tacopan: {grupo.nombre}
            </th>
          </tr>

          <tr className="tacopan-encabezado-unidades">
            <th className="tacopan-columna-punto">Unidad</th>

            {grupo.numeros.slice(0, 5).map((numero, index) => (
              <th key={index}>
                <span className="tacopan-numero-unidad">
                  {numero === 0 ? "—" : numero}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {HORARIOS_TACOPAN.map((fila, index) => (
            <tr
              key={`${fila.punto}-${index}`}
              className={`tacopan-fila-${fila.tipo}`}
            >
              <td className="tacopan-punto">
                <span className="tacopan-nombre-punto">{fila.punto}</span>

                <span className="tacopan-intervalo">{fila.intervalo}</span>
              </td>

              {fila.horarios.map((horario, horaIndex) => (
                <td key={horaIndex} className="tacopan-hora">
                  <span className="tacopan-hora-principal">{horario.hora}</span>

                  {horario.detalle && (
                    <span className="tacopan-hora-detalle">
                      {horario.detalle}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}

          {[5, 6].map((numero) => (
            <tr key={numero} className="tacopan-descanso">
              <td colSpan={4}>
                <span className="tacopan-descanso-titulo">Descanso</span>

                <span className="tacopan-descanso-texto">
                  Se va a Coahuixco
                </span>
              </td>

              <td colSpan={2} className="tacopan-unidad-descanso">
                {grupo.numeros[numero] === 0 ? "—" : grupo.numeros[numero]}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={6} className="tacopan-aviso">
              <strong>Importante:</strong> El tiempo disponible para estar en la
              parada El Cerrito, a partir de tu salida del fondo de Tacopan, es
              de <strong>6 minutos.</strong>
            </td>
          </tr>

          <tr>
            <td colSpan={6} className="tacopan-copyright">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="tacopan-boton-contenedor">
        <button
          type="button"
          onClick={() => capturarTabla(tacopan14Ref, "Tacopan")}
          className="tacopan-boton-capturar"
        >
          Capturar Tacopan
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>

        <button
          type="button"
          onClick={descargarPDF}
          className="tacopan-boton-pdf"
        >
          Descargar PDF
          <span>PDF</span>
        </button>
      </div>
    </>
  );
}

export default TablaTacopanNuevo;
