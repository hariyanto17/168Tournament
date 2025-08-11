import React, { useState } from "react";
import { database } from "../config/firebase";
import { ref, update } from "firebase/database";

const PlayerModal = ({ player, onClose }) => {
  const [newPlayerName, setNewPlayerName] = useState();

  if (!player) {
    return null;
  }

  const handleUpdate = () => {
    if (newPlayerName.trim() === "") {
      return;
    }

    const matchRef = ref(database, `matches/${player.key}`);

    update(matchRef, {
      winnerName: newPlayerName,
    })
      .then(() => {
        console.log("Player name updated successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error updating player name: ", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {player.title}
        </h2>

        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          className="border border-gray-700 rounded-md px-3 py-2 mt-4 w-full"
          placeholder="Enter new player name"
        />
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
