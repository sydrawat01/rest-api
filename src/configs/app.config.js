import 'dotenv/config'

const { ENVIRONMENT, HOSTNAME, DBUSER, DBPASSWORD, PORT, DATABASE } =
  process.env

const appConfig = {
  ENVIRONMENT,
  HOSTNAME,
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  PORT,
  DB: DATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
}

export default appConfig
