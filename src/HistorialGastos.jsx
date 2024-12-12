import { FaArrowAltCircleLeft } from "react-icons/fa";
import logo from '../images/logonofondo.png'
import './RegistroAlumno.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { use } from "react";


function Item(props){
    const navigate = useNavigate()
    return (
        <li style={{listStyle:'none', paddingInlineStart:0 }}>
            <div class='d-flex flex-row justify-content-between  border-bottom border-dark   ' style={{  borderBottomWidth:10, }} > 
                    
                    <div class=' d-inline-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Fecha:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.date}</p>
                    </div>

                    <div class=' d-flex  text-truncate  ' style={{width:'33vw'}}>
                    <p class=' align-self-center h6' style={{fontWeight:'bold', marginRight:10, }}>Concepto:</p>
                    <p class='align-self-center' style={{marginTop:'1.4vh'}}>{props.concept}</p>
                    </div>

                    <div class='align-content-center ' style={{}}> 
                    <button class='flex-fill btn align-self-center' style={{background:'black', color:'white', marginTop:'0.5vh' }} onClick={()=>
                    
                    navigate(navigate('/menu/Pagos/HistorialGastos/'+props.id))
                        
                    } >Ver más</button>
                    </div>
                    
                </div>
        </li>
    )
}



function HistorialGastos() {
    const [data, SetData] = useState(null)
    const [numberOfPages, SetNumber] = useState(0)
    const [usersList, SetUsersList] = useState([])
    const [isPressed, SetPressed] = useState(0)
    const [users, SetUsers] = useState(null)
    const [loading, SetLoading] = useState(false)
    const [limit, SetLimit] = useState(0)
    const [UppperLimit, SetUpper] = useState(0)
    const [show, SetShow] = useState({
        beginning: false,
        ending: false
    })

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
                fetch(url+'expenditures/all/'+(isPressed+1), {
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
            SetUsersList(users.body.expenditures)
        }
    }, [users])
    
    const navigate = useNavigate()
    return(
       <main  class='d-flex flex-column'>
            <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'#55d0b6'}}>
                <FaArrowAltCircleLeft class='align-self-center' style={{height:60, width:70, margin:10}} onClick={() => {
                    navigate('/menu/Gastos')
                }} />
                <p class='h3 align-self-center ' >Lista de gastos</p>
                <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
            </div>
            <div style={{ }} class='d-flex flex-grow-1  m-1 flex-column ' >
            
                
            <ul style={{listStyle:'none', padding:0, margin:0}}>
            {usersList.map((data) => <Item key={data.id} concept={data.concept} date={data.date} id={data.id}> </Item>)}
            </ul>
            </div>
            <div className="d-flex flex-wrap justify-content-center overflow-auto">
                    {show.beginning ? (<button onClick={() => {
                        SetPressed(0)
                        fetch(url + "expenditures/all/1"  , {
                            method: "GET",
                            credentials: "include",
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                SetUsers(res);
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
                        fetch(url + "expenditures/all/" + page, {
                            method: "GET",
                            credentials: "include",
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                SetUsers(res);
                            });
                    }
                }}
            >
                {page}
            </button>
        ))}
        {show.ending ? (<button onClick={() => {
            SetPressed(numberOfPages-1)
            fetch(url + "expenditures/all/" + numberOfPages, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => {
                    SetUsers(res);
                });

        }} className="btn btn-dark m-2" style={{background:'black', color:'white'}}>Ir al final</button>)
                    : (<></>)}
</div>
       </main>
    )
}

export default HistorialGastos