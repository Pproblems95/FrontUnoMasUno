
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
import ModificarAlumno from './ModificarAlumno.jsx'
import DetallesUsuario from './DetallesUsuario.jsx'
import ModificarUsuario from './ModificarUsuario.jsx'
import HistorialPagos from './HistorialPagos.jsx'
import Sucursales from './Sucursales.jsx'
import DetallesSucursal from './DetallesSucursal.jsx'
import ModificarSucursal from './ModificarSucursal.jsx'
import RegistroSucursal from './RegistroSucursal.jsx'
import RegistroGasto from './RegistroGasto.jsx'
import HistorialGastos from './HistorialGastos.jsx'
import DetallesGasto from './DetallesGasto.jsx'
import Cortes from './Cortes.jsx'
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
    path:'/menu/:Pagos',
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
  },
  {
    path:'menu/Alumnos/:IdAlumno/Modificar',
    element: <ModificarAlumno/>
  },
  {
    path:'/menu/Administrar/EliminarUsuario/:IdAlumno',
    element: <DetallesUsuario/>
  },
  {
    path:'/menu/Administrar/EliminarUsuario/:IdAlumno/Modificar',
    element: <ModificarUsuario/>
  },
  {
    path:'/menu/Administrar/HistorialPagos',
    element: <HistorialPagos/>
  },
  {
    path:'/menu/Administrar/Sucursales',
    element: <Sucursales/>
  },
  {
    path:'/menu/Administrar/Sucursales/:idSucursal',
    element: <DetallesSucursal/>
  },
  {
    path:'/menu/Administrar/Sucursales/:idSucursal/Modificar',
    element: <ModificarSucursal/>
  },
  {
    path:'/menu/Administrar/RegistroSucursal/',
    element: <RegistroSucursal/>
  },
  {
    path:'/menu/Pagos/RegistroGasto',
    element: <RegistroGasto/>
  },
  {
    path:'/menu/Pagos/HistorialGastos',
    element: <HistorialGastos/>
  },
  {
    path:'/menu/Pagos/HistorialGastos/:idRecibo',
    element: <DetallesGasto/>
  },
  {
    path:'/menu/Administrar/Cortes',
    element: <Cortes/>
  }
  
]);


root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  
)

