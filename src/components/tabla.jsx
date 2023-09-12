/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import html2canvas from "html2canvas";

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

  return (
    <div>
      <table align="center" ref={tablaRef}>
        <thead>
          <tr>
            <th colSpan={5} style={{ backgroundColor: "#B4B4B2" }}>
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
                    <td colSpan={2} className="celda-tacopan">
                      7:15, 8:15, 9:15
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[0] === 0
                        ? " "
                        : grupos[index].numeros[0]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      6:30, 7:30, 8:30
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[1] === 0
                        ? " "
                        : grupos[index].numeros[1]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      6:45, 7:45, 8:45
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[2] === 0
                        ? " "
                        : grupos[index].numeros[2]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      7:00, 8:00, 9:00
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[3] === 0
                        ? " "
                        : grupos[index].numeros[3]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td></td>
                    <td colSpan={2} className="celda-tacopan">
                      Coahuixco:{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4]}
                    </td>
                    <td></td>
                  </tr>
                </React.Fragment>
              );
            } else if (index === 7) {
              return (
                <React.Fragment key={index}>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      7:05
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[0] === 0
                        ? " "
                        : grupos[index].numeros[0]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      7:15
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[1] === 0
                        ? " "
                        : grupos[index].numeros[1]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      7:25
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[2] === 0
                        ? " "
                        : grupos[index].numeros[2]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td className="celda-tacopan">{rutas[index]}</td>
                    <td colSpan={2} className="celda-tacopan">
                      7:35
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[3] === 0
                        ? " "
                        : grupos[index].numeros[3]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td></td>
                    <td colSpan={2} className="celda-tacopan">
                      Descansa:{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[4]}
                    </td>
                    <td></td>
                  </tr>
                  <tr style={{ backgroundColor: coloresFila[index] }}>
                    <td></td>
                    <td colSpan={2} className="celda-tacopan">
                      Descansa:{" "}
                    </td>
                    <td className="celda-tacopan">
                      {grupos[index].numeros[5]}
                    </td>
                    <td></td>
                  </tr>
                </React.Fragment>
              );
            } else {
              return (
                <tr key={index} style={{ backgroundColor: coloresFila[index] }}>
                  <td>{rutas[index]}</td>
                  <td colSpan={3}>{grupo.numeros.join(", ")}</td>
                  <td>{grupo.nombre}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <button onClick={capturarTabla}>Capturar tabla</button>
    </div>
  );
}

export default Tabla;
