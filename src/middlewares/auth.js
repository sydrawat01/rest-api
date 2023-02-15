import { getUserPassword, comparePassword } from '../utils/auth.util'

export default (User, logger) => {
  const authToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      logger.warn('Missing authorization header')
      return res.status(401).json({
        message: 'Missing authorization header',
      })
    }
    next()
  }
  return authToken
}
