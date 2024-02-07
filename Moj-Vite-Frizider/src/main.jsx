import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Fridge from './pages/Fridge.jsx'
import Chef from './pages/Chef.jsx'
import Login from './pages/LogIn.jsx'
import Signup from './pages/SignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/fridge', element: <Fridge />},
  { path: '/chef', element: <Chef />},
  { path: '/', element: <Login />},
  { path: '/signup', element: <Signup />}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);