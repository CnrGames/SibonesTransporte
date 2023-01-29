const rt = require('express').Router();
const { json } = require('express');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const ex = require('express');
const ucd = bodyParser.urlencoded({ extended: false });

const az = ex();
az.use(ex.json());

///Funcoes
//Documentos
function docQ(n) {
  let msg = '';

  switch (n) {
    case 'Machibombo':
      msg = 'comboio';
      break;
    case 'comboio':
      msg = 'comboio';
      break;
    case 'Caixa aberta':
      msg = 'Caixa aberta';
      break;
  }

  return msg;
}

//Dados
let curLst = [];
let docR = [];

let txtPesquisa = '';
let txdfunCategor = '';
let txdTipo = '';

let txctg = '';
let txemp = '';
let telaId = '';

let tmn = 0;

let perPage = 3;
let pagina = 0;
let paginaTotal = 0;
let p = '';
/////--------------------Admin

function getDate(inputD) {
  let ndata = '';
  let nrs = [];
  nrs = inputD.split('-');
  if (nrs.length > 0) {
    let dia = parseInt(nrs[1]);

    if (dia < 10) {
      nrs[1] = `${nrs[1]}`.substring(1);
    }

    nrs[0] = `${nrs[0]}`.substring(2);
    ndata += nrs[2] + '/';
    ndata += nrs[1] + '/';
    ndata += nrs[0];
  }
  return ndata;
}

//Funcoes
function dbQuerries(req) {
  //pag
  //categ
  /*
  if (req.query.c != null && req.query.c.length > 0) {
    console.log('TUdo');

    switch (req.query.c) {
      case 'rl':
        eraFuncategor = 'Relatorio';
        break;

      case 'pcm':
        eraFuncategor = 'Pagamento de Cmpostos';
        break;

      case 'pc':
        eraFuncategor = 'Processos Correntes';
        break;

      case 'pt':
        eraFuncategor = 'Pendentes';
        break;
    }
  }*/
  //?id=someID&product=bag

  if (req.query.t != null && req.query.t.length > 0) {
    switch (req.query.t) {
      case 'users':
        telaId = 'users';
        break;

      case 'reg':
        telaId = 'reg';
        break;

      case 'doc':
        telaId = 'doc';
        break;
    }
  }
}

function convQuerries(vari, inpot) {
  let outp;
  //pag
  //categ
  //?id=someID&product=bag

  switch (inpot) {
    case 'doc':
      switch (vari) {
        case 'Relatorio de Contas':
          outp = 'rl';
          break;

        case 'Pagamento de Cmpostos':
          outp = 'pcm';
          break;

        case 'Processos Correntes':
          outp = 'pc';
          break;

        case 'Pendentes':
          outp = 'pt';

          break;
      }
      break;
    case 'tela':
      switch (vari) {
        case 'em':
          outp = 'em';
          break;

        case 'reg':
          outp = 'reg';
          break;

        case 'doc':
          outp = 'doc';
          break;
      }
      break;
  }

  return outp;
}

function redirecionar(res) {
  if (txdfunCategor.length > 0 && telaId.length <= 0) {
    return res.redirect('/admin' + `?c=${convQuerries(txdfunCategor, 'doc')}`);
  } else if (telaId.length > 0 && txdfunCategor.length <= 0) {
    return res.redirect('/admin' + `?t=${convQuerries(telaId, 'tela')}`);
  } else if (telaId.length > 0 && txdfunCategor.length > 0) {
    return res.redirect(
      '/admin' +
        `?c=${convQuerries(txdfunCategor, 'doc')}&t=${convQuerries(
          telaId,
          'tela'
        )}`
    );
  }
}

