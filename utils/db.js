const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/latihan")
  .then(() => console.log("db connect"))
  .catch((e) => console.log(e));
