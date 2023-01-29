let data_Ui = document.getElementById('datasp');
let destino_Ui = document.getElementById('destino');

let lotacao_Ui = document.getElementById('lotac');
let horap_Ui = document.getElementById('horap');

let autoCarro_Ui = document.getElementById('autoc');
let duracao_Ui = document.getElementById('durac');

let disponi_Ui = document.getElementById('vagas');
let preco_Ui = document.getElementById('preco');
let infor = document.getElementById('infor');
let inforup = document.getElementById('inforUp');

///Editat

let upt_disponi_Ui = document.getElementById('upt_bdisp');
let upt_duracao_Ui = document.getElementById('upt_durac');

let upt_data_Ui = document.getElementById('upt_datasp');
let upt_horap_Ui = document.getElementById('upt_horap');

let upt_autoCarro_Ui = document.getElementById('upt_autoc');
let upt_preco_Ui = document.getElementById('upt_preco');

//upcp
let up_disponi_Ui = document.getElementById('upBilhete');
let up_duracao_Ui = document.getElementById('upDuracao');

let up_autoCarro_Ui = document.getElementById('upautoc');
let up_preco_Ui = document.getElementById('uppreco');

let up_data_Ui = document.getElementById('upData');
let up_horap_Ui = document.getElementById('upHora');

//Editar temla
let telaEdit = document.getElementById('telaEdit');
let TicketId = document.getElementById('tickId');

/*
let es = document.querySelectorAll(".escolha");
let lista = document.querySelector(".item-cont");
let pesq = document.querySelector("#pesquisa");
*/

//Ds ui

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

function validarSpecial(txt, tipo, min, max, silence) {
  let pass = false;

  if (txt.length < min) {
    if (silence == undefined || silence == null) {
      alert(tipo + ' ' + 'esta vazio');
    }
  } else {
    pass = true;

    //console.log(txt + '||' + pass);
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
    (c = validarSpecial(destino_Ui.value, 'Destino', 1, 30)),
    (d = validarSpecial(autoCarro_Ui.value, 'Tipo de AutoCarro', 1, 20)),
    (e = validarInt(preco_Ui.value, 'Preco', 1, 99999)),
    (f = validarInt(lotacao_Ui.value, 'Lotacao', 1, 100)),
    (g = validarInt(duracao_Ui.value, 'Duracao', 1, 90)),
    (h = validarInt(disponi_Ui.value, 'Vagas', 1, 999)),
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

function updateRequerido() {
  let pass = false;
  let lista = [
    (a = validarSpecial(upt_horap_Ui.value, 'Hora', 3, 4, true)),
    (b = validarSpecial(
      upt_disponi_Ui.value,
      'Bilhetes disponiveis',
      1,
      999,
      true
    )),
    (c = validarSpecial(upt_data_Ui.value, 'Data de Partida', 1, 100, true)),
    (d = validarSpecial(upt_duracao_Ui.value, 'Duracao ', 1, 90, true)),
    (e = validarSpecial(upt_autoCarro_Ui.value, 'AutoCarro', 1, 100, true)),
    (f = validarSpecial(upt_preco_Ui.value, 'Preco ', 1, 99999, true)),
  ];
  up_horap_Ui.value = upt_horap_Ui.value;
  up_disponi_Ui.value = upt_disponi_Ui.value;
  up_data_Ui.value = upt_data_Ui.value;
  up_duracao_Ui.value = upt_duracao_Ui.value;

  up_autoCarro_Ui.value = upt_autoCarro_Ui.value;
  up_preco_Ui.value = upt_preco_Ui.value;

  for (let x in lista) {
    pass = lista[x];
    if (pass == true) {
      return true;
    }
  }
  if (pass == false) {
    alert('Preencha pelomenos ,um Formulario!');
  }

  return pass;
}

function updateBilhas() {
  let pass = false;
  let lista = [
    (a = validarSpecial(up_horap_Ui.value, 'Hora', 1, 4)),
    (b = validarSpecial(up_data_Ui.value, 'Data', 1, 10)),
    (c = validarSpecial(up_disponi_Ui.value, 'Vagas', 1, 100)),
    (d = validarSpecial(up_duracao_Ui.value, 'Duracao ', 1, 50)),
    (c = validarSpecial(up_autoCarro_Ui.value, 'AutoCarro', 1, 100)),
    (d = validarSpecial(up_preco_Ui.value, 'Preco ', 1, 99999)),
  ];
  /*
  console.log(up_horap_Ui);
  console.log(up_data_Ui);
  console.log(up_disponi_Ui);
  console.log(up_duracao_Ui);*/

  for (let x in lista) {
    pass = lista[x];
    if (pass == true) {
      return true;
    }
  }

  return pass;
}

//

function Up_viagem() {
  let pass = updateRequerido();

  if (pass == true) {
    inforup.value = 'true';
    console.log('Passaste');
  } else {
    inforup.value = 'false';

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

//Registar from adm

function editar(nomex) {
  telaEdit.style.display = 'flex';
  TicketId.value = nomex;
  console.log(nomex);
  //console.log(telaEdit);

  console.log(obj); // Output: {name: 'John', age: 30, gender: 'male'}
}

function fecharTelaEdit() {
  telaEdit.style.display = 'none';
}

function eliminarTicket(nomez) {
  console.log(nomez.destino);
}
