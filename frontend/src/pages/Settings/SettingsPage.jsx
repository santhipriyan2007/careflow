import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            Settings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Clinic Information */}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Clinic Information
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Clinic Name
                  </label>

                  <input
                    type="text"
                    defaultValue="CareFlow Clinic"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Clinic Email
                  </label>

                  <input
                    type="email"
                    defaultValue="careflow@gmail.com"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    defaultValue="+91 9876543210"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>

                  <textarea
                    rows="3"
                    defaultValue="CareFlow Clinic, Kochi"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Save Changes
                </button>

              </div>
            </div>

            {/* User Profile */}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                User Profile
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name
                  </label>

                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>

                  <input
                    type="email"
                    defaultValue="admin@careflow.com"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Role
                  </label>

                  <input
                    type="text"
                    defaultValue="Administrator"
                    disabled
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                  />
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Update Profile
                </button>

              </div>
            </div>

            {/* Notification Preferences */}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Notification Preferences
              </h2>

              <div className="space-y-4">

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                  />
                  Appointment Reminders
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                  />
                  Payment Alerts
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                  />
                  Lead Follow-Ups
                </label>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Save Preferences
                </button>

              </div>
            </div>

            {/* Security */}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Security
              </h2>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Password
                  </label>

                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                  Change Password
                </button>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;