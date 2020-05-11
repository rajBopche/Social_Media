const User = require('../model/User')
const { createError, generateToken } = require('../../util')

const userExist = async (username) => User.findOne({ username })

module.exports.register = async (req, res) => {

    try {
        const body = req.body
        const name = body.name
        const username = body.username
        const password = body.password
        const exist = await userExist(username)
        if (exist) createError(409, "User Already Exist")
        const [err, savedUser] = await new User({
            name: name,
            username: username,
            password: password
        }).save().then(user => [null, user]).catch(err => [null, err])
        if (err) createError(422, "Could not save into database" + err.message)
        if (!savedUser) createError(400, "Something went wrong")
        const token = await generateToken(savedUser)
        res.status(201).json({ token: token })
    } catch (error) {
        res.status(error.errorCode||400).json({ error: error.message })
    }
}

module.exports.login = async (req, res) => {
    try {
        const body = req.body
        const username = body.username
        const password = body.password
        const user = await userExist(username)
        if (!user) createError(404, "User Not Found")
        const correct = user.comparePasswords(password)
        if(correct === false) createError(401, "Password does not match")
        const token = await generateToken(user)
        res.status(200).json({token:token})
    } catch (error) {
        res.status(error.errorCode||400).json({ error: error.message })
    }
}