
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Menu from '../src/Menu.jsx'
import Alumnos from './Alumnos.jsx'
import DetallesAlumno from './DetallesAlumno.jsx'
import Pagos from './Pagos.jsx'
import GenerarPago from './GenerarPago.jsx'
import DetallesRecibo from './DetallesRecibo.jsx'
import Administrar from './Administrar.jsx'
import EliminarUsuario from './EliminarUsuario.jsx'
import AgregarUsuario from './AgregarUsuario.jsx'
import './index.css'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegistroAlumno from './RegistroAlumno.jsx'

const root = createRoot(document.getElementById('root'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <div>404 not found</div>
  },
  {
    path: '/menu',
    element:<Menu/>
  },
  {
    path: '/menu/RegistroAlumno',
    element:<RegistroAlumno/>,
    errorElement:<div>404 not found</div>
  },
  {
    path:'menu/Alumnos',
    element: <Alumnos/>,
    errorElement: <div>404 not found</div>
    
  },
  {
    path:'menu/Alumnos/:IdAlumno',
    element: <DetallesAlumno/>
  },
  {
    path:'/menu/Pagos',
    element: <Pagos/>
  },
  {
    path:'/menu/Pagos/GenerarPago',
    element: <GenerarPago/>
  },
  {
    path: '/menu/Pagos/GenerarPago/:idRecibo',
    element: <DetallesRecibo/>
  },
  {
    path: '/menu/Administrar',
    element: <Administrar/>
  },
  {
    path:'/menu/Administrar/EliminarUsuario',
    element: <EliminarUsuario/>
  },
  {
    path: '/menu/Administrar/AgregarUsuario',
    element: <AgregarUsuario/>
  }
]);


root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  
)

