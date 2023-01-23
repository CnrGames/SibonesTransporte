const rt = require('express').Router();
const { ObjectId } = require('mongodb');

function sutra(extMsg, extExpress, urlParser) {
  //console.log(ak,az.locals.usa);

  //Find Data

  function fecthar(res, req, next) {
    console.log('oi');
    return 'nada';
  }

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
    //console.log('Negativoooooooooooooooooooooooooooooo!');
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
  rt.get('/user', urlParser, (req, res) => {
    let lta = [];
    let docR = [];
    let nemp = 'nada'; // req.app.locals.user;
    let dCateg = docQF(req.body.categ);
    console.log(dCateg + ' :User_Final');

    req.db
      .collection('comp')
      .find()
      .sort({ nome: 1 })
      .forEach((cs) => lta.push(cs))
      .then(() => {
        //----------------------------------------------
        res.render('user', {
          natax: 'sibas', //userName.nome,
          ps: req.body.pesq,
          ctg: dCateg,
          docs: [],
          emid: req.body.cdI,
        });

        res.status(200);
      })

      .catch(() => {
        res.status(500).json({ err: 'could not fetch Data' });
      });
  });

  rt.post('/user', urlParser, (req, res) => {
    const emp = req.body;
    let userName = 'Sibas1'; // req.app.locals.user;

    let dCateg = docQF(req.body.categ);

    let lta = [];
    let docR = [];
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
    let p = {}; //pesquisa(req.body.pesq);

    req.ddb
      .collection('Bilhetes')
      .find({ b_restante: { $gt: 0 } })
      .sort({ destino: 1 })
      .collation({ locale: 'en', caseLevel: true })
      .forEach((d) => {
        docR.push(d);
      })
      .then((e) => {
        res.render('user', {
          natax: 'sibas', //userName.nome,
          ps: req.body.pesq,
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
  });

  rt.post('/book', urlParser, (req, res) => {
    const bilh = req.body;
    let listar = [];
    let bdispo = 'nada';
    req.ddb
      .collection('Bilhetes')
      .find({ _id: ObjectId(`${bilh.bId}`) })
      .sort({ destino: 1 })
      .collation({ locale: 'en', caseLevel: true })
      .forEach((d) => {
        listar.push(d);
      })
      .then((e) => {
        // res.send(JSON.stringify(req.body));
        bdispo = listar[0].b_restante;
        if (bdispo > 0) {
          return req.ddb
            .collection('Bilhetes')
            .updateOne(
              { _id: ObjectId(`${bilh.bId}`) },
              { $set: { b_restante: bdispo - 1 } }
            )
            .then(() => {
              res.send(JSON.stringify(listar[0]));
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

  rt.post('/add/doc', urlParser, (req, res) => {
    const emp = req.body;
    let nemp = req.app.locals.user;

    let dCateg = docU(req.body.categ);
    //cnrGames
    req.db
      .collection(dCateg)
      .insertOne({
        tipo: `${req.body.titulo}`,
        status: `${req.body.status}`,
        emp: `${nemp.id}`,
        data: `${req.body.data}`,
        add: '',
      })
      .then((resul) => {
        //res.status(201).json(resul);
        res.redirect('/user');
      })
      .catch((err) => {
        res.status(500).json({ erro: 'Falha na coneccao!' });
      });

    // let { nego } = req.body;
    // console.log(nego);
  });

  rt.get('/*', (req, res) => {
    res.sendStatus(404);
  });

  return rt;
}

//Files

module.exports = sutra;
