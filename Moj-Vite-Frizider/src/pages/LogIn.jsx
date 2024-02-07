import React, { useState, useEffect } from 'react';
import '../styles/LogIn.css'
import '../styles/Fridge.css'

function LogIn() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    
    const handleCreate = () => {
        const userData = {
            name: name,
            email: email,
            password: password
        };

        ///////////////////////


        };

  return (
    <div className="login-page">
      <div className="diy-fridge">
        <input className="searchbox" type="text" placeholder="Search..."/>
      </div>  
    <div className="login-input">
        <img className='create-logo' src="../src/assets/logo.png" />
            <input
                className='create-input'
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
             <input
                className='create-input'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='create-btn' onClick={handleCreate}>Login</button>
            <a className='create-link' href="SignUp">Sign up for Moj Mongo Frižider</a>
    </div>  
    </div>   
  )
}

export default LogIn
