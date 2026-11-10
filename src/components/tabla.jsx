/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  OPCIONES_FECHA,
  COLORES_FILA,
  RUTAS,
  HORARIOS_TACOPAN,
} from "./tablaDatos";

import TablaGlobal from "./TablaGlobal";
import TablaSanMiguel from "./TablaSanMiguel";
import TablaTacopan from "./TablaTacopan";
import TablaTacopanNuevo from "./TablaTacopanNuevo";

import "./tabla.css";

function Tabla({ grupos, fecha }) {
  const tacopan14Ref = useRef(null);

  const capturarTabla = async (ref, nombre = "") => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, { scale: 6 });

    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");

    const fechaNombre = fecha.toLocaleDateString("es-MX", OPCIONES_FECHA);
    enlace.download = [fechaNombre, nombre].filter(Boolean).join(", ");

    enlace.click();
  };

  const grupo = grupos[3];

  const descargarPDF = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "letter",
    });

    const fechaTexto = fecha.toLocaleDateString("es-MX", OPCIONES_FECHA);

    // Encabezado
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("ROL TACOPAN", pdf.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Fecha: ${fechaTexto}`, 14, 23);
    pdf.text(`Rol: ${grupo.nombre}`, 14, 29);

    // Encabezados de las unidades
    const encabezados = [
      "Punto",
      ...grupo.numeros
        .slice(0, 5)
        .map((numero) => (numero === 0 ? "—" : String(numero))),
    ];

    // Convertir horarios a filas para el PDF
    const filasPDF = HORARIOS_TACOPAN.map((fila) => [
      `${fila.punto}\n${fila.intervalo}`,
      ...fila.horarios.map((horario) => {
        if (typeof horario === "string") return horario;

        return horario.detalle
          ? `${horario.hora}\n${horario.detalle}`
          : horario.hora;
      }),
    ]);

    // Filas de descanso
    filasPDF.push(
      [
        {
          content: "Descanso: se va a Coahuixco",
          colSpan: 4,
        },
        {
          content: grupo.numeros[5] === 0 ? "—" : String(grupo.numeros[5]),
          colSpan: 2,
        },
      ],
      [
        {
          content: "Descanso: se va a Coahuixco",
          colSpan: 4,
        },
        {
          content: grupo.numeros[6] === 0 ? "—" : String(grupo.numeros[6]),
          colSpan: 2,
        },
      ],
    );

    // Tabla en blanco y negro
    autoTable(pdf, {
      startY: 34,
      head: [encabezados],
      body: filasPDF,
      theme: "grid",

      styles: {
        font: "helvetica",
        fontSize: 9,
        textColor: [0, 0, 0],
        fillColor: [255, 255, 255],
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        halign: "center",
        valign: "middle",
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [235, 235, 235],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.4,
      },

      columnStyles: {
        0: {
          cellWidth: 45,
          halign: "left",
          fontStyle: "bold",
        },
      },

      margin: {
        left: 14,
        right: 14,
      },
    });

    // Aviso al final del documento
    const posicionFinal = pdf.lastAutoTable.finalY + 8;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);

    pdf.text(
      "IMPORTANTE: El tiempo disponible para estar en la parada El Cerrito,",
      14,
      posicionFinal,
    );

    pdf.text(
      "a partir de tu salida del fondo de Tacopan, es de 6 minutos.",
      14,
      posicionFinal + 5,
    );

    // Copyright
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(
      "@el.joyboy.de.chignautla",
      pdf.internal.pageSize.getWidth() / 2,
      posicionFinal + 12,
      { align: "center" },
    );

    // Descargar
    const fechaArchivo = [
      fecha.getFullYear(),
      String(fecha.getMonth() + 1).padStart(2, "0"),
      String(fecha.getDate()).padStart(2, "0"),
    ].join("-");

    pdf.save(`Rol-Tacopan-${fechaArchivo}.pdf`);
  };

  return (
    <div>
      <br></br>
      {/******************* * Tabla Global*********************************************/}
      <TablaGlobal grupos={grupos} fecha={fecha} />
      {/******************* * Tabla San Miguel*****************************************/}
      <TablaSanMiguel grupos={grupos} fecha={fecha} />

      {/******************* * Tabla tacopan********************************************/}
      <TablaTacopan
        grupos={grupos}
        fecha={fecha}
        capturarTabla={capturarTabla}
      />
      {/******************* * TACOPAN NUEVO NOVIEMBRE 2026*****************************/}
      <TablaTacopanNuevo
        grupos={grupos}
        fecha={fecha}
        capturarTabla={capturarTabla}
        descargarPDF={descargarPDF}
      />
    </div>
  );
}

export default Tabla;
