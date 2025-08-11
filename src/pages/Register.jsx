import { ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Footer, Header } from "../Components";
import { database } from "../config/firebase";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const addItem = async () => {
    try {
      const userItemsRef = ref(database, `users/${username}`);
      await set(userItemsRef, { username, password });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await addItem();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-inter">
      <Header />
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleLogin}
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-2xl text-center text-white mb-4">Register</h1>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
