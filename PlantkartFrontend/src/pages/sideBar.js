// components/Sidebar.js
import {
  LineChart,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LineChart size={20} />,
      path: "",
    },
    {
      name: "Add Products",
      icon: <Package size={20} />,
      path: "/addproduct",
    },
    { name: "Products", icon: <Users size={20} />, path: "/viewproduct" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/orders" },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  return (
    <div className="fixed w-64 h-full bg-gradient-to-b from-green-600 to-green-800 text-white p-6 mt-12">
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 p-2 rounded-lg transition 
              ${
                location.pathname === item.path
                  ? "bg-green-700"
                  : "hover:bg-green-700"
              }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Logout button */}
        <button
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-700 text-red-200 w-full mt-8"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
