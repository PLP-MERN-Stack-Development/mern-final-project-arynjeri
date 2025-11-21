import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1">
        {/* Background image */}
        <img
          src="/images/Craft.jfif"
          alt="Crafts background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Centered Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Your All-in-One Craft Companion
          </h1>
          <p className="text-lg md:text-2xl mb-6 max-w-2xl">
            Track. Create. Connect. Sell — all in one place with CraftPal.
          </p>

          {!isLoggedIn && (
            <nav className="space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg transition"
              >
                Login
              </Link>
            </nav>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-4 text-sm">
        © {new Date().getFullYear()} CraftPal. All rights reserved.
      </footer>
    </div>
  );
}
