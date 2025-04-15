import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import { TrendingUp, ShoppingCart, Users, Package } from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import AdminLayout from "./adminLayout";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AdminOrderStats = () => {
  const [stats, setStats] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:7001/api/auth/order-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data);

        // Delay chart rendering to reduce initial load pressure
        setTimeout(() => {
          setShowCharts(true);
        }, 300); // Delay slightly for UX smoothness
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
      </div>
    );
  }

  const pieData = {
    labels: stats.ordersByStatus.map((s) => s._id),
    datasets: [
      {
        label: "# of Orders",
        data: stats.ordersByStatus.map((s) => s.count),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const lineData = {
    labels: stats.ordersOverTime.map((d) => d._id),
    datasets: [
      {
        label: "Orders Over Time",
        data: stats.ordersOverTime.map((d) => d.count),
        fill: false,
        borderColor: "#4bc0c0",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 mt-12">Order Analytics</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Orders",
              value: stats.totalOrders,
              icon: <ShoppingCart size={24} />,
            },
            {
              title: "Total Customers",
              value: stats.totalUsers,
              icon: <Users size={24} />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 hover:text-white">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                </div>
                <div className="bg-gray-100 p-3 rounded-full transition-all duration-300 hover:bg-opacity-80 hover:bg-green-300">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        {showCharts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Orders by Status</h3>
              <Pie data={pieData} />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Orders Over Time</h3>
              <Line data={lineData} />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrderStats;
