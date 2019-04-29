const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Form = new Schema({
    form_description: {
        type: String
    }
});

module.exports = mongoose.model('Form', Form);
