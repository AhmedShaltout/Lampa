//user schema in the database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema({
    EMAIL : {
        type: String,
        unique: true,
        index: true
    },
    PASSWORD : String
});



module.exports = mongoose.model('user',user_schema,'users');
