import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./Invitacion.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChurch,
  faCalendarDays,
  faClock,
  faLocationDot,
  faHeart,
  faCross,
} from "@fortawesome/free-solid-svg-icons";

// Coloca la fotografía en public, por ejemplo:
// public/hijas.png
import fotoAvril from "/avril.png";
import fotoKathia from "/kathia.png";

function Invitacion() {
  const invitacionRef = useRef();
  const [codigoAcceso, setCodigoAcceso] = useState("AVR-7K29");

  const generarCodigo = () => {
    const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let codigo = "";

    for (let i = 0; i < 4; i++) {
      codigo += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }

    setCodigoAcceso(`COM-${codigo}`);
  };

  const capturarInvitacion = async () => {
    if (!invitacionRef.current) return;

    const canvas = await html2canvas(invitacionRef.current, {
      scale: 6,
      backgroundColor: "#fffaf7",
      useCORS: true,

      ignoreElements: (element) => element.classList.contains("no-capturar"),
    });

    const enlace = document.createElement("a");

    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "Invitacion_Avril_y_Kathia.png";

    enlace.click();
  };

  return (
    <>
      {/* BOTÓN */}
      <div className="contenedor-boton-invitacion">
        <button
          className="boton-descargar-invitacion"
          onClick={capturarInvitacion}
        >
          Descargar invitación
        </button>
      </div>

      {/* INVITACIÓN */}
      <div className="invitacion" ref={invitacionRef}>
        {/* DECORACIÓN SUPERIOR */}
        <div className="decoracion-superior">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>

        {/* ENCABEZADO */}
        <div className="invitacion-header">
          <div className="icono-religioso">
            <FontAwesomeIcon icon={faCross} />
          </div>

          <div className="texto-invitacion">Con mucha alegría</div>

          <div className="titulo-invitacion">Te invitamos a celebrar</div>

          <div className="subtitulo-religioso">nuestra Primera Comunión</div>
        </div>

        {/* FOTOS DE LAS HIJAS */}
        <div className="fotos-hijas">
          {/* AVRIL */}
          <div className="perfil-hija">
            <div className="marco-perfil">
              <img src={fotoAvril} alt="Avril" className="foto-perfil" />
            </div>

            <div className="nombre-perfil">Avril</div>
          </div>

          {/* CORAZÓN CENTRAL */}
          <div className="corazon-central">
            <FontAwesomeIcon icon={faHeart} />
          </div>

          {/* KATHIA */}
          <div className="perfil-hija">
            <div className="marco-perfil">
              <img src={fotoKathia} alt="Kathia" className="foto-perfil" />
            </div>

            <div className="nombre-perfil">Kathia</div>
          </div>
        </div>

        {/* FRASE */}
        <div className="mensaje-principal">
          <FontAwesomeIcon icon={faHeart} />

          <p>
            Será un gusto compartir con ustedes
            <br />
            este día tan especial.
          </p>
        </div>

        {/* INFORMACIÓN */}
        <div className="informacion-evento">
          {/* FECHA */}
          <div className="dato-evento fecha">
            <div className="icono-dato">
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>

            <div className="texto-dato">
              <span className="etiqueta-dato">DOMINGO</span>

              <strong>27</strong>

              <span>DE SEPTIEMBRE</span>

              <small>del presente año</small>
            </div>
          </div>

          {/* HORA */}
          <div className="dato-evento">
            <div className="icono-dato azul">
              <FontAwesomeIcon icon={faClock} />
            </div>

            <div className="texto-dato">
              <span className="etiqueta-dato">A PARTIR DE LAS</span>

              <strong className="hora">02:00 PM</strong>
            </div>
          </div>
        </div>

        {/* LUGAR */}
        <div className="lugar">
          <div className="icono-lugar">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>

          <div className="texto-lugar">
            <span>LUGAR</span>

            <strong>Calle Aquiles Serdan #7</strong>

            <p>Yopi Escuela, Chignautla.</p>
          </div>
        </div>

        {/* ========================================
    CÓDIGO DE ACCESO
======================================== */}

        <div className="codigo-acceso">
          <div className="codigo-titulo">Código de acceso</div>

          <div className="codigo-descripcion">
            Presenta este código al llegar
          </div>

          <div className="codigo-valor">{codigoAcceso}</div>

          <button className="boton-generar-codigo no-capturar" onClick={generarCodigo}>
            Generar nuevo código
          </button>
        </div>

        {/* DESPEDIDA */}
        <div className="despedida">
          <div className="linea-decorativa">
            <span>✦</span>
            <i></i>
            <span>✦</span>
          </div>

          <div className="icono-final">
            <FontAwesomeIcon icon={faChurch} />
          </div>
        </div>

        {/* PIE */}
        <div className="invitacion-footer">Con cariño, nuestra familia</div>
      </div>
    </>
  );
}

export default Invitacion;
