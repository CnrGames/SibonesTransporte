/*
function lerDados() {
  fetch("./userCredentials.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate over the users array
      data.users.forEach((user) => {
        console.log(`Username: ${user.username}`);
        console.log(`Password: ${user.password}`);
      });
    });
}
*/

let nomes = document.getElementById('nomex');
let Unome = document.getElementById('nome');
let Upass = document.getElementById('pass');
let nomexx = JSON.parse(JSON.parse(JSON.stringify(nomes.getAttribute('stg'))));
console.log(nomexx);
function lerDados1() {
  let userCredentials = {
    users: [
      {
        username: 'ana',
        password: '123',
      },
      {
        username: 'lv',
        password: '12345',
      },
      {
        username: 'jimsmith',
        password: 'mysecretpassword789',
      },
    ],
  };
}

window.lerDados = function lerDados() {};

window.novoUser = function novoUser() {
  let npass = false;
  if (termo.checked == true) {
    nomexx.forEach((el, i) => {
      if (el.toLowerCase() == Unome.value.toLowerCase()) {
        npass = true;
      }
    });

    if (Upass.value.length < 4) {
      npass = false;
      alert('Password muito curto');
    }

    if (npass == true) {
      alert('Este nome ,ja esta em uso!');
    } else {
      //  alert('Sem Nomes,iguais');
    }

    // alert('Sim!!!');
  } else {
    alert('Concorde com os termos!!');
  }
};
