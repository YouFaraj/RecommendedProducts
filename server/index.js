const express = require('express');
const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const sequelize = new Sequelize(`postgres://ubuntu:@3.132.216.71:5432/products`)
const Product = require('../database/Product.js')
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('newrelic');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));



sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});




//// Refactored legacy
// grabs products by dept
app.get('/products/dept/:dept', async (req, res) => {
  const formattedDept = formatName(req.params.dept);
  try {
    const product = await Product.findAll({ where: {
      department: formattedDept
    }, limit: 20
  })
    res.send({ product })
  } catch(error) {
  console.error(error)
  }
})

app.get('/products/brand/:brandName', async (req, res) => {
  // escape certain characters from request url
  var brandName = formatName(req.params.brandName);
  try {
      const product = await Product.findAll({ where: {
      brand: brandName
    }, limit: 20
  });
    res.send({ product })
  } catch(error) {
  console.error(error)
  }
})


//filters the products by min and max prices
app.get('/products/price/:minPrice&:maxPrice', async (req, res) => {
  var min = req.params.minPrice
  var max = req.params.maxPrice
  try {
    const product = await Product.findAll({
    where: {
      price: {
        [Op.between]: [min, max]
        }
      }, limit: 20
    })
    res.send({product});
  } catch(error) {
    console.error(error)
  }
})

// grabs a product by id
app.get('/products/id/:id', async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Product.findAll({
    where: {
    id: productId
    }
  })
    if(product.length > 0) {
      let deptMatch = await axios.get(`/products/dept/${product[0].dataValues.department}`);
      let brandMatch = await axios.get(`/products/brand/${product[0].dataValues.brand}`);
      let priceMatch = await axios.get(`/products/price/${Math.floor(parseInt(product[0].dataValues.price.substring(1)) * 0.9)}&${Math.floor(parseInt(product[0].dataValues.price.substring(1)) * 1.1)}`);
      const allResults = deptMatch.data.product.concat(brandMatch.data.product).concat(priceMatch.data.product);
      res.send(allResults);
    } else {
      res.status(404).send('You failed your query')
    }
  } catch(error) {
    console.error(error)
  }
})

 // changes the first letter to upper case
const formatName = (string) => {
  return string[0].toUpperCase() + string.split('').slice(1).join('');
};



//// SDC

// adds product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.send({ product: newProduct }) // Returns the new user that is created in the database
  } catch(error) {
    console.error(error)
    res.send('You Failed coach')
  }
})

// grabs a product by id
app.get('/products/id/:id', async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Product.findAll({
    where: {
    id: productId
    }
  })
    if(product.length > 0) {
      res.send({ product })
    } else {
      res.status(404).send('You failed your query')
    }
  } catch(error) {
    console.error(error)
  }
})

// updates a single item by id
app.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id
  const info = req.body;
  try {
    const product = await Product.update(
      info,
      {
      where: {
        id: productId
      }
    })
    res.send(product)
  } catch(error) {
    console.error(error)
  }
})

// deletes an item by id
app.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Product.destroy({
      where: {
        id: parseInt(productId)
      }
    })
    res.send("Deleted");
  } catch(error) {
    console.error(error)
  }
})

module.exports = app;