function apbi(data) {
  let beta = {
    destino: `${data.destino}`,
    hora_partida: `${data.horap}`,
    duracao: `${data.durac}`,
    autocarro: `${data.autoc}`,
    lotacao: parseInt(data.lotac),
    valor: `${data.preco}`,
    b_restante: parseInt(data.vagas),
    data: `${data.datasp}`,
  };

  let betaf = {};

  for (let x = 0; x < Object.keys(beta).length; x++) {
    //if (beta[bf].value != undefined && beta[bf].value.toString().length > 0) {
    if (
      Object.values(beta)[x].toString().toLowerCase() != 'undefined' &&
      Object.values(beta)[x].toString().toLowerCase() != 'nan' &&
      Object.values(beta)[x].toString().length > 0
    ) {
      betaf[Object.keys(beta)[x]] = Object.values(beta)[x];
    }

    //   console.log(betaf);
  }

  console.log(betaf);

  return betaf;
}

function apbii(data) {
  let beta = {
    autocarro: `${data.autoType}`,
    destino: `${data.dest}`,
  };

  let betaf = {};

  for (let x = 0; x < Object.keys(beta).length; x++) {
    //if (beta[bf].value != undefined && beta[bf].value.toString().length > 0) {
    if (
      Object.values(beta)[x].toString().toLowerCase() != 'undefined' &&
      Object.values(beta)[x].toString().toLowerCase() != 'nan' &&
      Object.values(beta)[x].toString().length > 0
    ) {
      if (Object.values(beta)[x].toString().toLowerCase() == 'todos') {
      } else {
        betaf[Object.keys(beta)[x]] = Object.values(beta)[x];
      }
    }

    //   console.log(betaf);
  }

  console.log(betaf);

  return betaf;
}

function getDocs(req, res, redir) {
  docR.length = 0;
  req.ddb
    .collection('Bilhetes')
    .find(p)
    .sort({ destino: 1 })
    .collation({ locale: 'en', caseLevel: true })
    .skip(pagina * perPage)
    .limit(perPage)
    .forEach((d) => {
      docR.push(d);
    })
    .then(() => {
      //console.log('aa '+tmn);
      return req.ddb
        .collection('Bilhetes')
        .countDocuments(p)
        .then((e) => {
          tmn = e;
          paginaTotal = parseInt(tmn / perPage);
          if (perPage == paginaTotal) {
            paginaTotal--;
          }
          console.log('Testeeee:' + tmn);
        });
      //console.log('bb '+tmn);
    })
    .then((e) => {
      if (redir == 'y') {
        redirecionar(res);
        res.status(200);
      }
    })
    .catch((e) => {
      res
        .status(500)
        .json({ error: 'erro', ish: req.body, tama: tmn, erra: e });
    });
}

//
rt.get('/admin', ucd, (req, res) => {
  req.url = req.url + `?id=cn`;
  dbQuerries(req);
  let nomey = req.query.nome || 'nada';
  let apld = req.query.apelido || 'nadax';

  console.log(req.app.locals.user);
  curLst.length = 0;
  if (req.app.locals.user != undefined || req.app.locals.user != null) {
    if (req.app.locals.user.role == 'adm') {
      if (telaId == '') {
        telaId = 'users';
      }
      let tipoBilhete = docQ(req.body.autoType);
      if (req.body.pg == undefined || req.body.pg == '') {
        req.body.pg = 'users';
      }

      if (docR.length > 0) {
        docR.length = 0;
        req.ddb
          .collection('Bilhetes')
          .find(p)
          .sort({ destino: 1 })
          .collation({ locale: 'en', caseLevel: true })
          .skip(pagina * perPage)
          .limit(perPage)
          .forEach((d) => {
            docR.push(d);
          })
          .then(() => {
            //console.log('aa '+tmn);
            return req.ddb
              .collection('Bilhetes')
              .countDocuments(p)
              .then((e) => {
                tmn = e;
                paginaTotal = parseInt(tmn / perPage);
                if (perPage == paginaTotal) {
                  paginaTotal--;
                }
                console.log('Testeeee:' + tmn);
              });
            //console.log('bb '+tmn);
          });
      }

      //inuyasha
      req.db
        .collection('User')
        .find()
        .sort({ nome: 1 })
        .forEach((cs) => curLst.push(cs))
        .then(() => {
          //console.log("T actual: "+tmn);
          //----------------------------------------------
          res.render('adminFront', {
            natax: curLst,
            ps: txtPesquisa,
            fctg: txdfunCategor,
            ftype: txdTipo,
            docs: docR,
            emp: txemp,
            pg: telaId,
            qtotal: paginaTotal,
            ipag: pagina,
            //pg
          });
          res.status(200);
        })

        .catch(() => {
          res.status(500).json({ err: 'could not pD ' });
        });
    } else {
      res.redirect('/user');
    }
  } else {
    res.redirect('/login');
  }
});

