import React, {Fragment, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from 'Hooks/UserContext';

import './FinalScore.css';

import { GiOwl } from "react-icons/gi";
import GryffindorTeamHeader from 'components/TeamHeader/GryffindorTeamHeader';
import SlytherinTeamHeader from 'components/TeamHeader/SlytherinTeamHeader';
import { greenPlayer1, redPlayer1 } from 'models/player.model';

const FinalScoreInputCard = () =>{

  const navigate = useNavigate();
  
    
  const [redPlayer1Score, setRedPlayer1Score] = useState(0);
  const [greenPlayer1Score, setGreenPlayer1Score] = useState(0);

  const {handleBackToMain} = useContext(UserContext);

  const handleEndGame = async(e) =>{

    try {
      
      const getLiveScoreQuery = `http://localhost:4000/login/liveScore`;
      const response = await fetch(`${getLiveScoreQuery}`);

      if(response.status === 200){
        const responseData = await response.json();
        console.log(responseData);
        
        console.log("Red1 Score: " + responseData.red1Score);
        console.log("Green1 Score: " + responseData.green1Score);

        redPlayer1.score = 0;
        greenPlayer1.score = 0;
      }

    } catch (err) {
      console.log(err);
    }


    handleBackToMain();
  }

    return (
        <div>

          <h2 className='titleName'>Final Score</h2>
            <div class="inline">

            <div class="loginFields leftRegister">

  <div class="RegisterTeamHeaderDesign">
    <GryffindorTeamHeader />
  </div>

<div>
  <label className='registerLabel'>{redPlayer1.playerName} </label>
  <label className='registerLabel'>{redPlayer1.score} </label>
</div>

</div>

<div class="loginFields rightRegister">

<div class="RegisterTeamHeaderDesign">
    <SlytherinTeamHeader />
  </div>

<div>
  <label className='registerLabel'>{greenPlayer1.playerName} </label>
  <label className='registerLabel'>{greenPlayer1.score} </label>
</div>

</div>

            </div>

            <div className='centerAlign loginButtonField'>
                  <button type="button" class="btn btn-primary btn-sm registerButton" onClick={handleEndGame}>Endgame</button>
            </div>

        </div>
    );
  }

  export default FinalScoreInputCard;