const jwt = require('jsonwebtoken');
const SALT = "secret"

module.exports.createError = (errorCode, message) => { throw { errorCode: errorCode, message: message } }

module.exports.generateToken = async (user) => Promise.resolve(jwt.sign({
    id: user.id,
    username: user.username,
    name: user.name
}, SALT))

module.exports.verifyToken = (token) => jwt.verify(token,SALT)
