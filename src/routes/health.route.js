import express from 'express'
import health from '../controllers/health.controller'

const healthRoute = express.Router()

healthRoute.get('/', health)
healthRoute.get('/health', health)

export default healthRoute
