const mongoose = require("mongoose");
require("../utils/db");

const bukuSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  penulis: { type: String, required: true },
  genre: { type: String, required: true },
  terbit: { type: String, required: true },
  sinopsis: { type: String },
});

const modelBuku = mongoose.model("buku", bukuSchema);

module.exports = modelBuku;

// add

// const buku1 = new modelBuku({
//   judul:"aaaaaaa",
//   penulis:"asasas",
//   genre:"maic",
//   terbit:"2022"
// })
// buku1.save().then((a)=>console.log(a))
