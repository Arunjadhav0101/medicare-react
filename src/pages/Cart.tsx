import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  // Calculate totals
  const subtotal = cartTotal;
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        userId: user?.id,
        items: cartItems.map(item => ({
          medicineId: item.id || (item.medicine ? item.medicine.id : 0),
          quantity: item.quantity,
          price: item.price || (item.medicine ? item.medicine.price : 0)
        })),
        totalAmount: total
      };

      await orderAPI.createOrder(orderData);
      alert('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error("Checkout failed:", error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some medicines to get started</p>
            <a href="/catalog" className="btn btn-primary">Browse Catalog</a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h3>{item.name || item.medicine?.name}</h3>
                    <div className="item-price">₹{item.price || item.medicine?.price} per unit</div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ₹{(item.price || (item.medicine?.price || 0)) * item.quantity}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>

                {deliveryFee === 0 && (
                  <div className="free-delivery-note">
                    🎉 Free delivery on orders above ₹500
                  </div>
                )}

                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-primary checkout-btn"
                >
                  Proceed to Checkout
                </button>

                <div className="secure-checkout">
                  🔒 Secure checkout with 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
