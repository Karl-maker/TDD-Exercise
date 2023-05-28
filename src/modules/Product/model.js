const mongoose = require('mongoose');
const BaseModel = require('../Base/model');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

class ProductModel extends BaseModel {
  constructor() {
    super(productSchema);
  }

  // Add specific methods for the Product model if needed
}

module.exports = new ProductModel();