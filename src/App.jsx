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
    <main style={{height:'100vh'}} class='d-flex flex-row'>
        <div style={{background:'white', width:'30vw'}} class='d-flex justify-content-between flex-column'>
          <div class='justify-content-center d-flex' style={{}}>
          <img src={logo} class='img-fluid ' alt='logo centro educativo'style={{height:'25vh', width:'20vw',  }}/>
          </div>
          <div>
            <p class='text-center'>Trabajando por ser el futuro <br/> y la mejora del ser.</p>
          </div>
          <div class='d-flex justify-content-center'>
          <p/>
          </div>
        </div>
        <div style={{background:'#55d0b6', width:'70vw'}} class='d-flex  justify-content-between  flex-column '>
          <div style={{}} class='d-flex justify-content-center'>
            <p class='text-center h1'>¡Bienvenido!</p>

          </div>
          <div class='d-flex justify-content-center flex-column  mx-3'>
            <p class='text-center h3'>Usuario</p>
            <input  style={{background:'white', opacity:'90%'}} class='m-5 rounded' placeholder='Introduce tu usuario' value={currentUser.username} onChange={e => SetUser({
              ...currentUser,
              username: e.target.value
            })}/>
          </div>
          <div class='d-flex justify-content-between flex-column mx-3 '>
            <p class='text-center m h3'>Contraseña</p>
            <input  style={{background:'white', marginRight:'10vw', opacity:'90%', }} class='rounded m-5' type='password' value={currentUser.password} placeholder='Introduce tu contraseña' onChange={e => SetUser({
              ...currentUser,
              password: e.target.value
            })}/>
          </div>
          <button id="button"  class='align-self-center m-4 btn-lg btn btn-block' onClick={() => {
            if((currentUser.username.length < 3 || currentUser.username.length > 20)  || currentUser.password.length < 3){
              setError('Ambos campos deben ser llenados con por lo menos 3 caracteres. Los usuarios no deben ser mayores a 20 caracteres.')
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
