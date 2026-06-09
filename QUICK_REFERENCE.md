# Quick Reference Guide - TODO App

## Quick Setup Checklist

### Prerequisites
- [ ] Node.js installed (v14+)
- [ ] MongoDB setup (local or Atlas)
- [ ] Code editor ready
- [ ] Terminal/PowerShell ready

### Backend Quick Setup
```bash
cd backend
npm install express mongoose cors dotenv nodemon
```

**package.json scripts to add:**
```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

### Frontend Quick Setup
```bash
cd frontend
npm install axios
```

---

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## Component File Checklist

### Backend Files
- [ ] `server.js` - Express server setup
- [ ] `config/db.js` - MongoDB connection
- [ ] `models/Task.js` - Mongoose schema
- [ ] `controllers/taskController.js` - Business logic
- [ ] `routes/taskRoutes.js` - API routes
- [ ] `.env` - Environment variables

### Frontend Components
- [ ] `App.jsx` - Main app component
- [ ] `components/Header.jsx`
- [ ] `components/TaskForm.jsx`
- [ ] `components/TaskList.jsx`
- [ ] `components/TaskItem.jsx`

### CSS Files
- [ ] `styles/App.css`
- [ ] `styles/TaskForm.css`
- [ ] `styles/TaskList.css`
- [ ] `styles/TaskItem.css`

---

## Development Commands

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## Task Document Structure
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Key Points to Remember

1. **CORS**: Enable CORS in Express for frontend-backend communication
2. **Environment Variables**: Store sensitive data in `.env` file
3. **Validation**: Validate inputs on both frontend and backend
4. **Error Handling**: Implement try-catch and middleware error handling
5. **Responsiveness**: Use flexbox and media queries for mobile-first design
6. **State Management**: Use React hooks (useState, useEffect)
7. **API Calls**: Use axios with async/await
8. **Database**: Ensure MongoDB is running before starting backend

---

## Ports
- Backend: `5000`
- Frontend (Vite): `5173`
- Frontend (CRA): `3000`
- MongoDB: `27017` (local)

---

For detailed instructions, see `PROJECT_INSTRUCTIONS.md`
