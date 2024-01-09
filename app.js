import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import appConfig from './src/configs/app.config.js'
import { healthRoute, userRoute } from './src/routes/index.routes.js'
import logger from './src/configs/logger.config.js'
import db from './src/models/index.model.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const app = express()
const { HOSTNAME, PORT, ENVIRONMENT } = appConfig
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

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
