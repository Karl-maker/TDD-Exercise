const mongoose = require('mongoose');

class BaseModel {
  constructor(schema) {
    this.model = mongoose.model(this.constructor.name, schema);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async find(query) {
    return await this.model.find(query);
  }

  async deleteById(_id) {
    return await this.model.deleteOne({ _id });
  }

  // Add other common methods as needed

  // You can also add instance methods and static methods specific to each model
}

module.exports = BaseModel;