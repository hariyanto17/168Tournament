import { ref, set, push } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router";
import InstagramIcon from "../assets/Instagram.svg";
import TiktokIcon from "../assets/Tiktok.svg";
import YoutubeIcon from "../assets/Youtube.svg";
import { Footer, Header } from "../Components";
import { database } from "../config/firebase";

const Streamers = () => {
  const [name, SetName] = useState("");
  const [link, setLink] = useState("");
  const [streamIn, setStreamIn] = useState("tiktok");
  const navigate = useNavigate();

  const addItem = async () => {
    try {
      console.log("streamIn, name, link", streamIn, name, link);
      const streamListRef = ref(database, 'stream');
      const newStreamRef = push(streamListRef);
      await set(newStreamRef, { streamIn, name, link });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSubmit = async () => {
    await addItem();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-inter">
      <Header />
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-xs">
          <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl text-center text-white mb-4">Streamers</h1>
            <div className="flex gap-8 mb-10">
              <button
                className="flex flex-col items-center group"
                onClick={() => setStreamIn("tiktok")}
              >
                <span
                  className={`w-12 h-12 mb-2 flex items-center justify-center rounded-full group-hover:bg-pink-600 transition ${
                    streamIn === "tiktok" ? "bg-pink-600" : "bg-white/10"
                  }`}
                >
                  <img src={TiktokIcon} alt="TikTok" className="w-7 h-7" />
                </span>
                <span className="text-gray-200 text-sm">TikTok</span>
              </button>
              <button
                className="flex flex-col items-center group"
                onClick={() => setStreamIn("instagram")}
              >
                <span
                  className={`w-12 h-12 mb-2 flex items-center justify-center rounded-full group-hover:bg-gradient-to-tr from-pink-500 to-yellow-400 transition ${
                    streamIn === "instagram"
                      ? "bg-gradient-to-tr from-pink-500 to-yellow-400"
                      : "bg-white/10"
                  }`}
                >
                  <img
                    src={InstagramIcon}
                    alt="Instagram"
                    className="w-7 h-7"
                  />
                </span>
                <span className="text-gray-200 text-sm">Instagram</span>
              </button>
              <button
                className="flex flex-col items-center group"
                onClick={() => setStreamIn("youtube")}
              >
                <span
                  className={`w-12 h-12 mb-2 flex items-center justify-center rounded-full group-hover:bg-red-500 transition ${
                    streamIn === "youtube" ? "bg-red-500" : "bg-white/10"
                  }`}
                >
                  <img src={YoutubeIcon} alt="WhatsApp" className="w-7 h-7" />
                </span>
                <span className="text-gray-200 text-sm">Youtube</span>
              </button>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="username"
              >
                name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => SetName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Streamers;