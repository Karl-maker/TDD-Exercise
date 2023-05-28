const CustomerModel = require("./model");

function customerController(app) {

    app.get('/customer/:customer_id', async (req, res) => {


        try{
            const customer = await CustomerModel.findById(req.params.customer_id);
        
            res.json({
                customer
            })
        }catch(err) {
            res.json(err)
        }
    });

    app.post('/customer', async (req, res) => {

        try{
            const {
                first_name, last_name, email
            } = req.body;

            const customer = await CustomerModel.create({
                first_name, last_name, email
            });
        
            res.json({
                customer
            })
        }catch(err) {
            res.json(err)
        }
    });

    app.post('/customer/:customer_id/checkout', async (req, res) => {

        try{
            const {
                customer_id
            } = req.params;

            const response = await CustomerModel.checkout(customer_id);
        
            res.json({
                response
            })
        }catch(err) {
            res.json(err)
        }

    });
}

module.exports = customerController;