/* eslint-disable react/prop-types */
import { useState } from "react";

function TablaSecundaria({ grupos, onGruposChange }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingNumeros, setEditingNumeros] = useState("");

  const handleNumerosChange = (e) => {
    setEditingNumeros(e.target.value);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingNumeros(grupos[index].numeros.join(", "));
  };

  const handleSave = () => {
    if (editingIndex !== -1) {
      const numeros = editingNumeros
        .split(",")
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n));

      const newGrupos = [...grupos];
      newGrupos[editingIndex] = {
        ...grupos[editingIndex],
        numeros,
      };

      onGruposChange(newGrupos);
      setEditingIndex(-1);
      setEditingNumeros("");
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setEditingNumeros("");
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

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
                    <textarea
                      value={editingNumeros}
                      onChange={handleNumerosChange}
                      rows={1}
                      cols={20}
                      placeholder="Ej: 1, 2, 3, 4"
                      style={{ fontSize: "18px" }}
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
                    <button onClick={() => handleEdit(index)}>Editar</button>
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
