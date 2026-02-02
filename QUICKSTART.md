# QuizVeda - Quick Start Guide

## 🎯 First Time Setup (5 minutes)

### Step 1: Get Razorpay Credentials
1. Go to https://razorpay.com/
2. Sign up and verify email
3. Login to dashboard
4. Go to Settings → API Keys
5. Copy **Key ID** and **Key Secret**

### Step 2: Get MongoDB Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster
4. Click "Connect" → "Drivers" → "Node.js"
5. Copy connection string
6. Replace `<password>` with your password
7. Replace `myFirstDatabase` with `quizveda`

Example: 
```
mongodb+srv://user:password@cluster.mongodb.net/quizveda?retryWrites=true&w=majority
```

### Step 3: Backend Setup (Terminal 1)
```bash
cd backend

# Create .env file with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:5173

# Install and start
npm install
npm run dev
```

Backend runs on: http://localhost:5000

### Step 4: Seed Sample Questions
```bash
# In another terminal, from backend folder:
node seed.js
```

Output should show: "Successfully inserted 10 questions"

### Step 5: Frontend Setup (Terminal 2)
```bash
cd frontend

# Create .env file with:
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key_id

# Install and start
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## ✅ Testing the Platform

1. **Open browser**: http://localhost:5173
2. **Click**: "Register Now"
3. **Fill**: Name and Phone (10 digits)
4. **Click**: Register
5. **Pay**: Use test card `4111111111111111` (any future date, any CVV)
6. **Read**: Rules and tick checkbox
7. **Click**: Start Quiz
8. **Answer**: Questions (or auto-skip if timer ends)
9. **View**: Results and Leaderboard

## 🧪 Test Razorpay Card
- Number: `4111111111111111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)
- OTP: 123456

## 📁 File Structure Overview

```
quiz-platform/
├── backend/
│   ├── models/          ← Database schemas
│   ├── controllers/     ← Business logic
│   ├── routes/          ← API endpoints
│   ├── config/          ← Database config
│   ├── server.js        ← Main server
│   ├── seed.js          ← Sample data
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/       ← React pages
│   │   ├── services/    ← API calls
│   │   ├── styles/      ← CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔧 Common Issues & Solutions

### "Cannot find module 'mongoose'"
```bash
cd backend
npm install
```

### "MongoDB connection failed"
- Check MONGO_URI is correct
- Add your IP to MongoDB Atlas whitelist
- Verify password doesn't have special chars (URL encode if needed)

### "Razorpay key not found"
- Update frontend .env with VITE_RAZORPAY_KEY
- Update backend .env with RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
- Restart frontend: `npm run dev`
- Restart backend: `npm run dev`

### "CORS Error"
- Ensure backend is running on port 5000
- Frontend .env has correct VITE_API_BASE_URL
- Restart both frontend and backend

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

## 📊 API Testing with Postman

### Test Register User
```
POST http://localhost:5000/api/users/register
Body (JSON):
{
  "name": "John Doe",
  "phone": "9876543210"
}
```

### Test Get Leaderboard
```
GET http://localhost:5000/api/quiz/leaderboard
```

### Test Get Questions
```
GET http://localhost:5000/api/quiz/questions
```

## 🚀 Production Deployment

### Backend (Heroku)
1. Install Heroku CLI
2. `heroku login`
3. `heroku create app-name`
4. Set environment variables:
   ```
   heroku config:set MONGO_URI=your_prod_uri
   heroku config:set RAZORPAY_KEY_ID=your_key
   heroku config:set RAZORPAY_KEY_SECRET=your_secret
   ```
5. `git push heroku main`

### Frontend (Vercel)
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Set `VITE_API_BASE_URL` to your production backend URL
5. Deploy

## 📞 Support

Check logs for errors:
```bash
# Backend logs
npm run dev

# Frontend development
npm run dev
```

## ✨ Next Steps

1. Add more quiz questions to MongoDB
2. Customize UI colors and fonts
3. Add user profile page
4. Implement quiz categories
5. Add admin panel for question management
6. Set up email notifications
7. Add leaderboard filters (by date, category)
8. Implement daily/weekly challenges
