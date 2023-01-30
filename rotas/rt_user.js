const rt = require('express').Router();
const { ObjectId } = require('mongodb');

pdf = require('express-pdf');
const qrcode = require('qrcode');
const puppeteer = require('puppeteer');
const pdfg = require('html-pdf');
const mitemer = require('./pTemer');

function sutra(extMsg, extExpress, urlParser) {
  //console.log(ak,az.locals.usa);

  //Find Data

  function fecthar(res, req, next) {
    console.log('oi');
    return 'nada';
  }
  let tlscrn = '';
  //Doc Fetcher
  function docQF(n) {
    let msg = '';

    switch (n) {
      case 'r':
        msg = 'rela';
        break;
      case 'pgt':
        msg = 'pagamento';
        break;
      case 'pc':
        msg = 'processos';

        break;
      case 'p':
        msg = 'pendente';

        break;
    }
    return msg;
  }

  //Doc Uploader

  function docU(n) {
    let msg = '';
    switch (n) {
      case 'Relatorio de Contas':
        msg = 'rela';
        break;
      case 'Pagamento de Cmpostos':
        msg = 'pagamento';
        break;
      case 'Processos Correntes':
        msg = 'processos';

        break;
      case 'Pendentes':
        msg = 'pendente';

        break;
    }
    return msg;
  }

  //--------------------Usuarios
  let docR = [];
  let macD = { b_restante: { $gt: 0 } };
  //Imprimir
  rt.get('/recibo', urlParser, (req, res, next) => {
    let img1 = '';
    let nm = '';
    let tr = '';
    let cod = '121312A#';
    let qrImg = qrcode.toDataURL(
      `Compra do Bilhete para ${req.app.locals.destinop},efectuado com exito `,
      async function (err, url) {
        img1 = url;

        let conta = mitemer.exTemer(url);

        const options = {
          format: 'A4',
          border: {
            top: '2cm',
            right: '2cm',
            bottom: '2cm',
            left: '2cm',
          },
        };

        pdfg.create(conta, options).toBuffer((err, buffer) => {
          if (err) return res.send(err.message);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
          res.send(buffer);
        });
      }
    );

    /*
    req.app.locals.datap = listar[0].data;
    req.app.locals.destinop = listar[0].destino;
    req.app.locals.valorp = listar[0].valor;
    req.app.locals.nomep = 'Avatar';
    */
  });

  rt.get('/init', urlParser, (req, res, next) => {
    res.render('pinicial');
  });
  let tidxI = '';
  //Get users

  function apsrc(data) {
    let beta = {
      autocarro: `${data.autoType}`,
      destino: `${data.dest}`,
      data: `${data.data}`,
      b_restante: { $gt: 0 },
    };

    let betaf = {};
    let passe = false;

    if (data.tidx == 'dt') {
      betaf = {
        valor: { $gte: parseInt(data.de), $lte: parseInt(data.ate) },
        b_restante: { $gt: 0 },
      };

      /*{ b_restante: { $gt: 0 }}*/
    } else {
      for (let x = 0; x < Object.keys(beta).length; x++) {
        //if (beta[bf].value != undefined && beta[bf].value.toString().length > 0) {
        if (
          Object.values(beta)[x].toString().toLowerCase() != 'undefined' &&
          Object.values(beta)[x].toString().toLowerCase() != 'nan' &&
          Object.values(beta)[x].toString().length > 0
        ) {
          if (Object.values(beta)[x].toString().toLowerCase() == 'todos') {
            passe = true;
          } else {
            betaf[Object.keys(beta)[x]] = Object.values(beta)[x];
          }
        }

        //   console.log(betaf);
      }

      if (Object.keys(betaf).length == 1) {
        if (passe == false) {
          betaf = { border: '' };
        }
      }
    }

    console.log(betaf);
    //console.log(data);

    return betaf;
  }

  rt.get('/user', urlParser, (req, res) => {
    let lta = [];
    let nemp = req.app.locals.user;
    let dCateg = docQF(req.body.categ);
    if (req.app.locals.user != undefined) {
      if (docR.length > 0) {
        docR.length = 0;
        console.log('--------Brunox-----------');
        console.log(macD);
        req.ddb
          .collection('Bilhetes')
          .find(macD)
          .sort({ destino: 1 })
          .collation({ locale: 'en', caseLevel: true })
          .forEach((d) => {
            docR.push(d);
          });
      }

      req.db
        .collection('Bilhetes')
        .find({ b_restante: { $gt: 0 } })
        .sort({ destino: 1 })
        .forEach((cs) => lta.push(cs))
        .then(() => {
          //----------------------------------------------
          res.render('user', {
            natax: nemp.nome, //userName.nome,
            ps: req.body.pesq,
            pss: req.app.locals.user.pass,

            ctg: dCateg,
            tidx: tidxI,
            docs: docR,
            emid: req.body.cdI,
          });

          res.status(200);
        })

        .catch(() => {
          res.status(500).json({ err: 'could not fetch Data' });
        });
    } else {
      res.redirect('/login');
    }
  });

  rt.post('/user', urlParser, (req, res) => {
    const emp = req.body;
    let nemp = req.app.locals.user;

    let userName = req.app.locals.user.nome;
    tidxI = emp.tidx;
    let dCateg = docQF(req.body.categ);

    let lta = [];
    docR.length = 0;
    if (req.app.locals.user != undefined || req.app.locals.user != null) {
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
      macD = apsrc(req.body);

      req.ddb
        .collection('Bilhetes')
        .find(macD)
        .sort({ destino: 1 })
        .collation({ locale: 'en', caseLevel: true })
        .forEach((d) => {
          docR.push(d);
        })
        /*
               .then(() => {
                 res.redirect(`/user?t=${tidxI}`);
               })*/

        .then((e) => {
          res.render('user', {
            natax: nemp.nome, //userName.nome,
            ps: req.body.pesq,
            pss: req.app.locals.user.pass,
            tidx: tidxI,
            ctg: req.body.categ,
            docs: docR,
          });

          //console.log(req.body);
          //res.send(req.body);

          res.status(200);
        })

        .catch((e) => {
          res.status(500).json({ error: 'erro', ish: req.body });
        });

      //console.log("RelaTox:  " + json(req.body));

      // let { nego } = req.body;
      // console.log(nego);
    } else {
      res.redirect('/login');
    }
  });

  //Comprar bilhete
  rt.post('/book', urlParser, (req, res) => {
    const bilh = req.body;
    let listar = [];
    let bdispo = 'nada';
    req.ddb
      .collection('Bilhetes')
      .find({ _id: ObjectId(bilh.bId) })
      .forEach((d) => {
        listar.push(d);
        // console.log(listar);
      })
      .then((e) => {
        // res.send(JSON.stringify(req.body));
        bdispo = listar[0].b_restante;
        console.log('Dispo: ' + bdispo);
        console.log('Final: ' + bdispo);

        if (bdispo > 0) {
          return req.ddb
            .collection('Bilhetes')
            .updateOne(
              { _id: ObjectId(bilh.bId) },
              {
                $set: { b_restante: bdispo - 1 },
              }
            )
            .then(() => {
              req.app.locals.datap = listar[0].data;
              req.app.locals.destinop = listar[0].destino;
              req.app.locals.valorp = listar[0].valor;
              req.app.locals.nomep = 'Avatar';

              res.redirect('/recibo');
              // res.send(JSON.stringify(listar[0]));
            });
        } else {
          res.send(JSON.stringify('Indisponivel'));
        }
        //console.log(req.body);
        //res.send(req.body);
      })

      .catch((e) => {
        res.status(500).json({ error: 'erro', ish: req.body });
      });
  });

  rt.get('/*', (req, res) => {
    res.redirect('/init');
  });

  return rt;
}

//Files

module.exports = sutra;
