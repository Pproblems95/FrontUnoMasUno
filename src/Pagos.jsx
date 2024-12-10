import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import { TbReportMoney } from "react-icons/tb";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import  { FaMoneyBill1Wave } from "react-icons/fa6";
import { useState, useEffect } from "react";

function Pagos(){
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const url = import.meta.env.VITE_URL
    const params = useParams()
    useEffect(() => {
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
             console.log(params.Pagos)
         }
         else{
             navigate('/')
         } 
        }    
 
     },[data])


    
    const navigate = useNavigate()
    if(params.Pagos === 'Pagos' ){
        return(
            <main style={{height:'100vh', width:'100vw'}} class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' >Pagos</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{}} class='d-flex flex-grow-1  m-1 flex-row ' >
              <div style={{}} class=' d-flex justify-content-center align-items-center flex-fill flex-column'>
                <button  class='align-self-center'style={{borderWidth:0, background:'transparent'}} onClick={() => {
                    navigate('/menu/Pagos/GenerarPago')
                }}>
                    <FaMoneyBill1Wave class='align-self-center' style={{height:'30vh', width:'30vw'}} />
                    
                </button>
                <div>
                    <button class='h2 btn btn-lg' style={{background:'black', color:'white', borderRadius:5}} onClick={() => {
                        navigate('/menu/Pagos/GenerarPago')
                    }}>Registrar Pago</button>
                </div>
              </div>
              <div class='align-items-center d-flex flex-fill justify-content-center flex-column' onClick={() => {
                navigate('/menu/Administrar/HistorialPagos')
              }}>
                <button style={{borderWidth:0, background:'transparent'}} onClick={() => {
                    console.log('h')
                }}>
                    <TbReportMoney class='align-self-center' style={{height:'30vh', width:'30vw'}} />
                    
                </button>
                <div>
                    <button class='h2  btn btn-lg' style={{background:'black', color:'white', borderRadius:5}} onClick={() => {
                        
                    }}>Ver historial</button>
                </div>
                
              </div>
            </div>
       </main>
        )
    }
    else if (params.Pagos === 'Gastos'){
        return(
            <main style={{height:'100vh', width:'100vw'}} class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('../menu')
                }} />
                <p class='h3 align-self-center ' >Gastos</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{}} class='d-flex flex-grow-1  m-1 flex-row ' >
              <div style={{}} class=' d-flex justify-content-center align-items-center flex-fill flex-column'>
                <button  class='align-self-center'style={{borderWidth:0, background:'transparent'}} onClick={() => {
                    navigate('/menu/Pagos/RegistroGasto')
                }}>
                    <FaMoneyBill1Wave class='align-self-center' style={{height:'30vh', width:'30vw'}} />
                    
                </button>
                <div>
                    <button class='h2 btn btn-lg' style={{background:'black', color:'white', borderRadius:5}} onClick={() => {
                        navigate('/menu/Pagos/RegistroGasto')
                    }}>Registrar gasto</button>
                </div>
              </div>
              <div class='align-items-center d-flex flex-fill justify-content-center flex-column' onClick={() => {
                navigate('/menu/Pagos/HistorialGastos')
              }}>
                <button style={{borderWidth:0, background:'transparent'}} onClick={() => {
                    console.log('h')
                }}>
                    <TbReportMoney class='align-self-center' style={{height:'30vh', width:'30vw'}} />
                    
                </button>
                <div>
                    <button class='h2  btn btn-lg' style={{background:'black', color:'white', borderRadius:5}} onClick={() => {
                        
                    }}>Ver historial</button>
                </div>
                
              </div>
            </div>
       </main>
        )
    }
   
}

export default Pagos