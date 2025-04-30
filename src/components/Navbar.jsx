import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "How It Works", path: "/how-it-works" },
    {name:"FAQs", path:"/faqs"},
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full py-4 px-4 md:px-4 lg:px-8 2xl:px-14 flex items-center justify-between bg-white border-b-2 border-[#F5F5F5] relative">
      <div
        className={`fixed inset-0 bg-black/50 z-30 ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className="flex items-center">
        <NavLink to="/" className="text-2xl 2xl:text-3xl font-bold text-[#34568B]">
          <span className="text-black">Health</span>Pulse
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-50 pt-2 text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "" : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      <div className={`
        fixed inset-0 bg-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:hidden transition-transform duration-300 ease-in-out z-40
        flex flex-col justify-center space-y-3 h-[390px] pt-14 pb-5 rounded-lg shadow-none [box-shadow:0_8px_9px_-2px_rgba(0,0,0,0.3)]
      `}>
        <div className="flex items-center md:hidden pr-4 justify-between pb-3 border-b-2 border-[#F5F5F5]">
          <h1 className="text-2xl pl-6 font-bold text-[#34568B]">
            <span className="text-black">Health</span>Pulse
          </h1>
          <button
            className="md:hidden z-50 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        <div className='flex flex-col gap-4 mt-6'>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `pl-6 text-lg font-medium ${
                  isActive ? "bg-[#f4f4f4] border-l-2 border-[#34568B] pl-6" : "text-gray-700"
                } hover:text-[#34568B]`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="pl-6 text-lg font-medium text-gray-700 hover:text-[#34568B]"
            >
              Dashboard
            </NavLink>
          )}
          <div className="flex flex-col items-center gap-3 mt-2 px-5">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium text-lg border w-full py-1 border-gray-200 hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-[#34568B] font-medium text-lg border w-full py-1 border-gray-200 hover:bg-gray-50 text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#34568B] text-white px-6 py-2 mb-9 rounded font-medium hover:bg-[#34568B]/90 w-full md:w-[200px] text-center"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center pl-8 md:gap-5 lg:gap-8">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `text-gray-700 hover:text-[#34568B] 2xl:text-xl font-medium ${
                isActive ? "border-b-2 border-[#34568B]" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            className="text-gray-700 hover:text-[#34568B] 2xl:text-xl font-medium"
          >
            Dashboard
          </NavLink>
        )}
        <div className="sm:ml-10 md:ml-7 lg:ml-30 xl:ml-52 2xl:ml-96 flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium 2xl:text-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-[#34568B] font-medium 2xl:text-xl"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-[#34568B] text-white md:px-4 lg:px-6 py-2 rounded 2xl:text-xl font-medium hover:bg-[#34568B]/90"
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;