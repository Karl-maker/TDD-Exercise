// Import Mongoose and define the schema and model for the ShoppingCart
const mongoose = require('mongoose');
const BaseModel = require('../Base/model');
const ProductModel = require('../Product/model');
const { Schema } = mongoose;
require('dotenv').config();

const shoppingCartSchema = new Schema({
    items: {
        type: [
          {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
          },
        ],
        default: [],
    },
    total: { type: Number, default: 0.00 },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

class ShoppingCartModel extends BaseModel {
    constructor() {
      super(shoppingCartSchema);
    }
  
    // Add specific methods for the Product model if needed

    async addItem(item_id, cart_id) {
        try {
          const cart = await this.model.findById(cart_id);
      
          if (!cart) {
            throw new Error('Cart not found');
          }
      
          // Find the product by its ID
          const product = await ProductModel.findById(item_id);
      
          if (!product) {
            throw new Error('Product not found');
          }
      
          const existingItemIndex = cart.items.findIndex(item => item.product.toString() === item_id);

          if (existingItemIndex !== -1) {
            // If the product already exists, increase the quantity
            cart.items[existingItemIndex].quantity++;
          } else {
            // If the product doesn't exist, add it to the cart
            cart.items.push({
              product: item_id,
              quantity: 1
            });
          }
      
          // Recalculate the total
          cart.total = await this.calculateTotal(cart.items);
      
          // Save the updated cart
          await cart.save();
      
          return cart;
        } catch (error) {
          throw error;
        }
    }
      
    async removeItem(item_id, cart_id) {
        try {
            const cart = await this.model.findById(cart_id);
        
            if (!cart) {
              throw new Error('Cart not found');
            }
        
            // Find the product by its ID
            const product = await ProductModel.findById(item_id);
        
            if (!product) {
              throw new Error('Product not found');
            }

            const existingItemIndex = cart.items.findIndex(item => item.product.toString() === item_id.toString());

            if (existingItemIndex === -1) {
                throw new Error('Product not found in cart');
            } else {
              // If the product doesn't exist, add it to the cart
              cart.items.splice(existingItemIndex, 1);
            }
        
            // Recalculate the total
            cart.total = await this.calculateTotal(cart.items);
        
            // Save the updated cart
            await cart.save();
        
            return cart;
          } catch (error) {
            throw error;
          }
    }

    async increaseItem(item_id, cart_id) {
        try {
            const cart = await this.model.findById(cart_id);
        
            if (!cart) {
              throw new Error('Cart not found');
            }
        
            // Find the product by its ID
            const product = await ProductModel.findById(item_id);
        
            if (!product) {
              throw new Error('Product not found');
            }
        
            const existingItemIndex = cart.items.findIndex(item => item.product.toString() === item_id.toString());

            if (existingItemIndex === -1) {
                throw new Error('Product not found in cart');
            } else {
              // If the product doesn't exist, add it to the cart
              cart.items[existingItemIndex].quantity++;
            }
        
            // Recalculate the total
            cart.total = await this.calculateTotal(cart.items);
        
            // Save the updated cart
            await cart.save();
        
            return cart;
          } catch (error) {
            throw error;
          }
    }

    async decreaseItem(item_id, cart_id) {
        try {
            const cart = await this.model.findById(cart_id);
        
            if (!cart) {
              throw new Error('Cart not found');
            }
        
            // Find the product by its ID
            const product = await ProductModel.findById(item_id);
        
            if (!product) {
              throw new Error('Product not found');
            }
        
            const existingItemIndex = cart.items.findIndex(item => item.product.toString() === item_id.toString());

            if (existingItemIndex === -1) {
                throw new Error('Product not found in cart');
            } else {
                cart.items[existingItemIndex].quantity--;
                
                if(cart.items[existingItemIndex].quantity <= 0) cart.items.splice(existingItemIndex, 1);
                  
            }
        
            // Recalculate the total
            cart.total = await this.calculateTotal(cart.items);
        
            // Save the updated cart
            await cart.save();
        
            return cart;
          } catch (error) {
            throw error;
          }
    }

    async calculateTotal(items) {
        let total = 0.00;
      
        for (const { product, quantity } of items) {
          if (product && quantity) {
            const item = await ProductModel.findById(product);
            const itemTotal = item.price * quantity;
            total += itemTotal;
          }
        }
      
        return total;
      }

      // NOT USED
      async getCartById(id) {

        const pipeline = [
            {
                $match: { _id: id }
            },
            {
                $unwind: '$items'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $group: {
                    _id: '$_id',
                    items: { $push: { product: '$product', quantity: '$items.quantity' } },
                    total: { $first: '$total' }
                }
            },
            {
                $project: {
                    _id: 1,
                    items: 1,
                    total: 1,
                    products: '$items.product'
                }
            }
        ];
        return await this.model.aggregate(pipeline);
    }
      
}

module.exports = new ShoppingCartModel();
