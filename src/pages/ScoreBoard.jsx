import React, { useState, useEffect } from "react";
import { database } from "../config/firebase";
import { ref, onValue } from "firebase/database";
import bannerImage from "../assets/new-logo.png";

const ScoreBoard = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeTeamName, setHomeTeamName] = useState("Home Team");
  const [awayTeamName, setAwayTeamName] = useState("Away Team");

  useEffect(() => {
    const homeScoreRef = ref(database, "scoreboard/homeScore");
    const awayScoreRef = ref(database, "scoreboard/awayScore");
    const homeTeamNameRef = ref(database, "scoreboard/homeTeamName");
    const awayTeamNameRef = ref(database, "scoreboard/awayTeamName");

    onValue(homeScoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setHomeScore(data);
    });

    onValue(awayScoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setAwayScore(data);
    });

    onValue(homeTeamNameRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setHomeTeamName(data);
    });

    onValue(awayTeamNameRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setAwayTeamName(data);
    });

    return () => {
      // Cleanup listeners if necessary, though onValue listeners are often
      // automatically detached when the component unmounts.
    };
  }, []);

  return (
    <div className="bg-black relative text-gray-200 font-inter h-dvh w-dvw flex justify-center items-center">
      <div className="absolute inset-0 bg-cover bg-center flex items-center justify-center z-[100]">
        <img
          src={bannerImage}
          alt="Banner"
          className={`w-full object-cover md:max-w-1/4 h-auto transition-all duration-1000 ease-out `}
        />
      </div>
      <div className="flex flex-row justify-evenly items-center w-full px-20  text-2xl">
        <div className="flex bg-gradient-to-r from-[#9934ad] to-[#1197a9] w-full justify-start p-4">
          <p className="flex-1">{homeScore}</p>
          <h1 className="flex-1">{homeTeamName}</h1>
        </div>
        <div className="w-1/4"></div>
        <div className="flex bg-gradient-to-l from-[#9934ad] to-[#1197a9] w-full justify-end p-4">
          <h1 className="flex-1 text-right">{awayTeamName}</h1>
          <p className="flex-1 text-right">{awayScore}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;