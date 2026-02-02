# QuizVeda - Quick Commands Reference

Copy-paste these commands for quick setup and testing.

---

## 🚀 Initial Setup (First Time Only)

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Create Backend .env
```bash
# Create file: backend/.env
cat > .env << 'EOF'
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/quizveda?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=rzp_test_your_secret
FRONTEND_URL=http://localhost:5173
EOF
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Create Frontend .env
```bash
# Create file: frontend/.env
cat > .env << 'EOF'
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=rzp_test_your_key_id
EOF
```

---

## 🎬 Running the Application

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2: Seed Database (One-time)
```bash
cd backend
node seed.js
# Output: Successfully inserted 10 questions
```

### Terminal 3: Frontend Development
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
# Browser opens automatically
```

---

## 🧪 Testing

### Test Full User Flow
```
1. Open http://localhost:5173
2. Click "Register Now"
3. Fill: Name="Test User", Phone="9999999999"
4. Click "Register →"
5. Click "Pay via Razorpay"
6. Use test card: 4111111111111111
   - Expiry: 12/25
   - CVV: 123
   - OTP: 123456
7. Read rules and tick checkbox
8. Click "Start Quiz →"
9. Answer 10 questions (20 seconds each)
10. View results and leaderboard
```

### Test API with curl

#### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","phone":"9876543210"}'
```

#### Get All Questions
```bash
curl http://localhost:5000/api/quiz/questions
```

#### Get Leaderboard
```bash
curl http://localhost:5000/api/quiz/leaderboard
```

#### Check Server Health
```bash
curl http://localhost:5000/api/health
```

---

## 📦 Production Build

### Build Frontend
```bash
cd frontend
npm run build
# Creates: frontend/dist/
```

### Build Size Check
```bash
cd frontend
npm run build
ls -lah dist/
```

---

## 🔧 Troubleshooting Commands

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Check Port Usage
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check if port 5173 is in use
lsof -i :5173

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### View Backend Logs
```bash
cd backend
npm run dev
# Logs show in console
```

### View MongoDB Connection
```bash
# Add this to backend/server.js temporarily:
console.log('Connecting to:', process.env.MONGO_URI);
```

---

## 📊 Database Commands

### MongoDB Shell Commands (Optional)

#### Connect to MongoDB
```bash
# Using MongoDB CLI (if installed)
mongosh "mongodb+srv://username:password@cluster.mongodb.net/quizveda"
```

#### View Collections
```bash
# In MongoDB shell
use quizveda
show collections
```

#### Count Documents
```javascript
// In MongoDB shell
db.questions.countDocuments()
db.users.countDocuments()
db.results.countDocuments()
db.payments.countDocuments()
```

#### View Sample Question
```javascript
// In MongoDB shell
db.questions.findOne()
```

#### Get Top 3 Results
```javascript
// In MongoDB shell
db.results.find().sort({score: -1}).limit(3)
```

---

## 🌍 Environment Variable Updates

### Update Backend .env During Development
```bash
cd backend
# Edit .env file directly
nano .env  # or vim .env or code .env
```

### Update Frontend .env During Development
```bash
cd frontend
# Edit .env file directly
nano .env  # or vim .env or code .env
```

**Note**: Restart both servers after updating .env files

---

## 📱 Testing on Different Devices

### Access from Another Computer (Local Network)
```bash
# Find your IP address
ifconfig  # macOS/Linux
ipconfig  # Windows

# Access frontend from another device
http://YOUR_IP:5173

# But update frontend .env to use backend IP:
VITE_API_BASE_URL=http://YOUR_IP:5000/api
```

### Test on Mobile
```bash
# Use ngrok for tunneling (optional)
npm install -g ngrok
ngrok http 5173
# Use the provided URL on mobile
```

---

## 🚀 Deployment Commands

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend
heroku create your-app-name

# Add config vars
heroku config:set MONGO_URI=your_prod_uri
heroku config:set RAZORPAY_KEY_ID=your_live_key
heroku config:set RAZORPAY_KEY_SECRET=your_live_secret

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
# Follow prompts
```

