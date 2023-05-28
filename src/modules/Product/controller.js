const ProductModel = require("./model");

function productController(app) {

    app.get('/products/', async (req, res) => {
        try{
            const products = await ProductModel.find({});
        
            res.json({
                products
            })
        }catch(err) {
            res.json(err)
        }

    });

    app.post('/product/', async (req, res) => {

        try{
            const {
                name, description, price
            } = req.body;

            const product = await ProductModel.create({
                name, description, price
            });
        
            res.json({
                product
            })
        }catch(err) {
            res.json(err)
        }


    });

}

module.exports = productController;