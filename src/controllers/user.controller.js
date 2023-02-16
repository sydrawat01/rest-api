import { v4 } from 'uuid'
import db from '../models/index.model'
import logger from '../configs/logger.config'
import { hashPassword } from '../utils/auth.util'
import {
  formatUserData,
  verifyUserInDB,
  handleDBErrors,
  validateRequestBody,
  validateUserID,
} from '../utils/user.util'
import { UnauthorizedError } from '../utils/error.util'

const User = db.users

const createUser = async (req, res, next) => {
  const { protocol, method, hostname, originalUrl } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(`Requesting ${method} ${protocol}://${hostname}${originalUrl}`, {
    metaData,
  })
  // Hashing the password
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
      // Storing the user in the database)
      const data = await user.save()
      const formattedData = formatUserData(data.dataValues)
      return res.status(201).json(formattedData)
    } catch (err) {
      handleDBErrors(err, req)
    }
  } catch (err) {
    next(err)
  }
}

const fetchUserData = async (req, res, next) => {
  try {
    const { protocol, method, hostname, originalUrl } = req
    const headers = { ...req.headers }
    const metaData = { protocol, method, hostname, originalUrl, headers }
    logger.info(
      `Requesting ${method} ${protocol}://${hostname}${originalUrl}`,
      {
        metaData,
      }
    )
    // Validate user ID request parameter
    validateUserID(req.params.id)
    // Find user based on the user ID in the database
    const user = await User.findByPk(req.params.id)
    // Verify that the user exists in the database
    verifyUserInDB(user)
    const data = formatUserData(user)
    if (req.params.id === data.id && req.user.username === user.username) {
      return res.status(200).json(data)
    }
    // If a user tries to fetch another user's data
    throw new UnauthorizedError(`Unauthorized access`)
  } catch (err) {
    next(err)
  }
}

const updateUserData = async (req, res, next) => {
  const { protocol, method, hostname, originalUrl } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(`Requesting ${method} ${protocol}://${hostname}${originalUrl}`, {
    metaData,
  })

  const { user } = req
}

export { createUser, fetchUserData, updateUserData }
