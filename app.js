// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const path = require("path");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "FullStack_Project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

//Partials
const viewsPath = path.join(__dirname, "views");
const partialsPath = path.join(__dirname, "views", "partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const advertRoutes = require("./routes/advert.routes");
app.use("/adverts", advertRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/cart", cartRoutes);

const messageRoutes = require("./routes/message.routes");
app.use("/", messageRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;