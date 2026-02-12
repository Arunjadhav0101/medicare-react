import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getOrders();
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#fd7e14';
      case 'delivered': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Placed';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your medicine orders and delivery status</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <a href="/catalog" className="btn btn-primary">Browse Medicines</a>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p>Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items?.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-details">
                        <span className="item-name">{item.medicine?.name || 'Medicine'}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                      <div className="item-price">₹{(item.medicine?.price || 0) * item.quantity}</div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <strong>Total: ₹{order.total}</strong>
                  </div>
                  <div className="order-actions">
                    {order.status === 'delivered' && (
                      <button className="btn btn-secondary">Reorder</button>
                    )}
                    {order.status === 'shipped' && (
                      <button className="btn btn-primary">Track Package</button>
                    )}
                    <button className="btn btn-secondary">View Details</button>
                  </div>
                </div>

                {order.status === 'shipped' && (
                  <div className="tracking-info">
                    <div className="tracking-steps">
                      <div className="step completed">
                        <div className="step-icon">✓</div>
                        <div className="step-text">Order Placed</div>
                      </div>
                      <div className="step completed">
                        <div className="step-icon">✓</div>
                        <div className="step-text">Processing</div>
                      </div>
                      <div className="step active">
                        <div className="step-icon">🚚</div>
                        <div className="step-text">Shipped</div>
                      </div>
                      <div className="step">
                        <div className="step-icon">📦</div>
                        <div className="step-text">Delivered</div>
                      </div>
                    </div>
                    <p className="estimated-delivery">
                      Estimated delivery: Tomorrow by 6 PM
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
