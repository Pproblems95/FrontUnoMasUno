import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import  estados from '../resources/estados.json'


function RegistroSucursal() {
    const navigate = useNavigate()
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState('')
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [confirmation, SetConfirmation] = useState(null)
    const [user, SetStudent] = useState({
        name: "",
        country: "",
        state: "Aguascalientes",
        city: "Aguascalientes",
        postalCode: "",
        address: ""
    })
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
            SetError('La sucursal fue agregada correctamente. Presiona para regresar')
        }
    }, [confirmation])

    if(loading){
        (<p>Loading...</p>)
    }
    else if(!loading){
        return(
            <main  class='d-flex flex-column'>
                 <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                     <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                         navigate('../menu/Administrar')
                     }} />
                     <p class='h3 align-self-center ' >Nueva sucursal</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div class='d-flex align-self-center ' style={{}}>
                     <form  action={'${url}auth/signup/'} method="POST" onSubmit={(e) => {
                         e.preventDefault()
     
                         const isValid = Object.entries(user).filter(([key, value]) => {
                             if(typeof value === 'number'){
                                 return false
                             }
                             return value.length < 3
                         })
     
                         if (isValid.length > 0) {
                             SetError('Todos los campos deben tener por lo menos 3 carácteres')
                         }
                         else {
                             const formData = new FormData(e.target)
                             const payLoad = JSON.stringify(Object.fromEntries(formData))
     
                             fetch(url+'branches/', {
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
                      <div className='m-4 align-items-center flex-column d-flex' >
                         <p class='h5'>Nombre de la sucursal</p>
                         <input className="inputs" required type="text" name="name" id="name" value={user.name} onChange={(e) => {SetStudent({
                            ...user,
                            name: e.target.value
                         })}}/>
                     </div>
                     <div className='m-4 align-items-center flex-column d-flex'>
                         <p class='h5 text-center'>País</p>
                         <input className="inputs" required type="text" name='country' value={user.country} onChange={(e) => {SetStudent({
                            ...user,
                            country: e.target.value
                         })}}/>
                     </div>
                     <div className='m-4'>
                        <p className='h5 text-center'>Estado</p>
                        <select class='form-select border border-dark  '  name="state" value={user.state} onChange={(e) => {SetStudent({...user, state: e.target.value})}}>
                         {Object.keys(estados).map((llaves) => (
                            <option  key={llaves} value={llaves} >
                                {llaves}
                            </option>
                         ))}
                        </select>
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5 text-center'>Ciudad</p>
                        <select  class='form-select border border-dark  ' name="city"  value={user.city} onChange={(e) => { SetStudent({ ...user, city:e.target.value}) }}>
                        {estados[user.state].map((ciudad) => (
                            <option class='mw-25' key={ciudad} value={ciudad}>
                                {ciudad}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Codigo postal</p>
                        <input className="inputs" type='text' required name='postalCode' value={user.postalCode} onChange={(e) => { SetStudent({...user, postalCode: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Dirección</p>
                        <input className="inputs" type='text' required name='address' value={user.address} onChange={(e) => { SetStudent({...user, address: e.target.value}) }} />
                    </div>
                    <div>
                        
                    </div>
                    <div className="m-4 d-flex justify-content-center">
                        <button 
                            id="button" 
                            type="submit" 
                            className="btn btn-lg btn-primary"
                            >
                            Registrar sucursal
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
                   if(!confirmation.error){
                     location.reload()
                   }
                 }}>Cerrar</button>
               </Modal.Footer>
             </Modal>
            </main>
         )
    }

    
}

export default RegistroSucursal