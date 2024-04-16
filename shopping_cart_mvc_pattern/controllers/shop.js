const ProductModel = require("../models/product");
const CartModel = require("../models/cart");
const products = require("../data/products.json");

exports.getProducts = (req, res, next) => {
  // after it completely reads all products, the callback render the products.
  ProductModel.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: "Product Detail",
      path: "products",
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    CartModel.addProduct(prodId, product.price);
  });
  res.redirect("/cart")
};

exports.getIndex = (req, res, next) => {
  ProductModel.fetchAll((product) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkOut",
    pageTitle: "CheckOut",
  });
};
