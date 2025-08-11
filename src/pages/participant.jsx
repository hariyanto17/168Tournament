import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { database } from "../config/firebase";
import { ref, onValue, set, remove } from "firebase/database";
import { Footer, Header } from "../Components";

const Participant = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [participants, setParticipants] = useState({});
  const [newParticipant, setNewParticipant] = useState({ name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (isLoggedIn) {
      const participantsRef = ref(database, "participants");
      onValue(participantsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setParticipants(data);
        } else {
          setParticipants({});
        }
      });
    }
  }, [isLoggedIn]);

  const handleAddParticipant = () => {
    if (!newParticipant.name) return;
    const participantId = Date.now();
    set(ref(database, `participants/${participantId}`), {
      ...newParticipant,
      id: participantId,
      status: "Tidak Lunas",
    });
    setNewParticipant({ name: "" });
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Lunas" ? "Tidak Lunas" : "Lunas";
    set(ref(database, `participants/${id}/status`), newStatus);
  };

  const handleDeleteParticipant = (id) => {
    remove(ref(database, `participants/${id}`));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddParticipant();
    }
  };

  const filteredParticipants = Object.keys(participants)
    .filter((id) =>
      participants[id].name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((id) => {
      if (statusFilter === "All") return true;
      return participants[id].status === statusFilter;
    });

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-inter">
      <Header />
      <main className="container mx-auto p-4">
        {isLoggedIn ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Daftar Peserta
            </h1>

            <div className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
                Tambah Peserta Baru
              </h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Nama Peserta"
                  className="border border-gray-600 bg-gray-700 text-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={newParticipant.name}
                  onChange={(e) =>
                    setNewParticipant({
                      ...newParticipant,
                      name: e.target.value,
                    })
                  }
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="bg-[#d4ad43] text-white px-6 py-3 rounded-lg hover:bg-[#c09b3c] transition-colors duration-300 whitespace-nowrap"
                  onClick={handleAddParticipant}
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
                Filter Peserta
              </h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Cari Nama..."
                  className="border border-gray-600 bg-gray-700 text-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="border border-gray-600 bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">Semua</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Tidak Lunas">Tidak Lunas</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-4 text-left text-sm font-semibold text-yellow-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-yellow-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-yellow-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredParticipants.map((id, index) => (
                    <tr
                      key={id}
                      className="hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="p-4 whitespace-nowrap">
                        {index + 1} {participants[id].name}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            participants[id].status === "Lunas"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {participants[id].status}
                        </span>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500 transition-colors duration-300"
                          onClick={() =>
                            handleToggleStatus(id, participants[id].status)
                          }
                        >
                          Ubah Status
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                          onClick={() => handleDeleteParticipant(id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Akses Ditolak</h2>
            <p className="mb-4">Anda harus login untuk melihat halaman ini.</p>
            <Link to="/login" className="text-yellow-500 hover:underline">
              Login disini
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Participant;
