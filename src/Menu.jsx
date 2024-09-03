import './Menu.css'
import logo from '../images/logonofondo.png'
import { Button } from 'react-bootstrap'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Menu() {
    const navigate = useNavigate()
    return(
        <main style={{height:'100vh'}}class='d-flex flex-column justify-content-around ' >
           <div class='container-fluid d-flex justify-content-between' style={{background:'#55d0b6'}}>
                <div class = 'd-flex '  >
                    <FaUserCircle  style={{height:70, width:70, margin:10}}   />    
                </div>
                <div class='d-flex align-items-center'>
                    <strong class='h2'> Menú</strong>
                </div>
                <div  class='d-flex align-items-center' >
                    
                    <Button class=' btn' style={{background:'black'}} type='button' onClick={() => {
                        navigate('/menu/Administrar')
                    }} >Administrar</Button>
                    
                </div>
                  
            </div>
            <div  class='flex-grow-1 flex-row d-flex justify-content-around'>
                <div  class='align-items-center align-content-around d-flex ' style={{maxWidth: '50%', height:'auto'}}>
                    <img src={logo} class='img-fluid' alt='logo de centro educativo' />   
                </div>
                <div style={{margin:'2%'}} class='d-flex  flex-column justify-content-center flex-grow-1 '  >
                    <Button class=' btn' style={{background:'black', marginTop:'10%'}} type='button' onClick={() => {
                        navigate('/menu/RegistroAlumno')
                    }} >Registrar alumno</Button>
                    <Button class=' btn' style={{background:'black', marginTop:'10%'}} type='button' onClick={() => {
                        navigate('/menu/Alumnos')
                    }}>Ver alumnos</Button>
                    <Button class=' btn' style={{background:'black', marginTop:'10%'}} type='button' onClick={() => {
                        navigate('/menu/Pagos')
                    }} >Pagos</Button>
                    <Button class=' btn' style={{background:'black', marginTop:'10%'}} type='button' >Página usuario</Button>
                </div>
            </div> 
        </main>
        
    )
}

export default Menu
