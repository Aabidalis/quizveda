import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createOrder, verifyPayment } from '../services/api';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  /* Header */
  .header {
    background-color: #3a2d7f;
    padding: 16px 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header h1 {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    color: white;
  }

  .header .home-btn {
    padding: 10px 20px;
    background-color: #ffffff;
    color: #3a2d7f;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .header .home-btn:hover {
    background-color: #f0f0f0;
  }

  /* Container */
  .payment-container {
    min-height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6;
    padding: 20px;
  }

  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
  }

  .payment-title {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #1f2937;
  }

  .error-message {
    background-color: #fee2e2;
    color: #991b1b;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 14px;
    border-left: 4px solid #dc2626;
  }

  .success-message {
    background-color: #dcfce7;
    color: #166534;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 14px;
    border-left: 4px solid #22c55e;
  }

  .price-section {
    text-align: center;
    margin-bottom: 30px;
  }

  .price-amount {
    font-size: 36px;
    font-weight: bold;
    color: #3a2d7f;
    margin-bottom: 10px;
  }

  .price-details {
    font-size: 14px;
    color: #6b7280;
  }

  .btn {
    width: 100%;
    padding: 15px;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  .btn-primary {
    background-color: #000;
    color: #fff;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .btn-disabled {
    background-color: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }

  .footer-text {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 20px;
    text-align: center;
  }

  .loader {
    border: 4px solid #f3f4f6;
    border-top: 4px solid #3a2d7f;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header { padding: 12px 16px; }
    .header h1 { font-size: 24px; }
    .header .home-btn { padding: 8px 16px; font-size: 13px; }
    .payment-container { padding: 16px; }
    .card { padding: 24px; }
    .payment-title { font-size: 24px; margin-bottom: 20px; }
    .price-amount { font-size: 28px; }
  }

  @media (max-width: 480px) {
    .header h1 { font-size: 20px; }
    .header .home-btn { font-size: 12px; padding: 6px 12px; }
    .payment-container { padding: 12px; }
    .card { padding: 16px; }
    .payment-title { font-size: 20px; margin-bottom: 16px; }
    .price-amount { font-size: 24px; }
    .btn { padding: 12px; font-size: 16px; }
  }
`;

export default function Payment() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/register');
    }
  }, [userId, navigate]);

  const handlePayment = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('💳 Creating order for user:', userId);

      // Create order
      const orderResponse = await createOrder(userId);
      
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create order');
      }

      const order = orderResponse.data.order;
      console.log('📝 Order created:', order.id);

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async (response) => {
          console.log('✅ Payment Success Response:', response);
          try {
            console.log('🔐 Verifying payment...');
            const verifyResponse = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              userId
            );

            console.log('Verify Response:', verifyResponse.data);

            if (verifyResponse.data.success) {
              console.log('✅ Payment verified! Redirecting to rules...');
              setSuccess('Payment successful! Redirecting...');
              setTimeout(() => {
                navigate(`/rules/${userId}`);
              }, 1500);
            } else {
              console.log('❌ Verification failed');
              setError(verifyResponse.data.message || 'Payment verification failed');
              setLoading(false);
            }
          } catch (err) {
            console.error('❌ Verification Error:', err);
            setError('Payment verification error: ' + (err.response?.data?.message || err.message));
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log('❌ Payment window closed');
            setError('Payment cancelled. Please try again.');
            setLoading(false);
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || '',
          contact: localStorage.getItem('userPhone') || ''
        },
        theme: {
          color: '#3a2d7f'
        },
        notes: {
          userId: userId
        }
      };

      console.log('🎫 Razorpay Options:', options);

      // Load and open Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('📦 Razorpay script loaded');
        if (!window.Razorpay) {
          setError('Razorpay library failed to load');
          setLoading(false);
          return;
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay script');
        setError('Failed to load payment gateway. Please check your internet connection.');
        setLoading(false);
      };
      
      document.body.appendChild(script);
    } catch (err) {
      console.error('❌ Order Creation Error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create order');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <header className="header">
        <div className="header-container">
          <h1>QUIZVEDA</h1>
          <button className="home-btn" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </header>

      <div className="payment-container">
        <div className="card">
          <h2 className="payment-title">Secure Payment</h2>

          {error && <div className="error-message">❌ {error}</div>}
          {success && <div className="success-message">✅ {success}</div>}

          <div className="price-section">
            <div className="price-amount">₹49</div>
            <div className="price-details">
              Entry Fee
              <br />
              10 Questions • 20 seconds each • Instant Results
            </div>
          </div>

          {loading && !success && (
            <>
              <div className="loader"></div>
              <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '10px' }}>
                Processing payment...
              </p>
            </>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
          >
            {loading && !success ? 'Processing...' : 'Pay via Razorpay'}
          </button>

          <p className="footer-text">
            💳 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </>
  );
}