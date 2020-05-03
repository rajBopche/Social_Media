const CommentController = require('../controller/Comment')


module.exports = (router) => router
    .get(CommentController.getCommentsOnPost)
    .post(CommentController.writeComments)
