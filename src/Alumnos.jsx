import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const data2 = [
//     {name: 'Morales Hernandez Jose Luis', sucursal:'instituto tecnologico de tijuana', id:0},
//     {name: 'sinuhe de jesus velazquez duran', sucursal:'instituto tecnologico de mexico', id:1},
//     {name: 'oscar arrellano lopez', sucursal: 'instituto tecnologico de mis huevos', id:2},
//     {name: 'alma maria rico', sucursal: 'instituto tecnologico del sexo', id:2}

// ]

function Item(props){
    const navigate = useNavigate()
    return (
        <li style={{listStyle:'none', paddingInlineStart:0 }}>
            <div class='d-flex flex-row justify-content-between  border-bottom border-dark   ' style={{  borderBottomWidth:10, }} > 
                    <div class=' d-flex  text-truncate  ' style={{width:'33vw'}}>
                    
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Sucursal:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.sucursal}</p>
                    </div>
                    
                    <div class=' d-inline-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Alumno:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.name}</p>
                    </div>

                    <div class='align-content-center ' style={{}}> 
                    <button class='flex-fill btn align-self-center' style={{background:'black', color:'white', marginTop:'0.5vh' }} onClick={()=>
                    
                    navigate('/menu/Alumnos/'+props.id)
                        
                    } >Ver más</button>
                    </div>
                    
                </div>
        </li>
    )
}

