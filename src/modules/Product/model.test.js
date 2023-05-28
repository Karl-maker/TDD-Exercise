require('dotenv').config();
const ProductModel = require('./model');
const mongoose = require('mongoose');

describe('ProductModel', () => {
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
    await ProductModel.model.deleteMany();
  });

  it('ProductModel: Create New Product', async () => {
    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    expect(createdProduct).toBeDefined();
    expect(createdProduct.name).toBe(productData.name);
    expect(createdProduct.price).toBe(productData.price);
    expect(createdProduct.description).toBe(productData.description);
  });

  it('ProductModel: Find Product By Id', async () => {
    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };

    const createdProduct = await ProductModel.create(productData);

    const foundProduct = await ProductModel.findById(createdProduct._id);

    expect(foundProduct).toBeDefined();
    expect(foundProduct._id).toEqual(createdProduct._id);
    expect(foundProduct.name).toBe(productData.name);
    expect(foundProduct.price).toBe(productData.price);
    expect(foundProduct.description).toBe(productData.description);
  });

  it('ProductModel: Delete By Id', async () => {
    const productData = {
      name: 'Test Product',
      price: 10.99,
      description: 'This is a test product',
    };
  
    // Create a new product
    const createdProduct = await ProductModel.create(productData);
  
    // Delete the product by its ID
    await ProductModel.deleteById(createdProduct._id);
  
    // Attempt to find the deleted product
    const foundProduct = await ProductModel.findById(createdProduct._id);
  
    // Assertions
    expect(foundProduct).toBeNull(); // Expect the product to be null (not found)
  });

});
