import { v4 } from 'uuid'
import db from '../models/index.model'
import logger from '../configs/logger.config'
import { hashPassword } from '../utils/auth.util'
import formatUserData, {
  handleDBErrors,
  validateRequestBody,
} from '../utils/user.util'
import {} from '../utils/error.util'

const User = db.users

const createUser = async (req, res, next) => {
  const { protocol, method, hostname, originalUrl } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(`Requesting ${method} ${protocol}://${hostname}${originalUrl}`, {
    metaData,
  })
  logger.info(
    `Hashing password for user ${req.body.first_name} ${req.body.last_name}`
  )
  const hash = await hashPassword(req.body.password)
  try {
    validateRequestBody(req)
    // Create new user
    try {
      const getUser = await User.findOne({
        where: {
          username: req.body.username,
        },
      })
      const user = User.build({
        id: v4(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hash,
        account_created: new Date(),
        account_updated: new Date(),
      })
      // Storing the user in the database
      logger.info(`Storing user-data in the database`)
      const data = await user.save()
      const formattedData = formatUserData(data.dataValues)
      logger.info(`Successfully stored user-data in the database`)
      return res.status(201).json(formattedData)
    } catch (err) {
      handleDBErrors(err, req)
    }
  } catch (err) {
    next(err)
  }
}

export { createUser }
