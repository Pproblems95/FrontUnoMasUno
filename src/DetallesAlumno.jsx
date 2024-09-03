import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";

function DetallesAlumno() {
    const navigate = useNavigate()
    const params = useParams()
    return(
        <main  class='d-flex flex-column'>
        <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
            <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                navigate('/menu/Alumnos/')
            }} />
            <p class='h3 align-self-center ' >Detalles </p>
            <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
        </div>
        <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap' >
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Nombre del alumno: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>     
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Nombre de la mamá: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Nombre del papá: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Dirección: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Teléfono de emergencia: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Motivo inicial de la visita: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Alergias o padecimientos del menor: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Cuenta con diagnóstico previo? </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Cuál: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Comentarios: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>     
            
        </div>
   </main>
    )

}

export default DetallesAlumno