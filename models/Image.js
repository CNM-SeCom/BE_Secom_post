const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    id: String,
    uri : String,
});

module.exports = mongoose.model('Image', ImageSchema);