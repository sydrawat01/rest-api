import bcrypt from 'bcrypt'

/**
 * getUserPassword() method is used to extract the username and password from the request header
 * @param {*} authHeader the request header from the end-user
 * @returns the end-user's username and password
 */
const getUserPassword = (authHeader) => {
  const decodeBasicToken = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString('ascii')
    .split(':')
  const username = decodeBasicToken[0]
  const password = decodeBasicToken[1]
  return { username, password }
}

/**
 * hashPassword() method generates a unique salt that is used to hash the user's password
 * @param {*} password the end-user's password
 * @returns the hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

/**
 * comparePassword() method compares the password and the hashed password
 * @param {*} password the user's password
 * @param {*} hashedPassword hashed password stored in the DB by generating a random salt
 * @returns boolean : true/false if the passwords match
 */
const comparePassword = async (password, hashedPassword) => {
  const checkPassword = await bcrypt.compare(password, hashedPassword)
  return checkPassword
}

export { getUserPassword, hashPassword, comparePassword }
