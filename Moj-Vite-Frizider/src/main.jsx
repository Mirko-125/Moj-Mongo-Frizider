import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Fridge from './pages/Fridge.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/fridge', element: <Fridge />}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);