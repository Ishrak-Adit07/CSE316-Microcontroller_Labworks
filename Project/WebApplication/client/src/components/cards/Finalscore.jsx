/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";

const FinalscoreCard = () => {
  const { players } = useContext(PlayersContext);

  return (
    <div className="bg-transparent px-6 py-2 mt-10 lg:my-0 lg:p-10 rounded-lg shadow-md mx-20 w-full flex flex-wrap items-center justify-center">
      <div className="w-2/5 text-center">
        <h1 className="text-2xl my-10 text-slate-700">
          Red Player 1: {players.redPlayer1Name}
        </h1>
        <h1 className="text-xl my-10 text-slate-700">
          Score: {players.redPlayer1Score}
        </h1>
      </div>

      <div className="w-2/5 text-center">
        <h1 className="text-2xl my-10 text-slate-700">
          Green Player 1: {players.greenPlayer1Name}
        </h1>
        <h1 className="text-xl my-10 text-slate-700">
          Score: {players.greenPlayer1Score}
        </h1>
      </div>
    </div>
  );
};

export default FinalscoreCard;
