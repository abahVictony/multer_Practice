const router = require('express').Router();

const { addProduct, getOneProduct, getAllProducts, updateProduct, deleteProduct } = require('../controller/productController');
const uploads = require('../middleware/multer');

router.post('/newProduct', uploads.single('productImage'), addProduct)
router.get('/oneProduct', getOneProduct)
router.get('/allProduct', getAllProducts)
router.patch('/updateProduct', uploads.single('productImage'), updateProduct)
router.patch('/deleteProduct', deleteProduct)

module.exports = router