import './assets/App.css'
import logo from '../images/logonofondo.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Placeholder } from 'react-bootstrap'


const width = window.innerWidth
const height = window.innerHeight



function App() {
 
  const [userPH, SetUserPH] = useState('El usuario debe ser de 3 caracteres minimo y maximo 20')
  const [passPH, SetPassPH] = useState('La contraseña debe ser de al menos 3 caracteres')
  const [currentUser, SetUser] = useState({
    username: '',
    password: ''
   })
  const navigate = useNavigate()


  
  
  return (
    <>

    
      <div style={{flexDirection:'row', display:'flex', width: '100%', height: '100%'}} >
        
      <div id='light' style={{flex: 1, display:'flex', flexDirection:'column', height:1000,  }}>
          <div style={{alignSelf:'center'}}>
          <img src={logo} id='logo' width={250} height={250} alt='logotipo' style={{flex:1, display:'flex'}}></img>
          </div>
          <div style={{ flex:2, alignContent:'center', alignItems:'center', justifyContent:'center', display:'flex' }}>
            
            <p style={{textAlign:'center', flex:1 , color:'black'}}>Una escuela comprometida al futuo de las 
              nuevas generaciones, así como el desarrollo
              <br></br>
              íntegro del ser.
            </p>
          </div>
          <div style={{ flex:1, alignSelf:'center'}}>
            <button style={{background:'black', color:'white', fontSize:30, height:150, width: 200, borderRadius:30}}>
              Ayuda
            </button>
          </div>
        </div>
            
          
            <div style={{flex:5, alignContent:'center', flexDirection:'column', display:'flex', paddingTop:100, background:'#55d0b6'}}> 
            <strong style={{textAlign:'center', fontSize:50,}}>¡Bienvenido!</strong>
            <div style={{display:'grid', gridTemplateColumns: '1fr', alignSelf:'center',}}>
            <p style={{textAlign:'center', flex:1, padding:40, fontSize:30, fontWeight:'bold' }}>Usuario</p>
            <input id='username' placeholder={userPH} style={{flex:1, marginTop:20, borderWidth:3, borderTopColor: 'transparent', borderRightColor:'transparent', 
              borderLeftColor:'transparent', background:'transparent', borderBottomColor:'black', width: 250, alignSelf:'center',  }}
              value={currentUser.username} onChange={text => SetUser({
                ...currentUser,
                username: text.target.value
              })}/>
          </div>
          <div style={{display:'grid', gridTemplateColumns: '1fr', alignContent:'center', alignSelf:'center'}}>
            <p style={{textAlign:'center', flex:1, padding:40, fontSize:30, fontWeight:'bold' }}>Contraseña</p>
             <input id='password' type='text' style={{flex:1, marginTop:20, borderWidth:3, borderTopColor: 'transparent', borderRightColor:'transparent', 
              borderLeftColor:'transparent', background:'transparent', borderBottomColor:'black', width: 250 , alignSelf:'center'}}
               value={currentUser.password} onChange={e => SetUser({
                ...currentUser,
                password: e.target.value
               })}/>
          </div>
          <div style={{flex:1, marginTop:60, alignSelf:'center'}}>
            <button style={{background:'black', color:'white', height: 150, width:200, borderRadius:30
              , fontSize:30,
            }} onClick={ () => {
              if (currentUser == null) {
                
              }

              if (currentUser.password != null && currentUser.username != null) {
                fetch("https://velazduran.com:3000/api/auth/login", {
                  method: 'POST',
                  headers: {'Content-Type':'application/json'},
                  body: JSON.stringify({
                    username: currentUser.username,
                    password: currentUser.password
                  })               
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data)
                })
              }
              else{
                console.log('incorrecto')
              }
              
            }}>Iniciar sesión</button>
          </div>
            </div>
            
        
      </div>

      
    </>
  )
}

export default App
