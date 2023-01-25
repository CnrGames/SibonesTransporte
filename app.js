const { json } = require('express');
const ex = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const path = require('path');

const bc = require('body-parser');
const { check, validationResult } = require('express-validator');
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');

const ucd = bodyParser.urlencoded({ extended: false });
const az = ex();
const port = process.env.PORT || 3000;
az.use(ex.json());

//Vars
az.locals.usa = 'combushk';

//Rotas
const login_R = require('./rotas/rt_login');
const adm_R = require('./rotas/rt_admin');
const user_R = require('./rotas/rt_user')('sutra!!!', az, ucd);

//View
az.set('view engine', 'ejs');

//Admin
az.use(ex.static(path.join(__dirname, 'Media', 'Telas')));
az.use(ex.static(path.join(__dirname, 'Media', 'Fronts', 'user')));
az.use(ex.static(path.join(__dirname, 'Media', 'Fronts', 'login')));
az.use(ex.static(path.join(__dirname, 'Media', 'Telas', 'tudooo')));

//Funcoes
// db connection
let db;
let ddb;
function DbStart(req, res, next) {
  connectToDb((err) => {
    if (!err) {
      //console.log("Login... Loaded");
      db = getDb();
      req.db = db;
      ddb = getDb();
      req.ddb = ddb;
      next();
    } else {
      res.send('Em manutencao');
    }
  });
}
//Dados
function seDados(req, res, next) {
  // req.mk = "Blindado";
  if (req.user == null) {
    req.user;
  }
  req.id;
  // console.log("Dado....Loaded");
  //console.log(req.originalUrl);
  next();
}
//Funcoes Basicas
az.use(seDados);

//az.use(DbStart);
let nome;
///Paginas Final
let userId = '';

az.use(login_R);

az.use(adm_R);
az.use(user_R);

function getNomes(req, res, next) {
  //console.log(req.cnr+"oi");
  next();
  return;
}

az.listen(port, (req, res) => {
  console.log('Fecthing db....');
});
