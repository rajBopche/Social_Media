const PostController = require('../controller/Post')
const router = require('express').Router()
const PostValidators = require('../controller/validators/Post')
const { requiresAuthorization } = require('../middleware')
const Comment = require('./Comment')

router.route('/')
    .all(requiresAuthorization)
    .post(PostValidators.addPost, PostController.createPost)
    .get(PostController.getPosts)

router.route('/:postId')
    .all(requiresAuthorization)
    .get(PostController.getPost)
    .delete(PostController.deletePost)

Comment(router.route('/:postId/comments').all(requiresAuthorization))

module.exports = router

