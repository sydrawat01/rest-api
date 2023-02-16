import appConfig from '../configs/app.config'
import logger from '../configs/logger.config'

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500
  const errMessage = err.message || 'Something went wrong'
  const meta = { err: err.name }
  if (appConfig.ENVIRONMENT === 'dev') {
    res.status(errStatus).json({
      error: err.name,
      message: errMessage,
      data: err.data,
      stack: err.stack,
    })
  } else {
    res.status(errStatus).json(meta)
  }
  logger.error(errMessage, meta)
}
