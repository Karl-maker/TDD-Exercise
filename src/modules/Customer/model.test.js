require('dotenv').config();
const CustomerModel = require('./model');
const mongoose = require('mongoose');

describe('CustomerModel', () => {
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
    await CustomerModel.model.deleteMany();
  });

  it('CustomerModel: Create New Customer', async () => {
    const customerData = {
      first_name: 'Karl',
      last_name: 'Bailey',
      email: 'kjb@gmail.com',
    };

    const createdcustomer = await CustomerModel.create(customerData);

    expect(createdcustomer).toBeDefined();
    expect(createdcustomer.first_name).toBe(customerData.first_name);
    expect(createdcustomer.last_name).toBe(customerData.last_name);
    expect(createdcustomer.email).toBe(customerData.email);
    expect(createdcustomer.shopping_cart).toBeDefined();
  });

  it('CustomerModel: Find Customer By Id', async () => {
    const customerData = {
        first_name: 'Karl',
        last_name: 'Bailey',
        email: 'kjb@gmail.com',
      };

    const createdCustomer = await CustomerModel.create(customerData);

    const foundCustomer = await CustomerModel.findById(createdCustomer._id);

    expect(foundCustomer).toBeDefined();
    expect(foundCustomer._id).toEqual(createdCustomer._id);
    expect(foundCustomer.first_name).toBe(createdCustomer.first_name);
    expect(foundCustomer.last_name).toBe(createdCustomer.last_name);
    expect(foundCustomer.email).toBe(createdCustomer.email);
  });

  it('CustomerModel: Delete By Id', async () => {
    const customerData = {
        first_name: 'Karl',
        last_name: 'Bailey',
        email: 'kjb@gmail.com',
      };

    const createdCustomer = await CustomerModel.create(customerData);
  
    // Delete the product by its ID
    await CustomerModel.deleteById(createdCustomer._id);
  
    // Attempt to find the deleted product
    const foundCustomer = await CustomerModel.findById(createdCustomer._id);
  
    // Assertions
    expect(foundCustomer).toBeNull(); // Expect the product to be null (not found)
  });

});
