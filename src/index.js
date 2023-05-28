require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform further operations
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create Express.js app
const app = express();

app.use(express.json()); // Add JSON parsing middleware

// Define routes
// ...


require("./modules/ShoppingCart/controller")(app);
require("./modules/Product/controller")(app);
require("./modules/Customer/controller")(app);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});