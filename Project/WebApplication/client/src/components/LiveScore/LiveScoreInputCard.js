import React, {Fragment, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from 'Hooks/UserContext';

import './LiveScore.css';

import { GiOwl } from "react-icons/gi";
import GryffindorTeamHeader from 'components/TeamHeader/GryffindorTeamHeader';
import SlytherinTeamHeader from 'components/TeamHeader/SlytherinTeamHeader';
import { greenPlayer1, redPlayer1 } from 'models/player.model';

const LiveScoreInputCard = () =>{

  const navigate = useNavigate();

  const {handleFinalScoreDisplay} = useContext(UserContext);

  const [redPlayer1Score, setRedPlayer1Score] = useState(0);
  const [greenPlayer1Score, setGreenPlayer1Score] = useState(0);

  const handleFinalScore = async(e) =>{
    handleFinalScoreDisplay();
  }

  const getLiveScore = async(e) =>{

    try {
      
      const getLiveScoreQuery = `http://localhost:4000/login/liveScore`;
      const response = await fetch(`${getLiveScoreQuery}`);

      if(response.status === 200){
        const responseData = await response.json();
        console.log(responseData);
        
        console.log("Red1 Score: " + responseData.red1Score);
        console.log("Green1 Score: " + responseData.green1Score);

        setRedPlayer1Score(responseData.red1Score);
        setGreenPlayer1Score(responseData.green1Score);

        redPlayer1.score = responseData.red1Score;
        greenPlayer1.score = responseData.green1Score;
      }

    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
        getLiveScore();
    }, 2000); // Adjust the interval time (in milliseconds) as needed

    return () => clearInterval(interval); // Cleanup function to clear the interval when the component unmounts
}, []);


    return (
        <div>

          <h2 className='titleName'>Live Score</h2>
            <div class="inline">

            <div class="loginFields leftRegister">

  <div class="RegisterTeamHeaderDesign">
    <GryffindorTeamHeader />
  </div>

<div>
  <label className='registerLabel'>{redPlayer1.playerName} </label>
  <label className='registerLabel'>{redPlayer1Score} </label>
</div>

<div>
</div>

</div>

<div class="loginFields rightRegister">

<div class="RegisterTeamHeaderDesign">
    <SlytherinTeamHeader />
  </div>

<div>
  <label className='registerLabel'>{greenPlayer1.playerName} </label>
  <label className='registerLabel'>{greenPlayer1Score} </label>
</div>

<div>
</div>

</div>

            </div>

            <div className='centerAlign loginButtonField'>
                  <button type="button" class="btn btn-primary btn-sm registerButton" onClick={handleFinalScore}>Final Score</button>
            </div>

        </div>
    );
  }

  export default LiveScoreInputCard;