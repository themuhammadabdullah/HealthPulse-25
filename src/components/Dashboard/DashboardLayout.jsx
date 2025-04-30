import React, { useState, createContext } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export const SidebarContext = createContext();

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const contextValue = {
    isOpen: isSidebarOpen,
    isMobileMenuOpen,
    toggleMobileMenu,
    toggleSidebar
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Sidebar />
        <Outlet />
      </div>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;