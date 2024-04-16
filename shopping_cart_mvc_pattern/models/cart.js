const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename));

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JDON.parse(fileContent);
      }
    });

    // analyse the cart and find the existing product
    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;

    // add new product & increase quantity
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty += 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + productPrice;
    fs.writeFile(p, JSON.stringify(cart), (err) => {
      console.log(err );
    });
  }
};
