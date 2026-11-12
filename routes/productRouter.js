const router = require('express').Router();

const { addProduct } = require('../controller/productController');
const uploads = require('../middleware/multer');

router.post('/newProduct', uploads.single('productImage'), addProduct)

module.exports = router