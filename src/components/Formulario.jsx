

import { useEffect, useState } from "react"

import Error from "./Error";
const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("")
  const [email, setEmail] = useState("")
  const [fecha, setFecha] = useState("")
  const [sintomas, setSintomas] = useState("")
  
  const [error, setError] = useState(false);

  useEffect(() => {
    
    if (Object.keys(paciente).length > 0) {
      
      setNombre(paciente.nombre);
      setEmail(paciente.email);
      setPropietario(paciente.propietario);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);

    }


  }, [paciente])

  // Genera una id aleatoria
  const generarId = () => {

    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;

  }

 
  const handleSubmit = e => {
    e.preventDefault();
    
    // Validacion de formulario

    if([nombre, propietario, email, fecha, sintomas].includes("")){
      setError(true);
      return;
    }
    // Pasa toda la validacion
    setError(false)

    // Crea el nuevo objeto de paciente
    const nuevoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
      
    }

    if(paciente.id) {
      //Editando el registro
      nuevoPaciente.id = paciente.id;
      
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? nuevoPaciente : pacienteState )
      setPacientes(pacientesActualizados);
      setPaciente({})

    }else {
      //Creando un nuevo registro
    
      nuevoPaciente.id = generarId();
      // Almacena los datos en el arreglo de pacientes
      setPacientes([...pacientes, nuevoPaciente]);
      

      
    }

    
    // Resetea el formulario
    setNombre('');
    setEmail('');
    setFecha('');
    setPropietario('');
    setSintomas('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 w-11/12 mx-auto">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="mb-10 mt-5 text-center text-lg">
        Añade Pacientes y
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-8 px-5 mb-5">
        
        <div className="mb-5">
          { error && <Error mensaje="Todos los campos son obligatorios" /> }
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase"
          >Nombre Mascota</label>
          <input
            id="mascota"
            className="outline-none border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={e => setNombre(e.target.value) }
            />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase"
          >Nombre propietario</label>
          <input
            id="propietario"
            className="outline-none border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del propietario"
            value={propietario}
            onChange={e => setPropietario(e.target.value) }
            />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase"
          >email</label>
          <input
            id="email"
            className="outline-none border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="Email contacto propietario"
            value={email}
            onChange={e => setEmail(e.target.value) }
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase"
          >alta</label>
          <input
            id="alta"
            className="outline-none border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value) }
            />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase"
          >Sintomas</label>
          <textarea
            id="sintomas"
            className="outline-none border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={e => setSintomas(e.target.value) }
            />
        </div>

        <input type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
          value={paciente.id ? 'Editar Paciente' : "Guardar Paciente"}/>
      </form>
    </div>
  )
}

export default Formulario