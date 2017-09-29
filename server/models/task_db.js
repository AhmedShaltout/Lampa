//task schema in the databaase
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task_schema = new Schema({
    EMAIL : String,
    TITLE : String,
    BODY: String,
    DATE: String,
    DONE: Boolean
});


module.exports = mongoose.model('task',task_schema,'tasks');
