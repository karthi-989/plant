import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import AdminLayout from "./adminLayout";

const API_URL = process.env.REACT_APP_API_URL;

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/product`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/auth/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/api/auth/product/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchProducts();
      setEditingProduct(null);
      setShowEditForm(false);
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 mt-12">
        <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md p-4 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-m font-semibold mb-2">{product.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-m text-gray-800">
                  ₹{product.price}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowEditForm(true);
                    }}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full transition-transform duration-200 hover:scale-105 shadow"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full transition-transform duration-200 hover:scale-105 shadow"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showEditForm && editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <form
              onSubmit={updateProduct}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleEditChange}
                placeholder="Product Name"
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="text"
                name="image"
                value={editingProduct.image}
                onChange={handleEditChange}
                placeholder="Image URL"
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <textarea
                type="text"
                name="description"
                value={editingProduct.description}
                onChange={handleEditChange}
                placeholder="Image URL"
                className="w-full border p-2 mb-3 rounded"
                required
              />

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingProduct(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductManager;
