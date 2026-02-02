# QuizVeda - Deployment Guide

Complete guide to deploy QuizVeda to production.

## 🔐 Pre-Deployment Checklist

- [ ] All environment variables configured correctly
- [ ] MongoDB production database created
- [ ] Razorpay switched to Live mode
- [ ] HTTPS enabled on production
- [ ] CORS properly configured
- [ ] All secrets in environment variables (not hardcoded)
- [ ] Database backups configured
- [ ] Error logging set up
- [ ] Rate limiting implemented
- [ ] Security headers configured

---

## Backend Deployment (Node.js/Express)

### Option 1: Deploy on Heroku

#### Step 1: Setup Heroku
```bash
# Install Heroku CLI
# macOS: brew install heroku/brew/heroku
# Windows: Download from heroku.com
# Linux: curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Or connect to existing app
heroku git:remote -a your-app-name
```

#### Step 2: Add Procfile
Create `backend/Procfile`:
```
web: node server.js
```

#### Step 3: Configure Environment Variables
```bash
heroku config:set PORT=5000
heroku config:set MONGO_URI=your_production_mongodb_uri
heroku config:set RAZORPAY_KEY_ID=rzp_live_key
heroku config:set RAZORPAY_KEY_SECRET=your_live_secret
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
```

#### Step 4: Deploy
```bash
git add .
git commit -m "Ready for production"
git push heroku main
```

#### Step 5: View Logs
```bash
heroku logs --tail
```

---

### Option 2: Deploy on Railway.app

#### Step 1: Connect GitHub Repository
1. Go to railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select your repository

#### Step 2: Add Environment Variables
In Railway dashboard:
- Go to Variables
- Add all from `.env`:
  - PORT
  - MONGO_URI
  - RAZORPAY_KEY_ID
  - RAZORPAY_KEY_SECRET
  - FRONTEND_URL

#### Step 3: Configure Build Settings
- Build Command: `npm install`
- Start Command: `node server.js`

#### Step 4: Deploy
Railway auto-deploys when you push to main branch

---

### Option 3: Deploy on AWS EC2

#### Step 1: Launch EC2 Instance
1. Go to AWS Console
2. Launch Ubuntu 22.04 LTS instance
3. Create security group:
   - Allow port 22 (SSH)
   - Allow port 5000 (Node.js)
   - Allow port 80/443 (HTTPS)

#### Step 2: Connect and Setup
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install nginx -y
```

#### Step 3: Clone and Setup App
```bash
# Clone repository
git clone your-repo-url
cd quiz-platform/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add all environment variables

# Start with PM2
pm2 start server.js --name "quizveda-backend"
pm2 startup
pm2 save
```

#### Step 4: Configure Nginx
Create `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx
```

#### Step 5: Setup SSL Certificate (Free with Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## Frontend Deployment

### Option 1: Deploy on Vercel (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### Step 2: Import on Vercel
1. Go to vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Select `frontend` folder as root directory

#### Step 3: Add Environment Variables
In Vercel project settings:
- Go to Environment Variables
- Add:
  - Key: `VITE_API_BASE_URL`
  - Value: `https://your-backend-domain.com/api`
  - Key: `VITE_RAZORPAY_KEY`
  - Value: `your_razorpay_live_key`

#### Step 4: Deploy
Vercel automatically deploys when you push to main

---

### Option 2: Deploy on Netlify

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
# Creates dist folder
```

#### Step 2: Deploy on Netlify
1. Go to netlify.com
2. Click "Add new site"
3. Choose "Deploy manually"
4. Drag and drop `dist` folder

#### Step 3: Configure Environment Variables
In Netlify:
- Site settings → Build & deploy → Environment
- Add VITE_API_BASE_URL and VITE_RAZORPAY_KEY

---

### Option 3: Deploy on GitHub Pages

```bash
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Update package.json
# Add: "homepage": "https://your-username.github.io/repo-name"
# Add to scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## Database Setup (MongoDB Atlas for Production)

### Step 1: Create Production Database
1. Go to MongoDB Atlas
2. Create production project
3. Create M0 or M10 cluster
4. Select region closest to your users

