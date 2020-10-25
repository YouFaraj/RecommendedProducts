const faker = require('faker');
const fs = require('fs');
const file = fs.createWriteStream('./data/products_data.csv');
file.write('id,title,brand,dept,price,imageurl,producturl' + '\n');

var brands = [];
var departments = [];
var data = '';


// generates depts and brands
const brandsAndDepts = function() {
  for (let i = 0; i < 1000000; i++) {
    brands.push(faker.name.firstName());
    departments.push(faker.name.firstName());
  }
}

function writeTwentyMillionTimes(writer) {
  brandsAndDepts();
  let i = 20000000;
  let chunk = 1000;
  let max = i;
  write();
  function write() {
    let ok = true;
    console.log(`Function call with ${i} of ${max}`);
    do {
      i--;

      ///// data gen /////
      id = max - i;
      data += `${id},"${faker.commerce.productName()}","${brands[ Math.floor( Math.random() * brands.length ) ]}","${departments[ Math.floor( Math.random() * departments.length ) ]}",${Number(faker.commerce.price(0, 100)) - Math.ceil(Math.random() * 5) / 100},"${faker.image.imageUrl()}","/${Math.floor(Math.random() * 100 % 100 + 1)}"\n`
      ////////////////////
      if (i === 0) {
        // Last time!
        writer.write(data);
      } else if (i % chunk === 0) {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        console.log(`${i} of ${max}`);
        ok = writer.write(data);
        data = '';
      }
    } while (i >= 0 && ok);
    if (i >= 0) {
      // Had to stop early!
      // Write some more once it drains.
      console.log('########## waiting for the drain event ############')
      writer.once('drain', write);
    }
  }
}

console.time('load');
writeTwentyMillionTimes(file);
console.timeEnd('load')




// \copy list (id, title, brand, department, price, imageurl, producturl) FROM '/Users/yousiffaraj/Desktop/git_tutorial/Mini-apps/recommendedProducts/data/products_data.csv' DELIMITER ',' CSV HEADER

// create table list (id integer, title varchar(255), brand varchar(255), department varchar(255), price integer, imageUrl varchar(255), productUrl varchar(255))

