import 'dotenv/config'
import express from 'express'
import appConfig from './src/configs/app.config'
import healthRoute from './src/routes/index.routes'
import logger from './src/configs/logger.config'

const app = express()
const { HOSTNAME, PORT, ENVIRONMENT } = appConfig
app.use(express.json())

app.use('/', healthRoute)

app.listen(PORT, () => {
  if (ENVIRONMENT !== 'prod')
    logger.info(`Server running at http://${HOSTNAME}:${PORT}`)
})

export default app
