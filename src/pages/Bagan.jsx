import { ref, child, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Footer, FullBagan, Header } from "../Components";
import { database } from "../config/firebase";
import initialData from "../data.json";

const Bagan = () => {
  const [actice, setActice] = useState("full-bagan");
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const dbRef = ref(database);
    const tournamentRef = child(dbRef, "tournaments/championship2024");
    const matchesRef = child(dbRef, "matches");

    function reconstructD3Json(matchId, allMatches) {
      const dbMatch = allMatches[matchId];
      if (!dbMatch) {
        console.warn(
          `Match ID '${matchId}' not found in database matches. Skipping.`
        );
        return null;
      }
      const d3Node = {
        title: dbMatch.title,
        name: dbMatch.winnerName,
        key: matchId,
      };
      if (dbMatch.children && dbMatch.children.length > 0) {
        d3Node.children = dbMatch.children
          .map((childId) => reconstructD3Json(childId, allMatches))
          .filter((childNode) => childNode !== null);
      }
      return d3Node;
    }

    const unsubscribeTournament = onValue(
      tournamentRef,
      (tournamentSnapshot) => {
        const tournamentData = tournamentSnapshot.val();
        if (tournamentData && tournamentData.rootMatchId) {
          const rootMatchFirebaseId = tournamentData.rootMatchId;

          const unsubscribeMatches = onValue(
            matchesRef,
            (matchesSnapshot) => {
              const allMatches = matchesSnapshot.val();
              if (allMatches) {
                const reconstructedD3Json = reconstructD3Json(
                  rootMatchFirebaseId,
                  allMatches
                );
                if (reconstructedD3Json) {
                  console.log("✅ Realtime data updated and reconstructed!");
                  setData(reconstructedD3Json);
                } else {
                  console.error("Failed to reconstruct D3.js JSON.");
                }
              } else {
                console.error("No 'matches' data found in the database.");
              }
            },
            (error) => {
              console.error("Error fetching matches data:", error);
            }
          );

          // Cleanup matches listener when tournament data changes
          return () => unsubscribeMatches();
        } else {
          console.error("Tournament data or rootMatchId not found.");
        }
      },
      (error) => {
        console.error("Error fetching tournament data:", error);
      }
    );

    // Cleanup both listeners on component unmount
    return () => {
      unsubscribeTournament();
    };
  }, []);

  const renderBagan = (active) => {
    switch (active) {
      case "full-bagan":
        return <FullBagan data={data} />;
      case "bagan_A":
        return <FullBagan data={data.children[0].children[0]} />;
      case "bagan_B":
        return <FullBagan data={data.children[0].children[1]} />;
      case "bagan_C":
        return <FullBagan data={data.children[1].children[0]} />;
      case "bagan_D":
        return <FullBagan data={data.children[1].children[1]} />;
      default:
        return <FullBagan data={data} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-inter">
      <Header />
      <div className="flex justify-center items-center h-16 bg-gray-800 gap-5">
        <p
          className={`${
            actice === "full-bagan" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("full-bagan")}
        >
          Full Bagan
        </p>
        <p
          className={`${
            actice === "bagan_A" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_A")}
        >
          Group A
        </p>
        <p
          className={`${
            actice === "bagan_B" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_B")}
        >
          Group B
        </p>
        <p
          className={`${
            actice === "bagan_C" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_C")}
        >
          Group C
        </p>
        <p
          className={`${
            actice === "bagan_D" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_D")}
        >
          Group D
        </p>
      </div>
      {renderBagan(actice)}
      <Footer />
    </div>
  );
};

export default Bagan;
