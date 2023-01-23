


let pai = document.getElementById('pai');



function fechar()
{
  pai.style.display ='none';
}

function abrir()
{
  pai.style.display ='block';
}






//////////////////////////////////////Inter

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
 
}



let Nes = Array.from(es);

Nes.forEach((e, i) => {
  e.addEventListener("click", () => {
    if (e.parentNode.parentNode.querySelector("#docB")) {
      //console.log("olaaaaaaaaaaaaaaaaa");
      let pai = e.parentNode.parentNode.querySelector("#docB");

      pai.value = e.innerHTML;
    } else {
      let pai = e.parentNode.parentNode.querySelector(".dropbtn");
      pai.value = e.innerHTML;
    }

    let pai = e.parentNode.parentNode.querySelector(".dropdown-content");
    pai.style.display = "none";
  });
});

////Cnr DroZone

let bts = Array.from(document.querySelectorAll(".dropbtn"));
//console.log(bts);
bts.forEach((e, i) =>
  e.addEventListener("mouseover", () => {
    if (e.parentNode.querySelector(".dropdown-content")) {
      e.parentNode.querySelector(".dropdown-content").style.display = "block";
      e.parentNode.addEventListener("mouseleave", () => {
        e.parentNode.querySelector(".dropdown-content").style.display = "none";
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
    alert("Escolha Tipo de documento!!!!");

    return false;
  }
}

//DocDetector
