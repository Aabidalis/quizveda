import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Rules from './pages/Rules';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment/:userId" element={<Payment />} />
        <Route path="/rules/:userId" element={<Rules />} />
        <Route path="/quiz/:userId" element={<Quiz />} />
        <Route path="/result/:userId" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
