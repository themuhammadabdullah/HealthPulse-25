import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  Pill,
  Users,
  User,
  ChevronLeft,
  LogOut,
  X,
  Inbox,
  HelpCircle,
  Bell
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { SidebarContext } from "./DashboardLayout";

const Sidebar = () => {
  const { isOpen, toggleSidebar, isMobileMenuOpen, toggleMobileMenu } =
    useContext(SidebarContext);
  const [isMedicineOpen, setIsMedicineOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Analysis",
      icon: <BarChart2 size={20} />,
      path: "/dashboard/analysis",
    },
    {
      name: "Medicine",
      icon: <Pill size={20} />,
      path: "/dashboard/medicine",
      subItems: [
        { name: "Overview", path: "/dashboard/medicine" },
        { name: "Daily", path: "/dashboard/medicine/daily" },
        { name: "Monthly", path: "/dashboard/medicine/monthly" },
        { name: "Yearly", path: "/dashboard/medicine/yearly" },
      ],
    },
    // {
    //   name: "Doctors",
    //   icon: <Users size={20} />,
    //   path: "/dashboard/doctors",
    // },
    { name: "Manage FAQs", icon: <HelpCircle size={20} />, path: "/dashboard/manage-faqs" },
    { name: "User Management", icon: <User size={20} />, path: "/dashboard/user-management" },
    { name: "Contact Management", icon: <Inbox size={20} />, path: "/dashboard/contact-management" },
    { name: "Alert Management", icon: <Bell size={20} />, path: "/dashboard/alert-management" },
    { name: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
  ];

  const handleLogoClick = () => {
    navigate("/");
    if (window.innerWidth < 1024) toggleMobileMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    if (window.innerWidth < 1024) toggleMobileMenu();
  };

  const NavContent = () => (
    <nav className="mt-6">
      {navItems.map((item) => (
        <div key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? "bg-gray-50 border-l-2 border-[#34568B]" : ""
              }`
            }
            onClick={() => {
              if (item.name === "Medicine") {
                setIsMedicineOpen(!isMedicineOpen);
              }
              if (window.innerWidth < 1024) {
                toggleMobileMenu();
              }
            }}
          >
            <span className="text-gray-600">{item.icon}</span>
            <span
              className="ml-4 font-medium whitespace-nowrap"
              style={{
                opacity: isOpen ? 1 : 0,
                transition: "opacity 300ms ease",
              }}
            >
              {item.name}
            </span>
            {item.subItems && isOpen && (
              <ChevronLeft
                size={16}
                className={`ml-auto transform transition-transform duration-300 ${
                  isMedicineOpen ? "-rotate-90" : "rotate-90"
                }`}
              />
            )}
          </NavLink>
          {item.subItems && isMedicineOpen && isOpen && (
            <div className="ml-12 space-y-2 mt-2">
              {item.subItems.map((subItem) => (
                <NavLink
                  key={subItem.name}
                  to={subItem.path}
                  className={({ isActive }) =>
                    `block py-2 text-gray-600 hover:text-[#34568B] ${
                      isActive ? "text-[#34568B] font-medium" : ""
                    }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleMobileMenu();
                    }
                  }}
                >
                  {subItem.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Logout Button */}
      <div className="mt-6 px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 py-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span
            className="font-medium"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
          >
            Logout
          </span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0000002a] bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-xl`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="cursor-pointer" onClick={handleLogoClick}>
            <h1 className="font-bold text-[#34568B] text-xl">HealthPulse</h1>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <NavContent />
      </div>

      {/* Desktop Sidebar */}
      <div
        className="hidden lg:block fixed left-0 top-0 h-screen will-change-transform"
        style={{
          width: isOpen ? "256px" : "80px",
          transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="h-full bg-white border-r border-[#F5F5F5] overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-[#F5F5F5] cursor-pointer">
            <h1
              className="font-bold text-[#34568B] text-xl transition-opacity duration-300"
              onClick={handleLogoClick}
              style={{
                opacity: isOpen ? 1 : 0,
                width: isOpen ? "auto" : 0,
              }}
            >
              HealthPulse
            </h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar();
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft
                size={20}
                className={`transform transition-transform duration-300 ${
                  !isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <NavContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
