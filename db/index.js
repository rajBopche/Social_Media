

const DB_URL = 'mongodb+srv://Raj:User12345%23@cluster0-nzasa.mongodb.net/test?retryWrites=true&w=majority'

const mongoose = require('mongoose');

const loadModels = ()=>{
 require('../app/model/User')
 require('../app/model/Post')
 require('../app/model/Comment')
}
module.exports = () => {
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection_error'))
    db.once('open', () => {
            console.log('Connected')
    })
    loadModels()
}

