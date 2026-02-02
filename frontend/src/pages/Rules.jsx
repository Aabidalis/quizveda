import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Rules() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleStartQuiz = () => {
    if (!agreed) {
      alert('Please read and accept the rules first');
      return;
    }
    navigate(`/quiz/${userId}`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '700px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937' }}>
          Quiz Rules & Guidelines
        </h2>

        <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e3a8a' }}>
            📋 Important Rules
          </h3>

          <ul style={{ lineHeight: '1.8', color: '#374151' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Time Limit:</strong> Each question has exactly 15 seconds to answer
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Auto-Skip:</strong> If the timer ends, the question will be automatically skipped
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>No Navigation:</strong> You cannot go back to previous questions
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Single Attempt:</strong> Each question can only be answered once
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Skipped Questions:</strong> Unanswered/skipped questions will give 0 marks
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>No Negative Marking:</strong> Incorrect answers do not deduct marks
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Total Questions:</strong> 10 multiple choice questions
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Total Duration:</strong> Maximum 2 minutes 30 seconds (180 seconds)
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Results:</strong> Your score will be displayed immediately after submission
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Leaderboard:</strong> Rankings are based on highest score, with earliest submission as tiebreaker
            </li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#92400e' }}>
            ⚠️ Important Notice
          </h3>
          <p style={{ color: '#78350f', lineHeight: '1.6' }}>
            By proceeding with this quiz, you agree that your responses are genuine and original. Any attempt to use external assistance, cheating, or manipulation of answers may result in disqualification. The decision of the platform regarding fairness is final.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <label htmlFor="agree" style={{ cursor: 'pointer', color: '#374151', fontWeight: '500' }}>
            I have read and understood all the rules. I agree to participate fairly.
          </label>
        </div>

        <button
          onClick={handleStartQuiz}
          disabled={!agreed}
          className={`btn ${agreed ? 'btn-primary' : 'btn-disabled'}`}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px'
          }}
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}
