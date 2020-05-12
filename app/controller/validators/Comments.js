const { check, validationResult, body } = require('express-validator');

module.exports.addComment = [
    body('comment')
        .not().isEmpty(),
    async (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() })
        }
        next()
    }
]