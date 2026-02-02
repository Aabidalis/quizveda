import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../services/api';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .home-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  /* Header Styles */
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header h1 {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    color: white;
  }

  .header .login-btn {
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

  .header .login-btn:hover {
    background-color: #f0f0f0;
  }

  /* Text Center */
  .text-center {
    text-align: center;
    margin-top: 40px;
  }

  .kannada-title {
    font-size: 32px;
    color: #2f2a7c;
    letter-spacing: 0.1em;
    margin-top: 20px;
    margin-bottom: 40px;
    font-weight: 600;
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .main-content {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  /* Grid Layout */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
  }

  .left-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Typography */
  .main-heading {
    font-size: 48px;
    font-weight: bold;
    margin: 0;
    color: #1f2937;
    line-height: 1.2;
  }

  .description {
    font-size: 18px;
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }

  /* Features List */
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .feature-icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  .feature-text {
    font-size: 16px;
    color: #374151;
  }

  /* Entry Fee */
  .entry-fee {
    background-color: #e0e7ff;
    padding: 10px 15px;
    border-radius: 8px;
    font-weight: 600;
    color: #3a2d7f;
    display: inline-block;
    width: fit-content;
  }

  /* Button */
  .btn {
    padding: 15px 30px;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: fit-content;
  }

  .btn-primary {
    background-color: #3a2d7f;
    color: white;
  }

  .btn-primary:hover {
    background-color: #2f2464;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(58, 45, 127, 0.3);
  }

  /* Card */
  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Leaderboard */
  .leaderboard-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .leaderboard-title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    display: flex;
    align-items: center;
    color: #1f2937;
  }

  .leaderboard-table {
    width: 100%;
    border-collapse: collapse;
  }

  .leaderboard-table thead {
    background-color: #f3f4f6;
    border-bottom: 2px solid #e5e7eb;
  }

  .leaderboard-table th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    font-size: 14px;
  }

  .leaderboard-table tbody tr {
    border-bottom: 1px solid #e5e7eb;
    transition: background-color 0.2s ease;
  }

  .leaderboard-table tbody tr:hover {
    background-color: #f9fafb;
  }

  .leaderboard-table td {
    padding: 12px;
    color: #1f2937;
    font-size: 14px;
  }

  .rank-cell {
    font-weight: 600;
    color: #3a2d7f;
  }

  .score-cell {
    font-weight: 600;
    color: #10b981;
  }

  .no-data {
    text-align: center;
    color: #9ca3af;
    padding: 20px;
    margin: 0;
  }

  /* Spinner */
  .spinner {
    border: 3px solid #e5e7eb;
    border-top: 3px solid #3a2d7f;
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

  /* Prize Footer */
  .prize-footer {
    background-color: #3a2d7f;
    color: white;
    padding: 40px 20px;
    margin-top: 60px;
  }

  .prizes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .prize-item {
    text-align: center;
  }

  .prize-title {
    font-size: 24px;
    margin: 0 0 10px 0;
    font-weight: 600;
  }

  .prize-amount {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }

  /* ===== RESPONSIVE DESIGN ===== */

  /* Tablets and Small Desktops (768px to 1024px) */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .main-heading {
      font-size: 40px;
    }

    .prizes-grid {
      gap: 20px;
    }

    .prize-title {
      font-size: 20px;
    }

    .prize-amount {
      font-size: 18px;
    }
  }

  /* Mobile Devices (up to 768px) */
  @media (max-width: 768px) {
    .header-container {
      padding: 0 16px;
    }

    .header h1 {
      font-size: 24px;
    }

    .header .login-btn {
      padding: 8px 16px;
      font-size: 13px;
    }

    .kannada-title {
      font-size: 28px;
      margin-top: 30px;
      margin-bottom: 30px;
    }

    .main-content {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    .content-grid {
      grid-template-columns: 1fr;
      gap: 30px;
      align-items: auto;
    }

    .main-heading {
      font-size: 32px;
      margin-bottom: 15px;
    }

    .description {
      font-size: 16px;
      margin-bottom: 15px;
    }

    .features-list {
      gap: 12px;
      margin: 15px 0;
    }

    .feature-text {
      font-size: 15px;
    }

    .entry-fee {
      padding: 8px 12px;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .btn {
      padding: 12px 24px;
      font-size: 16px;
      width: 100%;
    }

    .card {
      padding: 16px;
    }

    .leaderboard-title {
      font-size: 20px;
    }

    .leaderboard-table th,
    .leaderboard-table td {
      padding: 10px 8px;
      font-size: 13px;
    }

    .prize-footer {
      padding: 30px 16px;
      margin-top: 40px;
    }

    .prizes-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .prize-title {
      font-size: 20px;
    }

    .prize-amount {
      font-size: 18px;
    }
  }

  /* Small Mobile Devices (up to 480px) */
  @media (max-width: 480px) {
    .header {
      padding: 12px 16px;
    }

    .header h1 {
      font-size: 20px;
    }

    .header .login-btn {
      padding: 8px 12px;
      font-size: 12px;
    }

    .container {
      padding: 0 16px;
    }

    .kannada-title {
      font-size: 24px;
      margin-top: 20px;
      margin-bottom: 25px;
    }

    .main-content {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .main-heading {
      font-size: 28px;
      margin-bottom: 12px;
    }

    .description {
      font-size: 15px;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .features-list {
      gap: 10px;
      margin: 12px 0;
    }

    .feature-icon {
      font-size: 16px;
    }

    .feature-text {
      font-size: 14px;
    }

    .entry-fee {
      padding: 8px 10px;
      font-size: 13px;
      margin-bottom: 12px;
    }

    .btn {
      padding: 12px 20px;
      font-size: 15px;
      width: 100%;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
    }

    .card {
      padding: 12px;
    }

    .leaderboard-title {
      font-size: 18px;
    }

    .leaderboard-table th,
    .leaderboard-table td {
      padding: 8px 6px;
      font-size: 12px;
    }

    .prize-footer {
      padding: 25px 12px;
      margin-top: 30px;
    }

    .prizes-grid {
      gap: 15px;
    }

    .prize-title {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .prize-amount {
      font-size: 16px;
    }

    .text-center {
      margin-top: 20px;
    }
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await getLeaderboard();
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="home-page">
        <header className="header">
          <div className="header-container">
            <h1>QUIZVEDA</h1>
            <button className="header login-btn" onClick={() => navigate('/register')}>
              Login
            </button>
          </div>
        </header>

        <div className="text-center">
          <h2 className="kannada-title">
            ಸಾಗರ ಸಂಭ್ರಮ
          </h2>
        </div>

        <main className="container main-content">
          <div className="content-grid">
            {/* Left Section */}
            <div className="left-section">
              <h2 className="main-heading">
                Master the Quiz
              </h2>
              <p className="description">
                Join the most competitive quiz platform. Test your knowledge across 10 questions in 2.5 minutes.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Anti-cheating system integrated</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Instant automated evaluation</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Top 3 participants win cash prizes</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span className="feature-text">Fair competition for all</span>
                </div>
              </div>

              <div className="entry-fee">
                ₹49 Entry Fee
              </div>

              <button className="btn btn-primary" onClick={() => navigate('/register')}>
                Register Now →
              </button>
            </div>

            {/* Right Section - Leaderboard */}
            <div className="leaderboard-section card">
              <h3 className="leaderboard-title">
                🏆 Live Leaderboard
              </h3>
              {loading ? (
                <div className="spinner"></div>
              ) : leaderboard.length === 0 ? (
                <p className="no-data">No data yet...</p>
              ) : (
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Username</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry._id}>
                        <td className="rank-cell">#{index + 1}</td>
                        <td>{entry.name}</td>
                        <td className="score-cell">{entry.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>

        {/* Prize Section */}
        <footer className="prize-footer">
          <div className="container">
            <div className="prizes-grid">
              <div className="prize-item">
                <h4 className="prize-title">🏅 1st Prize</h4>
                <p className="prize-amount">₹7,000</p>
              </div>
              <div className="prize-item">
                <h4 className="prize-title">🥈 2nd Prize</h4>
                <p className="prize-amount">₹4,000</p>
              </div>
              <div className="prize-item">
                <h4 className="prize-title">🥉 3rd Prize</h4>
                <p className="prize-amount">₹2,000</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}