///Get all Users
rt.post('/admin', ucd, (req, res) => {
  const emp = req.body;
  tipoBilhete = docQ(req.body.autoType);
  //Mod txtctg
  txtPesquisa = req.body.pesq;
  txdfunCategor = req.body.autoType;
  txdTipo = req.body.dest;
  txctg = tipoBilhete;
  txemp = req.body.dest;
  telaId = req.body.pg;
  let customData = '';
  pagina = 0;

  console.log(JSON.stringify(req.body));

  let autoCar = '';

  if (req.body.pg == undefined || req.body.pg == '') {
    req.body.pg = 'users';
  }
  if (req.body.pesq == undefined) {
    req.body.pesq = '';
  }

  function pesquisa(n) {
    if (req.body.pesq == '' && req.body.autoType.length <= 0) {
      console.log('a');
      return {};
    } else if (
      req.body.pesq.length > 0 &&
      req.body.autoType.length > 0 &&
      req.body.autoType == 'Todos'
    ) {
      console.log('be');
      customData = getDate(req.body.pesq);
      return { data: `${customData}` };
    } else if (
      req.body.pesq.length == 0 &&
      req.body.autoType.length > 0 &&
      req.body.autoType == 'Todos'
    ) {
      console.log('no Pesq');

      return {};
    } else if (req.body.pesq == '' && req.body.autoType.length > 0) {
      console.log('b');

      return { autocarro: `${req.body.autoType}` };
    } else if (req.body.pesq.length > 0 && req.body.autoType.length > 0) {
      console.log('b');

      return { autocarro: `${req.body.autoType}` };
    } else if (
      req.body.pesq != '' &&
      req.body.pesq != null &&
      req.body.dest.length > 0
    ) {
      console.log('c');

      return { data: `${req.body.pesq}`, destino: `${req.body.autoType}` };
    } else {
      console.log('d');

      return { data: `${req.body.pesq}` };
    }
  }
  p = apbii(req.body);

  getDocs(req, res, 'y');
});

//Redirection

rt.post('/add/url', ucd, (req, res) => {
  console.log(JSON.stringify(req.body));

  telaId = req.body.pagi;
  redirecionar(res);
});

//Deletar Ticket
rt.post('/dell/bilhete', ucd, (req, res) => {
  const tick = req.body;
  if (ObjectId.isValid(tick.tickId)) {
    req.db
      .collection('Bilhetes')
      .deleteOne({ _id: ObjectId(`${tick.tickId}`) })
      .then((resul) => {
        //res.sendStatus(tick.tickId);
        ///Fast Update Dos Dados

        docR.length = 0;
        req.ddb
          .collection('Bilhetes')
          .find(p)
          .sort({ destino: 1 })
          .collation({ locale: 'en', caseLevel: true })
          .skip(pagina * perPage)
          .limit(perPage)
          .forEach((d) => {
            docR.push(d);
          })
          .then(() => {
            //console.log('aa '+tmn);
            return req.ddb
              .collection('Bilhetes')
              .countDocuments(p)
              .then((e) => {
                tmn = e;
                paginaTotal = parseInt(tmn / perPage);
                if (perPage == paginaTotal) {
                  paginaTotal--;
                }
              });
            //console.log('bb '+tmn);
          })
          .then((e) => {
            res.redirect('/admin?t=doc');
          })
          .catch((e) => {
            res.status(500).json({ error: 'Dado nao encontrado' });
          });
      })
      .catch((err) => {
        res.status(500).json({ erro: 'Estamos em manutencao!' });
      });
  } else {
    res.send('Bilhete inexistente');
  }
});

