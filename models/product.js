const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    displayName: {
        type: String
    },
    categoryId: {
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Schema.Types.Date
    },
    totalRating: {
        type: Schema.Types.Number
    },
    price: {
        type: Schema.Types.Number
    }
})

module.exports = mongoose.model('Product', productSchema);