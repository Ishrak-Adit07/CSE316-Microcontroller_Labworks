import React from 'react';
import './Nextmatch.css';

export default function GryffindorTeamHeader() {

  const homeTeam = "Gryffindor";
  const awayTeam = "Slytherin";

  return (
    <div>
      <div className='NextmatchCard'>

        <div className="NextmatchShow">
            <div className={`teamName ${homeTeam}`}>
                <img src={`assets/${homeTeam}.png`} alt="teamImage" className="teamImage" />
            </div>
        </div>

      </div>
    </div>
  )
}
