const ShoppingCartModel = require("./model");

function shoppingCartController(app) {

    app.get('/cart/:cart_id', async (req, res) => {

        try{
        const shopping_cart = await ShoppingCartModel.findById(req.params.cart_id);
        
            res.json({
                shopping_cart
            })
        }catch(err) {
            res.json(err)
        }
 
    });

    app.post('/cart/:cart_id/item/:item_id', async (req, res) => {
        try{
            const shopping_cart = await ShoppingCartModel.addItem(
                req.params.item_id,
                req.params.cart_id
            );
        
            res.json({
                shopping_cart
            })
        }catch(err) {
            res.json(err)
        }

    });

    app.delete('/cart/:cart_id/item/:item_id', async (req, res) => {

        try{
            const shopping_cart = await ShoppingCartModel.removeItem(
                req.params.item_id,
                req.params.cart_id
            );
        
            res.json({
                shopping_cart
            })
        }catch(err) {
            res.json(err)
        }

    });

    app.post('/cart/:cart_id/item-quantity/:item_id', async (req, res) => {

        try{
            const shopping_cart = await ShoppingCartModel.increaseItem(
                req.params.item_id,
                req.params.cart_id
            );
        
            res.json({
                shopping_cart
            })
        }catch(err) {
            res.json(err)
        }

    });

    app.delete('/cart/:cart_id/item-quantity/:item_id', async (req, res) => {

        try{
            const shopping_cart = await ShoppingCartModel.decreaseItem(
                req.params.item_id,
                req.params.cart_id
            );
        
            res.json({
                shopping_cart
            })
        }catch(err) {
            res.json(err)
        }


    });

}

module.exports = shoppingCartController;