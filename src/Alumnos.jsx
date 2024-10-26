import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const data2 = [
    {name: 'Morales Hernandez Jose Luis', sucursal:'instituto tecnologico de tijuana', id:0},
    {name: 'sinuhe de jesus velazquez duran', sucursal:'instituto tecnologico de mexico', id:1},
    {name: 'oscar arrellano lopez', sucursal: 'instituto tecnologico de mis huevos', id:2},
    {name: 'alma maria rico', sucursal: 'instituto tecnologico del sexo', id:2}

]

function Item(props){
    const navigate = useNavigate()
    return (
        <li style={{listStyle:'none', paddingInlineStart:0 }}>
            <div class='d-flex flex-row justify-content-between  border-bottom border-dark   ' style={{  borderBottomWidth:10, }} > 
                    <div class=' d-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Alumno:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.name}</p>
                    </div>
                    
                    <div class=' d-inline-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Sucursal:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.sucursal}</p>
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


// function ListItems(){
//     return(
//         <ul style={{listStyle:'none', padding:0, margin:0}}>
//             {data.map((data) => <Item key={data.id} sucursal={data.sucursal} name={data.name} id={data.id}> </Item>)}
//         </ul>
//     )
// }

function Alumnos(){
    const [loading, SetLoading] = useState(true)
    const [data, SetData] = useState(null)
    const [students, SetStudents] = useState(null)
    const [count, SetCount] = useState(0)
    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
        .finally(() => {SetLoading(false)})
    }, [])

    useEffect(() => {
        if(data != null){
            if(!data.error){
              console.log("logueo exitoso")
              fetch(url+'students/all/1', {
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
        
    }, [data])
    const url = import.meta.env.VITE_URL
    const navigate = useNavigate()
    if(!loading){
        return(
            <main  class='d-flex flex-column'>
                 <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                     <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                         navigate('../menu')
                     }} />
                     <p class='h3 align-self-center ' >Lista de alumnos</p>
                     <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                 </div>
                 <div style={{ }} class='d-flex flex-grow-1  m-1 flex-column ' >
                 <ul style={{listStyle:'none', padding:0, margin:0}}>
                     {/* {students.map((data2) => <Item key={data2.body.students.id} sucursal={data2.body.students.branchName} name={data2.body.students.name} id={data2.body.students.id}> </Item>)} */}
                     {/* corrige esta funcion para que despliegue los datos del json recibido  */}
                </ul>
                 </div>
                 <button class='flex-fill btn m-3 ' style={{background:'black', color:'white' }}>Ver más estudiantes</button> 
                 {/* checa en este boton que no se muestre si hay menos de 20 alumnos en la lista  */}
            </main>
         )
    }
    else if (loading){
        return(
            <p>Loading...</p>
        )
    }
    
}

export default Alumnos