//Update Ticket
rt.post('/upa/bilhete', ucd, (req, res) => {
  const tick = req.body.tickId;
  let pb = apbi(req.body);
  console.log('ticket: ' + tick);
  //res.send(p);
  if (ObjectId.isValid(tick)) {
    req.db
      .collection('Bilhetes')
      .updateOne(
        { _id: ObjectId(tick) },
        {
          $set: pb,
        }
      )
      .then((resul) => {
        ///Fast Update Dos Dados

        docR.length = 0;
        req.ddb
          .collection('Bilhetes')
          .find(p)
          .sort({ destino: 1 })
          .collation({ locale: 'en', caseLevel: true })
          .skip(pagina * perPage)
          .limit(perPage)
          .forEach((d) => {
            docR.push(d);
          })
          .then(() => {
            //console.log('aa '+tmn);
            return req.ddb
              .collection('Bilhetes')
              .countDocuments(p)
              .then((e) => {
                tmn = e;
                paginaTotal = parseInt(tmn / perPage);
                if (perPage == paginaTotal) {
                  paginaTotal--;
                }
              });
            //console.log('bb '+tmn);
          })
          .then((e) => {
            res.redirect('/admin?t=doc');
          })
          .catch((e) => {
            res.status(500).json({ error: 'Dado nao encontrado' });
          });

        //res.status(201).json(resul);
      })
      .catch((err) => {
        res.status(500).json({ erro: 'Falha na Actualizacao!' });
      });
  } else {
    res.send('Bilhete inexistente');
  }
});

///Register Bilhete

rt.post('/add/bilhete', ucd, (req, res) => {
  const emp = req.body;

  req.db
    .collection('Bilhetes')
    .insertOne({
      destino: `${req.body.destino}`,
      hora_partida: `${req.body.horap}`,
      duracao: `${req.body.durac}`,
      autocarro: `${req.body.autoc}`,
      lotacao: parseInt(req.body.lotac),
      valor: parseInt(`${req.body.preco}`),
      b_restante: parseInt(req.body.vagas),
      data: `${req.body.datasp}`,
    })
    .then((resul) => {
      //res.status(201).json(resul);
      res.redirect('/admin');
    })
    .catch((err) => {
      res.status(500).json({ erro: 'Falha na coneccao!' });
    });
});

rt.post('/add/nego', ucd, (req, res) => {
  const emp = req.body;

  //cnrGames
  req.db
    .collection('comp')
    .insertOne({
      nome: `${req.body.nomez}`,
      nuit: `${req.body.nuitx}`,
    })
    .then((resul) => {
      res.redirect('/admin');
    })
    .catch((err) => {
      res.status(500).json({ erro: 'Falha na coneccao!' });
    });
});

//Next Tickets
rt.post('/add/back', ucd, (req, res) => {
  if (docR.length > 0) {
    if (pagina > 0) {
      pagina--;
    }
    getDocs(req, res, '');
    redirecionar(res);
  } else {
    res.redirect('/admin?t=doc');
  }
});

rt.post('/add/next', ucd, (req, res) => {
  if (docR.length > 0) {
    if (pagina <= paginaTotal - 1) {
      pagina++;
    }
    getDocs(req, res, '');
    redirecionar(res);
  } else {
    res.redirect('/admin?t=doc');
  }
});

module.exports = rt;
