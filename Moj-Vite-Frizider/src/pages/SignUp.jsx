import React, { useState, useEffect } from 'react';
import '../styles/LogIn.css'
import '../styles/Fridge.css'
import '../styles/SignUp.css'

function SignUp() {
    const [name, setName] = useState([]);
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

            <label for="checkbox"><input type="checkbox" id="checkbox" value="true" />Are you a chef?</label>

            <button className='create-btn' onClick={handleCreate}>Let's cook!</button>
            <a className='create-link' href="LogIn">Already have an account?</a>
    </div>  
    </div>   
  )
}

export default SignUp
