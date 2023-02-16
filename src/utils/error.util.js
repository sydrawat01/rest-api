import responseCodes from '../constants/httpResponseCodes'

class HTTPError extends Error {
  constructor({ message, name, statusCode, data }) {
    super(message)
    this.name = name
    this.statusCode = statusCode
    this.data = data
    Error.captureStackTrace(this, HTTPError)
  }
}

class UnknownError extends HTTPError {
  constructor(message = 'Unknown Error', data) {
    super({
      message,
      name: 'UnknownError',
      statusCode: responseCodes.UNKNOWN_ERROR,
      data,
    })
  }
}

// Predefined 4xx error handler utils
class BadRequestError extends HTTPError {
  constructor(message = 'Bad Request', data) {
    super({
      message,
      name: 'HTTPBadRequest',
      statusCode: responseCodes.BAD_REQUEST,
      data,
    })
  }
}

class UnauthorizedError extends HTTPError {
  constructor(message = 'Unauthorized', data) {
    super({
      message,
      name: 'Unauthorized',
      statusCode: responseCodes.UNAUTHORIZED,
      data,
    })
  }
}

class ForbiddenError extends HTTPError {
  constructor(message = 'Forbidden', data) {
    super({
      message,
      name: 'Forbidden',
      statusCode: responseCodes.FORBIDDEN,
      data,
    })
  }
}

class ResourceNotFoundError extends HTTPError {
  constructor(message = 'Not Found', data) {
    super({
      message,
      name: 'HTTPResourceNotFound',
      statusCode: responseCodes.RESOURCE_NOT_FOUND,
      data,
    })
  }
}

// Predefined 5xx error handler utils
class InternalServerError extends HTTPError {
  constructor(message = 'Internal Server Error', data) {
    super({
      message,
      name: 'HTTPInternalServerError',
      statusCode: responseCodes.INTERNAL_SERVER_ERROR,
      data,
    })
  }
}

class BadGatewayError extends HTTPError {
  constructor(message = 'Bad Gateway Error', data) {
    super({
      message,
      name: 'BadGateway',
      statusCode: responseCodes.BAD_GATEWAY,
      data,
    })
  }
}

class ServiceUnavailableError extends HTTPError {
  constructor(message = 'Service Unavailable Error', data) {
    super({
      message,
      name: 'ServiceUnavailable',
      statusCode: responseCodes.SERVICE_UNAVAILABLE,
      data,
    })
  }
}

class GatewayTimeoutError extends HTTPError {
  constructor(message = 'Gateway Timeout Error', data) {
    super({
      message,
      name: 'GatewayTimeout',
      statusCode: responseCodes.GATEWAY_TIMEOUT,
      data,
    })
  }
}

// Handle common Sequelize errors
class SequelizeUniqueConstraintError extends HTTPError {
  constructor(message = 'Sequelize Unique Constraint Error', data) {
    super({
      message,
      name: 'SequelizeUniqueConstraintError',
      statusCode: responseCodes.BAD_REQUEST,
      data,
    })
  }
}

class SequelizeValidationError extends HTTPError {
  constructor(message = 'Sequelize Validation Error', data) {
    super({
      message,
      name: 'SequelizeValidationError',
      statusCode: responseCodes.BAD_REQUEST,
      data,
    })
  }
}

class SequelizeDatabaseError extends HTTPError {
  constructor(message = 'Sequelize Database Error', data) {
    super({
      message,
      name: 'SequelizeDatabaseError',
      statusCode: responseCodes.INTERNAL_SERVER_ERROR,
      data,
    })
  }
}

export {
  HTTPError,
  UnknownError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ResourceNotFoundError,
  InternalServerError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
  SequelizeUniqueConstraintError,
  SequelizeValidationError,
  SequelizeDatabaseError,
}
