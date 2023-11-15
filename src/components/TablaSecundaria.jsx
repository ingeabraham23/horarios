/* eslint-disable react/prop-types */
import { useState } from "react";

function TablaSecundaria({ grupos, onGruposChange }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingNumeros, setEditingNumeros] = useState("");

  const handleNumerosChange = (e) => {
    setEditingNumeros(e.target.value);
  };

  const handleSave = () => {
    if (editingIndex !== -1) {
      const newGrupos = [...grupos];
      const numeros = editingNumeros.split(",").map((n) => parseInt(n.trim()));
      newGrupos[editingIndex] = {
        numeros: numeros,
        nombre: grupos[editingIndex].nombre,
      };
      onGruposChange(newGrupos);
      setEditingIndex(-1);
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  return (
    <div>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Números</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td>
                    <input type="text" value={grupo.nombre} readOnly />
                  </td>
                  <td>
                    <input type="text" value={grupo.numeros} readOnly />
                    <input
                      type="text"
                      value={editingNumeros}
                      onChange={handleNumerosChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{grupo.nombre}</td>
                  <td>{grupo.numeros.join(", ")}</td>
                  <td>
                    <button onClick={() => setEditingIndex(index)}>
                      Editar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSecundaria;
