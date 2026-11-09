import { useState } from "react";
import { jsPDF } from "jspdf";
import "./GeneradorPDF.css";

const nuevaPagina = () => ({
  id: generarId(),
  tipo: "texto",
  posicion: "arriba",
  imagen: null,
  parrafos: [
    {
      id: generarId(),
      titulo: "",
      contenido: "",
    },
  ],
});

const cargarImagen = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const formatoImagen = (src) => {
  if (src.startsWith("data:image/png")) return "PNG";
  if (src.startsWith("data:image/webp")) return "WEBP";
  return "JPEG";
};

const generarId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function GeneradorPDF() {
  const [paginas, setPaginas] = useState([nuevaPagina()]);
  const [margen, setMargen] = useState(15);
  const [mostrarVista, setMostrarVista] = useState(true);
  const [generando, setGenerando] = useState(false);

  // ACTUALIZAR PÁGINA
  const actualizarPagina = (id, cambios) => {
    setPaginas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...cambios } : p)),
    );
  };

  // AGREGAR PÁGINA
  const agregarPagina = () => {
    setPaginas((prev) => [...prev, nuevaPagina()]);
  };

  // ELIMINAR PÁGINA
  const eliminarPagina = (id) => {
    setPaginas((prev) => prev.filter((p) => p.id !== id));
  };

  // SUBIR IMAGEN
  const subirImagen = (id, archivo) => {
    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      alert("Selecciona una imagen válida.");
      return;
    }

    const lector = new FileReader();

    lector.onload = (e) => {
      actualizarPagina(id, {
        imagen: e.target.result,
      });
    };

    lector.readAsDataURL(archivo);
  };

  // AGREGAR PÁRRAFO
  const agregarParrafo = (id) => {
    setPaginas((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              parrafos: [
                ...p.parrafos,
                {
                  id: generarId(),
                  titulo: "",
                  contenido: "",
                },
              ],
            }
          : p,
      ),
    );
  };

  // ACTUALIZAR PÁRRAFO
  const actualizarParrafo = (paginaId, parrafoId, campo, valor) => {
    setPaginas((prev) =>
      prev.map((p) =>
        p.id === paginaId
          ? {
              ...p,
              parrafos: p.parrafos.map((par) =>
                par.id === parrafoId ? { ...par, [campo]: valor } : par,
              ),
            }
          : p,
      ),
    );
  };

  // ELIMINAR PÁRRAFO
  const eliminarParrafo = (paginaId, parrafoId) => {
    setPaginas((prev) =>
      prev.map((p) =>
        p.id === paginaId
          ? {
              ...p,
              parrafos: p.parrafos.filter((par) => par.id !== parrafoId),
            }
          : p,
      ),
    );
  };

  // AGREGAR IMAGEN AL PDF
  const agregarImagenPDF = async (pdf, src, x, y, maxAncho, maxAlto) => {
    const img = await cargarImagen(src);
    const proporcion = img.width / img.height;

    let w = maxAncho;
    let h = w / proporcion;

    if (h > maxAlto) {
      h = maxAlto;
      w = h * proporcion;
    }

    pdf.addImage(
      src,
      formatoImagen(src),
      x + (maxAncho - w) / 2,
      y + (maxAlto - h) / 2,
      w,
      h,
    );

    return { w, h };
  };

  // GENERAR PDF
  const generarPDF = async () => {
    if (generando) return;

    setGenerando(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
        compress: true,
      });

      const ancho = 215.9;
      const alto = 279.4;

      const anchoUtil = ancho - margen * 2;
      const altoUtil = alto - margen * 2;

      let primeraPagina = true;

      const nuevaHoja = () => {
        if (!primeraPagina) pdf.addPage();
        primeraPagina = false;
      };

      const saltoPagina = () => {
        pdf.addPage();
      };

      // TEXTO CON SALTO AUTOMÁTICO
      const dibujarTexto = (
        texto,
        x,
        y,
        anchoTexto,
        fuente,
        tamano,
        interlineado,
        limiteInicial,
      ) => {
        pdf.setFont("helvetica", fuente);
        pdf.setFontSize(tamano);

        const lineas = pdf.splitTextToSize(texto, anchoTexto);

        let restantes = [...lineas];
        let limite = limiteInicial;

        while (restantes.length > 0) {
          const disponibles = Math.floor((limite - y) / interlineado);

          if (disponibles <= 0) {
            saltoPagina();
            y = margen;
            limite = alto - margen;
            continue;
          }

          const cantidad = Math.min(restantes.length, disponibles);

          const bloque = restantes.splice(0, cantidad);

          pdf.text(bloque, x, y + tamano * 0.35);

          y += bloque.length * interlineado;

          if (restantes.length > 0) {
            saltoPagina();
            y = margen;
            limite = alto - margen;
          }
        }

        return y;
      };

      // RECORRER PÁGINAS
      for (const pagina of paginas) {
        nuevaHoja();

        let y = margen;
        let xTexto = margen;
        let anchoTexto = anchoUtil;
        let limiteTexto = alto - margen;

        // IMAGEN COMPLETA
        if (pagina.tipo === "imagen") {
          if (pagina.imagen) {
            await agregarImagenPDF(
              pdf,
              pagina.imagen,
              margen,
              margen,
              anchoUtil,
              altoUtil,
            );
          }

          continue;
        }

        // IMAGEN Y TEXTO
        if (pagina.tipo === "mixto" && pagina.imagen) {
          if (pagina.posicion === "arriba") {
            const resultado = await agregarImagenPDF(
              pdf,
              pagina.imagen,
              margen,
              margen,
              anchoUtil,
              65,
            );

            y = margen + resultado.h + 12;
          }

          if (pagina.posicion === "abajo") {
            await agregarImagenPDF(
              pdf,
              pagina.imagen,
              margen,
              alto - margen - 65,
              anchoUtil,
              65,
            );

            limiteTexto = alto - margen - 75;
          }

          if (
            pagina.posicion === "izquierda" ||
            pagina.posicion === "derecha"
          ) {
            const anchoImagen = 55;
            const separacion = 8;

            const anchoColumna = anchoUtil - anchoImagen - separacion;

            const xImagen =
              pagina.posicion === "izquierda"
                ? margen
                : margen + anchoColumna + separacion;

            await agregarImagenPDF(
              pdf,
              pagina.imagen,
              xImagen,
              margen,
              anchoImagen,
              100,
            );

            if (pagina.posicion === "izquierda") {
              xTexto = margen + anchoImagen + separacion;
            }

            anchoTexto = anchoColumna;
          }
        }

        // DIBUJAR PÁRRAFOS
        for (const parrafo of pagina.parrafos) {
          const titulo = parrafo.titulo.trim();
          const contenido = parrafo.contenido.trim();

          if (!titulo && !contenido) continue;

          // Evitar dejar un título aislado al final de una hoja.
          if (y + 12 > limiteTexto) {
            saltoPagina();
            y = margen;
            xTexto = margen;
            anchoTexto = anchoUtil;
            limiteTexto = alto - margen;
          }

          if (titulo) {
            y = dibujarTexto(
              titulo,
              xTexto,
              y + 5,
              anchoTexto,
              "bold",
              15,
              7,
              limiteTexto,
            );

            y += 3;
          }

          if (contenido) {
            y = dibujarTexto(
              contenido,
              xTexto,
              y + 3,
              anchoTexto,
              "normal",
              11,
              5.5,
              limiteTexto,
            );

            y += 8;
          }
        }
      }

      const agregarNumeroPagina = (pdf) => {
        const totalPaginas = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPaginas; i++) {
          pdf.setPage(i);

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(9);
          pdf.setTextColor(100, 100, 100);

          pdf.text(`Página ${i} de ${totalPaginas}`, 215.9 / 2, 279.4 - 9, {
            align: "center",
          });
        }
      };

      agregarNumeroPagina(pdf);

      pdf.save("documento.pdf");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al generar el PDF.");
    } finally {
      setGenerando(false);
    }
  };

  return (
    <main className="generador-pdf">
      <header className="pdf-header">
        <h2>Generador de PDF</h2>
        <p>Diseña tu documento página por página</p>
      </header>

      {/* CONFIGURACIÓN */}
      <section className="pdf-configuracion">
        <label>
          Márgenes (mm)
          <input
            type="number"
            min="5"
            max="30"
            value={margen}
            onChange={(e) =>
              setMargen(Math.min(30, Math.max(5, Number(e.target.value) || 5)))
            }
          />
        </label>

        <label className="pdf-check">
          <input
            type="checkbox"
            checked={mostrarVista}
            onChange={(e) => setMostrarVista(e.target.checked)}
          />
          Vista previa
        </label>
      </section>

      {/* PÁGINAS */}
      {paginas.map((pagina, index) => (
        <section className="pdf-pagina" key={pagina.id}>
          <div className="pdf-pagina-header">
            <div>
              <span className="pdf-numero">{index + 1}</span>

              <strong>Página {index + 1}</strong>
            </div>

            <button
              className="pdf-eliminar"
              disabled={paginas.length === 1}
              onClick={() => eliminarPagina(pagina.id)}
            >
              <span>Eliminar</span>
            </button>
          </div>

          {/* TIPO */}
          <label className="pdf-label">
            Tipo de página
            <select
              value={pagina.tipo}
              onChange={(e) =>
                actualizarPagina(pagina.id, {
                  tipo: e.target.value,
                })
              }
            >
              <option value="imagen">Imagen completa</option>

              <option value="mixto">Imagen y texto</option>

              <option value="texto">Solo texto</option>
            </select>
          </label>

          {/* IMAGEN */}
          {pagina.tipo !== "texto" && (
            <div className="pdf-imagen">
              <label className="pdf-label">
                Seleccionar imagen
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    subirImagen(pagina.id, e.target.files[0]);
                    e.target.value = "";
                  }}
                />
              </label>

              {pagina.imagen && (
                <div className="pdf-imagen-seleccionada">
                  <img src={pagina.imagen} alt="Imagen seleccionada" />

                  <button
                    onClick={() =>
                      actualizarPagina(pagina.id, {
                        imagen: null,
                      })
                    }
                  >
                    Quitar imagen
                  </button>
                </div>
              )}

              {pagina.tipo === "mixto" && (
                <label className="pdf-label">
                  Posición de imagen
                  <select
                    value={pagina.posicion}
                    onChange={(e) =>
                      actualizarPagina(pagina.id, {
                        posicion: e.target.value,
                      })
                    }
                  >
                    <option value="arriba">Arriba</option>
                    <option value="abajo">Abajo</option>
                    <option value="izquierda">Izquierda</option>
                    <option value="derecha">Derecha</option>
                  </select>
                </label>
              )}
            </div>
          )}

          {/* PÁRRAFOS */}
          {pagina.tipo !== "imagen" && (
            <div className="pdf-parrafos">
              <h4>Contenido</h4>

              {pagina.parrafos.map((parrafo, i) => (
                <div className="pdf-parrafo" key={parrafo.id}>
                  <div className="pdf-parrafo-header">
                    <strong>Bloque {i + 1}</strong>

                    <button
                      disabled={pagina.parrafos.length === 1}
                      onClick={() => eliminarParrafo(pagina.id, parrafo.id)}
                    >
                      Quitar
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Título del párrafo"
                    value={parrafo.titulo}
                    onChange={(e) =>
                      actualizarParrafo(
                        pagina.id,
                        parrafo.id,
                        "titulo",
                        e.target.value,
                      )
                    }
                  />

                  <textarea
                    rows="4"
                    placeholder="Escribe el contenido..."
                    value={parrafo.contenido}
                    onChange={(e) =>
                      actualizarParrafo(
                        pagina.id,
                        parrafo.id,
                        "contenido",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}

              <button
                className="pdf-agregar-parrafo"
                onClick={() => agregarParrafo(pagina.id)}
              >
                + Agregar párrafo
              </button>
            </div>
          )}

          {/* VISTA PREVIA */}
          {mostrarVista && (
            <div className="pdf-vista-contenedor">
              <h4>Vista previa</h4>

              <div
                className="pdf-hoja"
                style={{
                  "--margen": `${(margen / 215.9) * 100}%`,
                }}
              >
                {pagina.tipo === "imagen" && pagina.imagen && (
                  <img
                    className="preview-imagen-completa"
                    src={pagina.imagen}
                    alt=""
                  />
                )}

                {pagina.tipo === "mixto" && (
                  <div className={`preview-mixto posicion-${pagina.posicion}`}>
                    {pagina.imagen && (
                      <img
                        className="preview-imagen"
                        src={pagina.imagen}
                        alt=""
                      />
                    )}

                    <div className="preview-texto">
                      {pagina.parrafos.map((par) => (
                        <div className="preview-parrafo" key={par.id}>
                          {par.titulo && <strong>{par.titulo}</strong>}

                          {par.contenido && <p>{par.contenido}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pagina.tipo === "texto" && (
                  <div className="preview-texto preview-solo-texto">
                    {pagina.parrafos.map((par) => (
                      <div className="preview-parrafo" key={par.id}>
                        {par.titulo && <strong>{par.titulo}</strong>}

                        {par.contenido && <p>{par.contenido}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="pdf-preview-nota">
                Vista aproximada de hoja carta.
              </p>
            </div>
          )}
        </section>
      ))}

      {/* BOTONES */}
      <div className="pdf-acciones">
        <button className="pdf-agregar-pagina" onClick={agregarPagina}>
          + Agregar página
        </button>

        <button
          className="pdf-descargar"
          disabled={generando}
          onClick={generarPDF}
        >
          {generando ? "Generando PDF..." : "Descargar PDF"}
        </button>
      </div>
    </main>
  );
}

export default GeneradorPDF;
