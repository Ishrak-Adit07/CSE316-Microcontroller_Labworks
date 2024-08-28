import React, {Fragment, useState, useContext} from 'react';
import { UserContext } from 'Hooks/UserContext';
import './Register.css';

import { GiOwl } from "react-icons/gi";
import RegisterHeader from './LiveScoreHeader';
import RegisterInputCard from './LiveScoreInputCard';
import RegisterCardFooter from './LiveScoreCardFooter';
import LoginInputCard from 'components/Login/LoginInputCard';

//Data and models

export default function LiveScoreCard() {

  const [loginInputDisplay, setLoginInputDisplay] = useState(true);
  const [registerDisplay, setRegisterDisplay] = useState(false);
  /*
  const [signupInputSecondDisplay, setSignupInputSecondDisplay] = useState(false);
  const [signupInputThirdDisplay, setSignupInputThirdDisplay] = useState(false);
  */

  const {handleRegister} = useContext(UserContext);

  return (
    <div>
        <Fragment>

            <RegisterHeader />

            <UserContext.Provider value={{handleRegister}}>

            <div class="container cardDesign bigMargin">  

                {loginInputDisplay && <LoginInputCard />}
                {registerDisplay && <RegisterInputCard />}
                    
            </div>


            </UserContext.Provider>

            <RegisterCardFooter />

        </Fragment>
    </div>
  );
}