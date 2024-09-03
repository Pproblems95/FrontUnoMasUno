import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
function RegistroAlumno() {
    const navigate = useNavigate()
    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' >Registrar alumno</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                <div class='m-4 '>
                    <p class='h5'>Nombre del alumno</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4'>
                    <p class='h5'>Nombre de la mamá</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4'>
                    <p class='h5'>Nombre del papá</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Teléfono de emergencia</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4'>
                    <p class='h5'>Motivo de la visita</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5 text-center'>Cuenta con diagnóstico previo? 
                    si es así, cuál?</p>
                    <input className="inputs "/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5 text-center'>Padecimientos o alergías del menor</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Comentarios</p>
                    <input className="inputs"/>
                </div>
                <button id="button" class='align-self-end m-4 btn-lg btn btn-block'>Registrar</button>

            </div>
       </main>
    )
}

export default RegistroAlumno