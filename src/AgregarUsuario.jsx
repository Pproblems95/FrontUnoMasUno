import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function AgregarUsuario() {
    const navigate = useNavigate()
    const doubleLetters = ['ñ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'ü', 'Ü', '?', '¿', '!', '¡', ';', ':', ',', '.'];
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetError] = useState('')
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [pass, SetPass] = useState('')
    const [confirmation, SetConfirmation] = useState(null)
    const [user, SetUser] = useState({
        username: "",
        password: "",
        name: "",
        patLastName: "",
        matLastName: "",
        phone: "",
        type: "admin",
        commission: 0
    })
    const [counter, SetCounter] = useState({
        username: 0,
        password: 0,
        name: 0,
        patLastName: 0,
        matLastName: 0,
        phone: 0,
    })
    const [sum, SetSum] = useState({
        username: 0,
        password: 0,
        name: 0,
        patLastName: 0,
        matLastName: 0,
        phone: 0,
    })
    useEffect(() => {
        SetSum((prevSum) => ({
            ...prevSum,
            username: user.username.length + counter.username,
            password: user.password.length + counter.password,
            name: user.name.length + counter.name,
            patLastName: user.patLastName.length + counter.patLastName,
            matLastName: user.matLastName.length + counter.matLastName,
            phone: user.phone.length + counter.phone,
        }));
    }, [user, counter]);


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
                SetError(confirmation.body)
                return
            }
            else if (confirmation.body === 'El nombre de usuario ya existe'){
                SetError(confirmation.body)
                return
            }
            SetError('El usuario fue agregado correctamente. Presiona para regresar')
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
            SetUser({
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
        SetUser({ ...user, [fieldName]: e.target.value})           
    }

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
                         if(pass !== user.password){
                            SetError('Las contraseñas no coinciden')
                            return
                         }

                         if(user.commission < 0 || user.commission > 99.99){
                            SetError('La comisión tiene que ser un número entre 0 y 99.99')
                            return
                         }
     
                         const isValid = Object.entries(user).filter(([key, value]) => {
                             

                            switch (key) {
                                case 'username':
                                    return sum.username < 3 || sum.username > 20;
                                case 'password':
                                    return user.password.length < 3; // No tiene máximo, solo verificamos el mínimo.
                                case 'name':
                                    return sum.name < 3 || sum.name > 30;
                                case 'patLastName':
                                    return sum.patLastName < 3 || sum.patLastName > 30;
                                case 'matLastName':
                                    return sum.matLastName > 30; // No es required, solo verificamos el máximo.
                                case 'phone':
                                    return sum.phone < 3 || sum.phone > 15;
                                case 'type':
                                    return false; // Campo especial, siempre retorna false.
                                default:
                                    return false; // En caso de que la key no esté en la lista, retorna false.
                            }
                            
                             
                         })
     
                         if (isValid.length > 0) {
                             SetError('Todos los campos obligatorios deben tener al menos 3 caracteres y no pasar su límite. Además, la comisión no puede ser mayor a 99.99')
                         }
                         else {
                            const formData = new FormData(e.target);
                            let dataObject = Object.fromEntries(formData);
                            dataObject = Object.fromEntries(
                            Object.entries(dataObject).filter(([_, value]) => value.trim() !== '')
                            );

                            const payload = JSON.stringify(dataObject);
     
                             fetch(url+'auth/signup/', {
                                 method:'POST',
                                 credentials:'include',
                                 headers: {
                                     'content-type': 'application/json'
                                   },
                                 body: payload
                             }).then((res) => {return res.json()})
                             .then((res) => {SetConfirmation(res)})
                             .catch((e) => console.log(e))
     
                         }
                     }}>
                        <div class='align-self-start justify-content-end '>
                        <p class='text-end'> * = campo obligatorio</p>
                        </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Nombre de usuario*</p>
                             <p class='text-center'>{sum.username +'/20'}</p>
                             <input className="inputs" required type="text" name='username' value={user.username} onChange={(e) => {
                                handleChange(e, 'username', 20)
                             }}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Contraseña*</p>
                             <input className="inputs" required type="password" name='password' value={user.password} onChange={(e) => {SetUser({
                                 ...user,
                                 password:e.target.value
                             })}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Confirmar contraseña*</p>
                             <input className="inputs" required type="password"  value={pass} onChange={(e) => {SetPass(e.target.value)}}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Nombre*</p>
                             <p class='text-center'>{sum.name +'/30'}</p>
                             <input className="inputs" required type="text" name='name' value={user.name} onChange={(e) => {
                                handleChange(e, 'name', 30)
                             }}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Apellido paterno*</p>
                             <p class='text-center'>{sum.patLastName +'/30'}</p>
                             <input className="inputs" required type="text" name='patLastName' value={user.patLastName} onChange={(e) => {
                                handleChange(e, 'patLastName', 30)
                             }}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Apellido materno</p>
                             <p class='text-center'>{sum.matLastName +'/30'}</p>
                             <input className="inputs"  type="text" name='matLastName' value={user.matLastName} onChange={(e) => {
                                handleChange(e, 'matLastName', 30)
                             }}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Teléfono*</p>
                             <p class='text-center'>{sum.phone +'/15'}</p>
                             <input className="inputs" required type="text" name='phone' value={user.phone} onChange={(e) => {
                                handleChange(e, 'phone', 15)
                             }}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                             <p className='h5'>Tipo de usuario*</p>
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
                             <input className="inputs"  type="number" name='commission' value={user.commission} onChange={(e) => {SetUser({
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
                   SetError('')
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