import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css'
import '../styles/Fridge.css'
import '../styles/SignUp.css'

function SignUp() {
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [isChef, setIsChef] = useState(false);

    const navigate = useNavigate();
    
    const goToLogin = () => {
        navigate('/');  
    };

    const handleCreate = () => {
        const userData = {
            name: name,
            email: email,
            password: password,
            isChef: isChef
        };
        fetch ("http://localhost:3000/User",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)  
        })
        .then(response => {
            if (response.ok) {
                navigate('/');
            }
        }) 
    };

  return (
    <div className="login-page">
    <div className="login-input" style={{ marginTop: 300, marginBottom: 210 }} >
            <input 
                className='create-input'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}        
            />
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

            <label for="checkbox"><input className="checkbox-wrapper" type="checkbox" value={true} onChange={(e) => setIsChef(e.target.value)} />Are you a chef?</label>

            <button className='create-btn' onClick={handleCreate}>Let's cook!</button>
            <a className='create-link' onClick={goToLogin}>Already have an account?</a>
    </div>  
    </div>   
  )
}

export default SignUp
