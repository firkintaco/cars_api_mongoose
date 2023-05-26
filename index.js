const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

// Middleware
app.use(bodyParser.json());
app.use("/", routes);

const startServer = async (port, mongo_address) => {
  await mongoose.connect(mongo_address);
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
};
startServer(3000, process.env.MONGO_URI);
