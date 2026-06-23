import { Heart } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Heart
            className="text-blue-600"
            size={28}
            fill="#2563EB"
            color="#2563EB"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            CareFlow
          </h1>

        </div>

        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">

          <li>
            <a href="#home" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#services" className="hover:text-blue-600 transition">
              Services
            </a>
          </li>

          <li>
            <a href="#testimonials" className="hover:text-blue-600 transition">
              Testimonials
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </li>

        </ul>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl">

          Book Consultation

        </button>

      </div>

    </nav>
  );
}

export default Navbar;