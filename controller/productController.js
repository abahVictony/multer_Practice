const { Product } = require('../models')
const fs = require('fs')

exports.addProduct = async(req, res) =>{
    try {
        const { productName, price, stock } = req.body
        if (!req.file) {
         return res.status(400).json({
             message: 'Please upload a product image'
            });
        }
        const file = req.file.path

         const product = await Product.create({
            productName,
            price,
            stock,
            productImage: file
        })

        // console.log('Body:', req.body);
        // console.log('File', req.file);
        
        res.status(200).json({
            message: 'Product created successfully',
            data: product
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getAllProducts = async (req, res) =>{
   try {
     const products = await Product.findAll()

    res.status(200).json({
        message: `All products gotten successfully`,
        data: products
    })
   } catch (error) {
        res.status(500).json({message: error.message})
    
   }
}

exports.getOneProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product) {
           return  res.status(404).json({
                message: `Product nto Found`
            })
        }

        res.status(200).json({
            message: `PRoduct Gotten Successfully`,
            data: product
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const { productName, stock, price } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const data = {
            price,
            productName,
            stock
        }

        if (req.file) {
            const oldFilePath = product.productImage;
            fs.unlinkSync(oldFilePath);
            data.productImage = req.file.path
        }

        await product.update(data)

        res.status(200).json({
            message: "Product Updated",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
    });
    }

        const oldFilePath = product.productImage;
    fs.unlinkSync(oldFilePath);

    await product.destroy();

    res.status(200).json({ 
        message: 'product deleted' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};