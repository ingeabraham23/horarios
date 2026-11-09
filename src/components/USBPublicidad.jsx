import { useRef } from "react";
import html2canvas from "html2canvas";
import "./USBPublicidad.css";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import {
  faVanShuttle,
  faBus,
  faTv,
  faAppleAlt,
  faComputer,
  faCompactDisc,
  faFire,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import usb from "/usb.png";
//import musica from "/musica.png";

function USBPublicidad() {
  //==========================
  // DATOS EDITABLES
  //==========================

  const precio = "$100";

  const contacto = "Pocoyo";

  const telefono = "231 147 1805";

  const slogan = "LOS MEJORES ÉXITOS";

  const totalCanciones = "+4,500";

  const publicidadRef = useRef();

  const generos = [
    "Gruperas",
    "Tropicales",
    "Pop Moda",
    "Norteñas",
    "Rock en Español",
    "Cumbias",
    "Bandas",
    "Belicos",
    "Sonideras",
    "Bachatas",
    "Alternativas",
    "Mucho más...",
  ];

  const capturarPublicidad = async () => {
    if (!publicidadRef.current) return;

    const canvas = await html2canvas(publicidadRef.current, {
      scale: 6,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const enlace = document.createElement("a");

    enlace.href = canvas.toDataURL("image/png");

    enlace.download = "Memorias USB 2026.png";

    enlace.click();
  };

  return (
    <>
      <div className="contenedor-boton-usb">
        <button className="boton-descargar" onClick={capturarPublicidad}>
          Descargar publicidad
        </button>
      </div>

      <div className="usb-publicidad" ref={publicidadRef}>
        {/*========================*/}
        {/* ENCABEZADO */}
        {/*========================*/}

        <div className="usb-header">
          {/* <div className="nuevo">AGOSTO 2026</div> */}

          <div className="titulo-principal">MEMORIAS USB CON MÚSICA</div>

          {/* <div className="titulo-secundario"></div> */}

          <div className="slogan">{slogan}</div>
        </div>

        <div className="cinta-oferta">
          <FontAwesomeIcon icon={faFire} />

          <span>¡ACTUALIZADAS AGOSTO 2026!</span>

          <FontAwesomeIcon icon={faFire} />
        </div>

        {/*========================*/}
        {/* CUERPO */}
        {/*========================*/}

        <div className="usb-body">
          {/*========================*/}
          {/* IMAGENES */}
          {/*========================*/}

          <div className="zona-imagenes">
            

            <div className="insignia">
              <div className="insignia-numero">{totalCanciones}</div>

              <div className="insignia-texto">CANCIONES</div>

              <div className="insignia-extra">
                ORGANIZADAS
                <br />
                POR GÉNEROS
              </div>
            </div>

            <img src={usb} className="imagen-usb" alt="" />

            <div className="insignia-azul">
              <div className="insignia-texto">Solo:</div>
              <div className="insignia-numero">10,000</div>

              <div className="insignia-extra">
                Unidades
                <br />
                Disponibles
              </div>
            </div>

            {/* <img src={musica} className="imagen-musica" alt="" /> */}
          </div>

          {/*========================*/}
          {/* GENEROS */}
          {/*========================*/}

          <div className="lista-generos">
            {generos.map((g, index) => (
              <div key={index} className="genero">
                <FontAwesomeIcon icon={faCompactDisc} />

                <span>{g}</span>
              </div>
            ))}
          </div>

          <div className="info-inferior">
            <div className="precio-card">
              <div className="precio-titulo">
                <FontAwesomeIcon icon={faBolt} />
                &nbsp; PRECIO ESPECIAL
              </div>

              <div className="precio">{precio}</div>

              <div className="precio-sub">ENTREGA INMEDIATA</div>
            </div>

            <div className="whatsapp-card">
              <div className="whatsapp-titulo">
                <FontAwesomeIcon icon={faWhatsapp} />
                &nbsp; Whatsapp
              </div>

              <div className="contacto">{contacto}</div>

              <div className="telefono">{telefono}</div>

              <div className="mensaje">
                Entrega: Viernes o sábado.
              </div>
            </div>
          </div>
          {/*========================*/}
          {/* COMPATIBILIDAD */}
          {/*========================*/}

          <div className="compatibilidad">
            <div className="item">
              <FontAwesomeIcon icon={faBus} />

              <span>Sunrise</span>
            </div>

            <div className="item">
              <FontAwesomeIcon icon={faVanShuttle} />

              <span>Hiace</span>
            </div>

            <div className="item">
              <FontAwesomeIcon icon={faVanShuttle} />

              <span>Urvan</span>
            </div>

            <div className="item">
              <FontAwesomeIcon icon={faComputer} />

              <span>PC</span>
            </div>

            <div className="item">
              <FontAwesomeIcon icon={faTv} />

              <span>Smart TV</span>
            </div>

            <div className="item">
              <FontAwesomeIcon icon={faAppleAlt} />

              <span>Mac</span>
            </div>
          </div>

          {/*========================*/}
          {/* PIE */}
          {/*========================*/}

          <div className="usb-footer">@el.joyboy.de.chignautla</div>
        </div>
      </div>
    </>
  );
}

export default USBPublicidad;
