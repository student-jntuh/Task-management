# TODO App - Signup Page Setup Guide

## ✅ What's Been Created

### Frontend Files
- `frontend/package.json` - Dependencies for React app
- `frontend/vite.config.js` - Vite configuration with API proxy
- `frontend/index.html` - HTML entry point
- `frontend/src/main.jsx` - React app entry
- `frontend/src/App.jsx` - Main app with routing
- `frontend/src/components/Signup.jsx` - Signup component with form
- `frontend/src/styles/App.css` - Global styles
- `frontend/src/styles/Signup.css` - Signup page styles (centered, beautiful design)

### Backend Files
- `backend/package.json` - Dependencies
- `backend/server.js` - Express server setup
- `backend/config/db.js` - MongoDB connection
- `backend/models/User.js` - User schema with password hashing
- `backend/controllers/authController.js` - Signup & Login logic
- `backend/routes/authRoutes.js` - API routes
- `backend/.env` - Environment variables (configure this)
- `backend/.gitignore` - Git ignore rules

---

## 🚀 Installation & Running

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Update `.env`: `MONGODB_URI=mongodb://localhost:27017/todo_db`

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo_db
   ```

### Step 3: Configure Environment Variables

Edit `backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key_123
NODE_ENV=development
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

### Step 5: Open in Browser
- Go to http://localhost:5173
- You'll see the signup page

---

## 📋 Signup Page Features

✅ **Centered Design** - Beautiful gradient background  
✅ **Three Input Fields:**
- Username (text field)
- Email (email field)
- Password (password field)

✅ **Signup Button** - Submit form to backend  
✅ **Login Link** - Link to login page (ready for future)  
✅ **Form Validation:**
- All fields required
- Email format validation
- Password minimum 6 characters
- Username uniqueness
- Email uniqueness

✅ **Error Messages** - Display validation/server errors  
✅ **Loading State** - Button shows "Signing up..." while processing  
✅ **Responsive Design** - Works on mobile, tablet, desktop  

---

## 🔗 API Endpoint

### POST /api/auth/signup

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400/500):**
```json
{
  "message": "Error description"
}
```

---

## 🎨 Styling Details

- **Colors:**
  - Gradient: Purple (#667eea) to Deep Purple (#764ba2)
  - Text: Dark gray (#333)
  - Error: Red (#dc3545)
  - Borders: Light gray (#e0e0e0)

- **Effects:**
  - Slide-in animation on page load
  - Smooth transitions on input focus
  - Button hover effect with shadow
  - Responsive layout (mobile-first)

---

## ⚙️ Key Features in Backend

### Security
- Password hashing with bcryptjs (salt rounds: 10)
- JWT token generation for authentication
- Email validation
- Duplicate user check (username & email)

### Database
- MongoDB with Mongoose
- User model with automatic timestamps
- Pre-save hooks for password encryption

### Error Handling
- Validation error messages
- Try-catch error handling
- Proper HTTP status codes

---

## 📱 Responsive Breakpoints

- **Mobile:** < 480px
- **Tablet:** 480px - 768px
- **Desktop:** > 768px

---

## 🔄 Next Steps

1. ✅ Setup is complete
2. Test signup functionality:
   - Enter username, email, password
   - Click "Sign Up"
   - Check backend console for success
3. When ready, create Login page
4. Integrate with TODO task management

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check connection string in .env |
| CORS error in browser | Ensure backend server is running on 5000 |
| Module not found | Run `npm install` in respective folder |
| Port 5000/5173 already in use | Change port in .env or vite.config.js |
| Form not submitting | Check browser console for errors |

---

## 📞 Support

All files are ready to use. Just follow the installation steps above!
