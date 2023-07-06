import { useState } from 'react';
import es from 'date-fns/locale/es'
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import Tabla from './components/tabla';
import './estilos.css'
import EditableTabla from './components/tablaEditable';

registerLocale('es', es)

function App() {
  const fechaActual = new Date(); // Obtiene la fecha actual
  const diaCero = new Date(2023, 3, 26); // Fecha inicial para rotar los grupos
  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaActual); // Estado para la fecha seleccionada en el DatePicker, se inicializa con la fecha en que se esta ejecutando la aplicación

  const [grupos, setGrupos] = useState([
    { nombre: 'Humberto', numeros: [7, 8, 34, 37, 42, 23] },
    { nombre: 'Marce', numeros: [6, 14, 22, 29, 41] },
    { nombre: 'Paco', numeros: [5, 13, 21, 33, 39, 40] },
    { nombre: 'Heriberto', numeros: [4, 12, 20, 31] },
    { nombre: 'Lobo', numeros: [11, 19, 28, 38, 3] },
    { nombre: 'David', numeros: [10, 18, 27, 47] },
    { nombre: 'Eloy', numeros: [1, 9, 25, 36, 46, 17] },
    { nombre: 'Hector', numeros: [16, 24, 35, 43] },
  ]);// Estado para los grupos de Unidades

  const gruposRotados = rotarGrupos();

  function obtenerDiasDeDiferencia(fechaSeleccionada, fechaDiaCero) {
    const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día: 86,400,000
    const diffEnMilisegundos = (fechaSeleccionada - fechaDiaCero); //Diferencia de 2 Fechas en Milisegundos
    const dias = Math.floor(diffEnMilisegundos / unDia); //Diferencia de 2 fechas en Días, Usando Math.floor para redondear al piso, es decir, si el resultado es 8.36 se redondea a 8 ya que la fecha diaCero esta inicializada a las 0 horas y si yo hago el calculo a las 9 horas ya habra una diferencia de 9 horas
    return dias
  }// Obtiene el número de días entre dos fechas

  function rotarGrupos() {
    const diasTranscurridos = obtenerDiasDeDiferencia(fechaSeleccionada, diaCero);
    const rotaciones = (diasTranscurridos) % grupos.length; //Se obtiene el numero de rotaciones:Obteniendo el Modulo de: dias transcurridos, entre en tamaño del array grupos. 
    const gruposRotados = [...grupos.slice(-rotaciones), ...grupos.slice(0, -rotaciones)];
    return gruposRotados;
  }

  function manejarFechaSeleccionada(fecha) {
    setFechaSeleccionada(fecha);
  }

  function manejarCambioEnGrupos(nuevosGrupos) {
    setGrupos(nuevosGrupos);
  }

  return (
    <div>
      <EditableTabla grupos={grupos} onGruposChange={manejarCambioEnGrupos}></EditableTabla>
      <DatePicker selected={fechaSeleccionada} onChange={manejarFechaSeleccionada} locale="es" onFocus={(e) => { e.target.readOnly = true; e.target.blur() }}/>
      <br></br>
      <br></br>
      <br></br>
      <Tabla grupos={gruposRotados} fecha={fechaSeleccionada} />
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;

