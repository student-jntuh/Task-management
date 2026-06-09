import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] })

    if (user) {
      // If the same user (matching both username and email) provided the same password,
      // treat it as already registered and prompt to login instead of creating a duplicate.
      if (user.username === username && user.email === email) {
        // Need password for comparison; fetch with password selected
        const existing = await User.findById(user._id).select('+password')
        const isMatch = existing && (await existing.matchPassword(password))
        if (isMatch) {
          return res.status(200).json({ message: 'You are already registered, please login' })
        }
      }

      return res.status(400).json({ 
        message: user.email === email ? 'Email already exists' : 'Username already exists'
      })
    }

    // Create new user
    user = await User.create({
      username,
      email,
      password
    })

    // Generate token
    const token = generateToken(user._id)

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ 
      message: error.message || 'Server error during signup'
    })
  }
}

// Login Controller (for future use)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' })
    }

    // Check if user exists by username
    const user = await User.findOne({ username }).select('+password')

    if (!user) {
      return res.status(404).json({ message: 'Unregistered username. Create an account.' })
    }

    // Check password
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user._id)

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ 
      message: error.message || 'Server error during login'
    })
  }
}
