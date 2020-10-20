// Constructeur pour faciliter la création et l'utilisation de nouveaux types de produits -----------------------------------------------------------
let typeList = [];
class Type {
  constructor(title, url) {
    this.title = title;
    this.url = url;
  }
};
const newType = (title, url) => {
  let thisNewType = new Type (title, url);
  typeList.push(thisNewType);
};
let vcam = newType('Caméras vintage', 'http://localhost:3000/api/cameras');
let oak = newType('Meubles en chêne', 'http://localhost:3000/api/furniture');
let teddy = newType('Ours en peluche fait mains', 'http://localhost:3000/api/teddies');
// Un array avec les noms des types de produits et les chemins d'accès vers leur API est créé


// Ancres pour la liste produits du header ------------------------------------------------------------
const ancresList = (title) => {
  let ancre = document.createElement('a');
  ancre.className = "dropdown-item rounded px-1";
  ancre.href = './index.html#' + title;
  ancre.innerHTML = title;
  menuProduct.appendChild(ancre);
}
for (type of typeList) {
  ancresList(type.title);
}



ajaxGet('http://localhost:3000/api/cameras').then(JSON.parse).then(function(response) {
  console.log(response)
})



// Bouton haut de page ------------------------------------------------------
let pageUp = document.getElementById('pageUp');
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    pageUp.style.display = "flex";
  } else {
    pageUp.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}