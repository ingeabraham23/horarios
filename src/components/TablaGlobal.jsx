
/* eslint-disable react/prop-types */
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faCircleInfo,
  faTriangleExclamation,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

import {
  OPCIONES_FECHA,
  COLORES_FILA,
  RUTAS,
} from "./tablaDatos";

function TablaGlobal({ grupos, fecha }) {
  const tablaRef = useRef(null);

  // Capturar tabla como imagen
  const capturarTabla = async () => {
    if (!tablaRef.current) return;

    const canvas = await html2canvas(tablaRef.current, {
      scale: 6,
    });

    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");

    const fechaNombre = fecha.toLocaleDateString(
      "es-MX",
      OPCIONES_FECHA
    );

    enlace.download = fechaNombre;
    enlace.click();
  };

  // Descargar tabla en PDF
  const descargarPDFGlobal = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const fechaTexto = fecha.toLocaleDateString(
      "es-MX",
      OPCIONES_FECHA
    );

    // Título y fecha
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);

    pdf.text("ROL DE RUTAS", 105, 15, {
      align: "center",
    });

    pdf.setFontSize(11);
    pdf.text(fechaTexto, 105, 22, {
      align: "center",
    });

    // Tabla de rutas
    const filas = grupos.map((grupo, index) => [
      RUTAS[index] || "",
      grupo.numeros.filter((n) => n !== 0).join(", "),
      grupo.nombre || "",
    ]);

    autoTable(pdf, {
      startY: 28,
      head: [["Ruta", "Unidades", "Operador"]],
      body: filas,
      theme: "grid",

      styles: {
        font: "helvetica",
        fontSize: 9,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        cellPadding: 2.5,
        valign: "middle",
      },

      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
      },

      columnStyles: {
        0: { cellWidth: 30, halign: "center" },
        1: { cellWidth: 85, halign: "center" },
        2: { cellWidth: 65, halign: "center" },
      },

      margin: {
        left: 15,
        right: 15,
      },
    });

    // Avisos
    const posicionY = pdf.lastAutoTable.finalY + 8;

    autoTable(pdf, {
      startY: posicionY,

      body: [
        [
          {
            content: "PRECAUCIÓN",
            styles: {
              fontStyle: "bold",
              halign: "center",
            },
          },
        ],
        [
          "El operador que se meta a una ruta diferente a la asignada, después de las 7 de la mañana, será acreedor a un castigo de 5 días sin poder laborar.",
        ],
        [
          {
            content: "INFORMACIÓN",
            styles: {
              fontStyle: "bold",
              halign: "center",
            },
          },
        ],
        [
          "Antes de las 7 de la mañana te puedes enrolar en otra ruta que no te corresponda y posteriormente, estando en la base de Teziutlán, ya te diriges a la ruta que te corresponda.",
        ],
      ],

      theme: "grid",

      styles: {
        font: "helvetica",
        fontSize: 9,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        cellPadding: 3,
        valign: "middle",
        halign: "justify",
      },

      margin: {
        left: 15,
        right: 15,
      },

      pageBreak: "avoid",
    });

    // Copyright
    const altoPagina = pdf.internal.pageSize.getHeight();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);

    pdf.text(
      "@el.joyboy.de.chignautla",
      105,
      altoPagina - 12,
      { align: "center" }
    );

    // Descargar
    pdf.save(
      `Rol_de_rutas_${fechaTexto.replace(/\//g, "-")}.pdf`
    );
  };

  return (
    <div>
      <br />

      <table
        className="tabla-rol"
        align="center"
        ref={tablaRef}
      >
        <thead>
          <tr>
            <th colSpan={4} className="titulo-fecha">
              {fecha.toLocaleDateString(
                "es-MX",
                OPCIONES_FECHA
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {grupos.map((grupo, index) => (
            <tr
              key={grupo.nombre}
              className="fila-ruta"
              style={{
                backgroundColor: COLORES_FILA[index],
              }}
            >
              <td className="col-ruta">
                {RUTAS[index]}
              </td>

              <td colSpan={2} className="col-unidades">
                {grupo.numeros
                  .filter((n) => n !== 0)
                  .join(", ")}
              </td>

              <td className="col-operador">
                {grupo.nombre}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
          </tr>

          <tr className="aviso-rojo">
            <td colSpan={4} className="titulo-aviso">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              {" "}Precaución
            </td>
          </tr>

          <tr className="detalle-rojo">
            <td colSpan={4}>
              El operador que se meta a una ruta diferente a la asignada,
              después de las 7 de la mañana, será acreedor a un castigo de 5
              días sin poder laborar.
            </td>
          </tr>

          <tr className="aviso-azul">
            <td colSpan={4} className="titulo-aviso">
              <FontAwesomeIcon icon={faCircleInfo} />
              {" "}Información
            </td>
          </tr>

          <tr className="detalle-azul">
            <td colSpan={4}>
              Antes de las 7 de la mañana te puedes enrolar en otra ruta que no
              te corresponda y posteriormente, estando en la base de Teziutlán,
              ya te diriges a la ruta que te corresponda.
            </td>
          </tr>

          <tr>
            <td colSpan={4} className="copyright-horarios">
              @el.joyboy.de.chignautla
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="contenedor-boton">
        <button
          type="button"
          onClick={capturarTabla}
          className="boton-capturar"
        >
          Capturar Rol
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>

        <button
          type="button"
          onClick={descargarPDFGlobal}
          className="boton-pdf"
        >
          <FontAwesomeIcon icon={faFilePdf} />
          Descargar PDF
        </button>
      </div>
    </div>
  );
}

export default TablaGlobal;
