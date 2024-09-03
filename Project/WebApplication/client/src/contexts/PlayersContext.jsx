/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const PlayersContext = createContext();

const PlayersProvider = ({children}) =>{
    
    const [players, setPlayers] = useState({
        redPlayer1Name: "",
        redPlayer1Score: 0,
        greenPlayer1Name: "",
        greenPlayer1Score: 0,
    });

    return <PlayersContext.Provider value={{players, setPlayers}}>
        {children}
    </PlayersContext.Provider>
}

export default PlayersProvider;