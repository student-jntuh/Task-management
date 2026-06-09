# TODO App - Project Instructions

## Project Overview
A full-stack TODO application with task management functionality (add, delete, view tasks) built with React.js frontend, Node.js backend, MongoDB database, and CSS styling.

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React.js, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Package Manager** | npm (Node.js) |
| **Build Tool** | Vite or Create React App (CRA) |

---

## Project Structure

```
to-doapp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── Header.jsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.css
│   │   │   └── TaskItem.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.html
│   ├── package.json
│   └── vite.config.js (if using Vite)
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

---

## Setup Requirements

### Prerequisites
1. **Node.js** (v14+ or later) - Download from [nodejs.org](https://nodejs.org)
2. **MongoDB** 
   - Option A: Local MongoDB installation
   - Option B: MongoDB Atlas (cloud) - Free tier available at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
3. **Code Editor** - VS Code recommended
4. **Git** (optional, for version control)

### Installation Steps

#### Step 1: Initialize Project Structure
```bash
# From d:\to-doapp directory
mkdir frontend backend
cd frontend
npm create vite@latest . -- --template react
# OR use Create React App: npx create-react-app .

cd ../backend
npm init -y
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install express mongoose cors dotenv nodemon
npm install --save-dev nodemon  # For auto-restart during development
```

#### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install axios  # For API calls
```

---

## Database Schema

### MongoDB Collections

