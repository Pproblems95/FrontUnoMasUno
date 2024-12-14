import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'

function ModificarUsuario() {
    let isValid = []
    const [Student, SetStudent] = useState({
       name: '',
        patLastName: "",
        matLastName: "",
        phone: "",
        username: "",
        type: "",
        commission: 0
    })
    const [StudentRes, SetStudentRes] = useState(null)
    const [data, SetData] = useState(null)
    const types = ['admin', 'general', 'independiente']
    const [loading, SetLoading] = useState(true)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, setError] = useState('')
    const [confirmation, SetConfirmation] = useState(true)
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

                fetch(url+'users/search/'+params.IdAlumno, {
                    method: 'GET',
                    credentials: 'include'
                })
                .then((res) => {return res.json()})
                .then((res) => {
                    
                    SetStudentRes(
                        res.body 
                    );
                })
                .finally(() => { SetLoading(false)})
                .catch((e) => console.log(e))
            }
            else{
                console.log('login fallido')
                navigate('/menu')
            }
        }
    }, [data])

    useEffect(() => {
        if(!confirmation){
            setError('Usuario modificado correctamente. Presiona para regresar al menú.')
        }
    },[confirmation])

    useEffect(() => {
        if(StudentRes !== null){
            // Filtrar campos que no son null
            const noNull = Object.entries(StudentRes).filter(([_, value]) => value !== null);
    
            // Convertir de nuevo a objeto
            const filteredObject = Object.fromEntries(noNull);
    
            // Actualizar el estado fusionando datos
            SetStudent((prevStudent) => ({
                ...prevStudent, // Mantiene los valores existentes de Student
                ...filteredObject, // Actualiza solo los valores de filteredObject
            }));
    
            console.log("Estado actualizado:", Student);
 
        }
    }, [StudentRes])

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
                         navigate('/menu/Administrar/EliminarUsuario')
                     }} />
                     <p class='h3 align-self-center text-center ' onClick={() => {
                     }} >Modificar usuario</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                     <form style={{}} class='align-items-center d-flex flex-column' action={'${url}students'} method="POST" onSubmit={(e) => {
                        
                        e.preventDefault();

                        if(Student.commission < 0 || Student.commission > 99.99){
                            setError('La comisión no puede ser menor que 0 ó mayor que 99.99')
                            return
                        }
                        
                        isValid = Object.entries(Student).filter(([key, value]) => {
                           
                            switch (key) {
                                case 'commission':
                                    return false
                                case 'name':
                                case 'patLastName':
                                    return value.length <3 || value.length > 30
                                case 'matLastName':
                                    return value.length > 30
                                default:
                                    return value.length < 3 || value.length > 20;
                            }
                            
                        });
                       
                        if(isValid.length > 0){
                            const invalidFields = isValid.map(([key]) => key).join(', ');
                            SetConfirmation(true)
                            setError('Todos los campos obligatorios deben tener al menos 3 caracteres y no pasar su límite. ') //fix sign
                            SetOpen(true)
                            return
                        }
                        else{
                            const formData = new FormData(e.target);
                            let dataObject = Object.fromEntries(formData);
                            dataObject = Object.fromEntries(
                            Object.entries(dataObject).filter(([_, value]) => value.trim() !== '')
                            );

                            const payload = JSON.stringify(dataObject);
                            console.log(payload)
                            fetch(url+'users/'+params.IdAlumno, {
                                method:'PUT',
                                credentials:'include',
                                headers: {
                                    'content-type': 'application/json'
                                  },
                                body: payload,
                                
                            })
                            .then((res) => {return res.json()})
                            .then((res) => {SetConfirmation(res.error)})
                           
                        }

                     }}>
                        <div class='align-self-start justify-content-end '>
                        <p class='text-end'> * = campo obligatorio</p>
                        </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Nombre*</p>
                         <p class='text-center'>{Student.name.length+'/30'}</p>
                         <input className="inputs" required type="text" name="name" id="name" value={Student.name} onChange={(e) => {SetStudent({
                            ...Student,
                            name: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Apellido paterno*</p>
                         <p class='text-center'>{Student.patLastName.length+'/30'}</p>
                         <input className="inputs" required type="text" name='patLastName' value={Student.patLastName} onChange={(e) => {SetStudent({
                            ...Student,
                            patLastName: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Apellido materno</p>
                         <p class='text-center'>{Student.matLastName.length+'/30'}</p>
                         <input className="inputs" required type="text" name='matLastName' value={Student.matLastName} onChange={(e) => {SetStudent({
                            ...Student,
                            matLastName: e.target.value
                         })}}/>
                     </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Teléfono*</p>
                        <p class='text-center'>{Student.phone.length+'/15'}</p>
                        <input className="inputs" type='tel' required name='phone' value={Student.phone} onChange={(e) => { SetStudent({...Student, phone: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Comisión</p>
                        <input className="inputs" type='number'  name='commission' value={Student.commission} onChange={(e) => { SetStudent({...Student, commission: e.target.value}) }} />
                    </div>
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
              if(isValid.length === 0){
                if(!confirmation){
                    navigate("/")
                }
                else{
                    SetOpen(false)
                    setError('')
                }
              }
            }}>Cerrar</button>
          </Modal.Footer>
        </Modal>
            </main>
            
         )
    }

    
}

export default ModificarUsuario