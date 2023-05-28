require('dotenv').config();
const ShoppingCartModel = require('./model');
const ProductModel = require('../Product/model');
const mongoose = require('mongoose');

describe('ShoppingCartModel', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await ShoppingCartModel.model.deleteMany();
    await ProductModel.model.deleteMany();
  });

  it('ShoppingCartModel: Create New Cart', async () => {
    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    expect(createdCart).toBeDefined();
    expect(createdCart.total).toBe(cartData.total);
    // expect(createdCart.items).toBe([]);
  });

  it('ShoppingCartModel: Find Cart By Id', async () => {
    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart).toBeDefined();
    expect(foundCart._id).toEqual(createdCart._id);
    expect(foundCart.total).toBe(createdCart.total);
  });

  it('ShoppingCartModel: Delete Cart By Id', async () => {
    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Delete the cart by its ID
    await ShoppingCartModel.deleteById(createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart).toBeNull();
  });

  // it('ShoppingCartModel: Get Cart With Product Details', async () => {

  //   // Create Product

  //   const productData = {
  //     name: 'Test Product',
  //     price: 10.99,
  //     description: 'This is a test product',
  //   };

  //   const createdProduct = await ProductModel.create(productData);

  //   // Create Cart

  //   const cartData = {
  //     total: 0.00
  //   };

  //   const createdCart = await ShoppingCartModel.create(cartData);

  //   // Attempt Add Item

  //   await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);

  //   const foundCart = await ShoppingCartModel.getCartById(createdCart._id);

  //   console.log(foundCart);
  //   expect(foundCart.total).toBe(productData.price);
  // })

  it('ShoppingCartModel: Add Item', async () => {

    // Create Product

    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart.total).toBe(productData.price);
  })

  it('ShoppingCartModel: Add Same Item', async () => {

    // Create Product

    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart.total).toBe(productData.price * 2);
  })

  it('ShoppingCartModel: Remove Item', async () => {

    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.removeItem(createdProduct._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart.total).toBe(0);
    expect(foundCart.items.length).toBe(0);
  })

  it('ShoppingCartModel: Add Two Items AND Remove Item One', async () => {

    const productData1 = {
      name: 'Test Product',
      price: 8.00,
      description: 'This is a test product',
    };

    const productData2 = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct1 = await ProductModel.create(productData1);
    const createdProduct2 = await ProductModel.create(productData2);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct1._id, createdCart._id);
    await ShoppingCartModel.addItem(createdProduct2._id, createdCart._id);
    await ShoppingCartModel.removeItem(createdProduct1._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart.total).toBe(createdProduct2.price);
    expect(foundCart.items.length).toBe(1);
  })

  it('ShoppingCartModel: Increase Item', async () => {

    // Create Product

    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.increaseItem(createdProduct._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart.total).toBe(productData.price * 2);
  })

  it('ShoppingCartModel: Decrease Item', async () => {

    // Create Product

    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.increaseItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.decreaseItem(createdProduct._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    expect(foundCart.total).toBe(productData.price);
  })

  it('ShoppingCartModel: Decrease Item to Zero', async () => {

    // Create Product

    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    // Create Cart

    const cartData = {
      total: 0.00
    };

    const createdCart = await ShoppingCartModel.create(cartData);

    // Attempt Add Item

    await ShoppingCartModel.addItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.increaseItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.decreaseItem(createdProduct._id, createdCart._id);
    await ShoppingCartModel.decreaseItem(createdProduct._id, createdCart._id);

    const foundCart = await ShoppingCartModel.findById(createdCart._id);

    const result = foundCart.items;

    expect(result.length).toBe(0);
    expect(foundCart.total).toBe(0);
  })
});
