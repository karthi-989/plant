// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [file, setFile] = useState(null);
//   const [bulkMessage, setBulkMessage] = useState("");
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     image: "",
//     description: "",
//     price: "",
//     category: "Bonsai",
//     stock: "",
//   });

//   const [editingProduct, setEditingProduct] = useState(null); // For storing the product being edited
//   const [activeTab, setActiveTab] = useState("addProduct"); // Default to 'addProduct' tab
// const isAdminPage = localStorage.getItem("role") === "admin";

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };


//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//   }, []);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/auth/product`);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Check if the token exists
//       if (!token) {
//         console.error("Token not found. Please log in again.");
//         return;
//       }

//       const response = await axios.get(`${API_URL}/api/auth/admin/orders`, {
//         headers: { Authorization: `Bearer ${token}` }, // Use the token
//       });

//       console.log("Orders:", response.data);
//       setOrders(response.data.orders);
//     } catch (error) {
//       console.error("Error fetching orders:", error.message);
//     }
//   };

//   const handleBulkUpload = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       setUploadMessage("❌ Please select a file to upload.");
//       console.error("No file selected for upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     console.log("Uploading file:", file.name);
//     console.log("FormData content:", formData.get("file"));

//     try {
//       const response = await axios.post(
//         `${API_URL}/api/auth/admin/bulk-upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       console.log("Upload response:", response.data);

//       const { successfulUploads, duplicates, failedRows } = response.data;

//       // Create a detailed status message
//       let message = `✅ ${successfulUploads} product(s) uploaded successfully.`;
//       if (duplicates > 0) {
//         message += ` ⚠️ ${duplicates} duplicate(s) skipped.`;
//         console.warn("Duplicate products detected:", duplicates);
//       }
//       if (failedRows && failedRows.length > 0) {
//         message += ` ❌ ${failedRows.length} row(s) failed validation.`;
//         console.warn("Validation errors on rows:", failedRows);
//         failedRows.forEach((row) =>
//           console.warn(`Row ${row.row}: ${row.error}`)
//         );
//       }

//       setUploadMessage(message);
//     } catch (error) {
//       console.error("Bulk upload error:", error);
//       console.error("Error response:", error.response);

//       setUploadMessage(
//         error.response?.data?.message ||
//           "❌ An error occurred during bulk upload."
//       );
//     }
//   };

//   const addProduct = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/auth/product`, newProduct, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       fetchProducts();
//       alert("Product added successfully");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/api/auth/product/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const editProduct = (product) => {
//     setEditingProduct(product);
//     setActiveTab("editProduct");
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `${API_URL}/api/auth/product/${editingProduct._id}`,
//         editingProduct,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       fetchProducts();
//       alert("Product updated successfully");
//       setEditingProduct(null);
//       setActiveTab("products");
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-gray-100 pt-20">
//       {/* Sidebar */}
//       <div className="w-full lg:w-64 bg-green-700 text-white p-5 lg:h-screen">
//         <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//         <ul className="mt-5 space-y-2">
//           <li
//             onClick={() => setActiveTab("products")}
//             className="cursor-pointer py-2 hover:bg-green-600 rounded-md"
//           >
//             All Products
//           </li>
//           <li
//             onClick={() => setActiveTab("addProduct")}
//             className="cursor-pointer py-2 hover:bg-green-600 rounded-md"
//           >
//             Add Product
//           </li>
//           <li
//             onClick={() => setActiveTab("orders")}
//             className="cursor-pointer py-2 hover:bg-green-600 rounded-md"
//           >
//             Orders
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-5 overflow-auto">
//         {activeTab === "products" && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Products</h2>
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Title</th>
//                   <th className="border p-2">Price</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product._id}>
//                     <td className="border p-2">{product.title}</td>
//                     <td className="border p-2">₹{product.price}</td>
//                     <td className="border p-2 flex space-x-2">
//                       <button
//                         onClick={() => editProduct(product)}
//                         className="bg-yellow-500 text-white px-3 py-1"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => deleteProduct(product._id)}
//                         className="bg-red-500 text-white px-3 py-1"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <div className="mb-6 flex space-x-4">
//           {/* Only show these buttons if we're on the admin dashboard */}
//           {isAdminPage && (
//             <>
//               <button
//                 className={`${
//                   activeTab === "addProduct" ? "bg-blue-700" : "bg-blue-500"
//                 } text-white px-4 py-2 rounded`}
//                 onClick={() => setActiveTab("addProduct")}
//               >
//                 Add Single Product
//               </button>
//               <button
//                 className={`${
//                   activeTab === "bulkUpload" ? "bg-green-700" : "bg-green-500"
//                 } text-white px-4 py-2 rounded`}
//                 onClick={() => setActiveTab("bulkUpload")}
//               >
//                 Bulk Upload
//               </button>
//             </>
//           )}
//         </div>

