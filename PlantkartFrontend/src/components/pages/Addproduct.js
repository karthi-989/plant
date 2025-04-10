import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import React Router
import {
  LineChart,
  BarChart,
  Users,
  Package,
  ShoppingCart,
  Bell,
  TrendingUp,
  Star,
  Truck,
  Settings,
  Search,
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2'; // Import Pie Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Required for Pie Chart
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Register ArcElement for Pie Charts
  Title,
  Tooltip,
  Legend
);


function AddProduct() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error uploading file");
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-gradient-to-b from-green-600 to-green-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Plant Admin</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 p-2 bg-green-700 rounded-lg">
            <LineChart size={20} />
            <span>Dashboard</span>
          </a>
          <Link to="/add-product" className="flex items-center space-x-3 p-2 hover:bg-green-700 rounded-lg">
  <Package size={20} />
  <span>Add Products</span>
</Link>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-green-700 rounded-lg">
            <Users size={20} />
            <span>Customers</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-green-700 rounded-lg">
            <ShoppingCart size={20} />
            <span>Orders</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-green-700 rounded-lg">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>
      </div>
      
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 text-center">
        <h2 className="text-2xl font-semibold mb-4">Upload Plant List</h2>
        <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} className="p-2 border rounded-md w-full" />
        <button
          onClick={handleUpload}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
    </div>
  );
}

export default AddProduct;
