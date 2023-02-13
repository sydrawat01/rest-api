import { createLogger, format, transports } from 'winston'
import appRootPath from 'app-root-path'

const { combine, timestamp, printf, splat } = format

const myFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${
    meta ? JSON.stringify(meta) : ''
  }`
})

const logger = createLogger({
  format: combine(timestamp(), splat(), myFormat),
  transports: [
    new transports.File({ filename: `${appRootPath}/logs/api.log` }),
    new transports.Console(),
  ],
})

export default logger
