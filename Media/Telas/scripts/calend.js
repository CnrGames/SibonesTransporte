let anoI = document.getElementById("anoB");
let diaI = document.getElementById("diaB");
let mesI = document.getElementById("mesB");
let docI = document.getElementById("docB");

let es = document.querySelectorAll(".escolha");
let lista = document.querySelector(".item-cont");
let pesq = document.querySelector("#pesquisa");

function createItem(nome) {
  let Item = document.createElement("div");
  let subNome = document.createElement("h2");

  Item.classList.add("itemB");

  subNome.innerText = nome;

  Item.appendChild(subNome);

  return Item;
}

let resTemplate = "";

function ola() {
  lista.appendChild(createItem(pesq.value));

  /*
  if (!diaI.value == "nada") {
    diaI.value = "cnr";
  }*/
}

let Nes = Array.from(es);

Nes.forEach((e, i) => {
  e.addEventListener("click", () => {
    let pai = e.parentNode.parentNode.querySelector("#docB");
    pai.value = e.innerHTML;
  });
});
