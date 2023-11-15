/* eslint-disable react/prop-types */
import { useState } from 'react';

function EditableTabla({ grupos, onGruposChange }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingNumeros, setEditingNumeros] = useState(Array(6).fill(0));

  const handleNumerosChange = (index, value) => {
    const newNumeros = [...editingNumeros];
    newNumeros[index] = parseInt(value, 10);
    setEditingNumeros(newNumeros);
  };

  const handleSave = (index) => {
    const newGrupos = [...grupos];
    newGrupos[index] = { numeros: editingNumeros, nombre: grupos[index].nombre };
    onGruposChange(newGrupos);
    setEditingIndex(-1);
    setEditingNumeros(Array(6).fill(0));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const numeros = grupos[index].numeros;
    setEditingNumeros([...numeros]);
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setEditingNumeros(Array(6).fill(0));
  };

  return (
    <table>
      <thead>
        <tr>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <th key={num}>{num}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {grupos.map((grupo, index) => (
          <tr key={index}>
            {editingIndex === index ? (
              editingNumeros.map((numero, i) => (
                <td key={i}>
                  <select value={numero} onChange={(e) => handleNumerosChange(i, e.target.value)}>
                    {grupo.numeros.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </td>
              ))
            ) : (
              grupo.numeros.map((numero, i) => (
                <td key={i}>{numero}</td>
              ))
            )}
            <td>
              {editingIndex === index ? (
                <>
                  <button onClick={() => handleSave(index)} className='boton-guardar'>G</button>
                  <button onClick={handleCancel} className='boton-cancelar'>C</button>
                </>
              ) : (
                <button onClick={() => handleEdit(index)} className='boton-editar'>E</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EditableTabla;
