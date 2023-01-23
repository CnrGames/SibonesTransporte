let actualDoc = '';
let tcod = document.getElementById('cod');

function selectDoc(e) {
  //tdebug.innerHTML = docQF(e);
  tcod.value = e;
  //console.log(actualDoc);

  //console.log("debug: " + tdebug.innerHTML);
  //console.log(e);
  //console.log("cod: " +tcod.value+"||"+tcod.value.length);
}

function alertar(nome) {
  console.log('ola:' + nome);
}

function resp() {
  if (tcod.value.length > 0) {
    return true;
  } else {
    alert('Escolha Tipo de documento!!!!');

    return false;
  }
}
