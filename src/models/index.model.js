import { Sequelize } from 'sequelize'
import appConfig from '../configs/app.config'
import logger from '../configs/logger.config'
import userModel from './user.model'

const sequelize = new Sequelize(
  appConfig.DB,
  appConfig.USER,
  appConfig.PASSWORD,
  {
    host: appConfig.HOSTNAME,
    port: 5432,
    dialect: 'postgres',
    // dialectOptions: appConfig.dialectOptions,
    logging: false,
  }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = userModel(sequelize, Sequelize)

db.testConnection = async (req, res) => {
  try {
    await sequelize.authenticate()
    logger.info(`Successfully connected to database "${appConfig.DB}"`)
  } catch (error) {
    logger.error(`Unable to connect to database "${appConfig.DB}:"`, error)
  }
}

export default db
