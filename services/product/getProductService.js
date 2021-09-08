const Product = require('../../models/product');

module.exports = async (req, res) => {
    const products = await Product.find({});
    products !== null ? res.json(products) : res.sendStatus(404);
}