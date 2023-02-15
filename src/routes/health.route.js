import express from 'express'
import { health } from '../controllers/health.controller'
import { BadRequestError } from '../utils/error.util'

const router = express.Router()

router.get('/', health)
router.get('/health', health)
router.get('/books', (req, res, next) => {
  try {
    throw new BadRequestError('Please enter your fname and lname')
  } catch (err) {
    next(err)
  }
})

export { router as healthRoute }
