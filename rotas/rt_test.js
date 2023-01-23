const rt = require ('express').Router();
const { json } = require("express");

const bodyParser = require("body-parser");

const ex = require("express");
const ucd = bodyParser.urlencoded({ extended: false });


const az = ex();
az.use(ex.json());


//-----------------------[Pesquisar]-----------------------

rt.get("/test", (req, res) => {
    res.render("up");
  
    res.status(200);
  });
  
  //Home
  
rt.get("/h", ucd, (req, res) => {
    let lta = [];
    let docR = [];
  
    req.db.collection("comp")
      .find()
      .sort({ nome: 1 })
      .forEach((cs) => lta.push(cs))
      .then(() => {
        //----------------------------------------------
        res.render("nego", {
          natax: lta,
          ps: req.body.pesq,
          ctg: req.body.categ,
          fctg:req.body.dcateg,
          docs: [],
          emp: req.body.emp,
        });
  
        res.status(200);
      })
  
      .catch(() => {
        res.status(500).json({ err: "could not fetch Data" });
      });
  });
  
  //-----------------------[Pesquisar]-----------------------
  
rt.post("/h", ucd, (req, res) => {
    const emp = req.body;
  
    let lta = [];
    let docR = [];
    console.log("novo:" + req.body.pesq);
  
    if (
      req.body.pesq.split(" ").join("").length <= 0 ||
      req.body.pesq.split(" ").join("") == undefined
    ) {
      req.body.pesq = "";
    }
    function pesquisa(n) {
      if (req.body.pesq == "" && req.body.emp.length <= 0) {
        console.log("a");
        return req.body.pesq;
      } else if (req.body.pesq == "" && req.body.emp.length > 0) {
        console.log("b");
  
        return { emp: `${req.body.emp}` };
      } else if (req.body.pesq != "" && req.body.emp.length > 0) {
        console.log("c");
  
        return { tipo: `${req.body.pesq}`, emp: `${req.body.emp}` };
      } else {
        console.log("d");
  
        return { tipo: `${req.body.pesq}` };
      }
    }
    let p = pesquisa(req.body.pesq);
  
    req.db.collection("comp")
      .find()
      .sort({ nome: 1 })
      .forEach((cs) => lta.push(cs))
      .then(() => {
        return req.ddb
          .collection(`${req.body.categ}`)
          .find(p)
          .sort({ tipo: 1 })
          .collation({ locale: "en", caseLevel: true })
          .forEach((d) => docR.push(d));
      })
      .then((e) => {
        // console.log("Relatorio>> " + json());
        res.render("nego", {
          natax: lta,
          ps: req.body.pesq,
          ctg: req.body.categ,
          fctg:req.body.dcateg,
          docs: docR,
          emp: req.body.emp,
        });
  
        console.log(req.body);
        //res.send(req.body);
  
        res.status(200);
      })
  
      .catch((e) => {
        res.status(500).json(e);
      });
  
    //console.log("RelaTox:  " + json(req.body));
  
    // let { nego } = req.body;
    // console.log(nego);
  });

  //////------------------[Testes v2]--------------------------
  
//Get varios
rt.get("/comps", (req, res) => {
    let lta = [];
  
    req.db.collection("comp")
      .find()
      .sort({ nome: 1 })
      .forEach((cs) => lta.push(cs))
      .then(() => res.status(200).json(lta))
  
      .catch(() => {
        res.status(500).json({ err: "could not fetch Data" });
      });
  });
  
  //Get one
  rt.get("/comps/:id", (req, res) => {
    req.db.collection("comp")
      .findOne({ nome: req.params.id })
      .then((doc) => res.json(doc))
      .catch((err) => res.status(500).json({ error: "could not find comp" }));
  });

  module.exports = rt;