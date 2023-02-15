import logger from '../configs/logger.config'
import {
  BadRequestError,
  SequelizeUniqueConstraintError,
  SequelizeValidationError,
  SequelizeDatabaseError,
  UnknownError,
} from './error.util'

/**
 * Format the user data after storing in database to be displayed
 * in the response object
 * @param {*} user the user data object
 * @returns formatted user data object
 */
const formatUserData = (user) => {
  const {
    id,
    first_name,
    last_name,
    username,
    account_created,
    account_updated,
  } = user
  const data = {
    id,
    first_name,
    last_name,
    username,
    account_created,
    account_updated,
  }
  return data
}

/**
 * Custom function to validate the request body
 * @param {*} req the request body
 */
const validateRequestBody = (req) => {
  // Validation for ID, account_created and account_updated fields
  logger.info(`Validating request body for user object`)
  if (req.body.id || req.body.account_created || req.body.account_updated) {
    const message =
      'id, account_created and account_updated fields cannot be sent in the request body'
    logger.error(`Invalid request body for user object`, { message })
    throw new BadRequestError(message)
  }
  // Null check validation for username, password, first_name and last_name
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.first_name ||
    !req.body.last_name
  ) {
    const message =
      'username, password, first_name, last_name fields are required in the request body'
    logger.error(`Invalid request body for user object`, { message })
    throw new BadRequestError(message)
  }
}

/**
 * Custom function to handle sequelize database errors
 * @param {*} err the error object
 * @param {*} req the request body
 */
const handleDBErrors = (err, req) => {
  // Database model constraints and validations
  let message = ''
  let data = {}
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      message = `User ${req.body.username} already exists`
      logger.error(message)
      throw new SequelizeUniqueConstraintError(message)
    case 'SequelizeValidationError':
      message =
        'Invalid username, Username should be an email Ex: username@mailserver.domain'
      logger.error(message)
      throw new SequelizeValidationError(message)
    case 'SequelizeDatabaseError':
      message = 'Please check the sequelize error codes'
      data = {
        parentErrCode: err.parent.code,
        originalErrCode: err.original.code,
      }
      throw new SequelizeDatabaseError(message, data)
    default:
      message = 'Unknown error occurred'
      logger.error(message)
      throw new UnknownError(message, err)
  }
}

export { formatUserData, validateRequestBody, handleDBErrors }
