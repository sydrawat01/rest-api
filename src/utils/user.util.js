import logger from '../configs/logger.config.js'

import {
  BadRequestError,
  ResourceNotFoundError,
  ForbiddenError,
  SequelizeUniqueConstraintError,
  SequelizeValidationError,
  SequelizeDatabaseError,
  UnknownError,
} from './error.util.js'

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
 * Validate the ID passed in the request parameter
 * @param {*} id the unique user id (uuid)
 */
const validateUserID = (id) => {
  const validUserID =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
      id
    )
  if (!validUserID) {
    const message = 'The user ID is invalid'
    throw new ForbiddenError(message)
  }
}

/**
 * Verify that the user exists in the database
 * @param {*} user the user object stored in the database
 */
const verifyUserInDB = (user) => {
  if (user === null) {
    const message = 'User not found in the database'
    throw new ResourceNotFoundError(message)
  }
  return true
}

/**
 * Custom function to validate the request body
 * @param {*} req the request body
 */
const validateRequestBody = (req) => {
  // Validation for ID, account_created and account_updated fields
  if (req.body.id || req.body.account_created || req.body.account_updated) {
    const message =
      'ID, account_created and account_updated fields cannot be sent in the request body'
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
    throw new BadRequestError(message)
  }
}

const validateUpdateRequest = (req, username) => {
  // Validation for ID, username, account_created and account_updated fields
  if (
    req.body.id ||
    req.body.account_created ||
    req.body.account_updated ||
    req.body.username
  ) {
    const message =
      'ID, username, account_created and account_updated fields cannot be sent in the request body'
    throw new BadRequestError(message)
  }
  // Null check for first_name, last_name and password
  if (!(req.body.first_name || req.body.last_name || req.body.password)) {
    const message = 'password, first_name and last_name are required'
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
      throw new SequelizeUniqueConstraintError(message)
    case 'SequelizeValidationError':
      message =
        'Invalid username, username should be an email Ex: username@mailserver.domain'
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
      throw new UnknownError(message, err)
  }
}

export {
  formatUserData,
  validateRequestBody,
  handleDBErrors,
  verifyUserInDB,
  validateUserID,
  validateUpdateRequest,
}
