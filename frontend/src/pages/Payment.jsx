import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createOrder, verifyPayment } from '../services/api';

export default function Payment() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/register');
    }
  }, [userId, navigate]);

  const handlePayment = async () => {
    setError('');
    setLoading(true);

    try {
      // Create order
      const orderResponse = await createOrder(userId);
      const order = orderResponse.data.order;
      setOrderId(order.id);

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              userId
            );

            if (verifyResponse.data.success) {
              navigate(`/rules/${userId}`);
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification error: ' + err.message);
          }
        },
        prefill: {
          name: localStorage.getItem('userName'),
          contact: localStorage.getItem('userPhone')
        },
        theme: {
          color: '#3a2d7f'
        }
      };

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
          Secure Payment
        </h2>

        {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3a2d7f' }}>
            ₹49 Entry Fee
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '5px' }}>
            10 Questions • 15 seconds each • Instant Results
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            backgroundColor: '#000',
            color: '#fff'
          }}
        >
          {loading ? 'Processing...' : 'Pay via Razorpay'}
        </button>

        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px' }}>
          💳 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}
