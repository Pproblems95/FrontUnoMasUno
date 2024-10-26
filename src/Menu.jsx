import './Menu.css'
import logo from '../images/logonofondo.png'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Menu() {
    const url = import.meta.env.VITE_URL
    
    const navigate = useNavigate()
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const [isAdmin, SetAdmin] = useState(false)
    useEffect(() => {
        SetLoading(true)
        fetch(url+'users/current', {
            method: 'GET',
            credentials:'include',
            header: {'Content-Type' : 'application/json'}
        })
        .then((res) => {return res.json();})
        .then((res) => {SetData(res); })
        .catch(error => console.log(error))
        .finally(() => SetLoading(false))
    }, [])

    useEffect(() => {
       if(data != null){
        if(data.error === false){
            console.log('login exitoso')
            console.log(data)
        }
        else{
            navigate('/')
        } 
       }    

    },[loading])
    useEffect(() => {
        if(data != null && data.body.type === 'admin'){
            SetAdmin(true)
        }
    }, [data])

    
    if(loading){
        return(
            <p>Loading...</p>
        )
    }
    else if (!loading){
        return(
            <main style={{height:'100vh'}}class='d-flex flex-column justify-content-around ' >
               <div class='container-fluid d-flex justify-content-between' style={{background:'#55d0b6'}}>
                    <div class = 'd-flex align-self-center text-wrap flex-fill' style={{maxWidth:'33vw'}} >
                        <p class='h4 text-justify text-break'>Hola, {data.body.name}!</p>
                    </div>
                    <div class='d-flex align-items-center flex-fill justify-content-center'>
                        <strong class='h1 align-self-center text-center'>Menú</strong>
                    </div>
                    <div  class='d-flex align-items-center flex-fill justify-content-end' style={{}} >
                       {isAdmin ? <Button class=' btn btn-sm ' style={{background:'black'}} type='button' onClick={() => {
                            navigate('/menu/Administrar')
                        }} >Administrar</Button> : <p> </p>}

                        
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
                        <Button class=' btn' style={{background:'black', marginTop:'10%'}} type='button' onClick={() => {
                            fetch(url+'auth/logout', {
                                method: 'DELETE',
                                credentials: 'include'
                            })
                            .then(res => res.json())
                            // .then(res => console.log(res))
                            .then(() => {
                                const timeoutID = setTimeout(() => {
                                    navigate('/')
                                }, 1000);
                            })
                            .catch(error => console.log(error))
                        }} >Cerrar sesión</Button>
                    </div>
                </div> 
            </main>
            
        )
    }

    
}

export default Menu
