import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";

function AgregarUsuario() {
    const navigate = useNavigate()
    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' >Agregar usuario</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'white', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                <div class='m-4 '>
                    <p class='h5 text-center'>Nombre</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4'>
                    <p class='h5 text-center'>Contraseña</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4'>
                    <p class='h5 text-center'>Confirmar contraseña</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Apellido paterno</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Apellido materno</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Teléfono</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Tipo</p>
                    <input className="inputs"/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Comisión</p>
                    <input className="inputs"/>
                </div>
                
                <button id="button" class='align-self-end m-4 btn-lg btn btn-block' onClick={() => {
                    navigate('/menu/Pagos/GenerarPago/'+ numeroRecibo)
                }}>Registrar</button>

            </div>
       </main>
    )
}

export default AgregarUsuario