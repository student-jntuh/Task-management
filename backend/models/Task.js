import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)
