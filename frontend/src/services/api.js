import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL
});

// User APIs
export const registerUser = (name, phone) => {
  return api.post('/users/register', { name, phone });
};

export const getUserByPhone = (phone) => {
  return api.get(`/users/phone/${phone}`);
};

export const updatePaymentStatus = (userId, paymentStatus) => {
  return api.put('/users/payment-status', { userId, paymentStatus });
};

export const markQuizAttempted = (userId) => {
  return api.put('/users/mark-attempted', { userId });
};

// Payment APIs
export const createOrder = (userId) => {
  return api.post('/payments/create-order', { userId });
};

export const verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature, userId) => {
  return api.post('/payments/verify', {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    userId
  });
};

export const getPaymentStatus = (orderId) => {
  return api.get(`/payments/status/${orderId}`);
};

// Quiz APIs
export const getAllQuestions = () => {
  return api.get('/quiz/questions');
};

export const getQuestionById = (id) => {
  return api.get(`/quiz/questions/${id}`);
};

export const submitQuiz = (userId, answers) => {
  return api.post('/quiz/submit', { userId, answers });
};

export const getLeaderboard = () => {
  return api.get('/quiz/leaderboard');
};

export const getUserResult = (userId) => {
  return api.get(`/quiz/result/${userId}`);
};

export default api;
