import express from 'express'
import handleNewUser from '../controllers/auth/registerController'
import handleLogin from '../controllers/auth/loginController'
import handleLogout from '../controllers/auth/logoutController'
import handleRefreshToken from '../controllers/auth/refresh-tokenController'

const router = express.Router()

router.post('/register', handleNewUser)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)
router.get('/refresh', handleRefreshToken)

export default router
