import React, {Fragment, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from 'Hooks/UserContext';

import './Login.css';

import { GiOwl } from "react-icons/gi";

const LoginInputCard = () =>{

  const navigate = useNavigate();
    
  const [admin, setAdmin] = useState(" ");
  const [password, setPassword] = useState(" ");

  const {handleLogin} = useContext(UserContext);

  const onAdminChange = (e) =>{
    setAdmin(e.target.value);
  }

  const onPasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  const handleSignIn = async(e) =>{
    e.preventDefault();
    try{

        const body = { 
            email : "default email",
            password : "default password"
         };
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body),
        });
        let responseData;

        if(response.status===201){

          responseData = await response.json();
  
          console.log("This is currentUser Information: ")

          navigate("/home");
        }
        else{
          console.log("Log in not successful");
        }

    }catch(err){
        console.error(err.message);
    }
  }

    return (
        <div>
            <div class="loginFields">

                <h2 className='titleName'>Nova_Nexus<GiOwl className='titleIcon'/></h2>

                <div>
                  <label className='registerLabel'>Admin: </label>
                 <input type='email' name='email' placeholder={` admin`} className='registerInput' onChange={onAdminChange} required/>
                </div>

                <div>
                    <label className='registerLabel'>Password: </label>
                    <input type='password' name='password' placeholder='Enter password' className='registerInput' onChange={onPasswordChange}/>
                </div>

            </div>

            <div className='centerAlign loginButtonField'>
                <button type="button" class="btn btn-primary btn-sm registerButton" onClick={handleLogin}>Sign in</button>
            </div>
        </div>
    );
  }

  export default LoginInputCard;