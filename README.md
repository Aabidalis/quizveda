# QuizVeda - MERN Quiz Competition Platform

A complete full-stack quiz competition platform with Razorpay payment integration, built with MongoDB, Express, React, and Node.js.

## 🎯 Features

- **User Registration**: Simple 2-field registration (Name, Phone)
- **Secure Payment**: Razorpay payment gateway integration (₹49 entry fee)
- **Timer-Based Quiz**: 10 questions with 20 seconds per question
- **Auto-Skip**: Questions automatically skip when time runs out
- **Live Leaderboard**: Real-time top 10 rankings
- **Score Calculation**: Automatic scoring with instant results
- **Result Dashboard**: Detailed performance analytics
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 18.2.0 with Vite
- **Backend**: Node.js + Express 4.18.2
- **Database**: MongoDB + Mongoose 7.5.0
- **Payment**: Razorpay
- **API Communication**: Axios
- **Routing**: React Router v6

## 📁 Project Structure

```
quiz-platform/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── paymentController.js
│   │   └── quizController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Payment.js
│   │   ├── Question.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── quizRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Rules.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Result.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── .env
│   └── package.json
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Razorpay account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizveda?retryWrites=true&w=majority
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📊 MongoDB Setup

### Collections & Schemas

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (unique),
  paymentStatus: String (enum: 'pending', 'completed', 'failed'),
  hasAttemptedQuiz: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Payments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  razorpayOrderId: String (unique),
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount: Number,
  currency: String,
  status: String (enum: 'created', 'success', 'failed'),
  createdAt: Date,
  updatedAt: Date
}
```

#### Questions Collection
```javascript
{
  _id: ObjectId,
  question: String,
  options: Array<String>,
  correctIndex: Number,
  marks: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Results Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  phone: String,
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  submittedAt: Date,
  createdAt: Date
}
```

### Sample Data Insertion

Connect to MongoDB and insert sample questions:

```javascript
db.questions.insertMany([
  {
    "question": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Madrid"],
    "correctIndex": 1,
    "marks": 1
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "options": ["Venus", "Mars", "Jupiter", "Saturn"],
    "correctIndex": 1,
    "marks": 1
  },
  {
    "question": "What is the largest ocean on Earth?",
    "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    "correctIndex": 2,
    "marks": 1
  },
  {
    "question": "Who wrote Romeo and Juliet?",
    "options": ["Christopher Marlowe", "William Shakespeare", "Ben Jonson", "John Webster"],
    "correctIndex": 1,
    "marks": 1
  },
  {
    "question": "What is the chemical symbol for Gold?",
    "options": ["Go", "Gd", "Au", "Ag"],
    "correctIndex": 2,
    "marks": 1
  },
  {
    "question": "In what year did the Titanic sink?",
    "options": ["1912", "1915", "1920", "1905"],
    "correctIndex": 0,
    "marks": 1
  },
  {
    "question": "What is the smallest country in the world?",
    "options": ["Monaco", "Liechtenstein", "Vatican City", "San Marino"],
    "correctIndex": 2,
    "marks": 1
  },
  {
    "question": "Which element has atomic number 1?",
    "options": ["Helium", "Hydrogen", "Lithium", "Beryllium"],
    "correctIndex": 1,
    "marks": 1
  },
  {
    "question": "What is the speed of light?",
    "options": ["300,000 m/s", "300,000 km/s", "150,000 km/s", "450,000 km/s"],
    "correctIndex": 1,
    "marks": 1
  },
  {
    "question": "Who invented the telephone?",
    "options": ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
    "correctIndex": 1,
    "marks": 1
  }
])
```

## 💳 Razorpay Setup

1. Sign up at [Razorpay Dashboard](https://razorpay.com/)
2. Create a new application
3. Get your **Key ID** and **Key Secret** from dashboard
4. Add them to backend `.env` file
5. Add Key ID to frontend `.env` file
6. Enable test mode for testing with dummy cards

### Test Razorpay Credentials (for testing)
- Card: 4111111111111111
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: 123456

## 🔄 API Endpoints

### User APIs
- `POST /api/users/register` - Register new user
- `GET /api/users/phone/:phone` - Get user by phone
- `PUT /api/users/payment-status` - Update payment status
- `PUT /api/users/mark-attempted` - Mark quiz as attempted

### Payment APIs
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `GET /api/payments/status/:orderId` - Get payment status

### Quiz APIs
- `GET /api/quiz/questions` - Get all questions
- `GET /api/quiz/questions/:id` - Get single question
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/leaderboard` - Get top 10 leaderboard
- `GET /api/quiz/result/:userId` - Get user result

## 🌍 Deployment

### Deploy Backend (Heroku/Railway/Vercel)

1. Create Procfile in backend:
```
web: node server.js
```

2. Update `FRONTEND_URL` in `.env` for production

3. Deploy using your preferred platform

### Deploy Frontend (Vercel/Netlify)

1. Update `VITE_API_BASE_URL` to deployed backend URL

2. Build:
```bash
npm run build
```

3. Deploy the `dist` folder to Vercel/Netlify

## 📋 User Flow

1. **Landing Page** → Shows quiz info, leaderboard, entry fee
2. **Registration** → User enters name and phone
3. **Payment** → ₹49 payment via Razorpay
4. **Payment Verification** → Backend verifies signature
5. **Rules Page** → User reads and accepts rules
6. **Quiz** → 10 questions, 20 seconds each
7. **Auto-Submit** → Quiz auto-submits when all answered or time runs out
8. **Result Page** → Shows score, percentage, ranking
9. **Home** → User can view leaderboard

## ⏱️ Quiz Specifications

- **Total Questions**: 10
- **Time per Question**: 20 seconds
- **Total Duration**: 200 seconds (3 minutes 20 seconds)
- **Marks per Question**: 1
- **Total Marks**: 10
- **Negative Marking**: None
- **Navigation**: No backward navigation
- **Auto-skip**: Yes (when timer ends)
- **Leaderboard**: Top 10 by score (earliest submission breaks ties)

## 🔒 Security Features

- ✅ Razorpay signature verification
- ✅ Phone number uniqueness check
- ✅ Auto-skip prevents cheating
- ✅ CORS configuration
- ✅ No backward question navigation
- ✅ Server-side answer verification

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check connection string in `.env`
- Ensure IP whitelist in MongoDB Atlas
- Verify credentials are correct

### Razorpay Payment Error
- Verify Key ID and Key Secret
- Check if in test mode
- Ensure CORS is properly configured

### Quiz Auto-Skip Not Working
- Check if timer interval is clearing properly
- Verify question fetch is successful
- Check browser console for errors

## 📝 License

This project is open source and available under MIT License.

## 📧 Support

For issues and questions, please create an issue in the repository.

## 🚀 Production Checklist

- [ ] Configure MongoDB Atlas with proper security
- [ ] Set up Razorpay production credentials
- [ ] Enable HTTPS on production
- [ ] Set up proper error logging
- [ ] Configure rate limiting
- [ ] Add input validation on all endpoints
- [ ] Set up database backups
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and alerts
- [ ] Test payment flow completely
