import { Link } from "react-router-dom"
import AuthBackground from "../components/AuthBackground";

export default function Login() {
  return (
    <section className="relative min-h-screen grid place-items-center bg-gray-100 overflow-hidden">

      <AuthBackground />

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col gap-6 items-center">

        <h1 className="font-bold text-3xl text-gray-900">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center">
          Log in to continue competing.
        </p>

        {/* Login form */}
        <form className="z-10 w-full flex flex-col gap-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          <button
            type="submit"
            className="mt-2 rounded-md bg-gray-900 px-6 py-3 text-white font-bold hover:bg-gray-700 transition"
          >
            Log In
          </button>
        </form>

        {/* Footer links */}
        <div className="text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="font-semibold text-gray-900 cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}