---

## 🔐 Security Commands

### Update Credentials
```bash
# For testing first
# Update in .env files then restart

# For production
# Use platform-specific secure config management
```

### Rotate Razorpay Keys (Production)
```
1. Go to Razorpay Dashboard
2. Settings → API Keys
3. Generate new keys
4. Update in backend environment
5. Test payment
6. Deactivate old keys
```

---

## 📊 Monitoring Commands

### Check Memory Usage
```bash
# Node.js process memory
top  # macOS/Linux
# or
tasklist /v  # Windows (look for node.exe)
```

### Monitor Real-time
```bash
# Use PM2 (for production)
npm install -g pm2
pm2 start server.js --name "quizveda"
pm2 monit  # Real-time monitoring
```

---

## 🧹 Cleanup Commands

### Remove Node Modules (Save Space)
```bash
cd backend && rm -rf node_modules
cd frontend && rm -rf node_modules
```

### Clean Build Artifacts
```bash
cd frontend && rm -rf dist
```

### Reset to Fresh State
```bash
# Complete reset (WARNING: Removes all dependencies)
cd backend && rm -rf node_modules package-lock.json && npm install
cd frontend && rm -rf node_modules package-lock.json && npm install
npm run dev  # Both terminals
```

---

## 📈 Performance Testing

### Load Testing (Optional)
```bash
# Install Apache Bench
sudo apt-get install apache2-utils  # Linux
brew install httpd  # macOS

# Simple load test
ab -n 100 -c 10 http://localhost:5000/api/health
```

### Check Bundle Size
```bash
cd frontend
npm run build
npm install -g serve
serve dist
# Visit http://localhost:3000
```

---

## 🐛 Debug Mode

### Enable Detailed Logging
```javascript
// Add to backend/server.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Frontend Console
```javascript
// In browser DevTools (F12)
console.log('Check for errors')
// Network tab to see API calls
```

---

## 🔄 Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### Deploy from Git
```bash
git add .
git commit -m "Updated code"
git push  # Auto-deploys if connected to Heroku/Vercel
```

---

## 📝 Version Control

### Create .env.example (Safe to commit)
```bash
# Backend
cd backend
cat > .env.example << 'EOF'
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizveda
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:5173
EOF

# Frontend
cd frontend
cat > .env.example << 'EOF'
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_key_id
EOF
```

---

## 🎯 Quick Checklist

Before going live:
```bash
☐ npm run build              # Build frontend
☐ npm run dev               # Test locally
☐ curl http://localhost:5000/api/health  # Check backend
☐ Test complete user flow   # Register → Pay → Quiz → Results
☐ Verify leaderboard updates
☐ Test on mobile device
☐ Check all .env variables
☐ Update FRONTEND_URL for production
☐ Verify Razorpay live mode
☐ Setup MongoDB backups
```

---

## 📞 Helpful Resources

### Node.js
```bash
# Check version
node --version
npm --version

# Update
npm install -g npm@latest
```

### MongoDB
```bash
# Check connection
mongo --version
```

### Project Structure Check
```bash
# View tree structure
tree -L 2

# Or use find
find . -type f -name "*.js" -o -name "*.json" | grep -v node_modules | head -30
```

---

## ⚡ Time-Savers

### One-Command Full Setup
```bash
# Backend + Frontend setup
(cd backend && npm install) && (cd frontend && npm install) && echo "Setup complete!"
```

### One-Command Full Start (3 terminals needed)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd backend && node seed.js

# Terminal 3
cd frontend && npm run dev
```

### Quick Test
```bash
# After everything is running
curl http://localhost:5000/api/quiz/leaderboard | jq
```

---

## 🎉 You're All Set!

Keep this file handy for quick reference during development and deployment!

**Last Updated**: February 2, 2026
