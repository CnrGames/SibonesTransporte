let pai = document.getElementById('pai');

function fechar() {
  pai.style.display = 'none';
}

function abrir() {
  pai.style.display = 'block';
}

//////////////////////////////////////Inter

let anoI = document.getElementById('anoB');
let diaI = document.getElementById('diaB');
let mesI = document.getElementById('mesB');
let docI = document.getElementById('docB');

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

function ola() {}

////Dokas zone

let d_esc = document.querySelectorAll('.dest_esc');

let dest_esc_data = Array.from(d_esc);

//Click
dest_esc_data.forEach((e, i) => {
  e.addEventListener('click', () => {
    let pai = e.parentNode.parentNode.parentNode.querySelector('.iStyle');
    pai.value = e.innerHTML;
    console.log(pai);

    //ji();
  });
});

let alliStyle = Array.from(document.querySelectorAll('.iStyle'));
//console.log(alliStyle);
alliStyle.forEach((e, i) =>
  e.addEventListener('mouseover', () => {
    if (e.parentNode.querySelector('.dropdown-content')) {
      e.parentNode.querySelector('.dropdown-content').style.display = 'block';

      e.parentNode.addEventListener('click', () => {
        e.parentNode.querySelector('.dropdown-content').style.display = 'none';
      });

      e.parentNode.addEventListener('mouseleave', () => {
        e.parentNode.querySelector('.dropdown-content').style.display = 'none';
      });
      //console.log(e);
      //console.log(e.parentNode.querySelector(".dropdown-content"));
    }
  })
);

//Identity

function resp1() {
  if (docI.value.length > 0) {
    return true;
  } else {
    alert('Escolha Tipo de documento!!!!');

    return false;
  }
}

//DocDetector
