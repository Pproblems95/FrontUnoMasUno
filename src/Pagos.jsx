import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import { TbReportMoney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import  { FaMoneyBill1Wave } from "react-icons/fa6";

function Pagos(){
    const navigate = useNavigate()
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
          <div class='align-items-center d-flex flex-fill justify-content-center flex-column'>
            <button style={{borderWidth:0, background:'transparent'}} onClick={() => {
                console.log('h')
            }}>
                <TbReportMoney class='align-self-center' style={{height:'30vh', width:'30vw'}} />
                
            </button>
            <div>
                <button class='h2  btn btn-lg' style={{background:'black', color:'white', borderRadius:5}}>Ver historial</button>
            </div>
          </div>
        </div>
   </main>
    )
}

export default Pagos