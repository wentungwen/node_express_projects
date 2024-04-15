const ProductModel = require("../models/product");

// controller to render the 'add product' page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

// controller to handle add product and redirect
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description

  const product = new ProductModel(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("admin/products ", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