### Step 2: Configure Security
1. Add IP Whitelist:
   - Add your backend server IP
   - Add 0.0.0.0/0 for dynamic IPs
2. Create admin user
3. Enable "Require API Key for all requests"

### Step 3: Get Connection String
1. Click "Connect"
2. Choose "Drivers"
3. Copy connection string
4. Update in backend environment variables

### Step 4: Enable Backups
1. Go to "Atlas Backups"
2. Enable automated backups
3. Set retention to 30 days

---

## HTTPS/SSL Setup

### Option 1: AWS Certificate Manager (for EC2)
```bash
# Request certificate in ACM
# Validate domain
# Use with Nginx
```

### Option 2: Let's Encrypt (Free)
```bash
sudo certbot --nginx -d your-domain.com
```

### Option 3: Cloudflare (Free with additional benefits)
1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL in Cloudflare dashboard
4. Set to "Full" or "Full (strict)"

---

## Performance Optimization

### Backend Optimization
```javascript
// Add to server.js
const compression = require('compression');
app.use(compression());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Frontend Optimization
```bash
# Build with optimizations
npm run build

# Enable gzip compression on server
# Enable caching headers
# Minify assets (automatic with Vite)
```

### MongoDB Optimization
```javascript
// Add indexes for frequently queried fields
db.users.createIndex({ phone: 1 });
db.results.createIndex({ userId: 1, submittedAt: -1 });
db.payments.createIndex({ razorpayOrderId: 1 });
```

---

## Monitoring & Logging

### Backend Logging
```bash
npm install winston

# Create logger.js
# Log all errors and important events
```

### Monitoring Services
- **Sentry**: Error tracking
- **New Relic**: Performance monitoring
- **LogRocket**: Session replay
- **Datadog**: Full stack monitoring

### Health Check Endpoint
```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    database: 'connected'
  });
});
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install
      
      - name: Build frontend
        run: cd frontend && npm run build
      
      - name: Deploy backend
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/your-app.git main
```

---

## Post-Deployment Checklist

- [ ] Test all user flows end-to-end
- [ ] Verify payment processing
- [ ] Check leaderboard updates in real-time
- [ ] Test quiz timer functionality
- [ ] Verify score calculations
- [ ] Check error pages and error handling
- [ ] Test on mobile devices
- [ ] Verify SSL certificate
- [ ] Check performance metrics
- [ ] Monitor logs for errors
- [ ] Set up uptime monitoring
- [ ] Create backup procedure
- [ ] Document deployment process

---

## Troubleshooting Deployment

### Backend Not Starting
```bash
# Check logs
heroku logs --tail

# Restart dyno
heroku restart
```

### Frontend Not Loading
- Clear browser cache
- Check Network tab in DevTools
- Verify API_BASE_URL is correct
- Check CORS configuration

### Payment Gateway Not Working
- Verify Razorpay credentials
- Check if in Live mode
- Verify domain whitelist in Razorpay

### Database Connection Failed
- Check MongoDB IP whitelist
- Verify connection string
- Check firewall rules
- Ensure database user exists

---

## Cost Estimation (Monthly)

- Heroku: $7-50 (backend)
- Vercel: $0-20 (frontend)
- MongoDB Atlas: $0-57 (database)
- Custom Domain: $12
- **Total: ~$30-150/month** (scalable)

---

## Performance Metrics

Target metrics after deployment:
- ✅ First Contentful Paint: < 1.5s
- ✅ API Response Time: < 200ms
- ✅ Database Query: < 100ms
- ✅ Lighthouse Score: > 90
- ✅ Uptime: > 99.5%

---

## Maintenance

### Regular Tasks
- [ ] Monitor error logs daily
- [ ] Check database usage weekly
- [ ] Review performance metrics weekly
- [ ] Update dependencies monthly
- [ ] Backup database weekly
- [ ] Update SSL certificates (auto-renew)
- [ ] Review security vulnerabilities monthly

### Scaling Considerations
- Upgrade MongoDB tier if usage increases
- Add Redis for caching if needed
- Use CDN for static assets
- Add load balancer if multiple backend instances
- Consider microservices for 10k+ concurrent users
