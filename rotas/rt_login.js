const rt = require('express').Router();
const bodyParser = require('body-parser');

const ucd = bodyParser.urlencoded({ extended: false });
const { json } = require('express');
const ex = require('express');

const az = ex();
az.use(ex.json());

const lta = [];

rt.get('/login', ucd, (req, res) => {
  req.naruto = 'Sasuke';
  function apg() {
    lta.length = 0;
  }

  async function getClientes() {
    try {
      await apg();
      await req.db
        .collection('User')
        .find()
        .sort({ nome: 1 })
        .forEach((cs) => {
          lta.push(cs);
        });

      //----------------------------------------------
      res.render('login', {
        natax: lta,
        nataxo: req.naruto,
      });

      res.status(200);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: 'could not fetch Data' });
    }
  }

  getClientes();
});

rt.get('/reg', ucd, (req, res) => {
  let lta = [];

  req.ddb
    .collection('User')
    .find({})
    .sort({ nome: 1 })
    .forEach((d) => {
      lta.push(d.nome);
    })

    .then((e) => {
      res.render('resgisto', {
        natax: lta,
      });
    })
    .catch((e) => {
      res.status(500).json({ error: 'Sistema Em Manutencao v0.2' });
    });
});

rt.post('/reg', ucd, (req, res) => {
  let lta = [];

  req.db
    .collection('User')
    .insertOne({
      nome: `${req.body.user}`,
      role: 'user',
      pass: `${req.body.pass}`,
    })
    .then((resul) => {
      //res.status(201).json(resul);
      res.redirect('/login');
    })
    .catch((err) => {
      res.status(500).json({ erro: 'Falha na coneccao!' });
    });
});

rt.post('/login', ucd, (req, res) => {
  //  req.cnr = req.body.user;
  //console.log("--------------Cnr_aqui--------------");
  console.log(req.body);
  //console.log(req.user+": [base_User]");
  // console.log("--------------Final--------------");
  const us = lta.find((el) => {
    return (
      el.nome.toLowerCase() == req.body.user.toLowerCase() &&
      el.pass == req.body.pass
    );
  });

  if (us == undefined) {
    res.redirect('/login');
  } else {
    req.app.locals.user = { pass: us.pass, nome: us.nome, role: us.role };
    console.log(JSON.stringify(req.app.locals.user) + ': [base_User]');
    //console.log("[Usuario]:"+JSON.stringify(us));
    //res.send(JSON.stringify(us));

    res.redirect('/user');
  }

  //console.log("Rspo: "+req.body)
});

module.exports = rt;
