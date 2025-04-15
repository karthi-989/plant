import React from "react";
import Sidebar from "../pages/sideBar";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main content with Sidebar and children */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar: Full width on mobile, fixed width on desktop */}
        <div className="w-full md:w-64 bg-white shadow-md z-10">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="w-full bg-gray-50 p-4 md:p-6">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
