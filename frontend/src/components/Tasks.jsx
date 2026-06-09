import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import '../styles/Tasks.css'

function Tasks() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('Guest')
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('username')
      if (stored) setUsername(stored)
    } catch (e) {
      // ignore
    }
    // fetch tasks for this user
    const fetchTasks = async (uname) => {
      try {
        const res = await api.get('/tasks', { params: { username: uname } })
        if (Array.isArray(res.data)) {
          // normalize backend _id to id for frontend convenience
          const normalized = res.data.map(t => ({ ...t, id: t._id }))
          setTasks(normalized)
        }
      } catch (e) {
        // ignore fetch errors for now
      }
    }

    const stored = localStorage.getItem('username')
    if (stored) fetchTasks(stored)

    // Warn user if they try to navigate away (browser back, arrows, etc.)
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
      return 'You have unsaved changes. Are you sure you want to leave?'
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [navigate])

  const handleAdd = () => {
    const text = taskText.trim()
    if (!text) return
    const uname = username || localStorage.getItem('username') || 'Guest'
    // persist to backend
    api.post('/tasks', { username: uname, text })
      .then(res => {
        if (res.status === 201) {
          const added = { ...res.data, id: res.data._id }
          setTasks(prev => [added, ...prev])
          setTaskText('')
        }
      })
      .catch(() => {
        // fallback local add if backend fails
        const newTask = { id: Date.now(), text, completed: false }
        setTasks(prev => [newTask, ...prev])
        setTaskText('')
      })
  }

  const handleRemove = (id) => {
    // delete from backend then update local state
    api.delete(`/tasks/${id}`)
      .then(() => setTasks(prev => prev.filter(t => t.id !== id)))
      .catch(() => setTasks(prev => prev.filter(t => t.id !== id)))
  }

  const handleToggleComplete = (id) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const updated = { completed: !task.completed }
    api.put(`/tasks/${id}`, updated)
      .then(res => {
        const updatedTask = { ...res.data, id: res.data._id }
        setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
      })
      .catch(() => {
        // fallback local toggle
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
      })
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
    } catch (e) {
      // ignore
    }
    navigate('/login')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="tasks-page">
      <header className="topbar">
        <div className="user-box">
          <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
          <div className="user-name">{username}</div>
        </div>
      </header>

      <main className="tasks-main">
        <div className="task-input-row">
          <input
            className="task-input"
            type="text"
            placeholder="What do you want to do today?"
            value={taskText}
            onChange={e => setTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="add-button" onClick={handleAdd}>Add</button>
        </div>

        <div className="tasks-list">
          {tasks.length === 0 && (
            <div className="empty">No tasks yet. Add your first task above.</div>
          )}

          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span className="task-text">{task.text}</span>
              <div className="task-actions">
                <button className="task-btn remove" onClick={() => handleRemove(task.id)}>Remove</button>
                <button className="task-btn complete" onClick={() => handleToggleComplete(task.id)}>{task.completed ? 'Undo' : 'Mark Complete'}</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="logout-footer">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </footer>
    </div>
  )
}

export default Tasks
