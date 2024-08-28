import React, {Fragment, useState, useContext} from 'react';
import { UserContext } from 'Hooks/UserContext';
import './Login.css';

import { GiOwl } from "react-icons/gi";
import LogoHeader from './LogoHeader';
import LoginInputCard from './LoginInputCard';
import LoginCardFooter from './LoginCardFooter';
import RegisterInputCard from 'components/Register/RegisterInputCard';
import LiveScoreInputCard from 'components/LiveScore/LiveScoreInputCard';
import FinalScoreInputCard from 'components/FinalScore/FinalScoreInputCard';

//Data and models

export default function LoginCard() {

  const [loginInputDisplay, setLoginInputDisplay] = useState(true);
  const [registerDisplay, setRegisterDisplay] = useState(false);
  const [liveScoreDisplay, setLiveScoreDisplay] = useState(false);
  const [finalScoreDisplay, setFinalScoreDisplay] = useState(false);
  /*
  const [signupInputSecondDisplay, setSignupInputSecondDisplay] = useState(false);
  const [signupInputThirdDisplay, setSignupInputThirdDisplay] = useState(false);
  */

  const handleLogin = () =>{
    setLoginInputDisplay(false);
    setRegisterDisplay(true);
    setLiveScoreDisplay(false);
    setFinalScoreDisplay(false);
    console.log("Admin logged in");
  }

  const handleRegister = () =>{
    setLoginInputDisplay(false);
    setRegisterDisplay(false);
    setLiveScoreDisplay(true);
    setFinalScoreDisplay(false);
    console.log("Player Registered");
  }

  const handleFinalScoreDisplay = () =>{
    setLoginInputDisplay(false);
    setRegisterDisplay(false);
    setLiveScoreDisplay(false);
    setFinalScoreDisplay(true);
    console.log("Showing final score..");
  }

  const handleBackToMain = () =>{
    setLoginInputDisplay(true);
    setRegisterDisplay(false);
    setLiveScoreDisplay(false);
    setFinalScoreDisplay(false);
    console.log("Back to Main");
  }

  return (
    <div>
        <Fragment>

            <LogoHeader />

            <UserContext.Provider value={{handleLogin, handleRegister, handleFinalScoreDisplay, handleBackToMain}}>

            <div class="container cardDesign bigMargin">  

                {loginInputDisplay && <LoginInputCard />}
                {registerDisplay && <RegisterInputCard />}
                {liveScoreDisplay && <LiveScoreInputCard />}
                {finalScoreDisplay && <FinalScoreInputCard/>}
                    
            </div>

            </UserContext.Provider>

            <LoginCardFooter />

        </Fragment>
    </div>
  );
}