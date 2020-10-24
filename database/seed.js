const faker = require('faker');
const fs = require('fs');

var id = -1;
var brands = [];
var departments = [];

// generate ids
const idGenerator = function() {
  id = id + 1;
  return id;
}

// generates depts and brands
const brandsAndDepts = function() {
  for (let i = 0; i < 1000000; i++) {
    brands.push(faker.name.firstName());
    departments.push(faker.name.firstName());
  }
}

// the records bellow follow this schema :
// id,title,brand,department,price,imageUrl,productUrl
const generateRecords = function(num) {
var records = ``
  for(let i = 0; i < num; i++){
      records += `
          ${idGenerator()},"${faker.commerce.productName()}","${brands[ Math.floor( Math.random() * brands.length ) ]}","${departments[ Math.floor( Math.random() * departments.length ) ]}",${Number(faker.commerce.price(0, 100)) - Math.ceil(Math.random() * 5) / 100},"${faker.image.imageUrl()}","/${Math.floor(Math.random() * 100 % 100 + 1)}"`
      }
  return records;
};

// creates a file if none exists and appends to it the records
const writeRecords = function(num){
  const records = generateRecords(num);
  fs.appendFileSync('./data/products_data.csv', records, (err) => {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('example data file has been written');
      }
  });
}


const seed = function() {
  brandsAndDepts()
      fs.appendFileSync('./data/products_data.csv', 'id,title,brand,department,price,imageurl,producturl', (err) => {
        if (err) {
          console.log('error:', err);
        } else {
          console.log('example data file has been written');
        }
    });

  for(let i = 0; i < 2000; i++){
    writeRecords(10000)
    console.log(`${id} of 20 million done`)
  }
}

seed()




// \copy list (id, title, brand, department, price, imageurl, producturl) FROM '/Users/yousiffaraj/Desktop/git_tutorial/Mini-apps/recommendedProducts/data/products_data.csv' DELIMITER ',' CSV HEADER

// create table list (id integer, title varchar(255), brand varchar(255), department varchar(255), price integer, imageUrl varchar(255), productUrl varchar(255))

