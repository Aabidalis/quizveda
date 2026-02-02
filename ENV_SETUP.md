# Environment Variables Setup

## Backend .env

Copy the content below to `backend/.env`:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
# Get from: https://www.mongodb.com/cloud/atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/quizveda?retryWrites=true&w=majority

# Razorpay Configuration
# Get from: https://dashboard.razorpay.com/app/settings/api-keys
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Backend Env Variables Explanation

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| PORT | Yes | Server port | 5000 |
| MONGO_URI | Yes | MongoDB connection string | mongodb+srv://... |
| RAZORPAY_KEY_ID | Yes | Razorpay public key | rzp_test_1234... |
| RAZORPAY_KEY_SECRET | Yes | Razorpay secret key | sampleSecretKey123 |
| FRONTEND_URL | Yes | Frontend URL for CORS | http://localhost:5173 |

### How to Get Razorpay Credentials

1. Go to https://razorpay.com/
2. Sign up or login
3. Click on "Settings" in the menu
4. Select "API Keys"
5. You'll see two keys:
   - **Key ID** (Public Key) - Use as RAZORPAY_KEY_ID
   - **Key Secret** (Private Key) - Use as RAZORPAY_KEY_SECRET
6. Make sure you're in **Test Mode** for development

### How to Get MongoDB Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and login
3. Create a new project
4. Create a cluster (Free tier)
5. Click "Connect"
6. Choose "Drivers"
7. Select "Node.js"
8. Copy the connection string
9. Replace:
   - `<username>` with your username
   - `<password>` with your password
   - `myFirstDatabase` with `quizveda`

Example transformation:
```
Before: mongodb+srv://<username>:<password>@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
After:  mongodb+srv://user123:pass123@cluster.mongodb.net/quizveda?retryWrites=true&w=majority
```

---

## Frontend .env

Copy the content below to `frontend/.env`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Razorpay Configuration
# Get from: https://dashboard.razorpay.com/app/settings/api-keys
VITE_RAZORPAY_KEY=your_razorpay_key_id_here
```

### Frontend Env Variables Explanation

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| VITE_API_BASE_URL | Yes | Backend API URL | http://localhost:5000/api |
| VITE_RAZORPAY_KEY | Yes | Razorpay public key (Key ID only) | rzp_test_1234... |

### Important Notes

- Frontend only needs **VITE_RAZORPAY_KEY** (public key), never expose secret key
- Backend needs both Key ID and Key Secret
- Prefix variables with `VITE_` to access them in Vite frontend
- Never commit `.env` files to Git
- Use `.env.example` for templates that can be committed

---

## Production Environment Variables

### Backend Production .env

```env
PORT=5000
MONGO_URI=mongodb+srv://prod_user:prod_password@prod-cluster.mongodb.net/quizveda?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_live_actual_production_key
RAZORPAY_KEY_SECRET=actual_production_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Production .env

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_RAZORPAY_KEY=rzp_live_actual_production_key
```

### Switch from Test to Production

1. Go to Razorpay Dashboard
2. In Settings → API Keys
3. Toggle from **Test Mode** to **Live Mode**
4. Copy the production Key ID and Key Secret
5. Update environment variables
6. Test thoroughly before going live

---

## Security Tips

1. ✅ Never share your .env file
2. ✅ Use `.env.example` instead for documentation
3. ✅ Keep different credentials for test and production
4. ✅ Rotate keys regularly in production
5. ✅ Don't log sensitive values
6. ✅ Use environment variables for all secrets
7. ✅ In production, use services like AWS Secrets Manager or Heroku Config Vars

---

## Troubleshooting Env Variables

### "Cannot read property of undefined"
- Check if `.env` file exists
- Restart development server after adding `.env`
- For frontend, prefix must be `VITE_`

### "MONGO_URI is not defined"
- Ensure `.env` file is in backend root directory
- Run `npm install dotenv` if not already installed
- Check for typos in .env file

### "Razorpay key not found"
- Ensure `RAZORPAY_KEY_ID` is in backend `.env`
- Ensure `VITE_RAZORPAY_KEY` is in frontend `.env`
- Restart both servers after updating `.env`

### Payment fails with "Invalid Key ID"
- Check if key is valid and still active
- Make sure you're using Key ID (not Secret Key)
- Verify the environment (test vs production)

---

## .env.example Template

Create `backend/.env.example` and `frontend/.env.example` for documentation:

### backend/.env.example
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizveda?retryWrites=true&w=majority
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

### frontend/.env.example
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

These `.example` files can be committed to Git for team reference.
