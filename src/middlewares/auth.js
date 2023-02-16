import { getUserPassword, comparePassword } from '../utils/auth.util'
import { UnauthorizedError } from '../utils/error.util'

export default (User) => {
  const authToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    let message = ''
    try {
      // Missing authorization header
      if (!authHeader) {
        message = 'Missing authorization header'
        throw new UnauthorizedError(message)
      }
      // Check authorization header
      const { username, password } = getUserPassword(authHeader)
      // Check user in the database
      const user = await User.findOne({
        where: {
          username,
        },
      })
      // Check for valid username
      if (!user) {
        message = `Invalid username`
        throw new UnauthorizedError(message)
      }
      // Match passwords
      const passwordMatch = await comparePassword(password, user.password)
      if (!passwordMatch) {
        message = `Password for ${username} does not match`
        throw new UnauthorizedError(message)
      }
      req.user = user
      global.username = user.username
      next()
    } catch (err) {
      next(err)
    }
  }
  return authToken
}
