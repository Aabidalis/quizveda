# QuizVeda - Complete Project Index

## 📦 Project Overview

**Full-Stack MERN Quiz Competition Platform with Razorpay Payment Integration**

- **Total Files**: 34
- **Lines of Code**: ~2000+
- **Setup Time**: 5 minutes
- **Production Ready**: Yes

---

## 📁 Complete File Structure

```
quiz-platform/
│
├── 📄 README.md                    ← Start here! Full documentation
├── 📄 QUICKSTART.md               ← Quick setup guide (5 mins)
├── 📄 ENV_SETUP.md                ← Environment variables guide
├── 📄 DEPLOYMENT.md               ← Production deployment guide
├── .gitignore                      ← Git ignore file
│
├── backend/                        ← Node.js/Express Server
│   ├── config/
│   │   └── db.js                  ← MongoDB connection
│   │
│   ├── models/                     ← Database Schemas
│   │   ├── User.js                ← User schema (name, phone, payment status)
│   │   ├── Payment.js             ← Payment schema (Razorpay data)
│   │   ├── Question.js            ← Quiz questions schema
│   │   └── Result.js              ← Quiz results schema
│   │
│   ├── controllers/                ← Business Logic
│   │   ├── userController.js      ← User registration, payment status
│   │   ├── paymentController.js   ← Razorpay order & verification
│   │   └── quizController.js      ← Quiz submission & leaderboard
│   │
│   ├── routes/                     ← API Endpoints
│   │   ├── userRoutes.js          ← /api/users/* endpoints
│   │   ├── paymentRoutes.js       ← /api/payments/* endpoints
│   │   └── quizRoutes.js          ← /api/quiz/* endpoints
│   │
│   ├── .env                        ← Environment variables (create manually)
│   ├── server.js                   ← Main Express server
│   ├── seed.js                     ← Database seed script
│   └── package.json                ← Node dependencies
│
└── frontend/                       ← React + Vite Application
    ├── public/                     ← Static assets
    │
    ├── src/
    │   ├── pages/                  ← Page Components
    │   │   ├── Home.jsx            ← Landing page with leaderboard
    │   │   ├── Register.jsx        ← User registration (name, phone)
    │   │   ├── Payment.jsx         ← Razorpay payment gateway
    │   │   ├── Rules.jsx           ← Quiz rules acceptance
    │   │   ├── Quiz.jsx            ← Quiz questions (20s timer)
    │   │   └── Result.jsx          ← Score and results page
    │   │
    │   ├── services/
    │   │   └── api.js              ← Axios API calls
    │   │
    │   ├── styles/
    │   │   └── index.css           ← Global styles
    │   │
    │   ├── App.jsx                 ← Main app with routing
    │   └── main.jsx                ← React entry point
    │
    ├── index.html                  ← HTML template
    ├── vite.config.js              ← Vite configuration
    ├── .env                        ← Environment variables (create manually)
    └── package.json                ← React dependencies
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Backend Setup
```bash
cd backend
cp .env.example .env  # Add your credentials
npm install
npm run dev
```

### 2. Seed Database
```bash
node seed.js
```

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env  # Add your credentials
npm install
npm run dev
```

### 4. Test
- Open http://localhost:5173
- Register with name and phone
- Pay with test card: `4111111111111111`
- Take quiz and view results

---

## 📋 File Descriptions

### Backend Files

