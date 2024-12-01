import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetallesAlumno() {
    const navigate = useNavigate()
    const params = useParams()
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [student, SetStudent] = useState(null)
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
                fetch(url+'students/search/'+params.IdAlumno, {
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

    if(!loading){
        return(
            <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('/menu/Alumnos/')
                }} />
                <p class='h3 align-self-center ' >Detalles </p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap' >
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Nombre del alumno: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.name}</p>
                </div>     
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Nombre de la mamá: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.matLastName}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Nombre del papá: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.patLastName}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Dirección: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.address}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Teléfono de emergencia: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.emergencyPhone}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Motivo inicial de la visita: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.visitReason}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Alergias o padecimientos del menor: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.alergies}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Cuenta con diagnóstico previo? </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.prevDiag !== null ? student.prevDiag : 'No'}</p>
                </div>   
                {/* <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Cuál: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>Nombreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
                </div>    */}
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Comentarios: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.comment || 'Ninguno'}</p>
                </div>   
                <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                    <p class='h6' style={{width:'45vw',}}>Sucursal perteneciente: </p>
                    <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{student.branchName}</p>
                </div>      
                
            </div>
            <button class='align-self-center btn  d-flex  m-1' style={{background:'black', color:'white'}} onClick={() => {
                navigate('/menu/Alumnos/'+params.IdAlumno+'/Modificar')
            }}>
                Modificar estudiante
            </button>
       </main>
        )
    }

    else if(loading){
        (<text>Loading...</text>)
    }

    

}

export default DetallesAlumno