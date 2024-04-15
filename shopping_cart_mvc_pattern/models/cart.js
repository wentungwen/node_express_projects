const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename));

module.exports = class Cart {
  static addProduct(id) {
    // fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JDON.parse(fileContent);
      }
    });
    const existingProduct = cart.products.find((prod) => prod.id === id);
    let updatedProduct;
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty += 1;
    } else {
      updatedProduct = { id: id, qty: 1 };
    }
  }
};