| File | Purpose | Key Features |
|------|---------|--------------|
| `config/db.js` | MongoDB connection | Handles connection pooling |
| `models/User.js` | User schema | name, phone, paymentStatus |
| `models/Payment.js` | Payment schema | Razorpay order/payment IDs, signature |
| `models/Question.js` | Question schema | question, options[], correctIndex |
| `models/Result.js` | Result schema | score, correctAnswers, submittedAt |
| `controllers/userController.js` | User logic | Register, update payment status |
| `controllers/paymentController.js` | Payment logic | Create order, verify signature |
| `controllers/quizController.js` | Quiz logic | Submit answers, calculate score |
| `routes/userRoutes.js` | User endpoints | /api/users/* |
| `routes/paymentRoutes.js` | Payment endpoints | /api/payments/* |
| `routes/quizRoutes.js` | Quiz endpoints | /api/quiz/* |
| `server.js` | Express app | CORS, routes, error handling |
| `seed.js` | Database seeder | Inserts 10 sample questions |
| `package.json` | Dependencies | Express, Mongoose, Razorpay |

### Frontend Files

| File | Purpose | Key Features |
|------|---------|--------------|
| `pages/Home.jsx` | Landing page | Hero, leaderboard, prizes |
| `pages/Register.jsx` | Registration | 2-field form (name, phone) |
| `pages/Payment.jsx` | Payment gate | Razorpay checkout |
| `pages/Rules.jsx` | Rules page | Acceptance checkbox |
| `pages/Quiz.jsx` | Quiz interface | 20s timer, MCQ questions |
| `pages/Result.jsx` | Results page | Score, percentage, ranking |
| `services/api.js` | API client | Axios wrapper for all endpoints |
| `styles/index.css` | Global styles | Color scheme, responsive design |
| `App.jsx` | Router setup | React Router navigation |
| `main.jsx` | Entry point | ReactDOM render |
| `vite.config.js` | Vite config | Port 5173, React plugin |
| `package.json` | Dependencies | React, Vite, Axios, React Router |

---

## 🔌 API Endpoints

### User APIs
```
POST   /api/users/register              → Register new user
GET    /api/users/phone/:phone          → Get user by phone
PUT    /api/users/payment-status        → Update payment status
PUT    /api/users/mark-attempted        → Mark quiz attempted
```

### Payment APIs
```
POST   /api/payments/create-order       → Create Razorpay order
POST   /api/payments/verify             → Verify payment signature
GET    /api/payments/status/:orderId    → Get payment status
```

### Quiz APIs
```
GET    /api/quiz/questions              → Get all questions
GET    /api/quiz/questions/:id          → Get single question
POST   /api/quiz/submit                 → Submit answers
GET    /api/quiz/leaderboard            → Get top 10
GET    /api/quiz/result/:userId         → Get user result
```

---

## 🗄️ Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  phone: "9876543210",
  paymentStatus: "completed",
  hasAttemptedQuiz: true,
  createdAt: Date,
  updatedAt: Date
}
```

### Questions Collection
```javascript
{
  _id: ObjectId,
  question: "What is the capital of France?",
  options: ["London", "Paris", "Berlin", "Madrid"],
  correctIndex: 1,
  marks: 1,
  createdAt: Date,
  updatedAt: Date
}
```

### Results Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: "John Doe",
  phone: "9876543210",
  score: 8,
  totalQuestions: 10,
  correctAnswers: 8,
  submittedAt: Date,
  createdAt: Date
}
```

### Payments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  razorpayOrderId: "order_J2Z9Z9Z9Z9Z9",
  razorpayPaymentId: "pay_J2Z9Z9Z9Z9Z9",
  razorpaySignature: "signature_hash",
  amount: 4900,
  currency: "INR",
  status: "success",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizveda
RAZORPAY_KEY_ID=rzp_test_key_id
RAZORPAY_KEY_SECRET=rzp_test_key_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=rzp_test_key_id
```

---

## 📊 User Flow Diagram

```
┌─────────────┐
│  Home Page  │  ← Landing page with leaderboard
└──────┬──────┘
       │
       ↓
┌──────────────┐
│  Register    │  ← Name + Phone (2 fields)
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Payment    │  ← Razorpay checkout (₹49)
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Payment OK?  │
└──┬───────┬───┘
   │ YES   │ NO
   ↓       ↓
  Rules   Error
   │
   ↓
┌──────────────┐
│  Rules Page  │  ← Read & accept terms
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  Quiz Page   │  ← 10 questions, 20s each
│ (with Timer) │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  Results     │  ← Score, %, Rank
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Leaderboard  │  ← Updated in real-time
└──────────────┘
```

---

## 🎯 Quiz Flow Details

```
Quiz Page
├── Fetch 10 questions
├── Display Q1, Start 20s timer
│   ├── User selects option
│   │   └── Answer stored in state
│   ├── Timer reaches 0
│   │   └── Auto-next
│   └── User clicks Next
│       └── Move to Q2
├── Repeat for Q2-Q9
├── Display Q10, different button text
│   └── "Submit Quiz" instead of "Next"
└── User clicks Submit
    ├── Send answers to backend
    ├── Backend calculates score
    │   ├── Check each answer vs correctIndex
    │   └── Add marks for correct answers
    ├── Save result to DB
    └── Redirect to Results page
```

---

## 🔄 Payment Flow

```
1. User clicks "Pay via Razorpay"
   ↓
2. Frontend calls /api/payments/create-order
   ↓
3. Backend creates Razorpay order
   ↓
4. Frontend opens Razorpay checkout
   ↓
5. User enters payment details
   ↓
6. Razorpay processes payment
   ↓
7. Return paymentId, orderId, signature
   ↓
8. Frontend calls /api/payments/verify
   ↓
9. Backend verifies signature using crypto
   ├── Create sign = orderId|paymentId
   ├── Create hash = HMAC(sign, secret)
   └── Compare with received signature
   ↓
10. If valid: Update user paymentStatus to "completed"
11. If invalid: Set status to "failed"
    ↓
12. Redirect to Rules page
```

---

## 🧪 Testing the Application

### Test User Flow
1. **Register**: Name="Test User", Phone="9999999999"
2. **Payment**: Card "4111111111111111", OTP "123456"
3. **Quiz**: Answer all 10 questions
4. **Results**: View score and leaderboard

### Test API with Postman

#### Register User
```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "phone": "9999999999"
}
```

#### Get Leaderboard
```http
GET http://localhost:5000/api/quiz/leaderboard
```

#### Submit Quiz
```http
POST http://localhost:5000/api/quiz/submit
Content-Type: application/json

{
  "userId": "user_id_here",
  "answers": [1, 0, 2, 1, -1, 0, 1, 2, 1, 0]
}
```

---

## 📦 Dependencies

### Backend
```json
{
  "express": "4.18.2",
  "mongoose": "7.5.0",
  "dotenv": "16.3.1",
  "cors": "2.8.5",
  "razorpay": "2.9.1",
  "body-parser": "1.20.2"
}
```

### Frontend
```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.15.0",
  "axios": "1.5.0",
  "vite": "4.4.9"
}
```

---

## 📚 Documentation Files

| File | Content |
|------|---------|
| `README.md` | Complete documentation, features, setup |
| `QUICKSTART.md` | 5-minute quick start guide |
| `ENV_SETUP.md` | Detailed environment variable setup |
| `DEPLOYMENT.md` | Production deployment to Heroku/Railway/AWS |

---

## ✅ What's Included

- ✅ Complete backend with all controllers and routes
- ✅ Complete frontend with all pages and components
- ✅ MongoDB schemas for all entities
- ✅ Razorpay payment integration with verification
- ✅ 10-second timer for each quiz question
- ✅ Auto-skip when timer ends
- ✅ Score calculation and results display
- ✅ Live leaderboard (top 10)
- ✅ Responsive UI matching reference images
- ✅ Database seeding script with sample questions
- ✅ Comprehensive documentation
- ✅ Production-ready code
- ✅ Error handling
- ✅ CORS configuration
- ✅ Environment variable setup

---

## 🚀 Next Steps

1. **Setup**: Follow QUICKSTART.md
2. **Configure**: Add .env variables
3. **Seed**: Run `node seed.js`
4. **Test**: Try the full user flow
5. **Deploy**: Follow DEPLOYMENT.md
6. **Customize**: Add more questions, change colors, add features

---

## 📞 Support Resources

- MongoDB Docs: https://docs.mongodb.com
- Razorpay Docs: https://razorpay.com/docs
- Express Docs: https://expressjs.com
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev

---

## 📝 License

This project is open source and available under MIT License.

---

## 🎉 You're All Set!

Start with QUICKSTART.md and you'll have a fully functional quiz platform running in 5 minutes!
