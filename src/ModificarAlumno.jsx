import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import  estados from '../resources/estados.json'

function ModificarAlumno() {
    let isValid = []
    const [Student, SetStudent] = useState({
        name: '',
        patLastName: '',
        matLastName: '',
        momFullName: '',
        dadFullName: '',
        country: '',
        state: 'Aguascalientes',
        city: 'Aguascalientes',
        postalCode: '',
        addres: '',
        emergencyPhone: '',
        visitReason: '',
        prevDiag: '',
        alergies: '',
        comments: '',
        idBranch: 0
    })
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, setError] = useState('Alumno registrado correctamente. Presiona para regresar al menú.')
    const [branches, SetBranches] = useState([])
    const [confirmation, SetConfirmation] = useState(true)
    const [branch, SetBranch] = useState(0)
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
                fetch(url+'branches/all/1', {
                    method: 'GET',
                    credentials: 'include',
                })
                .then((res) => {return res.json()})
                .then(res => SetBranches(res.body.branches))

                fetch(url+'students/searchId/'+params.IdAlumno, {
                    method: 'GET',
                    credentials: 'include'
                })
                .then((res) => {return res.json()})
                .then((res) => {
                    
                    SetStudent(
                        res.body 
                    );
                })
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
            setError('Alumno modificado correctamente. Presiona para regresar al menú.')
            SetOpen(true)
        }
    },[confirmation])

    useEffect(() => {
        if(Student !== null){
            if(Student.idBranch != branch){
                const branchName = Student.branchName; // Obtener el branchName del response
                const matchingBranch = branches.find(branch => branch.name === branchName); // Buscar la sucursal correspondiente
                if (matchingBranch) {
                    SetBranch(matchingBranch.id);
                } else {
                    console.error(`No se encontró ninguna sucursal con el nombre: ${branchName}`);
                    // Opcionalmente asigna un valor por defecto o maneja el caso de error
                    SetBranch(0); // O cualquier valor predeterminado
                }
            }
            if(Student.error ){
                setError(Student.body)
            }
            
            SetLoading(false)
        }
        console.log(Student)
    }, [Student])
    useEffect(() => {
        console.log(branch)
        SetStudent({...Student, idBranch:branch})
    }, [branch])
    
    
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
                         navigate('../menu/Alumnos/'+params.IdAlumno)
                     }} />
                     <p class='h3 align-self-center text-center ' onClick={() => {
                        console.log(branches)
                     }} >Modificar alumno</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                     <form style={{}} class='align-items-center d-flex flex-column' action={'${url}students'} method="POST" onSubmit={(e) => {
                        
                        e.preventDefault();
                        
                        isValid = Object.entries(Student).filter(([key, value]) => {
                            if (typeof value === 'number') {
                                return false;
                            }
                            if(key === 'branchName'){
                                return false
                            }

                            return value.length < 3 || value.length > 20;
                        });
                       
                        if(isValid.length > 0){
                            const invalidFields = isValid.map(([key]) => key).join(', ');
                            SetConfirmation(true)
                            setError('Todos los campos deben tener de 3 a 20 caracteres. ') //fix sign
                            SetOpen(true)
                            return
                        }
                        else{
                            const formData = new FormData(e.target)
                            const payload = JSON.stringify(Object.fromEntries(formData))
                            console.log(payload)
                            fetch(url+'students/'+params.IdAlumno, {
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
                     <div class='m-4 '>
                         <p class='h5'>Nombre del alumno</p>
                         <input className="inputs" required type="text" name="name" id="name" value={Student.name} onChange={(e) => {SetStudent({
                            ...Student,
                            name: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Apellido paterno</p>
                         <input className="inputs" required type="text" name='patLastName' value={Student.patLastName} onChange={(e) => {SetStudent({
                            ...Student,
                            patLastName: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Apellido materno</p>
                         <input className="inputs" required type="text" name='matLastName' value={Student.matLastName} onChange={(e) => {SetStudent({
                            ...Student,
                            matLastName: e.target.value
                         })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                        <p className='h5'>Nombre completo de la mamá</p>
                        <input className="inputs" required type="text" name='momFullName' value={Student.momFullName} onChange={(e) => { SetStudent({...Student, momFullName: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center d-flex flex-column'>
                        <p className='h5'>Nombre completo del papá</p>
                        <input className="inputs" required type="text" name='dadFullName' value={Student.dadFullName} onChange={(e) => { SetStudent({...Student, dadFullName: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>País de origen</p>
                        <input className="inputs" required type='text' name='country' value={Student.country} onChange={(e) => { SetStudent({...Student, country: e.target.value}) }} />
                    </div>
                    <div className='m-4'>
                        <p className='h5 text-center'>Estado</p>
                        <select class='form-select border border-dark  '  name="state" value={Student.state} onChange={(e) => {SetStudent({...Student, state: e.target.value})}}>
                         {Object.keys(estados).map((llaves) => (
                            <option  key={llaves} value={llaves} >
                                {llaves}
                            </option>
                         ))}
                        </select>
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5 text-center'>Ciudad</p>
                        <select  class='form-select border border-dark  ' name="city"  value={Student.city} onChange={(e) => { SetStudent({ ...Student, city:e.target.value}) }}>
                        {estados[Student.state].map((ciudad) => (
                            <option class='mw-25' key={ciudad} value={ciudad}>
                                {ciudad}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5 text-center'>Código postal</p>
                        <input className="inputs" required type="text" name='postalCode' value={Student.postalCode} onChange={(e) => { SetStudent({...Student, postalCode: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Direccion</p>
                        <input className="inputs" type="text" required name='address' value={Student.address} onChange={(e) => { SetStudent({...Student, address: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Teléfono de emergencia</p>
                        <input className="inputs" type='tel' required name='emergencyPhone' value={Student.emergencyPhone} onChange={(e) => { SetStudent({...Student, emergencyPhone: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Razón de la visita</p>
                        <input className="inputs" type="text" required name='visitReason' value={Student.visitReason} onChange={(e) => { SetStudent({...Student, visitReason: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Diagnóstico previo</p>
                        <input className="inputs" type="text" required name='prevDiag' value={Student.prevDiag} onChange={(e) => { SetStudent({...Student, prevDiag: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Alergias</p>
                        <input className="inputs" type="text" required name='alergies' value={Student.alergies} onChange={(e) => { SetStudent({...Student, alergies: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Comentarios</p>
                        <input className="inputs" type='text' required name='comments' value={Student.comments} onChange={(e) => { SetStudent({...Student, comments: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Sucursal</p>
                        <select class='form-select border border-dark' name="idBranch"  value={branch} onChange={(e) => {SetBranch(parseInt(e.target.value))}} >
                          {branches.map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                          ))}
                        </select>
                    </div>
                    <button id="button" type='submit' className='align-self-center m-4 btn-lg btn btn-block'>Confirmar modificación</button>
                     </form>
                 </div>
                 <Modal show={isOpen} >
          <Modal.Header >
            <Modal.Title> Advertencia </Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <button class='btn btn-lg ' onClick={() => {
                if(Student.error){
                    navigate('/menu')
                }
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

export default ModificarAlumno