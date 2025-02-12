import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState,  } from "react";
import { Modal } from 'react-bootstrap'

function DetallesUsuario() {
    const navigate = useNavigate()
    const params = useParams()
    const [data, SetData] = useState(null)
    const [deleted, SetDeleted] = useState(null)
    const [confirmation, SetConfirmation] = useState(false)
    const [loading, SetLoading] = useState(true)
    const [student, SetStudent] = useState(null)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState("")
    const url = import.meta.env.VITE_URL

    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
    }, [])

    useEffect(() => {
        if(data != null){
            if(!data.error){
                fetch(url+'users/search/'+params.IdAlumno, {
                    method: 'GET',
                    credentials: 'include'
                })
                .then((res) => {return res.json()})
                .then((res) => {SetStudent(res.body)})
                .catch((e) => console.log(e))
            }
        }
    }, [data])

    useEffect(() => {
        if(student != null){
            SetLoading(false)
        }
    }, [student])
    useEffect(() => {
        if(deleted != null){
            if(!deleted.error){
                SetConfirmation(true)
                SetError('Usuario eliminado correctamente.')
            }
            else if (deleted.error){
                SetConfirmation(true)
                SetError('Hubo un error, por favor inténtalo de nuevo más tarde.')
            }
        }
    }, [deleted])

    useEffect(() => {
        if(errorMessage !== ''){
            SetOpen(true)
        }
    }, [errorMessage])

    if(!loading){
        return(
            <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('/menu/Administrar/')
                }} />
                <p class='h3 align-self-center ' >Detalles </p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap' >
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Nombre: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.name}</p>
                </div>    
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Apellido paterno: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.patLastName}</p>
                </div>    
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Apellido materno </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.matLastName || 'No registrado'}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Teléfono: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.phone}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Nombre de usuario: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.username}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Tipo de usuario: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.type}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Comisión </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.commission !== null ? student.commission : 'No registrada'}</p>
                </div>   
                {/* <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Cuál: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
                </div>    */}
               
                
            </div>
            <div class='d-flex flex-row align-self-center'>
            <button class=' btn  d-flex  m-1' style={{background:'black', color:'white'}} onClick={() => {
                    navigate('/menu/Administrar/EliminarUsuario/'+params.IdAlumno+'/Modificar')
                }}>
                    Modificar usuario
                </button>
                <button class=' btn  d-flex   m-1' style={{background:'#55d0b6', color:'black'}} onClick={() => {
                    navigate('/menu/Administrar/EliminarUsuario/'+params.IdAlumno+'/ModificarContraseña')
                }}>
                    Modificar contraseña
                </button>
                
                
            </div>
            <button class=' btn  d-flex align-self-center justify-content-center align-items-center my-3  m-1' style={{background:'red', color:'white'}} onClick={() => {
                    SetError('¿Estás seguro de que deseas eliminar a este usuario?\nEste proceso no puede deshacerse.')
                }}>
                    Eliminar usuario
                </button>
            <Modal show={isOpen} >
          <Modal.Header >
            <Modal.Title> Advertencia </Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            {!confirmation ? (<div class='d-flex flex-row mx-auto' style={{}}>
            <button class='btn btn-lg  mx-2' style={{background:'black', color:'white'}} onClick={() => {
              SetOpen(false)
              SetError('')
              }
            }>Cancelar</button>
            <button class='btn btn-lg ' style={{background:'red', color:'white'}} onClick={() => {
              fetch(url+'users/'+params.IdAlumno, {
                method:'DELETE',
                credentials:'include',
              }).then((res) => {return res.json()})
              .then((res) => {SetDeleted(res)})
              .catch((e) => console.log(e))
              }
            }>Eliminar</button>
            </div>) : (<button class='btn btn-lg' style={{background:'black', color:'white'}} onClick={() => {
                navigate('/')
            }} >De acuerdo</button>)}
            
            
          </Modal.Footer>
        </Modal>
            
       </main>
       
        )
    }

    else if(loading){
        (<text>Loading...</text>)
    }

    

}

export default DetallesUsuario