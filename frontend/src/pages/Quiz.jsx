import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllQuestions, submitQuiz } from '../services/api';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  .quiz-page {
    min-height: 100vh;
    background-color: #f3f4f6;
    padding: 20px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  /* Header Section */
  .quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .progress-section {
    flex: 1;
  }

  .question-counter {
    color: #6b7280;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #3a2d7f;
    transition: width 0.3s ease;
  }

  .timer {
    font-size: 24px;
    font-weight: bold;
    margin-left: 20px;
    min-width: 80px;
    text-align: right;
  }

  .timer.low {
    color: #ef4444;
  }

  .timer.normal {
    color: #3a2d7f;
  }

  /* Card */
  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .question-text {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #1f2937;
    line-height: 1.6;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  /* Options */
  .options-container {
    margin-bottom: 30px;
  }

  .option-item {
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #f9fafb;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .option-item:hover {
    border-color: #3a2d7f;
    background-color: #f3f4f6;
  }

  .option-item.selected {
    border: 2px solid #3a2d7f;
    background-color: #f0f4ff;
  }

  .option-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0;
  }

  .option-input {
    margin-right: 12px;
    cursor: pointer;
  }

  .option-text {
    font-size: 16px;
    color: #374151;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  /* Button */
  .btn {
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    width: 100%;
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

  /* Loading & Error */
  .spinner {
    border: 3px solid #e5e7eb;
    border-top: 3px solid #3a2d7f;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-container,
  .error-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .error-message {
    background-color: #fee2e2;
    color: #991b1b;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #dc2626;
    font-size: 16px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .container {
      max-width: 100%;
    }

    .quiz-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    .timer {
      margin-left: 0;
      width: 100%;
      text-align: left;
    }

    .progress-section {
      width: 100%;
    }

    .card {
      padding: 20px;
    }

    .question-text {
      font-size: 20px;
      margin-bottom: 25px;
    }
  }

  @media (max-width: 768px) {
    .quiz-page {
      padding: 16px;
    }

    .quiz-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
      padding: 16px;
      margin-bottom: 20px;
    }

    .question-counter {
      font-size: 13px;
      margin-bottom: 8px;
    }

    .progress-bar {
      height: 6px;
    }

    .timer {
      font-size: 20px;
      margin-left: 0;
      width: 100%;
      text-align: left;
    }

    .card {
      padding: 16px;
    }

    .question-text {
      font-size: 18px;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .options-container {
      margin-bottom: 20px;
    }

    .option-item {
      margin-bottom: 12px;
      padding: 12px;
    }

    .option-text {
      font-size: 15px;
    }

    .btn {
      padding: 12px;
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    .quiz-page {
      padding: 12px;
    }

    .quiz-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      margin-bottom: 16px;
      border-radius: 6px;
    }

    .question-counter {
      font-size: 12px;
      margin-bottom: 6px;
    }

    .progress-bar {
      height: 5px;
    }

    .timer {
      font-size: 18px;
      margin-left: 0;
      width: 100%;
      text-align: left;
    }

    .card {
      padding: 12px;
      border-radius: 8px;
    }

    .question-text {
      font-size: 16px;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .options-container {
      margin-bottom: 16px;
    }

    .option-item {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 6px;
    }

    .option-input {
      margin-right: 10px;
    }

    .option-text {
      font-size: 14px;
    }

    .btn {
      padding: 12px;
      font-size: 14px;
    }

    .error-message {
      padding: 12px;
      font-size: 14px;
    }
  }
`;

export default function Quiz() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (err) {
      setError('Failed to load questions');
      setLoading(false);
    }
  };

  // Prevent Copy-Paste and Right-Click
  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      console.warn('⚠️ Copy is disabled during quiz');
      return false;
    };

    const handlePaste = (e) => {
      e.preventDefault();
      console.warn('⚠️ Paste is disabled during quiz');
      return false;
    };

    const handleCut = (e) => {
      e.preventDefault();
      console.warn('⚠️ Cut is disabled during quiz');
      return false;
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        return false;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        return false;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        e.preventDefault();
        return false;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      console.warn('⚠️ Right-click is disabled during quiz');
      return false;
    });

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  // Timer Logic - 15 seconds per question
  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNext();
          return 15; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, questions]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(15); // Reset to 15 seconds
    } else {
      handleSubmit();
    }
  };

  const handleAnswerChange = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const answerArray = questions.map((_, index) => answers[index] !== undefined ? answers[index] : -1);
      const response = await submitQuiz(userId, answerArray);
      navigate(`/result/${userId}`, { state: { result: response.data.result } });
    } catch (err) {
      setError('Failed to submit quiz');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="error-container">
          <div className="error-message">{error}</div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <style>{styles}</style>
      <div className="quiz-page">
        <div className="container">
          {/* Header */}
          <div className="quiz-header">
            <div className="progress-section">
              <p className="question-counter">Question {currentQuestionIndex + 1} of {questions.length}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            <div className={`timer ${timer <= 5 ? 'low' : 'normal'}`}>
              ⏱️ {timer}s
            </div>
          </div>

          {/* Question */}
          <div className="card">
            <h3 className="question-text">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`option-item ${answers[currentQuestionIndex] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerChange(index)}
                >
                  <label className="option-label">
                    <input
                      type="radio"
                      className="option-input"
                      name={`question-${currentQuestionIndex}`}
                      value={index}
                      checked={answers[currentQuestionIndex] === index}
                      onChange={() => handleAnswerChange(index)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              disabled={submitting}
              onClick={handleNext}
              className={`btn ${submitting ? 'btn-disabled' : 'btn-primary'}`}
            >
              {submitting ? 'Submitting...' : currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}