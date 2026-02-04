import AuthBackground from "../components/AuthBackground";

export default function Practice() {
  return (
    <section className="relative min-h-screen grid place-items-center bg-gray-100 overflow-hidden">

      <AuthBackground />

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col gap-6 items-center">

        <h1 className="font-bold text-3xl text-gray-900">
          Welcome Back
        </h1>
        
      </div>
    </section>
  );
}