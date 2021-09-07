const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    displayName: {
        type: String
    },
    createdAt: {
        type: Schema.Types.Date
    }
})

module.exports = mongoose.model('Category', categorySchema);