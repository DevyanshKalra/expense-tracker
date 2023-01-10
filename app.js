const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
//connection of database.
const mongoose = require("mongoose");
MongoDbURL = process.env.MONGODB_URL;
mongoose.connect(MongoDbURL);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log("Database is Ready.... ");
});

app.use(express.json({ limit: "100mb" }));


app.get('/', (req, res) => {
  res.send("hello world!")
})

//user routes
app.use("/api/users", require("./src/routes/userRoutes"));

//trxn routes
app.use("/api/trxn", require("./src/routes/trxnRoutes"));

//split routes
app.use("/api/trxn/split", require("./src/routes/splitRoutes"));

app.listen(port, () => {
  console.log(`Your app listening at port ${port}`);
});