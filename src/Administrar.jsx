import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import { TbReportMoney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
import { PiBuildingOffice } from "react-icons/pi";
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
       <main style={{ height: '100vh', width: '100vw' }} className="d-flex flex-column">
  <div className="d-flex flex-row container-fluid justify-content-between" style={{ background: '#55d0b6' }}>
    <FaArrowAltCircleLeft
      className="align-self-center"
      style={{ height: 60, width: 70, margin: 10 }}
      onClick={() => navigate('../menu')}
    />
    <p className="h3 align-self-center">Administrar</p>
    <img
      src={logo}
      className="img-fluid align-self-center"
      alt="logo centro educativo"
      style={{ height: 100, width: 90 }}
    />
  </div>
  <div className="d-flex flex-grow-1 m-1 flex-column">
    <div className="row flex-fill m-0">
      <div className="col-12 col-md-6 col-lg-4 p-2">
        <button
          className="btn btn-dark w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/menu/Pagos/GenerarPago')}
        >
          <TbReportMoney className="rounded-circle" style={{ height: '10vh', width: '10vh', background: 'white', color:'black' }} />
          <p className="h5 text-white mt-3">Generar pago</p>
        </button>
      </div>
      <div className="col-12 col-md-6 col-lg-4 p-2">
        <button
          className="btn btn-dark w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/menu/Administrar/AgregarUsuario')}
        >
          <FaUserCircle className="rounded-circle" style={{ height: '10vh', width: '10vh', background: 'white', color:'black' }} />
          <p className="h5 text-white mt-3">Registrar usuario</p>
        </button>
      </div>
      <div className="col-12 col-md-6 col-lg-4 p-2">
        <button
          className="btn btn-dark w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/menu/Administrar/EliminarUsuario')}
        >
          <FaUserAltSlash className="rounded-circle" style={{ height: '10vh', width: '10vh', background: 'white', color:'black' }} />
          <p className="h5 text-white mt-3">Ver usuarios</p>
        </button>
      </div>
      <div className="col-12 col-md-6 col-lg-4 p-2">
        <button
          className="btn btn-dark w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/menu/Administrar/Sucursales')}
        >
          <PiBuildingOffice className="rounded-circle" style={{ height: '10vh', width: '10vh', background: 'white', color:'black' }} />
          <p className="h5 text-white mt-3">Ver sucursales</p>
        </button>
      </div>
      <div className="col-12 col-md-6 col-lg-4 p-2">
        <button
          className="btn btn-dark w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/menu/Administrar/RegistroSucursal')}
        >
          <FaPlus className="rounded-circle" style={{ height: '10vh', width: '10vh', background: 'white', color:'black' }} />
          <p className="h5 text-white mt-3">Registrar sucursal</p>
        </button>
      </div>
      <div className="col-12 col-md-6 col-lg-4 p-2">
        <button
          className="btn btn-dark w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/menu/Administrar/Cortes')}
        >
          <MdOutlineAttachMoney className="rounded-circle" style={{ height: '10vh', width: '10vh', background: 'white', color:'black' }} />
          <p className="h5 text-white mt-3">Cortes</p>
        </button>
      </div>
    </div>
  </div>
</main>

  )
}

export default Administrar
