import logger from '../configs/logger.config.js'
import appConfig from '../configs/app.config.js'

const health = (req, res) => {
  const { protocol, method, hostname, originalUrl } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(
    `Requesting ${method} ${protocol}://${hostname}${originalUrl}`,
    metaData
  )
  res.sendStatus(200).json()
}

export { health }