function Alumnos(){
    let test = ''
    const [isPressed, SetPressed] = useState(0)
    const [numberOfPages, SetNumber] = useState(0)
    const [loading, SetLoading] = useState(true)
    const [data, SetData] = useState(null)
    const [students, SetStudents] = useState(null)
    const [search, SetSearch] = useState('')
    const [studentsList, SetStudentsList] = useState([])
    const [suggestions, SetSuggestions] = useState({ error: false, status: null, body: [] });
    const [suggestionsRes, SetSuggestionsRes] = useState({ error: false, status: null, body: [] });
    const [limit, SetLimit] = useState(0)
    const [errorScreen, SetErrorScreen] = useState(false)
    const [UppperLimit, SetUpper] = useState(0)
    const [show, SetShow] = useState({
        beginning: false,
        ending: false
    })
    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
        .catch((e) => alert(e))
    }, [])

    useEffect(() => {
        if(data != null){
            if(!data.error){
              fetch(url+'students/all/'+(isPressed+1), {
                method:'GET',
                credentials:'include',
              })  
              .then((res) => {return res.json()})
              .then((res) => {SetStudents(res)})

              .catch((e) => {console.log(e)}) 
            }
            else {
                navigate("/")
            }
        }
        console.log(students)
    }, [data])
    useEffect(() => {
        if(students !== null){
            if(students.error){
                SetErrorScreen(true)
                SetLoading(false)

            }
            
            SetNumber(students.body.numberOfPages)
            const sortedStudents = students.body.students.sort((a,b) => { const comparedStudents = a.branchName.localeCompare(b.branchName)
                if(comparedStudents !== 0){
                    return comparedStudents
                }
                else{
                    return a.patLastName.localeCompare(b.patLastName)
                }
            })
            SetStudentsList(sortedStudents)
            SetLoading(false)
        }}, [students])
    
        useEffect(() => {
            if(suggestionsRes.status === 404){
                SetSuggestions({...suggestions, body:['No hay coincidencias']})
                return
            }
            if(suggestionsRes.error){
                SetSuggestions({...suggestions, body:['Hubo un error inesperado']})
                return
            }
            SetSuggestions(suggestionsRes)
            
        }, [suggestionsRes]);

        useEffect(() => {
            console.log(suggestions)
        }, [suggestions])

        useEffect(() => {
            if(numberOfPages <=  5){
                SetShow({beginning:false, ending:false})
                SetUpper(5)
            }
            else if(isPressed <= 5){
                SetShow({beginning:false, ending:true})
                SetUpper(10)
                SetLimit(0)
                return
            }
            else if(isPressed >= 5 && numberOfPages - isPressed >= 5){
                SetShow({beginning:true, ending:true})
                SetUpper(isPressed + 5)
                SetLimit(isPressed - 5)
                return
            }
            else if (isPressed + 5 > numberOfPages){
                SetShow({beginning:true, ending:false})
                SetUpper(numberOfPages)
                SetLimit(numberOfPages-10)
            }
            
        },[isPressed, numberOfPages])



        useEffect(() => {console.log('Final: '+ UppperLimit) 
            console.log('numberofPagoes ' + numberOfPages)}, [UppperLimit])
        useEffect(() => {console.log('inicio: ' + limit)}, [limit])

        useEffect(() => {
            if(search.length < 3){
                return
            }
            fetch(url+'students/searchName/'+search.replace(/ /g, '-'), {
                method:'GET',
                credentials:'include'
            })
            .then((res) => { return res.json()})
            .then((res) => {SetSuggestionsRes(res)})
            .catch((e) => {console.log(e)})
        }, [search])

  

    const url = import.meta.env.VITE_URL
    const navigate = useNavigate()
    if(!loading){
        if(errorScreen){
            return (<main>
                            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                                 <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                                     navigate('../menu')
                                 }} />
                                 <p class='h3 align-self-center ' >Lista de alumnos</p>
                                 <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                             </div>
                             <div style={{ }} class='d-flex flex-grow-1  m-1 flex-column ' >
                                <p class=' h-3 text-center'> Ocurrió un error, por favor inténtalo de nuevo más tarde. </p>
                                <button class='align-self-center btn ' style={{background:'black', color:'white'}}>Regresar</button>
                             </div>
                        </main>)
        }
        return(
            <main  class='d-flex flex-column'>
                 <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                     <FaArrowAltCircleLeft class='align-self-center' id='regresar'style={{height:60, width:70, margin:10}} onClick={() => {
                         navigate('../menu')
                     }} />
                     <p class='h3 align-self-center text-center' >Lista de alumnos</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>

                 <div class='d-flex flex-column justify-content-center my-2'>
                    <p class='h4 text-center'>Búsqueda por nombre</p>
                    <div class='d-flex flex-row align-self-center'>
                    <input class='input mx-1'  value={search} onChange={(e) => {
                        SetSearch(e.target.value)
                        
                    }}/>
                    <button class='btn mx-1 ' style={{background:'black', color:'white'}} onClick={() => {
                        SetSearch('')
                    }}>Limpiar</button>
                    </div>
                   
                    {suggestions && suggestions.body && suggestions.body.length > 0 && search.length >= 3 && (
    <ul
        className="list-group position-absolute w-100 mt-5 align-self-center "
        style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', overflowX:'hidden', top:'20vh', color:'blue'}}
    >
        {suggestions.body.map((student, index) =>
            typeof student === "string" ? ( // Verifica si el elemento es un mensaje
                <li
                    key={index}
                    className="list-group-item list-group-item-secondary "
                    style={{ cursor: "default", color: "gray" }}
                >
                    {student}
                </li>
            ) : ( // Si no, asume que es un objeto de sugerencia
                <li
                    key={student.id}
                    className="list-group-item list-group-item-action "
                    onClick={() => {
                        navigate('/menu/Alumnos/'+student.id)
                        SetSuggestions(null); // Ocultar sugerencias al seleccionar
                    }}
                    style={{ cursor: "pointer",
                        color:'black',
                        background:'#ccfff5'
                     }}
                >
                    <div class='d-flex flex-row justify-content-between'>
                        {student.name}
                        <button class=' btn ' style={{background:'black', color:'white', marginTop:'0.5vh' }} onClick={()=>
                    
                    navigate('/menu/Alumnos/'+student.id)
                        
                    } >Ver más</button>
                    </div>
                    
                </li>
            )
        )}
    </ul>
)}
                    
                 </div>
                 <div style={{ }} class='d-flex flex-grow-1  m-1 flex-column ' >
                 <ul style={{listStyle:'none', padding:0, margin:0}}>
                    
                     {studentsList.map((student) =>  (
                        <Item key={student.id} sucursal={student.branchName} name={student.patLastName + ' ' + (student.matLastName || '') + ' ' + student.name}  id={student.id}> </Item>))}
                </ul>
                 </div>
                 <div class='d-flex flex-row, align-self-center' style={{}}>
                 <div className="d-flex flex-wrap justify-content-center overflow-auto">
                    {show.beginning ? (<button onClick={() => {
                        SetPressed(0)
                        fetch(url + "students/all/1"  , {
                            method: "GET",
                            credentials: "include",
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                SetStudents(res);
                            });
                    }} className="btn btn-dark m-2" style={{background:'black', color:'white'}}>Ir al inicio</button>)
                    : (<></>)}
    {Array.from({ length: numberOfPages }, (_, index) => index + 1)
        .slice(limit, UppperLimit)
        .map((page) => (
            <button
                key={page}
                className="btn btn-dark m-2"
                style={{
                    backgroundColor: isPressed + 1 === page ? "#55d0b6" : "black",
                    color: "white",
                }}
                onClick={() => {
                    if (isPressed + 1 !== page) {
                        SetPressed(page - 1);
                        fetch(url + "students/all/" + page, {
                            method: "GET",
                            credentials: "include",
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                SetStudents(res);
                            });
                    }
                }}
            >
                {page}
            </button>
        ))}
        {show.ending ? (<button onClick={() => {
            SetPressed(numberOfPages-1)
            fetch(url + "students/all/" + numberOfPages, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => {
                    SetStudents(res);
                });

        }} className="btn btn-dark m-2" style={{background:'black', color:'white'}}>Ir al final</button>)
                    : (<></>)}
</div>
                 </div>
                 
            </main>
         )
    }
    else if (loading){
        return(
            <p>Cargando lista de alumnos</p>
        )
    }
    
}

export default Alumnos