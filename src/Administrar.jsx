import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import { TbReportMoney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { useEffect, useState } from "react";




function Administrar() {
    const url = import.meta.env.VITE_URL
    const navigate = useNavigate()
    const [data, SetData] = useState(null)

    useEffect(() => {
        fetch(url+'auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
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
    return(
        <main style={{height:'100vh', width:'100vw'}} class='d-flex flex-column'>
        <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
            <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                navigate('../menu')
            }} />
            <p class='h3 align-self-center ' >Administrar</p>
            <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
        </div>
        <div style={{}} class='d-flex flex-grow-1  m-1 flex-column' >
          <div style={{}} class=' d-flex justify-content-center align-items-center flex-fill flex-row'>
            <button  class='align-self-center rounded my-1'style={{borderWidth:0, background:'black'}} onClick={() => {
                navigate('/menu/Pagos/GenerarPago')
            }}>
                <div class='flex-row d-flex'>
                    <TbReportMoney  class='rounded-circle m-3' style={{height:'10vh', width:'20vw', background:'white'}} />
                    <p class='align-self-center h3' style={{ color:'white'}}>Cortes y pagos</p>
                </div>
                
                
                
            </button>
            <div>
                
            </div>
          </div>
          <div style={{}} class=' d-flex justify-content-center align-items-center flex-fill flex-row'>
            <button  class='align-self-center rounded my-1'style={{borderWidth:0, background:'black'}} onClick={() => {
                navigate('/menu/Administrar/AgregarUsuario')
            }}>
                <div class='flex-row d-flex'>
                    <FaUserCircle class='rounded-circle m-3' style={{height:'10vh', width:'20vw', background:'white'}} />
                    <p class='align-self-center h3' style={{ color:'white'}}>Registrar usuario</p>
                </div>
            </button>
            <div>
            </div>
          </div>
          <div style={{}} class=' d-flex justify-content-center align-items-center flex-fill flex-row'>
            <button  class='align-self-center rounded my-1'style={{borderWidth:0, background:'black'}} onClick={() => {
                navigate('/menu/Administrar/EliminarUsuario')            }}>
                <div class='flex-row d-flex'>
                    <FaUserAltSlash class='rounded-circle m-3' style={{height:'10vh', width:'20vw', background:'white'}} />
                    <p class='align-self-center h3' style={{ color:'white'}}>Ver usuarios</p>
                </div>
            </button>
            <div>
            </div>
          </div>

        </div>
   </main>
    )
}

export default Administrar
