const CommentController = require('../controller/Comment')
const CommentValidators = require('../controller/validators/Comments')


module.exports = (router) => router
    .get(CommentController.getCommentsOnPost)
    .post(CommentValidators.addComment, CommentController.writeComments)
