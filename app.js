import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import appConfig from './src/configs/app.config'
import { healthRoute, userRoute } from './src/routes/index.routes'
import logger from './src/configs/logger.config'
import db from './src/models/index.model'
import { errorHandler } from './src/middlewares/errorHandler'

const app = express()
const { HOSTNAME, PORT, ENVIRONMENT } = appConfig
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// MIDDLEWARES
app.use('/', healthRoute, userRoute)

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

if (ENVIRONMENT === 'test' || ENVIRONMENT === 'dev') {
  db.testConnection()
  db.sequelize.sync()
}
app.listen(PORT, () => {
  if (ENVIRONMENT !== 'prod')
    logger.info(`Server running at http://${HOSTNAME}:${PORT}`)
})

export default app
