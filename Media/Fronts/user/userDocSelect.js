let actualDoc = '';
let tcod = document.getElementById('cod');

//Identity

let comNr = document.getElementById('comNr');
let comAc = document.getElementById('comAC');

let NA = document.getElementById('upt_ac');
let PC = document.getElementById('upt_pc');

let pss = document.getElementById('nps');
let pb = document.getElementById('psbid');

let tvs = document.getElementById('telaVisa');
let tvss = document.querySelectorAll('.btx');
let tidx = document.getElementById('tidx');

let cherno = document.getElementById('chernoFilho');

let allcarsGaboom = document.querySelectorAll('.formCont1');

function selectDoc(e) {
  //tdebug.innerHTML = docQF(e);
  tcod.value = e;
  //console.log(actualDoc);
  switch (e) {
    case 'pc':
      tidx.value = 'ds';
      break;

    case 'p':
      tidx.value = 'dt';
      break;

    case 'pgt':
      tidx.value = 'tp';
      break;
  }
  tvsChanger();

  //console.log("debug: " + tdebug.innerHTML);
  //console.log(e);
  //console.log("cod: " +tcod.value+"||"+tcod.value.length);
}
function tvsChanger() {
  switch (tidx.value) {
    case 'ds':
      tvss[0].style.backgroundColor = 'red';
      tvss[1].style.backgroundColor = 'rgba(255, 0, 0, 0)';
      tvss[2].style.backgroundColor = 'rgba(255, 0, 0, 0)';
      formsgabons(0);
      break;

    case 'tp':
      tvss[0].style.backgroundColor = 'rgba(255, 0, 0, 0)';
      tvss[1].style.backgroundColor = 'red';
      tvss[2].style.backgroundColor = 'rgba(255, 0, 0, 0)';
      formsgabons(1);

      break;

    case 'dt':
      tvss[0].style.backgroundColor = 'rgba(255, 0, 0, 0)';
      tvss[1].style.backgroundColor = 'rgba(255, 0, 0, 0)';
      tvss[2].style.backgroundColor = 'red';
      formsgabons(2);

      break;
  }
}

function formsgabons(op) {
  for (let i = 0; i < allcarsGaboom.length; i++) {
    const el = allcarsGaboom[i];
    if (i == op) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }
  }
}

tvsChanger();

function alertar(nome) {
  let cfilho = JSON.parse(nome);
  tvs.style.display = 'block';
  cherno.innerHTML = `Valor a Pagar: ${cfilho.valor} Mts`;
  pb.value = cfilho._id;
  console.log(cfilho.destino);
  //console.log('ola:' + nome);
}

function cancelar() {
  tvs.style.display = 'none';
}

/*********Point********* */

let bilhas = document.querySelectorAll('.bcontent');

let ts = document.getElementById('ts');
ts.innerHTML = ` <h2> Aponte um dos bilhetes disponiveis,para mais Detalhes </h2>`;

for (let x = 0; x < bilhas.length; x++) {
  bilhas[x].addEventListener('mouseover', (el) => {
    let val = JSON.parse(
      JSON.parse(JSON.stringify(bilhas[x].getAttribute('value')))
    );
    // bilhas[x].style.background = 'red';
    //console.log(val.destino);
    ts.innerHTML = `
    <h3 class="opc" >Hora de partida    | ${val.hora_partida}</h3>
    <h3 class="opc" >Data de partida    | ${val.data}</h3>
    <h3 class="opc" >Duracao da viagem  | ${val.duracao}</h3>
    <h3 class="opc" >Tipo de transporte | ${val.autocarro}</h3>
    <h3 class="opc" >Preco              | ${val.valor}Mts</h3>`;

    /* 'Destino: ' + val.destino + '\n \r' + 'Duracao em horas: ' + val.duracao;*/
  });

  bilhas[x].addEventListener('mouseleave', (el) => {
    ts.innerHTML = `
               <h2> Aponte um dos bilhetes disponiveis,para mais Detalhes </h2>
    `;
    //bilhas[x].style.background = 'rgba(255, 0, 0, 0)';
  });
}

function resp() {
  if (tidx.value.length > 0) {
    return true;
  } else {
    alert('Escolha Categoria de Bilhete!!!!');

    return false;
  }
}

/*
console.log(comNr);
console.log(PC);

console.log(comAc);
console.log(NA);*/

function comprar() {
  comNr.value = PC.value;
  comAc.value = NA.value;

  if (comNr.value.toString().length > 0 && comAc.value.toString().length > 0) {
    if (comNr.value == pss.value) {
      alert('Compra Efectuada com Sucesso');
      return true;
    } else {
      alert('Password errado');

      return false;
    }
  } else {
    alert('Preencha todos os campos!!!');

    return false;
  }
}
