let data_Ui = document.getElementById('datasp');
let destino_Ui = document.getElementById('destino');

let lotacao_Ui = document.getElementById('lotac');
let horap_Ui = document.getElementById('horap');

let autoCarro_Ui = document.getElementById('autoc');
let duracao_Ui = document.getElementById('durac');

let disponi_Ui = document.getElementById('vagas');
let preco_Ui = document.getElementById('preco');
let infor = document.getElementById('infor');

///Editat

let upt_disponi_Ui = document.getElementById('upt_bdisp');
let upt_duracao_Ui = document.getElementById('upt_durac');

let upt_data_Ui = document.getElementById('upt_datasp');
let upt_horap_Ui = document.getElementById('upt_horap');

/*
let es = document.querySelectorAll(".escolha");
let lista = document.querySelector(".item-cont");
let pesq = document.querySelector("#pesquisa");
*/

//Destinos Ui

let d_esc = document.querySelectorAll('.dest_esc');

function createItem(nome) {
  let Item = document.createElement('div');
  let subNome = document.createElement('h2');

  Item.classList.add('itemB');

  subNome.innerText = nome;

  Item.appendChild(subNome);

  return Item;
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

function validarString(txt, tipo, min, max) {
  let pass = false;

  if (txt.value.length > max) {
    alert(tipo + ' ' + 'esta acima do maximo permitido');
  } else {
    if (txt.value.length < min) {
      alert(tipo + ' ' + 'esta abaixo do  minimo permitido');
    } else {
      pass = true;
    }
  }

  return pass;
}

function validarSpecial(txt, tipo, min, max) {
  let pass = false;

  if (txt.length < min) {
    alert(tipo + ' ' + 'esta vazio');
  } else {
    pass = true;
  }

  return pass;
}

function validarInt(txt, tipo, min, max) {
  let pass = false;

  if (parseInt(txt) > max) {
    alert(tipo + ' ' + 'esta acima do maximo permitido');
  } else {
    if (txt.length < min) {
      alert(tipo + ' ' + 'esta abaixo do  minimo permitido');
    } else {
      if (parseInt(txt) > 0) {
        pass = true;
      } else {
        alert(tipo + ' nao pode estar abaxio ou igual a ' + 0);
      }
    }
  }

  return pass;
}

window.registoRequerido = function registoRequerido(event) {
  let pass = true;
  let lista = [
    (a = validarSpecial(horap_Ui.value, 'Hora', 3, 4)),
    (b = validarSpecial(data_Ui.value, 'Data', 1, 10)),
    (c = validarSpecial(destino_Ui.value, 'Destino', 1, 10)),
    (d = validarSpecial(autoCarro_Ui.value, 'Tipo de AutoCarro', 1, 10)),
    (e = validarInt(preco_Ui.value, 'Preco', 1, 99999)),
    (f = validarInt(lotacao_Ui.value, 'Lotacao', 1, 100)),
    (g = validarInt(duracao_Ui.value, 'Duracao', 1, 50)),
    (h = validarInt(disponi_Ui.value, 'Vagas', 1, 100)),
  ];

  for (let x in lista) {
    pass = lista[x];
    if (pass == false) {
      return;
    }
  }
  if (event != null) {
    event.preventDefault();
  }

  return pass;
};

function reg_viagem() {
  let pass = registoRequerido();
  console.log('data: ' + data_Ui.value);

  if (pass == true) {
    infor.value = 'true';
    console.log('Passaste');
  } else {
    infor.value = 'false';

    return;
  }

  /*
  console.log(horap_Ui.value.length);
  console.log(autoCarro_Ui.value.length);
  console.log(duracao_Ui.value.length);
  console.log(disponi_Ui.value.length);
  console.log(preco_Ui.value.length);
  console.log(lotacao_Ui.value.length);*/
}

//Edit

function updateRequerido() {}

window.updateBilhas = function updateBilhas() {
  let pass = true;
  let lista = [
    (a = validarSpecial(upt_horap_Ui.value, 'Hora', 3, 4)),
    (b = validarSpecial(upt_data_Ui.value, 'Data', 1, 10)),
    (c = validarSpecial(upt_disponi_Ui.value, 'Vagas', 1, 100)),
    (d = validarSpecial(upt_duracao_Ui.value, 'Duracao ', 1, 50)),
  ];

  for (let x in lista) {
    pass = lista[x];
    if (pass == false) {
      return;
    }
  }

  return pass;
};
