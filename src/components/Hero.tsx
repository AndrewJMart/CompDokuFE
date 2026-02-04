import { Link } from "react-router-dom"

import LayingDown from "../assets/hero/LayingDown.svg";
import LBlob from "../assets/hero/LBlob.svg";
import RBlob from "../assets/hero/RBlob.svg";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-0rem)] pt-18 grid place-items-center overflow-hidden bg-gray-100">
      {/* Decorative Images (hidden on mobile) */}
      <img
        src={LayingDown}
        alt=""
        className="hidden md:block absolute top-1/2 right-[10%] max-w-[25vw] max-h-[70vh] -translate-y-1/2 pointer-events-none select-none"
      />

      {/* Left Blob */}
      <img
        src={LBlob}
        alt=""
        className="block md:block absolute top-0 left-0 w-[75vw] -translate-x-1/2 -translate-y-1/3 md:w-[18vw] md:-translate-x-1/2 md:-translate-y-1/4 opacity-90 pointer-events-none select-none"
      />

      {/* Right Blob */}
      <img
        src={RBlob}
        alt=""
        className="block md:block absolute bottom-0 right-0 w-[30vw] translate-x-1/2 translate-y-1/3 md:w-[18vw] md:translate-x-1/2 md:translate-y-1/4 opacity-90 pointer-events-none select-none"
      />

      {/* Content */}
      <div
        className="px-4 py-12 max-w-3xl mx-auto flex flex-col gap-6 text-center items-center md:mx-0 md:absolute md:justify-center md:left-[5%]">
        <h1 className="font-bold leading-tight text-[clamp(1.8rem,6vw,4rem)]">
          Competitive Sudoku
        </h1>
        <p className=" text-[clamp(1rem,3vw,1.6rem)]">
          Practice, Compete, Win.
        </p>

        <div className="mt-4 flex flex-row gap-6 sm:gap-4">
          <Link to="/Practice">
            <button className="rounded-md bg-gray-900 px-8 py-3 text-white font-bold hover:bg-gray-700 transition">
              Practice
            </button>
          </Link>

        <Link to="/Compete">
          <button className="rounded-md bg-gray-900 px-8 py-3 text-white font-bold hover:bg-gray-700 transition">
            Compete
          </button>
        </Link>
        </div>
      </div>
    </section>
  );
}
