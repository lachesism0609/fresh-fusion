// ShoppingCart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ cart, removeFromCart,updateCartQuantity }) => {
  const navigate = useNavigate();

  if (cart.length === 0) return null; 

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div className="container mx-auto">
        <h3 className="text-xl mb-2">Shopping Cart ({cart.length} items)</h3>
        <div className="max-h-40 overflow-y-auto mb-4">
          {cart.map((item) => (
            <div key={item.menuItemId} className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover mr-4" />
                <span className="mr-4">{item.title}</span>
               {/* decrease the quantity  */}
               <div className="w-25 h-9 flex items-center border p-2 rounded-lg">
                <button 
                  onClick={() => updateCartQuantity(item.menuItemId, item.quantity - 1)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                {/* Quanrirty show */}
                <span className="mx-2">{item.quantity}</span>

                {/* Increase the quantity */}
                <button 
                  onClick={() => updateCartQuantity(item.menuItemId, item.quantity + 1)}
                   className="h-7 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  +
                </button>
              </div>
              </div>
              
             
              <div>
              
                <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
               
                <button 
                  onClick={() => removeFromCart(item.menuItemId)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
          </div>
          <button 
            onClick={() => navigate('/checkout', { state: { cart } })}
            className="bg-pink700 text-white px-6 py-2 rounded-md hover:bg-pink-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