#### Task Collection
```javascript
{
  _id: ObjectId (auto-generated),
  title: String (required, max 200 characters),
  description: String (optional, max 500 characters),
  completed: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

**Example Document:**
```json
{
  "_id": "6123456789abcdef01234567",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

## Backend API Endpoints

### Base URL: `http://localhost:5000/api/tasks`

#### 1. GET All Tasks
- **Endpoint:** `GET /api/tasks`
- **Description:** Retrieve all tasks
- **Response:**
  ```json
  [
    {
      "_id": "id1",
      "title": "Task 1",
      "description": "Description 1",
      "completed": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
  ```
- **Status Code:** 200 OK

#### 2. GET Single Task
- **Endpoint:** `GET /api/tasks/:id`
- **Description:** Retrieve a single task by ID
- **Response:** Single task object
- **Status Code:** 200 OK or 404 Not Found

#### 3. POST Create Task
- **Endpoint:** `POST /api/tasks`
- **Description:** Create a new task
- **Request Body:**
  ```json
  {
    "title": "New Task",
    "description": "Task description (optional)"
  }
  ```
- **Response:** Created task object with _id
- **Status Code:** 201 Created

#### 4. PUT Update Task
- **Endpoint:** `PUT /api/tasks/:id`
- **Description:** Update a task (mark as complete, edit title/description)
- **Request Body:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Response:** Updated task object
- **Status Code:** 200 OK

#### 5. DELETE Task
- **Endpoint:** `DELETE /api/tasks/:id`
- **Description:** Delete a task
- **Response:** 
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
- **Status Code:** 200 OK or 404 Not Found

---

## Backend Structure Details

### server.js (Entry Point)
- Initialize Express app
- Connect to MongoDB
- Define middleware (CORS, JSON parser)
- Register routes
- Start server on port 5000

### models/Task.js (Mongoose Schema)
- Define Task schema with title, description, completed, timestamps
- Create and export Task model

### controllers/taskController.js (Business Logic)
- `getTasks()` - Fetch all tasks
- `getTaskById()` - Fetch single task
- `createTask()` - Add new task
- `updateTask()` - Update existing task
- `deleteTask()` - Delete task

### routes/taskRoutes.js (API Routes)
- Map HTTP methods to controller functions
- Handle route params and validation

### config/db.js (Database Connection)
- MongoDB connection setup using mongoose
- Handle connection errors

### .env (Environment Variables)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo_db
PORT=5000
NODE_ENV=development
```

---

## Frontend Architecture

### Component Hierarchy
```
App
├── Header
├── TaskForm (Add new task)
└── TaskList
    └── TaskItem[] (Individual tasks)
```

### Key Components

#### 1. **App.jsx** (Main Component)
- Manage global state (tasks array)
- Fetch tasks on mount
- Handle API calls
- Pass props to child components

#### 2. **Header.jsx**
- Display app title
- Optional: Show task count/stats

#### 3. **TaskForm.jsx**
- Input fields (title, description)
- Add button
- Handle form submission
- Clear form after submission

#### 4. **TaskList.jsx**
- Map through tasks array
- Render TaskItem for each task
- Display empty state if no tasks

#### 5. **TaskItem.jsx**
- Display task details (title, description)
- Checkbox for marking complete/incomplete
- Delete button
- Edit functionality (optional)

### State Management
- Use `useState` hook for component state
- Use `useEffect` hook for fetching data on mount
- Use `axios` or `fetch` API for HTTP requests

### API Integration Points
- **Mount:** Fetch all tasks
- **Add Task:** POST request to `/api/tasks`
- **Delete Task:** DELETE request to `/api/tasks/:id`
- **Update Task Status:** PUT request to `/api/tasks/:id`

---

## CSS Styling Guidelines

### Color Scheme (Suggested)
```css
Primary Color: #007BFF (Blue)
Secondary Color: #6C757D (Gray)
Success Color: #28A745 (Green)
Danger Color: #DC3545 (Red)
Background: #F8F9FA (Light Gray)
Text: #212529 (Dark)
```

### CSS Files

#### App.css
- Global styles
- Container and layout
- Font definitions
- Theme variables

#### TaskForm.css
- Input field styling
- Button styling
- Form layout (flex/grid)
- Hover and focus states

#### TaskList.css
- List container styling
- Empty state styling
- Responsive grid/list layout

#### TaskItem.css
- Task card styling
- Checkbox styling
- Delete button styling
- Hover effects
- Completed task styling (strikethrough text)

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop)
- Flexbox for layout
- Media queries for responsiveness

---

## Development Workflow

### Phase 1: Backend Setup
1. Create backend folder structure
2. Install dependencies
3. Set up MongoDB connection
4. Create Task model
5. Create task controller with CRUD operations
6. Set up routes
7. Configure and start Express server
8. Test API endpoints with Postman or Thunder Client

### Phase 2: Frontend Setup
1. Create React app (Vite or CRA)
2. Install axios for API calls
3. Create component structure
4. Build individual components
5. Integrate CSS styling
6. Connect frontend to backend API
7. Test functionality in browser

### Phase 3: Integration Testing
1. Test Add Task flow
2. Test View Tasks flow
3. Test Delete Task flow
4. Test Update Task (mark complete)
5. Test error handling
6. Test responsive design

---

## Running the Application

### Backend
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
# Server runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm run dev   # For Vite
# OR
npm start     # For Create React App
# App runs on http://localhost:5173 (Vite) or http://localhost:3000 (CRA)
```

### Access the App
Open browser and navigate to frontend URL (http://localhost:5173 or http://localhost:3000)

---

## Key Features to Implement

### Minimum Viable Product (MVP)
- ✅ Add tasks with title
- ✅ Delete tasks
- ✅ View all tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Responsive design

### Optional Enhancements
- Task categories/tags
- Task priority levels
- Due dates
- Search/filter functionality
- Local storage for offline support
- Task statistics dashboard
- Edit task functionality
- Drag & drop reordering

---

## Error Handling

### Backend Error Scenarios
- Invalid request body (validation error)
- Task not found (404)
- Database connection error
- Server error (500)

### Frontend Error Scenarios
- Network/API errors
- Empty form submission
- Failed API requests
- Display user-friendly error messages

---

## Best Practices

### Backend
- Use async/await for database operations
- Validate input data before processing
- Use proper HTTP status codes
- Implement error handling middleware
- Keep controllers focused and DRY

### Frontend
- Separate concerns into components
- Use props for data flow
- Handle loading states
- Provide user feedback (success/error messages)
- Optimize re-renders

### General
- Use environment variables for configuration
- Follow naming conventions
- Add comments for complex logic
- Test features thoroughly
- Keep code organized and modular

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check connection string, ensure MongoDB is running |
| CORS errors | Ensure backend has CORS middleware configured |
| Port 5000/3000 already in use | Kill process or use different port |
| Module not found errors | Run `npm install` in respective folder |
| Components not rendering | Check import paths and component exports |

---

## Next Steps
1. Set up the project structure
2. Initialize Node.js projects
3. Install all dependencies
4. Create database and connect
5. Build backend API (start with models and controllers)
6. Create React components
7. Style with CSS
8. Test all functionality

---

**Ready to start coding?** Follow the instructions above in order, and you'll have a fully functional TODO app! 🚀
