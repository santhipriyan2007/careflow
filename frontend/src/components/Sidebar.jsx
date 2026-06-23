import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  UserPlus,
  Stethoscope,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">
          CareFlow
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/patients"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Users size={20} />
              Patients
            </Link>
          </li>

          <li>
            <Link
              to="/appointments"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <CalendarDays size={20} />
              Appointments
            </Link>
          </li>

          <li>
            <Link
              to="/payments"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <CreditCard size={20} />
              Payments
            </Link>
          </li>

          <li>
            <Link
              to="/leads"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <UserPlus size={20} />
              Leads
            </Link>
          </li>

          <li>
            <Link
              to="/treatments"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Stethoscope size={20} />
              Treatments
            </Link>
          </li>

          <li>
            <Link
              to="/treatment-logs"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <ClipboardList size={20} />
              Treatment Logs
            </Link>
          </li>

          <li>
            <Link
              to="/reports"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <BarChart3 size={20} />
              Reports
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Users size={20} />
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>

        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
            text-red-500
            hover:bg-red-50
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;