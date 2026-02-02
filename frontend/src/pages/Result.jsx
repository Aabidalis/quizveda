import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getUserResult } from '../services/api';

export default function Result() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (location.state?.result) {
          setResult(location.state.result);
        } else {
          const response = await getUserResult(userId);
          setResult(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [userId, location.state]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="error-message">No result found</div>
      </div>
    );
  }

  const percentage = ((result.correctAnswers / result.totalQuestions) * 100).toFixed(1);
  const maxScore = result.totalQuestions;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
        </h1>

        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
          Quiz Completed!
        </h2>

        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px' }}>
          Great effort, {result.name}!
        </p>

        {/* Score Circle */}
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: '#f0f4ff',
          border: '4px solid #3a2d7f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 40px'
        }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#3a2d7f' }}>
            {result.score}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '10px' }}>
            {result.correctAnswers}/{result.totalQuestions} Correct
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {percentage}%
          </div>
        </div>

        {/* Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Total Score</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>{result.score} / {maxScore}</p>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Accuracy</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>{percentage}%</p>
          </div>
        </div>

        {/* Performance Message */}
        <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px', marginBottom: '40px', borderLeft: '4px solid #f59e0b' }}>
          <p style={{ color: '#92400e', fontSize: '16px', lineHeight: '1.6' }}>
            {percentage >= 80 && '🌟 Outstanding performance! You ranked among the top scorers!'}
            {percentage >= 60 && percentage < 80 && '✨ Good job! Keep practicing to improve your score.'}
            {percentage >= 40 && percentage < 60 && '📚 Average performance. Review the topics and try again!'}
            {percentage < 40 && '💡 More practice needed. Keep learning and attempt again!'}
          </p>
        </div>

        {/* User Details */}
        <div style={{ textAlign: 'left', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
          <p style={{ marginBottom: '10px', color: '#6b7280' }}>
            <strong style={{ color: '#1f2937' }}>Name:</strong> {result.name}
          </p>
          <p style={{ marginBottom: '10px', color: '#6b7280' }}>
            <strong style={{ color: '#1f2937' }}>Phone:</strong> {result.phone}
          </p>
          <p style={{ color: '#6b7280' }}>
            <strong style={{ color: '#1f2937' }}>Submitted:</strong> {new Date(result.submittedAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
          style={{ width: '100%', padding: '15px', fontSize: '16px' }}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}
