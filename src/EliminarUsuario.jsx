import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


function Item(props){
    const navigate = useNavigate()
    return (
        <li style={{listStyle:'none', paddingInlineStart:0 }}>
            <div class='d-flex flex-row justify-content-between  border-bottom border-dark   ' style={{  borderBottomWidth:10, }} > 
                    
                    <div class=' d-inline-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Tipo:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.type}</p>
                    </div>

                    <div class=' d-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Alumno:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.name}</p>
                    </div>

                    <div class='align-content-center ' style={{}}> 
                    <button class='flex-fill btn align-self-center' style={{background:'black', color:'white', marginTop:'0.5vh' }} onClick={()=>
                    
                    navigate('/menu/Administrar/EliminarUsuario/'+props.id)
                        
                    } >Ver más</button>
                    </div>
                    
                </div>
        </li>
    )
}



function EliminarUsuario() {
    const [data, SetData] = useState(null)
    const [numberOfPages, SetNumber] = useState(0)
    const [usersList, SetUsersList] = useState([])
    const [isPressed, SetPressed] = useState(0)
    const [users, SetUsers] = useState(null)
    const [loading, SetLoading] = useState(false)
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
                fetch(url+'users/all/'+(isPressed+1), {
                    method:'GET',
                    credentials:'include'
                })
                .then((res) => {return res.json()})
                .then((res) => {SetUsers(res)})
                .catch((e) => {console.log(e)})
            }
        }
    }, [data])

    useEffect(() => {
        if(users !== null){
            SetNumber(users.body.numberOfPages)
            const sortedUsers = users.body.users.sort((a,b) => {const compared = a.type.localeCompare(b.type) 
                if (compared !== 0) {
                    return compared
                }
                else {
                    return a.patLastName.localeCompare(b.patLastName)
                }
            })
            SetUsersList(sortedUsers)
        }
    }, [users])
    
    const navigate = useNavigate()
    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' >Lista de maestros</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{ }} class='d-flex flex-grow-1  m-1 flex-column ' >
            
                
            <ul style={{listStyle:'none', padding:0, margin:0}}>
            {usersList.map((data) => <Item key={data.id} type={data.type} name={data.patLastName + ' ' + data.matLastName + ' ' + data.name} id={data.id}> </Item>)}
            </ul>
            </div>
            <div class= 'd-flex align-self-center' style={{}}>
                    {/* Falta agregar la manera de hacerlo que solo se vean 10 botones a la vez */}
                    {Array.from({length:numberOfPages}, (_,index) => (
                        
                        <button key={index} class='flex-fill btn m-3 '  style={{backgroundColor: isPressed === index ? '#55d0b6' : 'black' ,color:'white' }} onClick={() => {
                           if (isPressed != index) {
                            SetPressed(index)
                           fetch(url+'users/all/'+(isPressed+1), {
                            method:'GET',
                            credentials:'include',
                          })  
                          .then((res) => {return res.json()})
                          .then((res) => {SetUsers(res)}) 
                           }
                            
                        }}>{index+1}</button>
                    ))}
                 </div>
       </main>
    )
}

export default EliminarUsuario