//         {/* Conditional rendering for the admin dashboard */}
//         {activeTab === "addProduct" && isAdminPage && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Add Product</h2>
//             <form onSubmit={addProduct} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, title: e.target.value })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, image: e.target.value })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <textarea
//                 placeholder="Description"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, description: e.target.value })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, price: e.target.value })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <select
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, category: e.target.value })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               >
//                 <option value="Bonsai">Bonsai</option>
//                 <option value="Succulent">Succulent</option>
//                 <option value="Cactus">Cactus</option>
//                 <option value="Flowering">Flowering</option>
//                 <option value="Indoor Plants">Indoor Plants</option>
//                 <option value="Outdoor Plants">Outdoor Plants</option>
//                 <option value="Planters">Planters</option>
//                 <option value="Creepers">Creepers</option>
//                 <option value="Air Purifying Plants">
//                   Air Purifying Plants
//                 </option>
//                 <option value="Flowering Palnts">Flowering Plants</option>
//               </select>

//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2"
//               >
//                 Add Product
//               </button>
//             </form>
//           </div>
//         )}

//         {activeTab === "bulkUpload" && isAdminPage && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Bulk Upload Products</h2>
//             <form onSubmit={handleBulkUpload} className="space-y-4">
//               <input
//                 type="file"
//                 accept=".xlsx, .xls"
//                 onChange={handleFileChange}
//                 className="w-full p-2 border border-gray-300"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2"
//               >
//                 Upload File
//               </button>
//             </form>
//             {bulkMessage && (
//               <p className="mt-4 text-green-500">{bulkMessage}</p>
//             )}
//           </div>
//         )}

//         {activeTab === "editProduct" && editingProduct && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Edit Product</h2>
//             <form onSubmit={updateProduct} className="space-y-4">
//               <input
//                 type="text"
//                 value={editingProduct.title}
//                 onChange={(e) =>
//                   setEditingProduct({
//                     ...editingProduct,
//                     title: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <input
//                 type="text"
//                 value={editingProduct.image}
//                 onChange={(e) =>
//                   setEditingProduct({
//                     ...editingProduct,
//                     image: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <textarea
//                 value={editingProduct.description}
//                 onChange={(e) =>
//                   setEditingProduct({
//                     ...editingProduct,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <input
//                 type="number"
//                 value={editingProduct.price}
//                 onChange={(e) =>
//                   setEditingProduct({
//                     ...editingProduct,
//                     price: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               />
//               <select
//                 value={editingProduct.category}
//                 onChange={(e) =>
//                   setEditingProduct({
//                     ...editingProduct,
//                     category: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border border-gray-300"
//                 required
//               >
//                 <option value="Bonsai">Bonsai</option>
//                 <option value="Succulent">Succulent</option>
//                 <option value="Cactus">Cactus</option>
//                 <option value="Flowering">Flowering</option>
//                 <option value="Indoor Plants">Indoor Plants</option>
//                 <option value="Outdoor Plants">Outdoor Plants</option>
//                 <option value="Creepers">Creepers</option>
//                 <option value="Planters">Planters</option>
//               </select>

//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2"
//               >
//                 Update Product
//               </button>
//             </form>
//           </div>
//         )}

//         {activeTab === "orders" && (
//           <div className="p-6 bg-gray-100 rounded-md shadow-md">
//             <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//               Order Management
//             </h2>
//             <table className="w-full border-collapse border border-gray-300 bg-white rounded-md shadow-sm">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="border p-3 text-left text-gray-600 font-semibold">
//                     User
//                   </th>
//                   <th className="border p-3 text-left text-gray-600 font-semibold">
//                     Products
//                   </th>
//                   <th className="border p-3 text-center text-gray-600 font-semibold">
//                     Total Amount
//                   </th>
//                   <th className="border p-3 text-center text-gray-600 font-semibold">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.length > 0 ? (
//                   orders.map((order) => (
//                     <tr
//                       key={order._id}
//                       className="hover:bg-gray-50 transition duration-150"
//                     >
//                       <td className="border p-3 text-gray-800">
//                         {order.userId.username}
//                       </td>
//                       <td className="border p-3 text-gray-800">
//                         {order.products.map((product, index) => (
//                           <div
//                             key={product.productId?._id || index}
//                             className="mb-1"
//                           >
//                             <span className="font-medium">
//                               {product.quantity}
//                             </span>{" "}
//                             x ₹
//                             <span className="font-medium">{product.price}</span>{" "}
//                             -{" "}
//                             <span className="italic text-gray-600">
//                               {product.productId?.title || "Unknown Product"}
//                             </span>
//                           </div>
//                         ))}
//                       </td>
//                       <td className="border p-3 text-center font-semibold text-gray-800">
//                         ₹{order.totalAmount}
//                       </td>
//                       <td
//                         className={`border p-3 text-center font-medium ${
//                           order.status === "Paid"
//                             ? "text-green-600 bg-green-100"
//                             : "text-red-600 bg-red-100"
//                         } rounded`}
//                       >
//                         {order.status}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="p-4 text-center text-gray-500">
//                       No orders to display.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
