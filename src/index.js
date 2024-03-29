const express = require("express");
const app = express();
const path = require('path');
const pug = require("pug");
const routeAdmin = require('./routes/admin/index');
const route = require("./routes/client/index");
const ConnectDb = require('./config/db/index');
const systemConfig = require('./config/system');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');
require('dotenv').config();

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, '..', 'node_modules', 'tinymce')));

// Using Flash (Showing alert)
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Using Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Using Method Override 
app.use(methodOverride('_method'));

// Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Connect to Db 
ConnectDb();

// Using template engine Pug 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up static middleware first
app.use(express.static(path.join(__dirname, '/public')));

// Then set up routes
routeAdmin(app);
route(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});