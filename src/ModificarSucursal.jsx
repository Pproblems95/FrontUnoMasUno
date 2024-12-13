import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import  estados from '../resources/estados.json'

function ModificarSucursal() {
    let isValid = []
    const [Student, SetStudent] = useState({
       name: "",
        country: "",
        state: "Aguascalientes",
        city: "Aguascalientes",
        postalCode: '',
        address: ""
    })
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, setError] = useState('Usuario registrado correctamente. Presiona para regresar al menú.')
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
            if(!data.error && data.body.type === 'admin'){
                console.log('ta logueado')

                fetch(url+'branches/search/'+params.idSucursal, {
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
            setError('Sucursal modificado correctamente. Presiona para regresar al menú.')
            SetOpen(true)
        }
    },[confirmation])

    useEffect(() => {
        if(Student !== null){
            
            SetLoading(false)
        }
        console.log(Student)
    }, [Student])
    
    
    
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
                         navigate('/menu/Administrar/Sucursales')
                     }} />
                     <p class='h3 align-self-center text-center ' onClick={() => {
                     }} >Modificar usuario</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                     <form style={{}} class='align-items-center d-flex flex-column' action={'${url}students'} method="POST" onSubmit={(e) => {
                        
                        e.preventDefault();
                        
                        isValid = Object.entries(Student).filter(([key, value]) => {
                            if(typeof value === 'number'){
                                return false
                            }

                            switch (key) {
                               case 'name':
                                   return value.length < 3 || value.length > 40
                               case 'postalCode':
                                   return value.length < 3 || value.length > 10
                               case 'address':
                                   return value.length < 3 || value.length > 80
                               default:
                                   return value.length < 3 || value.length > 20
                            }
                        });
                       
                        if(isValid.length > 0){
                            const invalidFields = isValid.map(([key]) => key).join(', ');
                            SetConfirmation(true)
                            setError('Todos los campos deben tener por lo menos 3 caracteres y no superar su límite indicado.')
                            SetOpen(true)
                            return
                        }
                        else{
                            const formData = new FormData(e.target)
                            const payload = JSON.stringify(Object.fromEntries(formData))
                            console.log(payload)
                            fetch(url+'branches/'+params.idSucursal, {
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
                         <p class='h5'>Nombre de la sucursal</p>
                         <p class='text-center '>{Student.name.length+'/40'}</p>
                         <input className="inputs" required type="text" name="name" id="name" value={Student.name} onChange={(e) => {SetStudent({
                            ...Student,
                            name: e.target.value
                         })}}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>País</p>
                         <p class='text-center '>{Student.country.length+'/20'}</p>
                         <input className="inputs" required type="text" name='country' value={Student.country} onChange={(e) => {SetStudent({
                            ...Student,
                            country: e.target.value
                         })}}/>
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
                        <p className='h5'>Codigo postal</p>
                        <p class='text-center '>{Student.postalCode.length+'/10'}</p>
                        <input className="inputs" type='text' required name='postalCode' value={Student.postalCode} onChange={(e) => { SetStudent({...Student, postalCode: e.target.value}) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Dirección</p>
                        <p class='text-center '>{Student.address.length+'/80'}</p>
                        <input className="inputs" type='text' required name='address' value={Student.address} onChange={(e) => { SetStudent({...Student, address: e.target.value}) }} />
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
                    <button id="button" type='submit' className='align-self-center m-4 btn-lg btn btn-block'>Confirmar modificación</button>
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
                    navigate("/menu/Administrar")
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

export default ModificarSucursal