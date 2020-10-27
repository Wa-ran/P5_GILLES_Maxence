// Constructeur pour faciliter la création et l'utilisation de nouveaux types de produits -----------------------------------------------------------
let typeList = [];
class Type {
  constructor(title, apiUrl) {
    this.title = title;
    this.apiUrl = apiUrl;
  }
};
const addType = (title, apiUrl) => {
  let thisnewType = new Type (title, apiUrl);
  typeList.push(thisnewType);
};
let vcam = addType('Caméras vintages', 'http://localhost:3000/api/cameras');
let oak = addType('Meubles en chêne', 'http://localhost:3000/api/furniture');
let teddy = addType('Ours en peluche faits main', 'http://localhost:3000/api/teddies');
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

// Fonction pour récupérer depuis localStorage la liste des produits achetés en y ajoutant la catégorie (pour l'api) et la quantité
const getStore = async () => {
  let purchaseList = [];
  for (let i=0; i < localStorage.length; i++) {
    let key = localStorage.getItem(localStorage.key(i));
    // Test des items pour ne sélectionner que ceux qui nous concernent
    if (RegExp('http://localhost:3000/api/').test(key) === true) {
      let store = JSON.parse(key);
      // Test si la quantité est bien un chiffre
      if (/^\d/.test(store.qnt) == false) {
        localStorage.removeItem(store.name);
      } 
      else {
        if (store.qnt > 9) {
          store.qnt = 9;
        }
        // On récupère les infos des produits
        await ajaxGet(store.api)
        .then(JSON.parse)
        .then(function(resolve) {
          // on ajoute aux infos la quantité et la catégorie
          resolve["quantity"] = store.qnt;
          resolve["category"] = store.group;
          purchaseList.push(resolve);
        })
        .catch(function() { return }) 
      };
    };
  };
  // Retourne un array des produits dans le panier et leurs infos
  return purchaseList
}


// Bouton haut de page ------------------------------------------------------
let pageUp = document.getElementById('pageUp');
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    pageUp.style.display = "flex";
    pageUp.setAttribute('aria-hidden', 'false');
  } else {
    pageUp.style.display = "none";
    pageUp.setAttribute('aria-hidden', 'true');
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}