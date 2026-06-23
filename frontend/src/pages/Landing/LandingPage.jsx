import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-teal-500 text-white p-12">

          <div className="flex items-center gap-2 mb-8">
            <Heart size={32} fill="white" />
            <h1 className="text-3xl font-bold">CareFlow</h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Smart Appointment and Patient Management
          </h2>

          <p className="text-blue-100 text-lg mb-10">
            Simplify clinic operations, manage patients effortlessly,
            and automate appointment reminders.
          </p>

          <div className="space-y-4 text-lg">
            <p>✓ Manage Patients</p>
            <p>✓ Track Treatments</p>
            <p>✓ Automated Reminders</p>
            <p>✓ Monitor Payments</p>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-8 md:p-12">

          <div className="w-full max-w-md text-center">

            {/* Mobile Logo */}
            <div className="flex md:hidden justify-center items-center gap-2 mb-8">
              <Heart
                size={28}
                className="text-blue-600"
                fill="#2563EB"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                CareFlow
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to CareFlow
            </h2>

            <p className="text-gray-500 text-lg mb-10">
              Access your clinic dashboard to manage patients,
              appointments, treatments, payments, and reports.
            </p>

            <Link
              to="/login"
              className="
                block
                w-full
                text-center
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-4
                rounded-xl
                font-semibold
                transition
                duration-300
                shadow-md
              "
            >
              Sign In to Dashboard
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;