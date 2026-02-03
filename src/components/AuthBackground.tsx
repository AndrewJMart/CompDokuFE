import LBlob from "../assets/hero/LBlob.svg";
import RBlob from "../assets/hero/RBlob.svg";

export default function AuthBackground() {
  return (
    <>
      {/* Left Blob */}
      <img
        src={LBlob}
        alt=""
        className="
          pointer-events-none select-none
          absolute top-0 left-0
          w-[45vw] max-w-[320px]
          -translate-x-1/4 -translate-y-1/4
          md:w-[30vw] md:max-w-70
          opacity-70
        "
      />

      {/* Right Blob */}
      <img
        src={RBlob}
        alt=""
        className="
          pointer-events-none select-none
          absolute bottom-0 right-0
          w-[35vw] max-w-65
          translate-x-1/4 translate-y-1/4
          md:w-[25vw] md:max-w-55
          opacity-70
        "
      />
    </>
  );
}
