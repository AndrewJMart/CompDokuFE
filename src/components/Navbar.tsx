import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full h-18 bg-white text-black flex items-center justify-between px-4 sm:px-8">
      
      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <h1 className="font-bold text-[clamp(1.1rem,2.5vw,1.5rem)] cursor-pointer hover:text-gray-300">
            CompDoku
          </h1>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex gap-4 sm:gap-6 text-[clamp(0.9rem,2vw,1rem)]">
        <Link to="/Practice">
          <span className="cursor-pointer hover:text-gray-300 font-semibold">
            Practice
          </span>
        </Link>
        <Link to="/Compete">
          <span className="cursor-pointer hover:text-gray-300 font-semibold">
            Compete
          </span>
        </Link>
        <Link to="/Login">
          <span className="cursor-pointer hover:text-gray-300 font-semibold">
            Login
          </span>
        </Link>
        
      </div>
    </nav>
  );
}
