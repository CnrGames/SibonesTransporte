const { json } = require("express");
const ex = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const az = ex();

az.use(ex.json());

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    az.listen(3000, (req, res) => {
      console.log("Fecthing db....");
    });
    db = getDb();
  }
});

//Routas

//Get varios
az.get("/comps", (req, res) => {
  let lta = [];

  db.collection("comp")
    .find()
    .sort({ nome: 1 })
    .forEach((cs) => lta.push(cs))
    .then(() => res.status(200).json(lta))

    .catch(() => {
      res.status(500).json({ err: "could not fetch Data" });
    });
});

//Get one
az.get("/comps/:id", (req, res) => {
  db.collection("comp")
    .findOne({ nome: req.params.id })
    .then((doc) => res.json(doc))
    .catch((err) => res.status(500).json({ error: "could not find comp" }));
});

//Post One

az.post("/comps", (req, res) => {
  const emp = req.body;

  db.collection("comp")
    .insertOne(emp)
    .then((resul) => {
      res.status(201).json(resul);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not Post" });
    });
});

//delete

az.delete("/comps/:id", (req, res) => {
  db.collection("comp")
    .deleteOne({ nome: req.params.id })
    .then((resu) => {
      res.status(201).json(resu);
    })
    .catch((err) => res.status(500).json({ err: "could not delete" }));
});

//Update
