// import required module and controller
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

// create express application
const app = express();

// set view engine and views dir
app.set('view engine', 'ejs');
app.set('views', 'views');

// import and use routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.urlencoded({ extended: false })); // Parse incoming request bodies
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public dir
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
