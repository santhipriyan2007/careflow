import { Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

        <div className="flex items-center justify-center gap-2 mb-6">

          <Heart
            size={28}
            className="text-blue-600"
            fill="#2563EB"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            CareFlow
          </h1>

        </div>



        <h2 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h2>


        <p className="text-gray-500 text-center mb-8">

          Enter your email address and we'll send instructions
          to reset your password.

        </p>



        <label className="block text-sm font-medium text-gray-700 mb-2">

          Email

        </label>



        <div className="relative mb-6">

          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-600"
          />

        </div>



        <button
          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          font-semibold
          shadow-md
          transition
          "
        >
          Send Reset Link
        </button>



        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;