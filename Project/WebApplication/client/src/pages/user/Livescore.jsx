/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";
import { useNavigate } from "react-router-dom";
import RedLiveScore from "../../components/cards/RedLiveScore";
import GreenLiveScore from "../../components/cards/GreenLiveScore";
import { getLiveScore } from "../../controllers/user.controller";

const Livescore = () => {
  const { players, setPlayers } = useContext(PlayersContext);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const liveScoreData = await getLiveScore();

      console.log(liveScoreData);

      setPlayers({
        ...players,
        redPlayer1Score: liveScoreData.liveScoreObject.red1Score,
        greenPlayer1Score: liveScoreData.liveScoreObject.green1Score,
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [players, setPlayers]);

  const handleShowFinalScore = () => {
    navigate("/finalScore");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 lg:py-40">
      <h1 className="text-center text-4xl text-slate-700 lg:mb-20">
        Live Score
      </h1>
      <div className="w-full flex flex-wrap items-center justify-center ">
        <div className="w-full lg:w-1/2 text-center">
          <RedLiveScore
            name={players.redPlayer1Name}
            score={players.redPlayer1Score}
          />
        </div>
        <div className="w-full lg:w-1/2 text-center">
          <GreenLiveScore
            name={players.greenPlayer1Name}
            score={players.greenPlayer1Score}
          />
        </div>
      </div>

      <button
        className="px-4 py-2 bg-transparent rounded-lg shadow-md  mt-10 lg:mt-20 lg:px-10 lg:py-4 lg:text-xl"
        onClick={handleShowFinalScore}
      >
        Final Score
      </button>
    </div>
  );
};

export default Livescore;
