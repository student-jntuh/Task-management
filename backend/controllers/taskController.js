import Task from '../models/Task.js'

export const createTask = async (req, res) => {
  try {
    const { username, text } = req.body

    if (!username || !text) {
      return res.status(400).json({ message: 'Username and task text are required' })
    }

    const task = await Task.create({ username, text })
    return res.status(201).json(task)
  } catch (error) {
    console.error('Create task error:', error)
    return res.status(500).json({ message: error.message || 'Server error while creating task' })
  }
}

export const getTasks = async (req, res) => {
  try {
    const username = req.query.username
    const filter = username ? { username } : {}
    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    return res.status(200).json(tasks)
  } catch (error) {
    console.error('Get tasks error:', error)
    return res.status(500).json({ message: error.message || 'Server error while fetching tasks' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Task deleted' })
  } catch (error) {
    console.error('Delete task error:', error)
    return res.status(500).json({ message: error.message || 'Server error while deleting task' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const task = await Task.findByIdAndUpdate(id, updates, { new: true })
    return res.status(200).json(task)
  } catch (error) {
    console.error('Update task error:', error)
    return res.status(500).json({ message: error.message || 'Server error while updating task' })
  }
}
