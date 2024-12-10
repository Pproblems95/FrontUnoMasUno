import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { Modal } from "react-bootstrap";

function DetallesGasto() {
    const navigate = useNavigate()
    const [data, SetData] = useState(null)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState('')
    const [payment, SetPayment] = useState({
        id: 0,
        date: '',
        concept: "",
        amount: "",
        commissionAmount: "",
        method: '',
        idTeacher: 0,
        idStudent: 0,
        student: "",
        teacher: ""})
    const [loading, SetLoading] = useState(false)

    const params = useParams()

    const url = import.meta.env.VITE_URL

    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
        .finally(() => {SetLoading(false)})
    }, [])

    useEffect(() => {
        if(data !== null){
            if(!data.error){
                fetch(url+'expenditures/search/'+params.idRecibo, {
                    method: 'GET',
                    credentials: 'include'
                })
                .then((res) => {return res.json()})
                .then((res) => {SetPayment(res.body)})
                .catch((e) => console.log(e))
            }
        }
    }, [data])

    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('/menu/Pagos/HistorialGastos')
                }} />
                <p class='h3 align-self-center ' >Gasto</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap' >
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Fecha: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{payment.date}</p>
            </div>  
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Maestro: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{payment.teacher}</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Cantidad: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{payment.amount == null ? 'Nulo' : payment.amount}</p>
            </div>     
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Concepto: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{payment.concept}</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Modo de pago: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{payment.method}</p>
            </div>   
 
           
            
        </div>
        <button id="button" class='align-self-end m-4 btn-lg btn btn-block' onClick={() => {
                    navigate('/menu/Pagos/HistorialGastos')
                }}>Listo</button>
                <Modal show={isOpen} >
          <Modal.Header >
            <Modal.Title> Advertencia </Modal.Title>
          </Modal.Header>
          <Modal.Body>No pudimos cargar tu recibo. Por favor inténtalo de nuevo más tarde.</Modal.Body>
          <Modal.Footer>
            <button class='btn btn-lg ' style={{background:'black', color:'white'}} onClick={() => {
              SetOpen(false)
            }}>Cerrar</button>
          </Modal.Footer>
        </Modal>
       </main>
    )
}

export default DetallesGasto