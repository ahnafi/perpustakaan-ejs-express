const express = require("express");
const methodOverride = require("method-override");
require("./utils/db");
const modelBuku = require("./model/buku");
// start express
const app = express();
const port = 3000;
// setup method overide
app.use(methodOverride("_method"));
// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// code
// homepage
app.get("/", (req, res) => {
  res.render("home", {
    title: "homepage",
  });
});
// about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
  });
});
// list book
app.get("/list", async (req, res) => {
  const search = req.query.judul;
  if (search) {
    const books = await modelBuku.find({ judul: search });
    res.render("listbook", {
      title: "list book page",
      books,
    });
  } else {
    // jika tidak di cari maka tampilkan
    const books = await modelBuku.find();
    res.render("listbook", {
      title: "list book page",
      books,
    });
  }
});

// add book
app.get("/list/add", async (req, res) => {
  res.render("addBook", {
    title: "add book",
  });
});
// add process
app.post("/list", (req, res) => {
  modelBuku.insertMany(req.body);
  res.redirect("/list");
});
// edit
app.get("/list/edit/:id", async (req, res) => {
  const book = await modelBuku.findOne({ _id: req.params.id });
  res.render("editBook", {
    title: "edit buku",
    book,
  });
});
// proces edit
app.put("/list", (req, res) => {
  modelBuku
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          judul: req.body.judul,
          penulis: req.body.penulis,
          genre: req.body.genre,
          terbit: req.body.terbit,
          sinopsis: req.body.sinopsis,
        },
      }
    )
    .then(() => res.redirect(`/list/${req.body.id}`));
});

// delete buku
app.delete("/list", (req, res) => {
  modelBuku.deleteOne({ _id: req.body.id }).then(() => {
    res.redirect("/list");
  });
});

// details buku
app.get("/list/:id", async (req, res) => {
  const book = await modelBuku.findOne({ _id: req.params.id });
  res.render("details", {
    title: "details book page",
    book,
  });
});

// listening express
app.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`);
});
