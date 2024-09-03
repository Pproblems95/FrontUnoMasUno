import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";

function DetallesRecibo() {
    const navigate = useNavigate()
    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' >Recibo</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap' >
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Recibo de pago: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeee</p>
            </div>     
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Fecha: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Hecho por: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Concepto: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Modo de pago: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Firma: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            </div>   
           
            
        </div>
        <button id="button" class='align-self-end m-4 btn-lg btn btn-block' onClick={() => {
                    navigate('/menu')
                }}>Listo</button>
       </main>
    )
}

export default DetallesRecibo