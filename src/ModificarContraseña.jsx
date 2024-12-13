import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { json, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'

function ModificarContraseña() {
    let isValid = []
    const [Student, SetStudent] = useState({
       adminPassword: '',
       newPass: '',
       newPassCon: ''
    })
    const [data, SetData] = useState(null)
    const types = ['admin', 'general', 'independiente']
    const [loading, SetLoading] = useState(true)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, setError] = useState('')
    const [confirmation, SetConfirmation] = useState(null)
    const params = useParams()
    const url = import.meta.env.VITE_URL
    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => {return res.json()})
        .then((res) =>{SetData(res)} )
    }, [])

    useEffect(() => {
        if(data != null){
            if(!data.error){
                console.log('ta logueado')

            }
            else{
                console.log('login fallido')
                navigate('/menu')
            }
        }
    }, [data])

    useEffect(() => {
        if(confirmation !== null){
            if(!confirmation.error){
                setError('Usuario modificado correctamente. Presiona para regresar al menú.')
            }
            else if(confirmation.error){
                setError(confirmation.body)
            }
            else {
                setError('Ocurrió un error inesperado. Por favor inténtalo más tarde.')
            }
        }
        
    },[confirmation])

    useEffect(() => {
        if(Student !== null){
            
            SetLoading(false)
        }
        console.log(Student)
    }, [Student])

    useEffect(() => {
        if(errorMessage !== ''){
            SetOpen(true)
        }
    }, [errorMessage])
    
    
    
    const navigate = useNavigate()

    
    
    if(loading){
        return(
            <p>loading...</p>
        )
    }
    else{
        return(
            <main  class='d-flex flex-column'>
                 <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                     <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                         navigate('/menu/Administrar/EliminarUsuario/'+params.IdAlumno)
                     }} />
                     <p class='h3 align-self-center text-center' onClick={() => {
                     }} >Modificar usuario</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                     <form style={{}} class='align-items-center d-flex flex-column' action={'${url}students'} method="POST" onSubmit={(e) => {
                        
                        e.preventDefault();

                        isValid = Object.entries(Student).filter(([key, value]) => {
                            if(value.length < 3){
                                return true
                            }
                        })

                        if(isValid.length > 0 ){
                            setError('Favor de llenar todos los campos con, por lo menos, 3 caracteres.')
                            return
                        }
                        
                        fetch(url+'auth/changepassword/'+params.IdAlumno, {
                            credentials: 'include',
                            method:'PUT',
                            headers: {
                                'content-type': 'application/json'
                              },
                            body: JSON.stringify({
                                "password": Student.adminPassword,
                                "newPassword": Student.newPass
                            })
                        }).then((res) => {return res.json()})
                        .then((res) => {SetConfirmation(res)})
                        .catch((e) => {console.log(e)})
                        
                     }}>
                     <div class='m-4  d-flex flex-column align-self-center'>
                         <p class='h5'>Contraseña del administrador</p>
                         <input className="inputs align-self-center" required type="text" name="name" id="name" value={Student.adminPassword} onChange={(e) => {SetStudent({
                            ...Student,
                            adminPassword: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4  d-flex flex-column align-self-center'>
                         <p class='h5 text-center'>Nueva contraseña</p>
                         <input className="inputs align.-self-center" required type="text" name='patLastName' value={Student.newPass} onChange={(e) => {SetStudent({
                            ...Student,
                            newPass: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4  d-flex flex-column align-self-center '>
                         <p class='h5 text-center'>Confirmar nueva contraseña</p>
                         <input className="inputs align-self-center" required type="text" name='matLastName' value={Student.newPassCon} onChange={(e) => {SetStudent({
                            ...Student,
                            newPassCon: e.target.value
                         })}}/>
                     </div>
                   
                    {/* <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Tipo de usuario</p>
                             <select class='form-select border border-dark' name="type" value={Student.type} onChange={(e) => {SetStudent({
                                 ...Student,
                                 type:e.target.value
                             })}}>
                               {types.map(type => (
                                 <option key={type} value={type}>
                                     {type}
                                 </option>
                               ))}
                             </select>
                     </div> */}
                    <button id="button" type='submit' className='align-self-center m-2 btn-lg btn btn-block'>Confirmar modificación</button>
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
              setError('')
              if(confirmation !== null && !confirmation.error){
                location.reload()
              }
            }}>Cerrar</button>
          </Modal.Footer>
        </Modal>
            </main>
            
         )
    }

    
}

export default ModificarContraseña