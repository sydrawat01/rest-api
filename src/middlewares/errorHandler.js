import appConfig from '../configs/app.config'

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500
  const errMessage = err.message || 'Something went wrong'
  res.status(errStatus).json({
    error: err.name,
    data: err.data,
    status: errStatus,
    message: errMessage,
    stack: appConfig.ENVIRONMENT === 'dev' ? err.stack : {},
  })
}
