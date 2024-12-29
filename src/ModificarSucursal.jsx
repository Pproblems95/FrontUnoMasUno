import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import  estados from '../resources/estados.json'

function ModificarSucursal() {
    let isValid = []
    const doubleLetters = ['ñ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'ü', 'Ü', '!','¡','?','¿','.',',',';',':',];
    const [Student, SetStudent] = useState({
       name: "",
        country: "",
        state: "Aguascalientes",
        city: "Aguascalientes",
        postalCode: '',
        address: ""
    })
    const [counter, SetCounter] = useState({
        name:0,
        country: 0,
        postalCode: 0,
        address: 0
    })

    const [sum, SetSum] = useState({
        name:0,
        country: 0,
        postalCode: 0,
        address: 0
    })
    useEffect(() => {
        SetSum({
            name: counter.name + Student.name.length,
            country: counter.country + Student.country.length,
            postalCode: counter.postalCode + Student.postalCode.length,
            address: counter.address + Student.address.length,
        });
    }, [Student, counter]);

    const [data, SetData] = useState(null)
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
        if(confirmation === null){
            console.log('null')
            return
        }
        if(!confirmation.error){
            setError('Sucursal modificado correctamente. Presiona para regresar al menú.')
        }
    },[confirmation])

    useEffect(() => {
        if(Student !== null){
            
            SetLoading(false)
            console.log(Student)
        }
        
    }, [Student])

   

    useEffect(() => {
        if(errorMessage !== ''){
            SetOpen(true)
        }
    }, [errorMessage])

    
    
    
    const navigate = useNavigate()

    const handleChange = (e, fieldName, maxLength) => {
        const newValue = e.target.value;
        const isDeleting = newValue.length < Student[fieldName].length;
        if (!isDeleting && sum[fieldName] >= maxLength) {
            return;
        }
        else if(isDeleting && sum[fieldName] >= maxLength){
            const matches = Array.from(e.target.value).filter(char => doubleLetters.includes(char)).length;
            SetCounter({ ...counter, [fieldName]: matches });
            SetStudent({
            ...Student,
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
        SetStudent({ ...Student, [fieldName]: e.target.value})           
    }
    
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
                     }} >Modificar sucursal</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column align-items-center' >
                     <form style={{}} class='align-items-center d-flex flex-column' action={'${url}students'} method="POST" onSubmit={(e) => {
                        
                        e.preventDefault();
                        
                        isValid = Object.entries(Student).filter(([key, value]) => {
                            switch (key) {
                                case 'name':
                                    return sum.name < 3 || sum.name > 40
                                case 'postalCode':
                                    return sum.postalCode < 3 || sum.postalCode > 10
                                case 'address':
                                    return sum.address < 3 || sum.address > 80
                                    case 'country':
                                    return sum.country < 3 || sum.country > 80
                                default:
                                    return false
                             }
                        });
                       
                        if(isValid.length > 0){
                            const invalidFields = isValid.map(([key]) => key).join(', ');
                            setError('Todos los campos deben tener por lo menos 3 caracteres y no superar su límite indicado.')
                            return
                        }
                        else{
                            const formData = new FormData(e.target)
                            const payload = JSON.stringify(Object.fromEntries(formData))
                            fetch(url+'branches/'+params.idSucursal, {
                                method:'PUT',
                                credentials:'include',
                                headers: {
                                    'content-type': 'application/json'
                                  },
                                body: payload,
                            })
                            .then((res) => {return res.json()})
                            .then((res) => {SetConfirmation(res)})
                            .catch((e) => {alert(e)})
                           
                        }

                     }}>
                     <div class='d-flex align-self-end justify-content-end'>
                            <p class='text-end'> * = campo obligatorio</p>
                        </div>
                      <div className='m-4 align-items-center flex-column d-flex' >
                         <p class='h5'>Nombre de la sucursal*</p>
                         <p class='text-center'>{sum.name+'/40'}</p>
                         <input className="inputs" required type="text" name="name" id="name" value={Student.name} onChange={(e) => {
                            handleChange(e, 'name', 40)
                         }}/>
                     </div>
                     <div className='m-4 align-items-center flex-column d-flex'>
                         <p class='h5 text-center'>País*</p>
                         <p class='text-center'>{sum.country+'/20'}</p>
                         <input className="inputs" required type="text" name='country' value={Student.country} onChange={(e) => {
                            handleChange(e, 'country', 20)
                         }}/>
                     </div>
                     <div className='m-4'>
                        <p className='h5 text-center'>Estado*</p>
                        <select class='form-select border border-dark  '  name="state" value={Student.state} onChange={(e) => {SetStudent({...Student, state: e.target.value})}}>
                         {Object.keys(estados).map((llaves) => (
                            <option  key={llaves} value={llaves} >
                                {llaves}
                            </option>
                         ))}
                        </select>
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5 text-center'>Ciudad*</p>
                        <select  class='form-select border border-dark  ' name="city"  value={Student.city} onChange={(e) => { SetStudent({ ...Student, city:e.target.value}) }}>
                        {estados[Student.state].map((ciudad) => (
                            <option class='mw-25' key={ciudad} value={ciudad}>
                                {ciudad}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Codigo postal*</p>
                        <p class='text-center'>{sum.postalCode+'/10'}</p>
                        <input className="inputs" type='text' required name='postalCode' value={Student.postalCode} onChange={(e) => { handleChange(e,'postalCode', 10) }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Dirección*</p>
                        <p class='text-center'>{sum.address+'/80'}</p>
                        <input className="inputs" type='text' required name='address' value={Student.address} onChange={(e) => {handleChange(e, 'address', 80) }} />
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
                if(confirmation === null){
                    return
                }
                if(!confirmation.error){
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