/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";
import { useNavigate } from "react-router-dom";
import FinalscoreCard from "../../components/cards/Finalscore";

const Finalscore = () => {
  const navigate = useNavigate();

  const { setPlayers } = useContext(PlayersContext);

  const handleBackToHome = () => {
    setPlayers({
      redPlayer1Name: "",
      greenPlayer1Name: "",
      redPlayer1Score: 0,
      greenPlayer1Score: 0,
    });
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 lg:py-20">
      <h1 className="text-center text-4xl text-slate-700 lg:mb-20">
        Final Score
      </h1>
      <div className="w-full flex flex-wrap items-center justify-center ">
        <FinalscoreCard />
      </div>

      <button
        className="px-4 py-2 bg-transparent rounded-lg shadow-md  mt-10 lg:mt-20 lg:px-10 lg:py-4 lg:text-xl"
        onClick={handleBackToHome}
      >
        Home
      </button>
    </div>
  );
};

export default Finalscore;
