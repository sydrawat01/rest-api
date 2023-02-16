import express from 'express'
import db from '../models/index.model'
import {
  createUser,
  fetchUserData,
  updateUserData,
} from '../controllers/user.controller'
import authToken from '../middlewares/auth'

const User = db.users
const router = express.Router()

const auth = authToken(User)
router.post('/v1/account', createUser)
router.get('/v1/account/:id', auth, fetchUserData)
router.put('/v1/account/:id', auth, updateUserData)

export { router as userRoute }
