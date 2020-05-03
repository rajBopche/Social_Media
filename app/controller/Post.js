const Post = require('../model/Post')
const User = require('../model/User')
const { createError } = require('../../util')

const userExist = async (username) => User.findOne({ username })

module.exports.createPost = async (req, res) => {

    try {
        const user = res.user
        const post = req.body.post

        const userExistsPromise = userExist(user.username).then(user => [null, user]).catch(err => [err, null])
        const newPostPromise = new Post({
            post: post,
            by: {
                name: user.name,
                username: user.username
            }
        }).save().then(post => [null, post]).catch(err => [err, null])

        const [[userErr, userInDataBase], [postErr, savedPost]] = await Promise.all([userExistsPromise, newPostPromise])
        if (userErr || !userInDataBase) createError(500, "User does not exist by that credentials")
        if (postErr) createError(422, "Post couldn't be saved" + postErr.message)
        if (!savedPost) createError(400, "Post couldn't be saved")

        res.status(201).json({ postId: savedPost._id })

    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}

module.exports.getPosts = async (req, res) => {
    try {
        const count = parseInt(req.query.count || 30)
        const page = parseInt(req.query.page)

        const [posts, postErr] = await Post.find({})
            .select("-__v")
            .limit(count)
            .skip((page - 1) * count)
            .sort({ "date": -1 }).then(posts => [posts, null]).catch(err => [null, err])
        if (postErr) createError(422, postErr.message)
        res.status(200).json({ posts: posts })
    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}