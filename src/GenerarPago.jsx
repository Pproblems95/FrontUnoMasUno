import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function GenerarPago() {
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState('')
    const [see, SetSee] = useState(false)
    const [payment, SetPayment] = useState({
        concept: '',
        amount: 0,
        method: '',
        idStudent: 0
    })
    const [confirmation, SetConfirmation] = useState(null)
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
            if(data.error){
                navigate('/')
            }
        }
    }, [data])

    useEffect(() => {
        if (confirmation !== null) {
            if(confirmation.status === 403){
                SetError(confirmation.body)
                return
            }
            if (confirmation.error) {
                SetError('Ocurrió un error, por favor inténtalo de nuevo')
                return
            }
            SetError('Registro exitoso!')
        }
    }, [confirmation])

    useEffect(() => {
        if(errorMessage !== ''){
            if(confirmation !== null){
                if(!confirmation.error){
                    SetSee(true)
                }
                else if(confirmation.error){
                    SetSee(false)
                }
            }
            SetOpen(true) 
        }
    }, [errorMessage])





    

    const navigate = useNavigate()
    const numeroRecibo = 0
    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' onClick={() => {console.log(payment)}} >Generar Pago</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                <div class='m-4 '>
                    <p class='h5 text-center'>Id del estudiante</p>
                    <input className="inputs" type="number" value={payment.idStudent} onChange={(e) => {SetPayment({...payment, idStudent:e.target.value})}}/>
                </div>
                <div class='m-4'>
                    <p class='h5 text-center'>Concepto</p>
                    <input className="inputs" type="text" value={payment.concept} onChange={(e) => {SetPayment({...payment, concept:e.target.value})}}/>
                </div>
                <div class='m-4'>
                    <p class='h5 text-center'>Cantidad</p>
                    <input className="inputs" type="number" value={payment.amount} onChange={(e) => {SetPayment({...payment, amount:e.target.value})}}/>
                </div>
                <div class='m-4 align-items-center flex-column d-flex'>
                    <p class='h5'>Forma de pago</p>
                    <input className="inputs" value={payment.method} type="text" onChange={(e) => {SetPayment({...payment, method:e.target.value})}}/>
                </div>
                
                <button id="button" class='align-self-end m-4 btn-lg btn btn-block' onClick={() => {
                    // navigate('/menu/Pagos/GenerarPago/'+ numeroRecibo)
                    const isValid = Object.entries(payment).filter(([key, value]) => {
                        if (key === "amount" || key === "idStudent") {
                            return false; 
                        }
                        return value.length < 3;
                    })

                    if (isValid.length > 0){
                        console.log('alerta de caracteres menor que 3 aqui')
                        return
                    }
                    fetch(url+'payments', {
                        method:'POST', 
                        credentials: 'include',
                        headers: {
                            'content-type': 'application/json'
                          },
                        body: JSON.stringify(
                            payment)
                    }).then((res) => {return res.json()})
                    .then((res) => {SetConfirmation(res)})
                    .catch((e) => {console.log(e)})

                }}>Registrar</button>

            </div>
            <Modal show={isOpen} >
          <Modal.Header >
            <Modal.Title> Advertencia </Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <div class='d-flex flex-row align-self-end'>
                <button class='btn btn-lg mx-1' style={{background:'black', color:'white'}} onClick={() => {
                    SetOpen(false)
                }}>Cerrar</button>
                {see ? (<button class='btn btn-lg mx-1 ' style={{background:'#55d0b6', color:'black'}} onClick={() => {
                    SetOpen(false)
                }}>Ver pago</button>) : (<></>)}
                
            </div>
           
          </Modal.Footer>
        </Modal>
       </main>
    )
}

export default GenerarPago