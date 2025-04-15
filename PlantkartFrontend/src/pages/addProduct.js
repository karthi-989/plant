import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "./adminLayout";

const API_URL = process.env.REACT_APP_API_URL;

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    category: "Bonsai",
    stock: "",
  });

  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("addProduct");
  const [bulkMessage, setUploadMessage] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const productToSend = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      };

      await axios.post(`${API_URL}/api/auth/product`, productToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✅ Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "❌ Error adding product");
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage("❌ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/admin/bulk-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { successfulUploads, duplicates, failedRows } = response.data;

      let message = `✅ ${successfulUploads} product(s) uploaded successfully.`;
      if (duplicates > 0) message += ` ⚠️ ${duplicates} duplicate(s) skipped.`;
      if (failedRows?.length > 0)
        message += ` ❌ ${failedRows.length} row(s) failed validation.`;

      setUploadMessage(message);
    } catch (error) {
      setUploadMessage(
        error.response?.data?.message ||
          "❌ An error occurred during bulk upload."
      );
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full mx-auto mt-20">
        {/* Tab Buttons */}
        <div className="mb-6 flex flex-wrap gap-4 justify-center sm:justify-start">
          <button
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === "addProduct"
                ? "bg-blue-700 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("addProduct")}
          >
            ➕ Add Single Product
          </button>
          <button
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === "bulkUpload"
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-700"
            }`}
            onClick={() => setActiveTab("bulkUpload")}
          >
            📁 Bulk Upload
          </button>
        </div>

        {/* Single Product Form */}
        {activeTab === "addProduct" && (
          <form onSubmit={addProduct} className="grid grid-cols-1 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Add New Product
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              required
            />

            <input
              type="number"
              placeholder="Stock"
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-blue-200"
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              required
            ></textarea>

            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              required
            />

            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="Bonsai">Bonsai</option>
              <option value="Succulent">Succulent</option>
              <option value="Cactus">Cactus</option>
              <option value="Flowering">Flowering</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Outdoor Plants">Outdoor Plants</option>
              <option value="Planters">Planters</option>
              <option value="Creepers">Creepers</option>
              <option value="Air Purifying Plants">Air Purifying Plants</option>
              <option value="Flowering Plants">Flowering Plants</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded w-full sm:w-fit"
            >
              Submit Product
            </button>
          </form>
        )}

        {/* Bulk Upload Form */}
        {activeTab === "bulkUpload" && (
          <form onSubmit={handleBulkUpload} className="grid grid-cols-1 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Upload Products via Excel
            </h2>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring focus:border-green-300"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded w-full sm:w-fit"
            >
              Upload File
            </button>

            {bulkMessage && (
              <p className="text-sm text-gray-700 mt-2">{bulkMessage}</p>
            )}
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
