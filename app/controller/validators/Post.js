const { check, validationResult, body } = require('express-validator');

module.exports.addPost = [
    body('post')
        .not().isEmpty(),
    async (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() })
        }
        next()
    }
]