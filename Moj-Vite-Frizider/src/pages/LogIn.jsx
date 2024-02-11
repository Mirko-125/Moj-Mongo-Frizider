import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styles/LogIn.css'
import '../styles/Fridge.css'

const userRoute = 'User'

function LogIn() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/SignUp');  
    }

    const handleCreate = () => {
        const userData = {
            email: email,
            password: password
        };
        
        fetch ('http://localhost:3000/User/login',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            sessionStorage.setItem('userId', data._id)
            let isChef = false
            if (data.userType === "Chef") {
                isChef = true
            }
            sessionStorage.setItem('isChef', isChef);
            navigate('/fridge');
        })
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
            <button className='create-btn' onClick={()=>handleCreate()}>Login</button>
            <a className='create-link' onClick={goToSignUp}>Sign up for Moj Mongo Frižider</a>
    </div>  
    </div>   
  )
}
export default LogIn
