import './assets/App.css'
import logo from '../images/logonofondo.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'





function App() {
  const url = import.meta.env.VITE_URL
  const [loading, SetLoading] = useState(true)
  const [loginError, SetLoError] = useState(null)
  const navigate = useNavigate()
  const [isOpen, SetOpen] = useState(false)
  const [visible, SetVisible] = useState(false)
  const [errorMessage, setError] = useState('Ambos campos deben ser llenados con por lo menos 3 caracteres. Los usuarios no deben ser mayores a 20 caracteres.')
  
  useEffect(() => {
    SetLoading(true)
    fetch(url+'auth/check', {
      method: 'GET',
      credentials: 'include',
      headers:{'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then((res) => {
      if(res.status === 200){
        SetLoError(false)
        console.log('setloerror: ', loginError)
        console.log(res)
      }
      else {
        SetLoError(true)
      }
      
    })

    .catch(error => console.log(error))
    .finally(() => {
      SetLoading(false)
    })
    
  }, [])

  useEffect(() => {
    if (!loading && !loginError) {
      console.log( 'loading', loading)
      console.log('loginError', loginError)
      navigate('/menu');
    }
  }, [loginError, loading]);
 
  const [currentUser, SetUser] = useState({
    username: '',
    password: ''
   })
  

   if(loading){
    return(
      <>
      <p>loading...</p>
      </>
    )
   }
   
    return(
      <>
    <main style={{background:'black', height:'100vh'}} class='d-flex flex-column '>
        <div class='d-flex flex-row container-fluid justify-content-between ' style={{background:'white'}}>
        <img src={logo} class='img-fluid align-self-center' alt='logo centro educativo'style={{height:100, width:90,  }}/>
                             
                             <p class=' align-self-center ' >Por el desarrollo <br></br>íntegro del ser</p>
                             
                         </div>
        <div style={{background:'#55d0b6'}} class='d-flex  justify-content-between  flex-column flex-fill'>
          <div style={{}} class='d-flex justify-content-center'>
            <p class='text-center h1'>¡Bienvenido!</p>

          </div>
          <div class='d-flex justify-content-center flex-column  mx-3' style={{}}>
            <p class='text-center h3'>Usuario</p>
            <input  style={{background:'white', opacity:'90%'}} class='m-5 rounded' placeholder='Introduce tu usuario' value={currentUser.username} onChange={e => SetUser({
              ...currentUser,
              username: e.target.value
            })}/>
          </div>
          <div class='d-flex justify-content-center flex-column mx-3 ' style={{}}>
            <p class='text-center m h3'>Contraseña</p>
            <div class='d-flex flex-row  justify-content-between m-5'>
              <input  style={{background:'white', opacity:'90%', }} id='input' class='rounded input flex-fill my-2 mx-2' type={visible ? 'text' : 'password'} value={currentUser.password} placeholder='Introduce tu contraseña' onChange={e => SetUser({
              ...currentUser,
              password: e.target.value
            })}/>
              <button class='btn btn-sm  align-self-center ' style={{color:'white', background:'black'}} onClick={()=> {
                if(visible){
                  SetVisible(false)
                  return
                }
                SetVisible(true)
              }}>{visible ? 'Ocultar contraseña' : 'Ver contraseña'}</button>
            </div>
            
          </div>
          <button id="button"  class='align-self-center m-4 btn-lg btn btn-block' onClick={() => {
            if((currentUser.username.length < 3 || currentUser.username.length > 20)  || currentUser.password.length < 3){
              setError('Todos los campos debene tener de 3 a 20 caracteres.')
              SetOpen(true)
            }
            else{
              fetch(url+'auth/login', {
                    method: 'POST',
                    credentials:'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      'username': currentUser.username,
                      'password': currentUser.password
                    })
            })
              .then(response => response.json())
              .then((response) => {
                const error = response.error
                console.log(error)
                if(error == true){
                  setError('Credenciales incorrectas, por favor inténtelo de nuevo.')
                  SetOpen(true)
                }
                else{
                  navigate('/menu')
                }
              })
              .catch(error => console.log(error))
          }
            
            
            
          }}>Iniciar sesión</button>

        </div>

        <Modal show={isOpen} >
          <Modal.Header >
            <Modal.Title> Advertencia </Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <button class='btn btn-lg ' onClick={() => {
              SetOpen(false)
            }}>Cerrar</button>
          </Modal.Footer>
        </Modal>
      </main>
      </>
    )
    
   
 

  
  
}

export default App
