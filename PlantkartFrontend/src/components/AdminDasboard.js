import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    category: "Bonsai",
    stock: "",
  });

  const [editingProduct, setEditingProduct] = useState(null); // For storing the product being edited

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7001/api/auth/product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:7001/api/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7001/api/auth/product", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts();
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:7001/api/auth/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setActiveTab("editProduct");
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:7001/api/auth/product/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchProducts();
      alert("Product updated successfully");
      setEditingProduct(null);
      setActiveTab("products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-5">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <ul className="mt-5">
          <li
            onClick={() => setActiveTab("products")}
            className="cursor-pointer py-2 hover:bg-green-600"
          >
            All Products
          </li>
          <li
            onClick={() => setActiveTab("addProduct")}
            className="cursor-pointer py-2 hover:bg-green-600"
          >
            Add Product
          </li>
          <li
            onClick={() => setActiveTab("orders")}
            className="cursor-pointer py-2 hover:bg-green-600"
          >
            Orders
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {activeTab === "products" && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Products</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border p-2">{product.title}</td>
                    <td className="border p-2">₹{product.price}</td>
                    <td className="border p-2 flex space-x-2">
                      <button
                        onClick={() => editProduct(product)}
                        className="bg-yellow-500 text-white px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-500 text-white px-3 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "addProduct" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={addProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <textarea
                placeholder="Description"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <input
                type="number"
                placeholder="Price"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {activeTab === "editProduct" && editingProduct && (
          <div>
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={updateProduct} className="space-y-4">
              <input
                type="text"
                value={editingProduct.title}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    title: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <textarea
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2"
              >
                Update Product
              </button>
            </form>
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Products</th>
                  <th className="border p-2">Total Amount</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border p-2">{order.userId.username}</td>
                    <td className="border p-2">
                      {order.products.map((p) => (
                        <div key={p.productId}>
                          {p.quantity} x ₹{p.price}
                        </div>
                      ))}
                    </td>
                    <td className="border p-2">₹{order.totalAmount}</td>
                    <td className="border p-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
