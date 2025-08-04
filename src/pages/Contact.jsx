import React, { useEffect, useState } from "react";
import TiktokIcon from "../assets/Tiktok.svg";
import InstagramIcon from "../assets/Instagram.svg";
import WhatsappIcon from "../assets/Whatsapp.svg";
import { Footer, Header } from "../Components";
import bannerImage from "../assets/banner.png";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
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
      <div className="bg-gray-900 flex flex-col items-center justify-center py-16 px-4 flex-1">
        <div
          className={`p-8 rounded-lg shadow-lg max-w-3xl w-full border backdrop-blur-xs border-slate-700 flex flex-col items-center justify-center ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          } transition-all duration-1000 ease-out delay-300`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 ">
            Hubungi Kami
          </h1>
          <p className="text-lg text-gray-300 mb-10 text-center max-w-xl">
            Hubungi kami untuk informasi lebih lanjut atau kerjasama melalui
            media sosial berikut:
          </p>
          <div className="flex gap-8 mb-10">
            <a
              href="https://www.tiktok.com/@168.billiard.cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <span className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-pink-600 transition">
                <img src={TiktokIcon} alt="TikTok" className="w-7 h-7" />
              </span>
              <span className="text-gray-200 text-sm">TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/168billiardcafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <span className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-gradient-to-tr from-pink-500 to-yellow-400 transition">
                <img src={InstagramIcon} alt="Instagram" className="w-7 h-7" />
              </span>
              <span className="text-gray-200 text-sm">Instagram</span>
            </a>
            <a
              href="https://wa.me/6285175174604"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <span className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-green-500 transition">
                <img src={WhatsappIcon} alt="WhatsApp" className="w-7 h-7" />
              </span>
              <span className="text-gray-200 text-sm">WhatsApp</span>
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            Jl. Jend. Sudirman Kabupaten Bone <br />
            168 Billiard & Cafe
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
