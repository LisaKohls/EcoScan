import { Router } from 'express'
import { User, IUser } from '../models/userModel'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    const userExists = await User.findOne({ username })
    if (userExists) return res.status(400).send('User already exists.')
    const user = new User({ username, password })
    await user.save()

    res.status(201).send('User registered.')
  } catch (error) {
    res.status(500).send('Server error.')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user: IUser | null = await User.findOne({ username })
    if (!user) return res.status(400).send('Invalid username or password.')

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).send('Invalid username or password.')

    const token = jwt.sign({ _id: user._id }, JWT_SECRET)
    res.header('x-auth-token', token).send('Logged in.')
  } catch (error) {
    res.status(500).send('Server error.')
  }
})

router.get('/protected', authMiddleware, (_req, res) => {
  res.send('Protected content.')
})

export default router
