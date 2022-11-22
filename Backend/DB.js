const mongoose  = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect('mongodb://localhost:27017/administration' , ()=>{
        console.log('connected to database')
    })
}

module.exports = connectDatabase;