import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {!isDashboard && <Navbar />}
      <main className={!isDashboard ? "" : ""}>
        <Outlet />
      </main>
      {!isDashboard && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;