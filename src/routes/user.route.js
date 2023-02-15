import express from 'express'
// import logger from '../configs/logger.config'
import db from '../models/index.model'
import { createUser } from '../controllers/user.controller'

const User = db.users
const router = express.Router()

router.post('/v1/account', createUser)

export { router as userRoute }
