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
    const [suggestions, SetSuggestions] = useState({ error: false, status: null, body: [] });
    const [suggestionsRes, SetSuggestionsRes] = useState({ error: false, status: null, body: [] });
    const [payment, SetPayment] = useState({
        concept: '',
        amount: 0,
        method: '',
        idStudent: null,
        studentName: ''
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
    useEffect(() => {
        if(payment.studentName.length >= 3){
            fetch(url+'students/searchName/'+payment.studentName.replace(/ /g, '-'), {
                method:'GET',
                credentials:'include'
            })
            .then((res) => { return res.json()})
            .then((res) => {SetSuggestionsRes(res)})
            .catch((e) => {console.log(e)})
        }
    }, [payment.studentName])

    useEffect(() => {
        if(suggestionsRes.status === 404){
            SetSuggestions({...suggestions, body:['No hay coincidencias']})
            return
        }
        if(suggestionsRes.error){
            SetSuggestions({...suggestions, body:['Hubo un error inesperado']})
            return
        }
        SetSuggestions(suggestionsRes)
    }, [suggestionsRes]);






    

    const navigate = useNavigate()
    if(loading){
        return (<p>Cargando pantalla...</p>)
    }
    else if(!loading){
        return(
            <main  class='d-flex flex-column'>
                 <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                     <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                         navigate('../menu')
                     }} />
                     <p class='h3 align-self-center ' onClick={() => {console.log(suggestions)}}  >Generar Pago</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center justify-content-center' >
                     <div class='m-4  d-flex flex-column'>
                         <p class='h5 text-center'>Nombre del estudiante</p>
                         <input className="inputs position-relative " type="text" value={payment.studentName} onChange={(e) => {
                           SetPayment({...payment, studentName:e.target.value})
                           if(payment.idStudent !== null){
                             SetPayment({...payment, idStudent:null})
                           }
                         }}/>
                         {suggestions && suggestions.body && suggestions.body.length > 0 && payment.studentName.length >= 3 && payment.idStudent == null &&(
         <ul
             className="list-group position-absolute w-100 mt-5 align-self-center "
             style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', overflowX:'hidden', top:'25vh' }}
         >
             {suggestions.body.map((student, index) =>
                 typeof student === "string" ? ( // Verifica si el elemento es un mensaje
                     <li
                         key={index}
                         className="list-group-item list-group-item-secondary "
                         style={{ cursor: "default", color: "gray" }}
                     >
                         {student}
                     </li>
                 ) : ( // Si no, asume que es un objeto de sugerencia
                     <li
                         key={student.id}
                         className="list-group-item list-group-item-action "
                         onClick={() => {
                             SetPayment({ ...payment, studentName: student.name, idStudent: student.id });
                             SetSuggestions(null); // Ocultar sugerencias al seleccionar
                         }}
                         style={{ cursor: "pointer" }}
                     >
                         {student.name}
                     </li>
                 )
             )}
         </ul>
     )}
                     </div>
                     <div class='m-4'>
                         <p class='h5 text-center'>Concepto</p>
                         <p class='text-center '>{payment.concept.length+'/20'}</p>
                         <input className="inputs" type="text" value={payment.concept} onChange={(e) => {SetPayment({...payment, concept:e.target.value})}}/>
                     </div>
                     <div class='m-4'>
                         <p class='h5 text-center'>Cantidad</p>
                         <input className="inputs" type="number" value={payment.amount} onChange={(e) => {SetPayment({...payment, amount:e.target.value})}}/>
                     </div>
                     <div class='m-4 align-items-center flex-column d-flex'>
                         <p class='h5'>Forma de pago</p>
                         <p class='text-center '>{payment.method.length+'/20'}</p>
                         <input className="inputs" value={payment.method} type="text" onChange={(e) => {SetPayment({...payment, method:e.target.value})}}/>
                     </div>
                     
                     <button id="button" class='align-self-end m-4 btn-lg btn btn-block' onClick={() => {
                         // navigate('/menu/Pagos/GenerarPago/'+ numeroRecibo)
                         if (payment.idStudent === null){
                             SetError('Por favor selecciona un alumno antes.')
                             return
                         }
                         const isValid = Object.entries(payment).filter(([key, value]) => {
                             if (key === "amount" || key === "idStudent" || key === 'studentName') {
                                 return false; 
                             }
                             return value.length < 3 || value.length > 20;
                         })
     
                         if (isValid.length > 0){
                             SetError('Todos los campos deben tener de 3 a 20 caracteres.' + isValid)
                             return
                         }
                         const paymentData = { ...payment };
                         delete paymentData.studentName;
                         fetch(url+'payments', {
                             method:'POST', 
                             credentials: 'include',
                             headers: {
                                 'content-type': 'application/json'
                               },
                             body: JSON.stringify(
                                 paymentData)
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
                         if(confirmation === null){
                             SetOpen(false)
                             SetError('')
                             return
                         }
                         location.reload()
                     }}>Cerrar</button>
                     {see ? (<button class='btn btn-lg mx-1 ' style={{background:'#55d0b6', color:'black'}} onClick={() => {
                         navigate('/menu/Pagos/GenerarPago/'+confirmation.body.id)
                     }}>Ver pago</button>) : (<></>)}
                     
                 </div>
                
               </Modal.Footer>
             </Modal>
            </main>
         )
    }
    
}

export default GenerarPago