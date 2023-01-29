let anoI = document.getElementById('anoB');
let diaI = document.getElementById('diaB');
let mesI = document.getElementById('mesB');
let docI = document.getElementById('docB');

let es = document.querySelectorAll('.escolha');
let lista = document.querySelector('.item-cont');
let pesq = document.querySelector('#pesquisa');

function createItem(nome) {
  let Item = document.createElement('div');
  let subNome = document.createElement('h2');

  Item.classList.add('itemB');

  subNome.innerText = nome;

  Item.appendChild(subNome);

  return Item;
}

let resTemplate = '';

let dep = document.getElementById('dpEmp');
let dep0 = document.getElementById('dpEmp0');

function ola() {
  console.log('olaxx');
  dep0.value = dep.value;
  //lista.appendChild(createItem(pesq.value));
  /*
  if (!diaI.value == "nada") {
    diaI.value = "cnr";
  }*/
}

// function docQ(n) {
//   let msg = "";
//   switch (n) {
//     case "Relatorio de Contas":
//       msg = "rela";
//       break;
//     case "Pagamento de Cmpostos":
//       msg = "pagamento";
//       break;
//     case "Processos Correntes":
//       msg = "processos";

//       break;
//     case "Pendentes":
//       msg = "pendente";

//       break;
//   }
//   return msg;
// }

let Nes = Array.from(es);

Nes.forEach((e, i) => {
  e.addEventListener('click', () => {
    if (e.parentNode.parentNode.querySelector('#docB')) {
      //console.log("olaaaaaaaaaaaaaaaaa");
      let pai = e.parentNode.parentNode.querySelector('#docB');
      let ot = e.parentNode.parentNode.querySelector('#cod');
      pai.value = e.innerHTML;
      //ot.value = docQ(pai.value);
    } else {
      let pai = e.parentNode.parentNode.querySelector('.dropbtn');
      pai.value = e.innerHTML;
    }

    let pai = e.parentNode.parentNode.querySelector('.dropdown-content');
    pai.style.display = 'none';
    ji();
  });
});

////Cnr DroZone

let bts = Array.from(document.querySelectorAll('.dropbtn'));
console.log(bts);
bts.forEach((e, i) =>
  e.addEventListener('mouseover', () => {
    if (e.parentNode.querySelector('.dropdown-content')) {
      e.parentNode.querySelector('.dropdown-content').style.display = 'block';
      e.parentNode.addEventListener('mouseleave', () => {
        e.parentNode.querySelector('.dropdown-content').style.display = 'none';
      });
      //console.log(e);
      //console.log(e.parentNode.querySelector(".dropdown-content"));
    }
  })
);

//Identity

function resp() {
  if (docI.value.length > 0) {
    return true;
  } else {
    alert('Escolha Tipo de documento!!!!');

    return false;
  }
}

//DocDetector
