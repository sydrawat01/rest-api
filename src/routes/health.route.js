import express from 'express'
import { health } from '../controllers/health.controller.js'

const router = express.Router()

router.get('/', health)
router.get('/health', health)

export { router as healthRoute }
