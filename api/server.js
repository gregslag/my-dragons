require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

const port = 3333;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});