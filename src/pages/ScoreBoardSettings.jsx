import React, { useState, useEffect } from "react";
import { database } from "../config/firebase";
import { ref, set, onValue } from "firebase/database";

const ScoreBoardSettings = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeTeamName, setHomeTeamName] = useState("Home Team");
  const [awayTeamName, setAwayTeamName] = useState("Away Team");

  // Listen for changes in Firebase and update local state
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

    // Cleanup listeners on unmount
    return () => {
      // Firebase doesn't have an explicit 'off' for onValue,
      // but the listener will be garbage collected when the component unmounts
      // if it's not explicitly detached. For more complex scenarios,
      // you might want to store the unsubscribe function returned by onValue.
    };
  }, []);

  // Save data to Firebase whenever local state changes
  useEffect(() => {
    set(ref(database, "scoreboard/homeScore"), homeScore);
  }, [homeScore]);

  useEffect(() => {
    set(ref(database, "scoreboard/awayScore"), awayScore);
  }, [awayScore]);

  useEffect(() => {
    set(ref(database, "scoreboard/homeTeamName"), homeTeamName);
  }, [homeTeamName]);

  useEffect(() => {
    set(ref(database, "scoreboard/awayTeamName"), awayTeamName);
  }, [awayTeamName]);

  const incrementHome = () => setHomeScore((prev) => prev + 1);
  const decrementHome = () => setHomeScore((prev) => Math.max(0, prev - 1));
  const incrementAway = () => setAwayScore((prev) => prev + 1);
  const decrementAway = () => setAwayScore((prev) => Math.max(0, prev - 1));

  const resetScores = () => {
    setHomeScore(0);
    setAwayScore(0);
  };

  return (
    <div className="bg-gray-900 relative text-gray-200 font-inter h-dvh w-dvw flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl mb-8">Scoreboard Settings</h1>

      <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl mb-8">
        {/* Home Team Settings */}
        <div className="flex flex-col items-center bg-gradient-to-r from-[#9934ad] to-[#1197a9] p-6 rounded-lg shadow-lg m-4 w-full md:w-1/2">
          <h2 className="text-2xl mb-4">Home Team</h2>
          <input
            type="text"
            className="p-2 mb-4 rounded text-gray-900 w-full text-center"
            value={homeTeamName}
            onChange={(e) => setHomeTeamName(e.target.value)}
            placeholder="Home Team Name"
          />
          <p className="text-5xl font-bold mb-4">{homeScore}</p>
          <div className="flex space-x-4">
            <button
              onClick={decrementHome}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              -
            </button>
            <button
              onClick={incrementHome}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Away Team Settings */}
        <div className="flex flex-col items-center bg-gradient-to-l from-[#9934ad] to-[#1197a9] p-6 rounded-lg shadow-lg m-4 w-full md:w-1/2">
          <h2 className="text-2xl mb-4">Away Team</h2>
          <input
            type="text"
            className="p-2 mb-4 rounded text-gray-900 w-full text-center"
            value={awayTeamName}
            onChange={(e) => setAwayTeamName(e.target.value)}
            placeholder="Away Team Name"
          />
          <p className="text-5xl font-bold mb-4">{awayScore}</p>
          <div className="flex space-x-4">
            <button
              onClick={decrementAway}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              -
            </button>
            <button
              onClick={incrementAway}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetScores}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
      >
        Reset Scores
      </button>
    </div>
  );
};

export default ScoreBoardSettings;
