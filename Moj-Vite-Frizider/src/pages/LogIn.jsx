import React, { useState, useEffect } from 'react';
import '../styles/LogIn.css'
import '../styles/Fridge.css'
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/SignUp');  
    }

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
            <a className='create-link' onClick={goToSignUp}>Sign up for Moj Mongo Frižider</a>
    </div>  
    </div>   
  )
}

export default LogIn
