import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function AgregarUsuario() {
    const navigate = useNavigate()
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState('')
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [confirmation, SetConfirmation] = useState(null)
    const [user, SetUser] = useState({
        username: "",
        password: "",
        name: "",
        patLastName: "",
        matLastName: "",
        phone: "",
        type: "",
        commission: 0
    })
    const types = ['admin', 'general', 'independiente']
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
            else if (confirmation.body === 'El nombre de usuario ya existe'){
                SetError(confirmation.body)
                return
            }
            SetError('El usuario fue agregado correctamente. Presiona para regresar')
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
                     <p class='h3 align-self-center ' >Agregar usuario</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div class='d-flex align-self-center'>
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
     
                             fetch(url+'auth/signup/', {
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
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Nombre de usuario</p>
                             <input className="inputs" required type="text" name='username' value={user.username} onChange={(e) => {SetUser({
                                 ...user,
                                 username:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Contraseña</p>
                             <input className="inputs" required type="text" name='password' value={user.password} onChange={(e) => {SetUser({
                                 ...user,
                                 password:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Nombre</p>
                             <input className="inputs" required type="text" name='name' value={user.name} onChange={(e) => {SetUser({
                                 ...user,
                                 name:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Apellido paterno</p>
                             <input className="inputs" required type="text" name='patLastName' value={user.patLastName} onChange={(e) => {SetUser({
                                 ...user,
                                 patLastName:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Apellido materno</p>
                             <input className="inputs" required type="text" name='matLastName' value={user.matLastName} onChange={(e) => {SetUser({
                                 ...user,
                                 matLastName:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Teléfono</p>
                             <input className="inputs" required type="text" name='phone' value={user.phone} onChange={(e) => {SetUser({
                                 ...user,
                                 phone:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Tipo de usuario</p>
                             <select class='form-select border border-dark' name="type" value={user.type} onChange={(e) => {SetUser({
                                 ...user,
                                 type:e.target.value
                             })}}>
                               {types.map(type => (
                                 <option key={type} value={type}>
                                     {type}
                                 </option>
                               ))}
                             </select>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Comisión</p>
                             <input className="inputs" required type="number" name='commission' value={user.commission} onChange={(e) => {SetUser({
                                 ...user,
                                 commission:e.target.value
                             })}}/>
                     </div>
                     <button id="button" type='submit' className='align-self-center m-4 btn-lg btn btn-block'>Registrar usuario</button>
                     </form>
                 </div>
                
                 <Modal show={isOpen} >
               <Modal.Header >
                 <Modal.Title> Advertencia </Modal.Title>
               </Modal.Header>
               <Modal.Body>{errorMessage}</Modal.Body>
               <Modal.Footer>
                 <button class='btn btn-lg ' style={{background:'black', color:'white'}} onClick={() => {
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

export default AgregarUsuario