import { useEffect, useState } from "react";
import { Footer, Header } from "../Components";
import InstagramIcon from "../assets/Instagram.svg";
import TiktokIcon from "../assets/Tiktok.svg";
import YoutubeIcon from "../assets/Youtube.svg";
import bannerImage from "../assets/banner.png";
import { Link } from "react-router";
import { child, onValue, ref } from "firebase/database";
import { database } from "../config/firebase";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [live, setLive] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dbRef = ref(database);
    const streamerRef = child(dbRef, "stream");

    const unsubscribeStream = onValue(streamerRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      const loadedItems = [];
      if (data) {
        for (let id in data) {
          loadedItems.push({ id, ...data[id] });
        }
      }
      setLive(loadedItems);
    });
    return () => {
      unsubscribeStream();
    };
  }, []);

  return (
    <div className="bg-gray-900 text-gray-200 font-inter">
      <Header />
      <main>
        <section
          id="beranda"
          className="relative text-center py-10 md:py-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-60 bg-cover bg-center flex items-center justify-center">
            <img
              src={bannerImage}
              alt="Banner"
              className={`w-full object-cover md:max-w-1/2 h-auto transition-all duration-1000 ease-out ${
                isLoaded
                  ? "opacity-100 -translate-y-60 md:translate-y-0"
                  : "opacity-0 -translate-y-full"
              }`}
            />
          </div>
          <div
            className={`container mx-auto px-6 relative z-10 text-white transition-all duration-1000 ease-out delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
              Fun Games Handicap 3 only nine ball
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-yellow-400 mb-8">
              Total Hadiah Rp.5.500.000
            </p>
            <div className="max-w-4xl mx-auto backdrop-blur-xs p-8 rounded-xl shadow-lg border border-slate-700">
              <div className="grid md:grid-cols-2 gap-8 text-left text-lg">
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-yellow-500 border-b border-yellow-700 pb-2">
                    Informasi Turnamen
                  </h3>
                  <p>
                    <strong className="font-semibold">Tanggal:</strong> Minggu,
                    17 Agustus 2025
                  </p>
                  <p>
                    <strong className="font-semibold">Waktu:</strong> 10:00 AM -
                    Selesai
                  </p>
                  <p>
                    <strong className="font-semibold">Slot:</strong> 148 Peserta
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-yellow-500 border-b border-yellow-700 pb-2">
                    Pendaftaran & Pembayaran
                  </h3>
                  <p>
                    <strong className="font-semibold">Biaya:</strong> Rp.100.000
                  </p>
                  <p className="mt-2">
                    <strong className="font-semibold">
                      Transfer via Bank:
                    </strong>{" "}
                    BRI
                  </p>
                  <p className="font-mono text-xl tracking-wider">
                    011101102642505
                  </p>
                  <p>a/n Rifaldi Azhari Arfah</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-left text-lg mt-10">
                <div className="">
                  <h3 className="font-bold text-2xl mb-3 text-yellow-500 border-b border-yellow-700 pb-2">
                    Peraturan Pertandingan
                  </h3>
                  <ul className="list-disc list-inside space-y-2 pl-2 text-base">
                    <li>Sistem Gugur (Single Elimination), Race 4</li>
                    <li>Semi Final & Final: Race 5</li>
                    <li>No Golden Break, Bola 9 di spot</li>
                    <li>Maksimal 2 nama per pemain</li>
                    <li>Keputusan panitia mutlak</li>
                  </ul>
                </div>
                <div className="">
                  <h3 className="font-bold text-2xl mb-3 text-yellow-500 border-b border-yellow-700 pb-2">
                    Nonton Live di
                  </h3>
                  <div className="flex gap-4">
                    {live.length > 0 &&
                      live.map((item) => (
                        <div key={item.id}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.streamIn === "tiktok" && (
                              <div className="flex flex-col items-center group">
                                <span
                                  className={`w-12 h-12 mb-2 flex items-center justify-center rounded-full group-hover:bg-pink-600 transition bg-pink-600`}
                                >
                                  <img
                                    src={TiktokIcon}
                                    alt="TikTok"
                                    className="w-7 h-7"
                                  />
                                </span>
                                <span className="text-gray-200 text-sm">
                                  {item.name}
                                </span>
                              </div>
                            )}
                            {item.streamIn === "instagram" && (
                              <div className="flex flex-col items-center group">
                                <span
                                  className={`w-12 h-12 mb-2 flex items-center justify-center rounded-full group-hover:bg-gradient-to-tr transition g-gradient-to-tr from-pink-500 to-yellow-400`}
                                >
                                  <img
                                    src={InstagramIcon}
                                    alt="Instagram"
                                    className="w-7 h-7"
                                  />
                                </span>
                                <span className="text-gray-200 text-sm">
                                  {item.name}
                                </span>
                              </div>
                            )}
                            {item.streamIn === "youtube" && (
                              <div className="flex flex-col items-center group">
                                <span
                                  className={`w-12 h-12 mb-2 flex items-center justify-center rounded-full group-hover:bg-red-500 transition bg-red-500 `}
                                >
                                  <img
                                    src={YoutubeIcon}
                                    alt="WhatsApp"
                                    className="w-7 h-7"
                                  />
                                </span>
                                <span className="text-gray-200 text-sm">
                                  {item.name}
                                </span>
                              </div>
                            )}
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-3 justify-center mt-8">
                <a
                  href="https://wa.me/+62895402103329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-[#d4ad43] text-white text-center text-[15px] font-normal leading-[15px] py-3 px-6 rounded-[3px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#c09b3c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-yellow-500"
                >
                  Daftar Sekarang
                </a>
                <Link
                  to="/bagan"
                  className="mt-8 inline-block bg-[#d4ad43] text-white text-center text-[15px] font-normal leading-[15px] py-3 px-6 rounded-[3px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#c09b3c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-yellow-500"
                >
                  Lihat Bagan
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="tim" className="py-16 md:py-24 bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Tim Kami
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Kartu Anggota Tim 1 */}
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
                <img
                  src="https://placehold.co/150x150/1f2937/d1d5db?text=Hans"
                  alt="Foto John Doe"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover border-4 border-teal-500"
                />
                <h3 className="text-lg font-bold text-white">Hans</h3>
                <p className="yellow-600 text-sm">CEO</p>
              </div>
              {/* Kartu Anggota Tim 2 */}
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
                <img
                  src="https://placehold.co/150x150/1f2937/d1d5db?text=Aldy"
                  alt="Foto Sarah Lee"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover border-4 border-teal-500"
                />
                <h3 className="text-lg font-bold text-white">Aldy</h3>
                <p className="yellow-600 text-sm">Tim Pisang Goreng</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
                <img
                  src="https://placehold.co/150x150/1f2937/d1d5db?text=Hari"
                  alt="Foto Michael Chen"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover border-4 border-teal-500"
                />
                <h3 className="text-lg font-bold text-white">Hari</h3>
                <p className="yellow-600 text-sm">Tim Bakwan</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
                <img
                  src="https://placehold.co/150x150/1f2937/d1d5db?text=Cimot"
                  alt="Foto Jane Smith"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover border-4 border-teal-500"
                />
                <h3 className="text-lg font-bold text-white">Cimot</h3>
                <p className="yellow-600 text-sm">Yang bayar</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
