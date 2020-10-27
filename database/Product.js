const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://postgres:pineapple@localhost:5432/product`, {
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false
  }
});

const Product = sequelize.define('list', {
  // attributes
  title: {
    type: Sequelize.STRING
  },
  brand: {
    type: Sequelize.STRING
  },
  department: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageurl: {
    type: Sequelize.STRING
  },
  producturl: {
    type: Sequelize.STRING
  }
  }, {
  // options
  tableName: 'list'
  });



module.exports = Product;
