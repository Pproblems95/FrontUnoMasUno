import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";


function RegistroGasto() {

    const navigate = useNavigate()
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState('')
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [confirmation, SetConfirmation] = useState(null)
    const doubleLetters = ['ñ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'ü', 'Ü'];
    const [user, SetStudent] = useState({
        concept: "",
        amount: 0,
        method: ""
    })
    const [counter, SetCounter] = useState({
        concept: 0,
        method:0
    })
    const [sum, SetSum] = useState({
        concept:0,
        method:0})

    useEffect(() => {
        SetSum({...sum, concept: user.concept.length + counter.concept})
    }, [user.concept, counter.concept])

    useEffect(() => {
        SetSum({...sum, method: user.method.length + counter.method})
    }, [user.method, counter.method])
    const url = import.meta.env.VITE_URL

    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
        .finally(() => {SetLoading(false)})
        .catch((e) => {console.log(e)})
    }, [])

    useEffect(() => {
        if(data != null){
            if(data.error){
                navigate("/")
            }
            else if(!data.body.type === "admin"){
                navigate('../menu')
            }
            else if(data.body.type === "admin"){
                console.log('funciona')
            }
        }
    }, [data])

    useEffect(() => {
        if(errorMessage === ''){
            return
        }
        SetOpen(true)
    }, [errorMessage])

    useEffect(() => {
        if(confirmation != null){
            if(confirmation.error){
                SetError('Ocurrió un error, por favor inténtalo de nuevo más tarde.')
                return
            }
            SetError('El gasto fue registrado exitosamente. Presiona para regresar')
        }
    }, [confirmation])

    const handleChange = (e, fieldName, maxLength) => {
        const newValue = e.target.value;
        const isDeleting = newValue.length < user[fieldName].length;
        if (!isDeleting && sum[fieldName] >= maxLength) {
            return;
        }
        else if(isDeleting && sum[fieldName] >= maxLength){
            const matches = Array.from(e.target.value).filter(char => doubleLetters.includes(char)).length;
            SetCounter({ ...counter, [fieldName]: matches });
            SetStudent({
            ...user,
            [fieldName]: e.target.value
            })
        }
        if (sum[fieldName] >= maxLength-1) {
            const endsWithDoubleLetter = doubleLetters.some(letter => newValue.endsWith(letter));
            if (endsWithDoubleLetter && !isDeleting) {
              return;
            }
        }
        if(newValue.length + counter[fieldName] > maxLength){
            return
        }
        const matches = Array.from(e.target.value).filter(char => doubleLetters.includes(char)).length;
        SetCounter({ ...counter, [fieldName]: matches });
        SetStudent({ ...user, [fieldName]: e.target.value})           
    }

    if(loading){
        (<p>Loading...</p>)
    }
    else if(!loading){
        return(
            <main  class='d-flex flex-column'>
                 <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                     <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                         navigate('../menu/Gastos')
                     }} />
                     <p class='h3 align-self-center text-center' >Registro de gasto</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div class='d-flex align-self-center ' style={{}}>
                     <form   method="POST" onSubmit={(e) => {
                         e.preventDefault()
     
                         const isValid = Object.entries(user).filter(([key, value]) => {
                            switch (key) {
                                case 'concept':
                                    return sum.concept < 3 || sum.concept > 20
                                    
                                case 'method': 
                                    return sum.method < 3 || sum.method > 20
                            
                                default:
                                    return false
                            }
                         })
     
                         if (isValid.length > 0) {
                             SetError('Todos los campos deben tener por lo menos 3 carácteres y no pasar de su límite especificado')
                         }
                         else {
                             const formData = new FormData(e.target)
                             const payLoad = JSON.stringify(Object.fromEntries(formData))
     
                             fetch(url+'expenditures/', {
                                 method:'POST',
                                 credentials:'include',
                                 headers: {
                                     'content-type': 'application/json'
                                   },
                                 body: payLoad
                             }).then((res) => {return res.json()})
                             .then((res) => {SetConfirmation(res)})
                             .catch((e) => console.log(e))
     
                         }
                     }}>
                        <div class='d-flex align-self-end justify-content-end'>
                            <p class='text-end'> * = campo obligatorio</p>
                        </div>
                      <div className='m-4 align-items-center flex-column d-flex' >
                         <p class='h5'>Concepto*</p>
                         <p class='text-center'>{sum.concept+'/20'}</p>
                         <input className="inputs" required type="text" name="concept" id="name" value={user.concept} onChange={(e) => {
                            handleChange(e, 'concept', 20)
                         }}/>
                     </div>
                     <div className='m-4 align-items-center flex-column d-flex'>
                         <p class='h5 text-center'>Cantidad*</p>
                         <input className="inputs" required type="number" name='amount' value={user.amount} onChange={(e) => {SetStudent({
                            ...user,
                            amount: e.target.value
                         })}}/>
                     </div>
                     <div className='m-4'>
                        <p className='h5 text-center'>Método de pago*</p>
                        <p class='text-center'>{sum.method+'/20'}</p>
                        <input input className="inputs" required  name="method" value={user.method} onChange={(e) => {
                            handleChange(e, 'method', 20)
                        }}></input>
                    </div>
                   
                    <div className="m-4 d-flex justify-content-center">
                        <button 
                            id="button" 
                            type="submit" 
                            className="btn btn-lg btn-primary"
                            >
                            Registrar gasto
                        </button>
                    </div>
                     </form>
                 </div>
                
                 <Modal show={isOpen} >
               <Modal.Header >
                 <Modal.Title> Advertencia </Modal.Title>
               </Modal.Header>
               <Modal.Body>{errorMessage}</Modal.Body>
               <Modal.Footer>
                 <button class='btn btn-lg  align-self-center' style={{background:'black', color:'white'}} onClick={() => {
                   SetOpen(false)
                   SetError('')
                   if(confirmation !== null){
                    if(!confirmation.error){
                        location.reload()
                      }
                   }    
                 }}>Cerrar</button>
               </Modal.Footer>
             </Modal>
            </main>
         )
    }

    
}

export default RegistroGasto