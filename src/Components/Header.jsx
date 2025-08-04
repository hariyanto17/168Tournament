import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-600">
        <img src={logo} alt="168 Tournament Logo" className="h-10 inline-block mr-2" />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Beranda
          </Link>
          <Link
            to="/bagan"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Bagan
          </Link>
          <Link
            to="/services"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Layanan
          </Link>
    
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Kontak
          </Link>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-400 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </nav>
      {/* Menu Mobile (Tergantung state isMobileMenuOpen) */}
      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-800 pb-4`}
      >
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700"
        >
          Beranda
        </Link>
        <Link
          to="/bagan"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700"
        >
          Bagan
        </Link>
        <Link
          to="/services"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700"
        >
          Layanan
        </Link>
       
        <Link
          to="/contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-6 py-2 text-gray-300 hover:bg-gray-700"
        >
          Kontak
        </Link>
      </div>
    </header>
  );
};

export default Header;
