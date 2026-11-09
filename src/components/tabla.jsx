/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faCircleInfo,
  faTriangleExclamation,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "./tabla.css";

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
  const tacopan14Ref = useRef(null);
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

  const horariosTacopan = [
    {
      punto: "Tacopan",
      tipo: "tacopan",
      intervalo: "Salida",
      horarios: [
        { hora: "6:20", detalle: "" },
        { hora: "6:34", detalle: "" },
        { hora: "6:48", detalle: "" },
        { hora: "7:02", detalle: "" },
        { hora: "7:16", detalle: "" },
      ],
    },
    {
      punto: "El Cerrito",
      tipo: "cerrito",
      intervalo: "6 min",
      horarios: [
        { hora: "6:26", detalle: "" },
        { hora: "6:40", detalle: "" },
        { hora: "6:54", detalle: "" },
        { hora: "7:08", detalle: "" },
        { hora: "7:22", detalle: "" },
      ],
    },
    {
      punto: "Teziutlán",
      tipo: "teziutlan",
      intervalo: "29 min",
      horarios: [
        { hora: "6:55", detalle: "" },
        { hora: "7:09", detalle: "Libramiento" },
        { hora: "7:23", detalle: "Libramiento" },
        { hora: "7:37", detalle: "Libramiento" },
        { hora: "7:51", detalle: "Libramiento" },
      ],
    },
    {
      punto: "Tacopan",
      tipo: "tacopan",
      intervalo: "35 min",
      horarios: [
        { hora: "7:30", detalle: "" },
        { hora: "7:44", detalle: "" },
        { hora: "7:58", detalle: "" },
        { hora: "8:12", detalle: "" },
        { hora: "8:26", detalle: "" },
      ],
    },
    {
      punto: "El Cerrito",
      tipo: "cerrito",
      intervalo: "6 min",
      horarios: [
        { hora: "7:36", detalle: "" },
        { hora: "7:50", detalle: "" },
        { hora: "8:04", detalle: "" },
        { hora: "8:18", detalle: "" },
        { hora: "8:32", detalle: "" },
      ],
    },
    {
      punto: "Teziutlán",
      tipo: "teziutlan",
      intervalo: "29 min",
      horarios: [
        { hora: "8:05", detalle: "" },
        { hora: "8:19", detalle: "" },
        { hora: "8:33", detalle: "" },
        { hora: "8:47", detalle: "" },
        { hora: "9:01", detalle: "" },
      ],
    },
    {
      punto: "Tacopan",
      tipo: "tacopan",
      intervalo: "35 min",
      horarios: [
        { hora: "8:40", detalle: "" },
        { hora: "8:54", detalle: "" },
        { hora: "9:08", detalle: "" },
        { hora: "9:22", detalle: "" },
        { hora: "9:36", detalle: "" },
      ],
    },
    {
      punto: "El Cerrito",
      tipo: "cerrito",
      intervalo: "6 min",
      horarios: [
        { hora: "8:46", detalle: "" },
        { hora: "9:00", detalle: "" },
        { hora: "9:14", detalle: "" },
        { hora: "9:28", detalle: "" },
        { hora: "9:42", detalle: "" },
      ],
    },
    {
      punto: "Teziutlán",
      tipo: "teziutlan",
      intervalo: "29 min",
      horarios: [
        { hora: "9:15", detalle: "" },
        { hora: "9:29", detalle: "" },
        { hora: "9:43", detalle: "" },
        { hora: "9:57", detalle: "" },
        { hora: "10:11", detalle: "" },
      ],
    },
  ];

  const grupo = grupos[3];

  const descargarPDF = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "letter",
    });

    const fechaTexto = fecha.toLocaleDateString("es-MX", opciones);

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
    const filasPDF = horariosTacopan.map((fila) => [
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

  const descargarPDFGlobal = () => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  const fechaTexto = fecha.toLocaleDateString("es-MX", opciones);

  // TÍTULO Y FECHA
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);

  pdf.text("ROL DE RUTAS", 105, 15, {
    align: "center",
  });

  pdf.setFontSize(11);
  pdf.text(fechaTexto, 105, 22, {
    align: "center",
  });

  // TABLA DE RUTAS
  const filas = grupos.map((grupo, index) => [
    rutas[index] || "",
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

  // AVISOS
  let posicionY = pdf.lastAutoTable.finalY + 8;

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

  // COPYRIGHT
  const altoPagina = pdf.internal.pageSize.getHeight();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);

  pdf.text(
    "@el.joyboy.de.chignautla",
    105,
    altoPagina - 12,
    { align: "center" }
  );

  // DESCARGAR
  pdf.save(`Rol_de_rutas_${fechaTexto.replace(/\//g, "-")}.pdf`);
};

  return (
    <div>
      <br></br>
      {/* TABLA GLOBAL ** TABLA GLOBAL ** TABLA GLOBAL ** TABLA GLOBAL */}
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
            <td colSpan={4} className="titulo-aviso">
              <FontAwesomeIcon icon={faTriangleExclamation} /> Precaución
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
              <FontAwesomeIcon icon={faCircleInfo} /> Información
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
          onClick={() => capturarTabla(tablaRef)}
          className="boton-capturar"
        >
          Capturar Rol
          <FontAwesomeIcon icon={faCameraRetro} />
        </button>

        <button onClick={descargarPDFGlobal} className="boton-pdf">
  <FontAwesomeIcon icon={faFilePdf} />
  Descargar PDF
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

      {/******************* * TACOPAN NUEVO NOVIEMBRE 2026*****************************************/}
      <table ref={tacopan14Ref} className="tabla-tacopan">
        <thead>
          <tr>
            <th colSpan={6} className="tacopan-fecha">
              {fecha.toLocaleDateString("es-MX", opciones)}
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
          {horariosTacopan.map((fila, index) => (
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

          <tr className="tacopan-descanso">
            <td colSpan={4}>
              <span className="tacopan-descanso-titulo">Descanso</span>
              <span className="tacopan-descanso-texto">Se va a Coahuixco</span>
            </td>

            <td colSpan={2} className="tacopan-unidad-descanso">
              {grupo.numeros[5] === 0 ? "—" : grupo.numeros[5]}
            </td>
          </tr>

          <tr className="tacopan-descanso">
            <td colSpan={4}>
              <span className="tacopan-descanso-titulo">Descanso</span>
              <span className="tacopan-descanso-texto">Se va a Coahuixco</span>
            </td>

            <td colSpan={2} className="tacopan-unidad-descanso">
              {grupo.numeros[6] === 0 ? "—" : grupo.numeros[6]}
            </td>
          </tr>
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
    </div>
  );
}

export default Tabla;
