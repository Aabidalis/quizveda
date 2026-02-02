import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

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
  .register-container {
    min-height: calc(100vh - 70px);
    background-color: #f3f4f6;
    padding: 30px 20px;
  }

  .register-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: flex-start;
  }

  .register-left {
    display: flex;
    justify-content: center;
  }

  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
  }

  .register-title {
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

  .form-group {
    margin-bottom: 20px;
  }

  .form-input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-family: inherit;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #3a2d7f;
    box-shadow: 0 0 0 3px rgba(58, 45, 127, 0.1);
  }

  .form-input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  .btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  .btn-primary {
    background-color: #3a2d7f;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #2f2464;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(58, 45, 127, 0.3);
  }

  .btn-disabled {
    background-color: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }

  .register-footer {
    text-align: center;
    margin-top: 20px;
    color: #6b7280;
    font-size: 14px;
  }

  .register-footer-link {
    color: #3a2d7f;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .register-footer-link:hover {
    color: #2f2464;
  }

  /* Guidelines - SHORT HEIGHT */
  .register-right {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 450px;
    overflow-y: auto;
  }

  .guidelines-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #1f2937;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    padding-bottom: 10px;
    z-index: 10;
  }

  .guidelines-content {
    font-size: 14px;
    line-height: 1.7;
    color: #4b5563;
  }

  .guidelines-content h3 {
    font-size: 15px;
    font-weight: 600;
    margin-top: 12px;
    margin-bottom: 6px;
    color: #1f2937;
  }

  .guidelines-content ul {
    margin-left: 18px;
    margin-bottom: 10px;
  }

  .guidelines-content li {
    margin-bottom: 4px;
    font-size: 13px;
  }

  .guidelines-content p {
    margin-bottom: 10px;
    font-size: 13px;
  }

  .divider {
    border-top: 1px solid #e5e7eb;
    margin: 10px 0;
  }

  .register-right::-webkit-scrollbar {
    width: 8px;
  }

  .register-right::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .register-right::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }

  .register-right::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Tabs */
  .tabs-container {
    display: none;
    margin-bottom: 20px;
  }

  .tabs-buttons {
    display: flex;
    gap: 10px;
  }

  .tab-btn {
    flex: 1;
    padding: 12px;
    border: 2px solid #e5e7eb;
    background-color: #f9fafb;
    color: #6b7280;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  .tab-btn.active {
    border-color: #3a2d7f;
    background-color: #3a2d7f;
    color: white;
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .register-wrapper {
      grid-template-columns: 1fr;
    }

    .register-right {
      height: 400px;
    }
  }

  @media (max-width: 768px) {
    .header { padding: 12px 16px; }
    .header h1 { font-size: 24px; }
    .header .home-btn { padding: 8px 16px; font-size: 13px; }
    .register-container { padding: 16px; }
    .register-right { height: 350px; padding: 16px; }
    .card { padding: 16px; }
    .register-title { font-size: 22px; margin-bottom: 20px; }
    .form-input { font-size: 15px; }
  }

  @media (max-width: 480px) {
    .tabs-container { display: block !important; }
    .register-left { display: none; }
    .register-right { display: none; height: 350px; }
    .register-left.active { display: flex !important; }
    .register-right.active { display: block !important; }
    .header h1 { font-size: 20px; }
    .header .home-btn { font-size: 12px; }
    .register-title { font-size: 20px; }
    .card { padding: 12px; }
    .form-input { font-size: 14px; }
    .guidelines-content { font-size: 12px; }
  }
`;

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name.trim() || !phone.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (phone.length < 10) {
      setError('Phone number must be at least 10 digits');
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(name, phone);
      const userId = response.data.userId;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', name);
      localStorage.setItem('userPhone', phone);
      navigate(`/payment/${userId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
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

      <div className="register-container">
        <div className="tabs-container">
          <div className="tabs-buttons">
            <button
              className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              Register
            </button>
            <button
              className={`tab-btn ${activeTab === 'guidelines' ? 'active' : ''}`}
              onClick={() => setActiveTab('guidelines')}
            >
              T&C
            </button>
          </div>
        </div>

        <div className="register-wrapper">
          <div className={`register-left ${activeTab === 'form' ? 'active' : ''}`}>
            <div className="card">
              <h2 className="register-title">Register</h2>
              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
                >
                  {loading ? 'Registering...' : 'Register →'}
                </button>
              </form>

              <p className="register-footer">
                Already registered?{' '}
                <span
                  className="register-footer-link"
                  onClick={() => navigate('/')}
                >
                  Continue
                </span>
              </p>
            </div>
          </div>

          <div className={`register-right ${activeTab === 'guidelines' ? 'active' : ''}`}>
            <div className="guidelines-title">📋 Terms & Conditions</div>
            <div className="guidelines-content">
              <p>By registering, paying, and participating in this quiz, you confirm that you have read, understood, and agreed to the following Terms & Conditions. Participation is voluntary.</p>
              <div className="divider"></div>

              <h3>1. Eligibility</h3>
              <ul>
                <li>Participants must be any years or above.</li>
                <li>Participants must provide accurate and truthful information during registration.</li>
                <li>Any false, misleading, or incomplete details may lead to immediate disqualification without refund.</li>
              </ul>

              <div className="divider"></div>

              <h3>2. Entry Fee & Payment</h3>
              <ul>
                <li>The entry fee (₹49 or as displayed) is non-refundable and non-transferable under any circumstances.</li>
                <li>Successful payment is required to access the quiz.</li>
                <li>The platform is not responsible for failed, delayed, or interrupted payments caused by banks, payment gateways, or network issues.</li>
              </ul>

              <div className="divider"></div>

              <h3>3. Quiz Rules</h3>
              <ul>
                <li>Each participant is allowed only one attempt.</li>
                <li>The quiz is time-bound, and submissions after the timer ends will be automatically submitted or rejected.</li>
                <li>Rankings are decided based on correct answers and time taken.</li>
              </ul>

              <div className="divider"></div>

              <h3>4. Fair Play & Disqualification</h3>
              <p><strong>Participants must not:</strong></p>
              <ul>
                <li>Use unfair means, automation, bots, scripts, or external assistance</li>
                <li>Attempt multiple registrations</li>
                <li>Share questions or answers</li>
              </ul>
              <p><strong>If detected:</strong></p>
              <ul>
                <li>The participant will be disqualified immediately</li>
                <li>No refund will be issued</li>
              </ul>

              <div className="divider"></div>

              <h3>5. Technical Responsibility</h3>
              <ul>
                <li>Participants are responsible for stable internet connection</li>
                <li>Compatible device (mobile/desktop)</li>
                <li>Power backup during the quiz</li>
              </ul>

              <div className="divider"></div>

              <h3>6. Results & Decision</h3>
              <ul>
                <li>Results declared are final</li>
                <li>No disputes will be entertained</li>
              </ul>

              <div className="divider"></div>

              <h3>7. Prizes & Payout</h3>
              <ul>
                <li>Prize money will be transferred via UPI/Bank Transfer</li>
                <li>Winners must provide valid payment details</li>
              </ul>

              <div className="divider"></div>

              <h3>8. Data Privacy</h3>
              <ul>
                <li>Data is used only for quiz operation and result processing</li>
                <li>Data will not be sold or misused</li>
              </ul>

              <div className="divider"></div>

              <h3>9. Jurisdiction</h3>
              <ul>
                <li>These Terms are governed by Indian law</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}