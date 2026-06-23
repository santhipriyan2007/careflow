import { Bell, Search, UserCircle } from "lucide-react";

function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">

      {/* Search Bar */}
      <div className="relative w-80">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            w-full
            pl-10
            pr-4
            py-2
            border
            border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-300
          "
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell size={22} />

          <span
            className="
              absolute
              -top-1
              -right-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div className="flex items-center gap-2">

          <UserCircle
            size={32}
            className="text-gray-600"
          />

          <div>
            <p className="font-medium">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;