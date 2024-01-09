import express from 'express'
import db from '../models/index.model.js'
import {
  createUser,
  fetchUserData,
  updateUserData,
  deleteUserData,
} from '../controllers/user.controller.js'
import authToken from '../middlewares/auth.js'

const User = db.users
const router = express.Router()

const auth = authToken(User)
router.post('/v1/account', createUser)
router.get('/v1/account/:id', auth, fetchUserData)
router.put('/v1/account/:id', auth, updateUserData)
router.delete('/v1/account/:id', auth, deleteUserData)

export { router as userRoute }
