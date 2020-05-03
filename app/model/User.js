const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.methods.comparePasswords = function(attempt){
       this.password == attempt
}

module.exports = moongose.model("Users", UserSchema)
