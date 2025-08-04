import { useEffect, useState } from "react";
import { Footer, Header } from "../Components";
import bannerImage from "../assets/banner.png";

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="absolute inset-0 bg-black opacity-60 bg-cover bg-center flex items-center justify-center">
        <img
          src={bannerImage}
          alt="Banner"
          className={`w-full object-cover md:max-w-1/2 h-auto transition-all duration-1000 ease-out ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }`}
        />
      </div>
      <main
        className={`flex-1 flex flex-col items-center justify-center py-16 px-4 `}
      >
        <div
          className={`flex flex-col items-center justify-center transition-all duration-1000 ease-out delay-300 ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-shadow-lg">
            Layanan Kami
          </h1>
          <p className="text-lg text-gray-300 mb-8 text-center max-w-xl text-shadow-lg">
            Kami menyediakan meja billiard dengan nuansa yang sejuk, full AC dan
            juga tersedia area outdoor untuk kenyamanan Anda.
          </p>
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
            <div className="backdrop-blur-xs rounded-xl p-8 flex flex-col items-center border-slate-700 shadow-lg border">
              <span className="text-5xl mb-4">❄️</span>
              <h2 className="text-xl font-semibold text-white mb-2">
                Indoor Full AC
              </h2>
              <p className="text-gray-300 text-center">
                Ruangan indoor kami dilengkapi dengan pendingin udara (AC) untuk
                memberikan kenyamanan maksimal saat bermain.
              </p>
              <h2 className="text-xl font-semibold text-white mb-2">
                Rp.35.000 / Jam
              </h2>
            </div>
            <div className="backdrop-blur-lg rounded-xl p-8  flex flex-col items-center border-slate-700 shadow-lg border">
              <span className="text-5xl mb-4">🌳</span>
              <h2 className="text-xl font-semibold text-white mb-2">
                Outdoor Area
              </h2>
              <p className="text-gray-300 text-center">
                Nikmati suasana santai di area outdoor kami, cocok untuk Anda
                yang ingin bermain sambil menikmati udara segar.
              </p>
              <h2 className="text-xl font-semibold text-white mb-2">
                Rp.30.000 / Jam
              </h2>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
