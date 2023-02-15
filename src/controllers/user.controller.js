import { uuid as v4 } from 'uuid'
import db from '../models/index.model'
import appConfig from '../configs/app.config'
import logger from '../configs/logger.config'
import ApplicationError from '../utils/error.util'

const User = db.users

const createUser = async (req, res, next) => {
  const { protocol, method, hostname, originalUrl } = req
  const headers = { ...req.headers }
  const metaData = { protocol, method, hostname, originalUrl, headers }
  logger.info(`Requesting ${method} ${protocol}://${hostname}${originalUrl}`, {
    metaData,
  })

  // Create new user
  const getUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  })
}

export { createUser }
