import React, { useState } from 'react';
import './CartItem.css'; // Import your CSS file for styling

const Webpage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Plant Name 1', price: 99, quantity: 1, image: 'https://img.freepik.com/free-photo/plant-terracotta-pot-birds-nest-fern-plant_53876-146303.jpg?t=st=1736242239~exp=1736245839~hmac=76eadf994dd2608d1f7e1b1a40235c2c52febcfc0b29772f1175c6759689aa00&w=740' },
    { id: 2, name: 'Plant Name 2', price: 99, quantity: 1, image: 'https://img.freepik.com/free-photo/plant-terracotta-pot-birds-nest-fern-plant_53876-146303.jpg?t=st=1736242239~exp=1736245839~hmac=76eadf994dd2608d1f7e1b1a40235c2c52febcfc0b29772f1175c6759689aa00&w=740' },
  ]);

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="app-container" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar */}
     

      {/* Cart Items */}
      <div className="cart-items" style={{ padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Cart Items</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#ddd', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Product</th>
              <th style={{ padding: '10px' }}>Price</th>
              <th style={{ padding: '10px' }}>Quantity</th>
              <th style={{ padding: '10px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '50px', marginRight: '10px', borderRadius: '5px' }}
                  />
                  {item.name}
                </td>
                <td style={{ padding: '10px' }}>₹{item.price}</td>
                <td style={{ padding: '10px' }}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                    style={{ width: '50px', padding: '5px' }}
                  />
                </td>
                <td style={{ padding: '10px' }}>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'right', fontSize: '18px', fontWeight: 'bold' }}>
          Total: ₹{calculateTotal()}
        </div>
      </div>

      {/* Billing Details */}
      <div className="billing-details" style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
        <h3 style={{ marginBottom: '20px' }}>Billing Details</h3>
        <form>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
            className='in'
              type="text"
              placeholder="First Name"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <input
             className='in'
              type="text"
              placeholder="Last Name"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
             className='in'
              type="text"
              placeholder="Phone"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <input
             className='in'
              type="email"
              placeholder="Email"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <textarea
            placeholder="Street Address"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px' }}
          ></textarea>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
             className='in'
              type="text"
              placeholder="City"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <input
             className='in'
              type="text"
              placeholder="State"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <input
             className='in'
              type="text"
              placeholder="Pincode"
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <input type="checkbox" id="different-address" style={{ marginRight: '10px' }} />
            <label htmlFor="different-address">Ship to a different address</label>
          </div>
          <textarea
            placeholder="Order notes (optional)"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          ></textarea>
          <button
            type="submit"
            style={{
              marginTop: '20px',
              backgroundColor: '#1a5e3a',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Webpage;