import React, {Fragment, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from 'Hooks/UserContext';

import './Register.css';

import { GiOwl } from "react-icons/gi";
import GryffindorTeamHeader from 'components/TeamHeader/GryffindorTeamHeader';
import SlytherinTeamHeader from 'components/TeamHeader/SlytherinTeamHeader';
import { greenPlayer1, redPlayer1 } from 'models/player.model';

const RegisterInputCard = () =>{

  const navigate = useNavigate();
    
  const [admin, setAdmin] = useState(" ");
  const [password, setPassword] = useState(" ");

  const [redPlayer1Name, setRedPlayer1Name] = useState(" ");
  const [redPlayer2Name, setRedPlayer2Name] = useState(" ");

  const [greenPlayer1Name, setGreenPlayer1Name] = useState(" ");
  const [greenPlayer2Name, setGreenPlayer2Name] = useState(" ");

  const {handleRegister} = useContext(UserContext);

  const onRedPlayer1Change = (e) =>{
    setRedPlayer1Name(e.target.value);
    console.log(redPlayer1Name);
  }
  const onRedPlayer2Change = (e) =>{
    setRedPlayer2Name(e.target.value);
    console.log(redPlayer2Name);
  }
  const onGreenPlayer1Change = (e) =>{
    setGreenPlayer1Name(e.target.value);
    console.log(greenPlayer1Name);
  }
  const onGreenPlayer2Change = (e) =>{
    setGreenPlayer2Name(e.target.value);
    console.log(greenPlayer2Name);
  }

  const handleNameRegistration = async(e) =>{
    console.log(redPlayer1Name);
    console.log(redPlayer2Name);
    console.log(greenPlayer1Name);
    console.log(greenPlayer2Name);

    redPlayer1.playerName = redPlayer1Name;
    greenPlayer1.playerName = greenPlayer1Name;  

    e.preventDefault();
    try{

        const redBody = { 
            "team" : "red", 
            "number" : 1,
            "name" : redPlayer1Name
         };
         const greenBody = { 
          "team" : "green", 
          "number" : 1,
          "name" : greenPlayer1Name
       };
        const responseRed = await fetch("http://localhost:4000/login/name", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(redBody),
        });

        const responseGreen = await fetch("http://localhost:4000/login/name", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(greenBody),
        });

        let responseData;
        if(responseRed.status === 200){
          responseData = await responseRed.json();
          console.log(responseData);
        }
        if(responseGreen.status === 200){
          responseData = await responseGreen.json();
          console.log(responseData);
        }
        console.log("Done");

    }catch(err){
        console.error(err.message);
    }

    handleRegister();
  }

    return (
        <div>
            <div class="inline">

            <div class="loginFields leftRegister">

  <div class="RegisterTeamHeaderDesign">
    <GryffindorTeamHeader />
  </div>

<div>
  <label className='registerLabel'>Player1: </label>
 <input type='name' name='player1' placeholder={`Enter name`} className='registerInput' onChange={onRedPlayer1Change} required/>
</div>

<div>
    <label className='registerLabel'>Player2: </label>
    <input type='name' name='player2' placeholder='Enter name' className='registerInput' onChange={onRedPlayer2Change}/>
</div>

</div>

<div class="loginFields rightRegister">

<div class="RegisterTeamHeaderDesign">
    <SlytherinTeamHeader />
  </div>

<div>
  <label className='registerLabel'>Player1: </label>
 <input type='name' name='player1' placeholder={`Enter name`} className='registerInput' onChange={onGreenPlayer1Change} required/>
</div>

<div>
    <label className='registerLabel'>Player2: </label>
    <input type='name' name='player2' placeholder='Enter name' className='registerInput' onChange={onGreenPlayer2Change}/>
</div>

</div>

            </div>

            <div className='centerAlign loginButtonField'>
                  <button type="button" class="btn btn-primary btn-sm registerButton" onClick={handleNameRegistration}>Register</button>
            </div>

        </div>
    );
  }

  export default RegisterInputCard;