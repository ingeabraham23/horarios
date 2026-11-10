
/* eslint-disable react/prop-types */
import { useState } from "react";

function EditableTabla({ grupos, onGruposChange }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingNumeros, setEditingNumeros] = useState([]);
  const [nuevoNumero, setNuevoNumero] = useState("");
  const [errorNumero, setErrorNumero] = useState("");

  // Determinar la cantidad máxima de columnas
  const maxNumeros = Math.max(
    0,
    ...grupos.map((grupo) => grupo.numeros.length)
  );

  // Activar edición
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingNumeros([...grupos[index].numeros]);
    setNuevoNumero("");
    setErrorNumero("");
  };

  // Modificar un número
  const handleNumerosChange = (index, value) => {
    setEditingNumeros((prev) =>
      prev.map((numero, i) =>
        i === index ? Number(value) : numero
      )
    );
  };

  // Agregar un número manualmente
  const handleAgregarNumero = () => {
    if (nuevoNumero.trim() === "") {
      setErrorNumero("Escribe un número.");
      return;
    }

    const numero = Number(nuevoNumero);

    if (!Number.isFinite(numero) || numero <= 0) {
      setErrorNumero("Ingresa un número válido.");
      return;
    }

    if (editingNumeros.includes(numero)) {
      setErrorNumero("Ese número ya existe en este grupo.");
      return;
    }

    setEditingNumeros((prev) => [...prev, numero]);
    setNuevoNumero("");
    setErrorNumero("");
  };

  // Guardar cambios
  const handleSave = () => {
    const nuevosGrupos = grupos.map((grupo, index) =>
      index === editingIndex
        ? {
            ...grupo,
            numeros: [...editingNumeros],
          }
        : grupo
    );

    onGruposChange(nuevosGrupos);
    handleCancel();
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditingIndex(-1);
    setEditingNumeros([]);
    setNuevoNumero("");
    setErrorNumero("");
  };

  return (
    <table>
      <thead>
        <tr>
          {Array.from({ length: maxNumeros }, (_, index) => (
            <th key={index}>{index + 1}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {grupos.map((grupo, index) => (
          <tr key={grupo.nombre}>
            {Array.from({ length: maxNumeros }, (_, numeroIndex) => {
              const tieneNumero =
                numeroIndex < grupo.numeros.length;

              return (
                <td key={numeroIndex}>
                  {editingIndex === index && tieneNumero ? (
                    <select
                      value={editingNumeros[numeroIndex]}
                      onChange={(e) =>
                        handleNumerosChange(
                          numeroIndex,
                          e.target.value
                        )
                      }
                    >
                      {editingNumeros.map((num, i) => (
                        <option key={i} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  ) : tieneNumero ? (
                    grupo.numeros[numeroIndex]
                  ) : null}
                </td>
              );
            })}

            <td>
              {editingIndex === index ? (
                <div className="acciones-edicion">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="boton-guardar"
                  >
                    G
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="boton-cancelar"
                  >
                    C
                  </button>

                  <div className="agregar-numero">
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={nuevoNumero}
                      onChange={(e) => {
                        setNuevoNumero(e.target.value);
                        setErrorNumero("");
                      }}
                      placeholder="Número"
                    />

                    <button
                      type="button"
                      onClick={handleAgregarNumero}
                      className="boton-agregar-numero"
                    >
                      + Agregar
                    </button>

                    {errorNumero && (
                      <small className="error-numero">
                        {errorNumero}
                      </small>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="boton-editar"
                  disabled={editingIndex !== -1}
                >
                  E
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EditableTabla;
