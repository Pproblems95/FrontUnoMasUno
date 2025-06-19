import React, { useEffect, useState } from "react";
import logo from '../images/logonofondo.png'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

function Cortes(){
    const [isOpen, SetOpen] = useState(false)
    const [data, SetData] = useState(null)
    const [response, SetResponse] = useState(null)
    const [audit, SetAudit] = useState({
        paymentTotal: 0,
        expenditureTotal: 0,
        balance: 0,
        payments: [ 
        ],
        expenditures: [
        ]

        
    })
    const navigate = useNavigate()
    const [errorMessage, SetError] = useState('')
    const url = import.meta.env.VITE_URL

    const years = []
    const currentYear = new Date().getFullYear()
    for (let year = 2020; year <= currentYear; year++) {
        years.push(year.toString())
    }
    const monthes = {
        Enero: 1,
        Febrero: 2,
        Marzo: 3,
        Abril: 4,
        Mayo: 5,
        Junio: 6,
        Julio: 7,
        Agosto: 8,
        Septiembre: 9,
        Octubre: 10,
        Noviembre: 11,
        Diciembre: 12
    };
    const [date, SetDate] = useState({
        year: 2024,
        month: 1
    })

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
                console.log('loggeado')
            }
        }
    }, [data])

    useEffect(() => {
        if(response !== null ){
            console.log('response ')
            console.log(response)
            if(!response.error){
                SetAudit(response.body)
            }
            else if(response.error){
                if(response.status === 404){
                    SetError(response.body)
                }
                else{
                    SetError('Ocurrió un error inesperado y no pudimos cargar tu corte.')
                }
            }
            console.log(response)
        }
       
    }, [response])

    useEffect(() => {
        if(errorMessage !== ''){
            SetOpen(true)
        }
        
    }, [errorMessage])

    return(
        <main  class='d-flex flex-column'>
        <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
            <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                navigate('/menu/Administrar')
            }} />
            <p class='h3 align-self-center ' >Cortes</p>
            <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
        </div>
            <p class='h2 text-center m-4'>Selecciona una fecha</p>
        <div class='d-flex flex-row m-2 align-self-center'>
            <select class = 'mx-2' value={date.year} onChange={(e) => {SetDate({...date, year: e.target.value})}}>
                    {years.map((value) => { return(
                        <option key={value} value={value}>
                            {value}
                        </option>
                    )})}
            </select>
            <select class = 'mx-2' value={date.month} onChange={(e) => {SetDate({...date, month: e.target.value})}}>
                    {Object.entries(monthes).map(([key, value]) => { return(
                        <option key={value} value={value}>
                            {key}
                        </option>
                    )})}
            </select>
            <button id="button" class='btn-lg btn btn-block' onClick={() => {
                    if(date.year === 0){
                        return
                    }

                    fetch(url+'cut/'+date.year+'/'+date.month,  {
                        method: 'GET',
                        credentials: 'include',
                    })
                    .then((res) => {return res.json()})
                    .then((res) => {SetResponse(res)})
                    .catch((e) => {console.log(e)})

                }}>Buscar</button>

        </div>
        
        <p class='h2 text-center  my-2'>Corte</p>
        <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap'   >
            {response === null || response.error === true ? (<p class='h5 text-center'>Selecciona una fecha para corte.</p>) : (<><div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Total de pagos: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{'$'+audit.paymentTotal}</p>
            </div>  
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Total de gastos: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{'$'+audit.expenditureTotal}</p>
            </div>   
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2'>
                <p class='h6' style={{width:'45vw',}}>Fondo de caja: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>
                    {audit.cashfund ? `$${audit.cashFund}` : 'Sin datos'}
                </p>
            </div>
            <div style={{}} class='d-flex flex-row justify-content-between align-items-center mx-2 border-black border-top'>
                <p class='h6' style={{width:'45vw',}}>Balance final del mes: </p>
                <p style={{marginTop:'1.5vh', width:'45vw' ,}} class='text-end text-break'>{'$'+audit.balance}</p>
            </div>   </>)
            }
            
            
        </div>
        <p class='h2 text-center  my-2'>Pagos</p>
        <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap'   >
            {response === null || response.error === true ? (<p class='h5 text-center'>Aquí aparecerán tus pagos.</p>) : (
            <> 
            {audit.payments.map((payment) => {return(

          <div  class=" border-black border-top row">
          <div  class="col-6">
              <div class="row">
                  <div style={{}} class="col-12 d-flex flex-column">
                      <div style={{}} class="d-flex  justify-content-between">
                          <p class="h6">Fecha:</p>
                          <p class='text-end'>{payment.date}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Concepto:</p>
                          <p>{payment.concept}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Monto:</p>
                          <p>{'$'+payment.amount}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Comisión:</p>
                          <p>{payment.commissionAmount || 'Ninguna'}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div  class="col-6">
              <div class="row">
                  <div class="col-12 d-flex  flex-column">
                      <div class="d-flex  justify-content-between">
                          <p class="h6 ">Maestro:</p>
                          <p class='text-end'>{payment.teacher}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6 ">Estudiante:</p>
                          <p class='text-end'>{payment.student}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Método:</p>
                          <p class='text-end'>{payment.method}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      )})}</>

        )}
            
        </div> 
        <p class='h2 text-center  my-2'>Gastos</p>
        <div style={{background:'#ffdcf0', }} class='d-flex flex-grow-1 rounded m-1 flex-column text-wrap'   >
            {response === null || response.error === true ? (<p class='h5 text-center'>Aquí aparecerán tus gastos.</p>) : (
            <> 
            {audit.expenditures.map((payment) => {return(

          <div  class=" border-black border-top row">
          <div  class="col-6">
              <div class="row">
                  <div style={{}} class="col-12 d-flex flex-column">
                      <div style={{}} class="d-flex  justify-content-between">
                          <p class="h6">Fecha:</p>
                          <p class='text-end'>{payment.date}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Concepto:</p>
                          <p>{payment.concept}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Monto:</p>
                          <p>{'$'+payment.amount}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div  class="col-6">
              <div class="row">
                  <div class="col-12 d-flex  flex-column">
                      <div class="d-flex  justify-content-between">
                          <p class="h6 ">Maestro:</p>
                          <p class='text-end'>{payment.teacher}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <p class="h6">Método:</p>
                          <p class='text-end'>{payment.method}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      )})}</>

        )}
            
        </div> 

            <Modal show={isOpen} >
      <Modal.Header >
        <Modal.Title> Advertencia </Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorMessage}</Modal.Body>
      <Modal.Footer>
        <button class='btn btn-lg ' style={{background:'black', color:'white'}} onClick={() => {
          SetOpen(false)
          SetError('')
        }}>Cerrar</button>
      </Modal.Footer>
    </Modal>
   </main>
)}

export default Cortes