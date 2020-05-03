const Post = require('../model/Post')
const Comment = require('../model/Comment')
const { createError } = require('../../util/index')

module.exports.getCommentsOnPost = async (req, res) => {
        try {
                const postId = req.params.postId
                const count = parseInt(req.query.count || 30)
                const page = parseInt(req.query.page || 1)

                const postExists = await Post.exists({ _id: postId })
                if (!postExists) createError(404, "No Post Found")
                const [comments, err] = await Comment.find({ postId: postId })
                        .select("-__v -postId")
                        .limit(count)
                        .skip((page - 1) * count)
                        .sort({ createdAt: -1 })
                        .then(comments => [comments, null]).catch(err => [null, err])

                if (err) createError(422, "Something went wrong " + err.message)
                if (!comments) createError(400, "Something went wrong " + err.message)

                res.status(200).json({ comments: comments })
        } catch (error) {
                res.status(error.errorCode || 400).json({ message: error.message })
        }

}


module.exports.writeComments = async (req, res) => {
        try {
                const postId = req.params.postId
                const comment = req.body.comment
                const [post, err] = await Post.findOne({ _id: postId }).then(post => [post, null]).catch(err => [null, err])
                if (err) createError(422, "Something went wrong " + err.message)
                if (!post) createError(404, "Post doesn't exist")

                const [savedComment, error] = await new Comment({
                        comment: comment,
                        by: post.by,
                        postId: post._id,
                        createdAt: Date.now()
                }).save().then(comment => [comment, null]).catch(err => [null, err])

                if (error) createError(422, "Error adding comment " + error.message)
                if (!savedComment) createError(400, "Something went wrong")

                res.status(201).json({ message: 'Comment saved' })
        } catch (error) {
                res.status(error.errorCode || 400).json({ message: error.message })
        }



}