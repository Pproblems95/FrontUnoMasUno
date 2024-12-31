import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import  estados from '../resources/estados.json'

function RegistroAlumno() {
    let isValid = []
    const [conStates, SetConStates] = useState(false)
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, setError] = useState('')
    const [branches, SetBranches] = useState([])
    const [confirmation, SetConfirmation] = useState(null)
    const url = import.meta.env.VITE_URL
    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => {return res.json()})
        .then((res) =>{SetData(res)} )
        .finally(() => {SetLoading(false)})
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
                .then(res => {
                    if(res.error){
                        SetConStates(true)
                        return
                    }
                    SetBranches(res.body.branches)})
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
                setError('Alumno registrado correctamente. Presiona para regresar al menú.')

            }
            else if (confirmation.error){
                setError('Ocurrió un error, por favor inténtanlo más tarde')
            }
        }
        
    },[confirmation])

    useEffect(() => {
        if(errorMessage !== '')
            SetOpen(true)
    }, [errorMessage])

    useEffect(() => {
        console.log(conStates)
    }, [conStates])




    
    
    const navigate = useNavigate()

    const doubleLetters = ['ñ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'ü', 'Ü', '!','¡','?','¿','.',',',';',':',];
    const [Student, SetStudent] = useState({
        name: '',
        patLastName: '',
        matLastName: '',
        momFullName: '',
        dadFullName: '',
        country: 'México',
        state: 'Aguascalientes',
        city: 'Aguascalientes',
        postalCode: '',
        address: '',
        emergencyPhone: '',
        visitReason: '',
        prevDiag: '',
        alergies: '',
        comments: '',
        idBranch: 0
    })
    const [counter, SetCounter] = useState({
        name: 0,
        patLastName: 0,
        matLastName: 0,
        momFullName: 0,
        dadFullName: 0,
        country: 0,
        postalCode: 0,
        address: 0,
        emergencyPhone: 0,
        visitReason: 0,
        prevDiag: 0,
        alergies: 0,
        comments: 0,
    })
    const [sum, SetSum] = useState({
        name: 0,
        patLastName: 0,
        matLastName: 0,
        momFullName: 0,
        dadFullName: 0,
        country: 0,
        postalCode: 0,
        address: 0,
        emergencyPhone: 0,
        visitReason: 0,
        prevDiag: 0,
        alergies: 0,
        comments: 0,})

        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                name: Student.name.length + counter.name,
            }));
        }, [counter.name, Student.name]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                patLastName: Student.patLastName.length + counter.patLastName,
            }));
        }, [counter.patLastName, Student.patLastName]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                matLastName: Student.matLastName.length + counter.matLastName,
            }));
        }, [counter.matLastName, Student.matLastName]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                momFullName: Student.momFullName.length + counter.momFullName,
            }));
        }, [counter.momFullName, Student.momFullName]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                dadFullName: Student.dadFullName.length + counter.dadFullName,
            }));
        }, [counter.dadFullName, Student.dadFullName]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                country: Student.country.length + counter.country,
            }));
        }, [counter.country, Student.country]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                postalCode: Student.postalCode.length + counter.postalCode,
            }));
        }, [counter.postalCode, Student.postalCode]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                address: Student.address.length + counter.address,
            }));
        }, [counter.address, Student.address]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                emergencyPhone: Student.emergencyPhone.length + counter.emergencyPhone,
            }));
        }, [counter.emergencyPhone, Student.emergencyPhone]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                visitReason: Student.visitReason.length + counter.visitReason,
            }));
        }, [counter.visitReason, Student.visitReason]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                prevDiag: Student.prevDiag.length + counter.prevDiag,
            }));
        }, [counter.prevDiag, Student.prevDiag]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                alergies: Student.alergies.length + counter.alergies,
            }));
        }, [counter.alergies, Student.alergies]);
        
        useEffect(() => {
            SetSum((prevSum) => ({
                ...prevSum,
                comments: Student.comments.length + counter.comments,
            }));
        }, [counter.comments, Student.comments]);

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
                         navigate('../menu')
                     }} />
                     <p class='h3 align-self-center text-center' >Registrar alumno</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-4 flex-column ' >
                     <form style={{}} class='align-items-center d-flex flex-column' action={'${url}students'} method="POST" onSubmit={(e) => {
                        
                        e.preventDefault();
                        
                        isValid = Object.entries(Student).filter(([key, value]) => {
                            switch (key) {
                                case 'name':
                                    return sum.name < 3 || sum.name > 30;
                                case 'patLastName': 
                                    return sum.patLastName < 3 || sum.patLastName > 30;
                                case 'matLastName':
                                    return sum.matLastName < 3 || sum.matLastName > 30;
                                case 'momFullName':
                                    return sum.momFullName < 3 || sum.momFullName > 50;
                                case 'dadFullName':
                                    return sum.dadFullName < 3 || sum.dadFullName > 50;
                                case 'country':
                                    return sum.country < 3 || sum.country > 20;
                                case 'state':
                                    return sum.state < 3 || sum.state > 20;
                                case 'city':
                                    return sum.city < 3 || sum.city > 20;
                                case 'postalCode':
                                    return sum.postalCode < 3 || sum.postalCode > 10;
                                case 'address':
                                    return sum.address < 3 || sum.address > 80;
                                case 'emergencyPhone':
                                    return sum.emergencyPhone < 3 || sum.emergencyPhone > 15;
                                case 'visitReason':
                                    return sum.visitReason > 255;
                                case 'prevDiag':
                                    return sum.prevDiag > 255;
                                case 'alergies':
                                    return sum.alergies > 255;
                                case 'comments':
                                    return sum.comments > 255;
                                case 'idBranch':
                                    return false;
                                default:
                                    return false;  
                            }
                            })
                       
                        if(isValid.length > 0){
                            const invalidFields = isValid.map(([key]) => key).join(', ');
                            SetConfirmation(true)
                            setError('Todos los campos obligatorios deben tener al menos 3 caracteres y no superar su límite especificado. ') //fix sign
                            return
                        }
                        else{
                            const formData = new FormData(e.target);
                            let dataObject = Object.fromEntries(formData);
                            dataObject = Object.fromEntries(
                            Object.entries(dataObject).filter(([_, value]) => value.trim() !== '')
                            );

                            const payload = JSON.stringify(dataObject);
                            fetch(url+'students', {
                                method:'POST',
                                credentials:'include',
                                headers: {
                                    'content-type': 'application/json'
                                  },
                                body: payload,
                                
                            })
                            .then((res) => {return res.json()})
                            .then((res) => {SetConfirmation(res)})
                            .catch((e) => alert(e))
                           
                        }

                     }}>
                        <div class='align-self-end'>
                        <p class=''> * = campo obligatorio</p>
                        </div>
                        <div class='m-4 '>
                         <p class='h5'>Nombre del alumno* </p>
                         <p class='text-center'> {(sum.name) +'/20' }</p>
                         <input className="inputs" required type="text" name="name" id="name" value={Student.name} onChange={(e) => {
                            handleChange(e, 'name', 20)}}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Apellido paterno* </p>
                         <p class='text-center'> {sum.patLastName+'/30 ' }</p>
                         <input className="inputs"  required type="text" name='patLastName' value={Student.patLastName} onChange={(e) => {
                            handleChange(e,'patLastName', 30)
                           }}/>
                     </div>
                     <div class='m-4 '>
                         <p class='h5 text-center'>Apellido materno</p>
                         <p class='text-center'> {sum.matLastName +'/30' }</p>
                         <input className="inputs"  type="text" name='matLastName' value={Student.matLastName} onChange={(e) => {
                            handleChange(e, 'matLastName', 30)
                         }}/>
                     </div>
                     <div className='m-4 align-items-center d-flex flex-column'>
                        <p className='h5'>Nombre completo de la mamá</p>
                        <p class='text-center'> {sum.momFullName +'/50' }</p>
                        <input className="inputs"  type="text" name='momFullName' value={Student.momFullName} onChange={(e) => {
                            handleChange(e, 'momFullName', 50)
                         }} />
                    </div>
                    <div className='m-4 align-items-center d-flex flex-column'>
                        <p className='h5'>Nombre completo del papá</p>
                        {Student.dadFullName.length +'/50' }
                        <input className="inputs" type="text" name='dadFullName' value={Student.dadFullName} onChange={(e) => { 
                            handleChange(e, 'dadFullName', 50)
                         }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>País de origen*</p>
                        <p class='text-center'> {sum.country +'/15' }</p>
                        <input className="inputs" required type='text' name='country' value={Student.country} onChange={(e) => { 
                            handleChange(e, 'country', 20)
                         }} />
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
                        <p className='h5 text-center'>Código postal*</p>
                        <p class='text-center'> {sum.postalCode +'/10 ' }</p>
                        <input className="inputs" required type="text" name='postalCode' value={Student.postalCode} onChange={(e) => {
                            handleChange(e, 'postalCode', 10)
                         }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Direccion*</p>
                        <p class='text-center'> {sum.address +'/80 ' }</p>
                        <input className="inputs" type="text" required name='address' value={Student.address} onChange={(e) => { 
                            handleChange(e, 'address', 80)
                         }} />
                    </div>
                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Teléfono de emergencia*</p>
                        <p class='text-center'> {sum.emergencyPhone +'/15 ' }</p>
                        <input className="inputs" type='tel' required name='emergencyPhone' value={Student.emergencyPhone} onChange={(e) => { 
                            handleChange(e, 'emergencyPhone', 15)
                        }} />
                    </div>
                    <div className="m-4 align-items-center flex-column d-flex">
    <p className="h5">Razón de la visita</p>
    <p className="text-center">{sum.visitReason + "/255"}</p>
    <textarea
        className="form-control border border-black"
        name="visitReason"
        value={Student.visitReason}
        onChange={(e) => {
            handleChange(e, 'visitReason', 255)
            e.target.style.height = "auto"; // Restablece el tamaño
            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta el tamaño al contenido
        }}
        rows="1"
    />
</div>

<div className="m-4 align-items-center flex-column d-flex">
    <p className="h5">Diagnóstico previo</p>
    <p className="text-center">{sum.prevDiag+ "/255"}</p>
    <textarea
        className="form-control border border-black"
        name="prevDiag"
        value={Student.prevDiag}
        onChange={(e) => {
            handleChange(e, 'prevDiag', 255)
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows="1"
    />
</div>

<div className="m-4 align-items-center flex-column d-flex">
    <p className="h5">Alergias</p>
    <p className="text-center">{sum.alergies + "/255"}</p>
    <textarea
        className="form-control border border-black"
        name="alergies"
        value={Student.alergies}
        onChange={(e) => {
            handleChange(e, 'alergies', 255)
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows="1"
    />
</div>

<div className="m-4 align-items-center flex-column d-flex">
    <p className="h5">Comentarios</p>
    <p className="text-center">{sum.comments + "/255"}</p>
    <textarea
        className="form-control border border-black"
        name="comments"
        value={Student.comments}
        onChange={(e) => {
            handleChange(e, 'comments', 255)
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows="1"
    />
</div>

                    <div className='m-4 align-items-center flex-column d-flex'>
                        <p className='h5'>Sucursal</p>
                        <select required class='form-select border border-dark' name="idBranch">
                          {!conStates ? (branches.map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                          ))) : (<option disabled>
                            No hay sucursales disponibles.
                          </option>)}
                        </select>
                    </div>
                    <button id="button" type='submit' className='align-self-center m-4 btn-lg btn btn-block'>Registrar alumno</button>
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
                    if (confirmation !== null){
                        if(!confirmation.error){
                            location.reload()
                        }
                    }
                
                else{
                    SetOpen(false)
                }
              }
            }}>Cerrar</button>
          </Modal.Footer>
        </Modal>
            </main>
            
         )
    }

    
}

export default RegistroAlumno