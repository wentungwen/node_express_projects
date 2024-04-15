const fs = require("fs");
const path = require("path");

// define the path to the products.json file
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    (this.title = title),
      (this.imageUrl = imageUrl),
      (this.description = description),
      (this.price = price);
  }
  // method to save products to file
  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  // static: access static methods directly on the class without creating an instance.
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  // it gets all products => finds a product => finds it, then pass it into a cb => cb can run with this attr
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
