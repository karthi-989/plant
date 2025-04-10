import React, { useState } from 'react';
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


function Admin() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for charts
  const salesData = {
    labels: [
      "January", "February", "March"
    
    ],
    datasets: [
      {
        data: [120, 150, 180 ], // Example sales data
        backgroundColor: [
          "#FF5733", // Jan - Red
          "#33FF57", // Feb - Green
          "#3357FF" // Mar - Blue
        
          
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10, // Gives a 3D effect on hover
      },
    ],
  };
  

 

  // Dummy orders data
  const recentOrders = [
    { id: 1, customer: 'John Doe', product: 'Monstera Deliciosa', status: 'Pending', amount: '$65' },
    { id: 2, customer: 'Jane Smith', product: 'Snake Plant', status: 'Shipped', amount: '$45' },
    { id: 3, customer: 'Mike Johnson', product: 'Peace Lily', status: 'Delivered', amount: '$35' },
  ];

  const inventoryStatusData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [20, 5, 2],  // Update these numbers based on actual inventory
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };
  

  
// ✅ Define 'options' before usage
const options = {
  responsive: true,
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-gradient-to-b from-green-600 to-green-800 text-white p-6 mt-12">
     
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

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white rounded-lg px-4 py-2 w-96 shadow-sm">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Bell size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
  {[
    { title: "Total Revenue", value: "$24,500", icon: <TrendingUp size={24} /> },
    { title: "Total Orders", value: "145", icon: <ShoppingCart size={24} /> },
    { title: "Total Customers", value: "89", icon: <Users size={24} /> },
    { title: "Inventory", value: "Total: 500", icon: <Package size={24} /> }

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


    {/* Charts Section */}
<div className="grid grid-cols-2 gap-6 mb-8">
  {/* Sales Overview (Pie Chart) */}
  <div className="bg-white p-6 rounded-lg shadow-md h-[400px] w-full flex flex-col justify-center items-center">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales Overview</h3>
    <div className="w-[80%] h-[80%]">
      <Pie 
        data={salesData} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 14 } } },
          },
          animation: { animateRotate: true, animateScale: true },
        }} 
      />
    </div>
  </div>

  {/* Inventory Status (Pie Chart) */}
  <div className="bg-white p-6 rounded-lg shadow-md h-[400px] w-full flex flex-col justify-center items-center">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Inventory Status</h3>
    <div className="w-[80%] h-[80%]">
      <Pie 
        data={inventoryStatusData} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 14 } } },
          },
          animation: { animateRotate: true, animateScale: true },
        }} 
      />
    </div>
  </div>
</div>



       {/* Recent Orders */}
<div className="bg-white p-6 rounded-lg shadow-md mb-8">
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent Orders</h3>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left bg-green-100 text-gray-700 uppercase text-sm">
          <th className="p-3 font-semibold">Order ID</th>
          <th className="p-3 font-semibold">Customer</th>
          <th className="p-3 font-semibold">Product</th>
          <th className="p-3 font-semibold">Status</th>
          <th className="p-3 font-semibold">Amount</th>
        </tr>
      </thead>
      <tbody>
        {recentOrders.map((order, index) => (
          <tr 
            key={order.id} 
            className={`border-t transition-all duration-200 hover:bg-green-50 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <td className="p-3 text-gray-700 font-medium">#{order.id}</td>
            <td className="p-3 text-gray-600">{order.customer}</td>
            <td className="p-3 text-gray-600">{order.product}</td>
            <td className="p-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                'bg-green-200 text-green-800'
              }`}>
                {order.status}
              </span>
            </td>
            <td className="p-3 text-gray-700 font-semibold">{order.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




</div>
</div>

  );
}

export default Admin;