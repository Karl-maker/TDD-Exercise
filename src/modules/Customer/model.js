const mongoose = require('mongoose');
const BaseModel = require('../Base/model');
const ShoppingCartModel = require("../ShoppingCart/model");
const { Schema } = mongoose;

const customerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  shopping_cart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart' },
});

const Customer = mongoose.model('Customer', customerSchema);

class CustomerModel extends BaseModel {
    constructor() {
      super(customerSchema);
    }

    async checkout(id){
      const customer = await this.model.findById(id);

      const cart = await ShoppingCartModel.findById(customer.shopping_cart);

      const total = cart.total;

      cart.total = 0.00;
      cart.items = [];
      await cart.save()

      console.log(`${customer.first_name} paid $${total}`);
      return {
        message: `${customer.first_name} paid $${total}`
      }
    }
  
    // @override create

    async create(data) {
        const cart = await ShoppingCartModel.create({
            total: 0.00
        })
        const customer = await this.model.create({ 
            ...data,
            shopping_cart: cart._id
        });

        return customer;
    }
}

module.exports = new CustomerModel();